import React, { useState, useEffect } from "react";
import SimplePeer from "simple-peer";
import ChatMessage, { ChatMessagePayload } from "../components/ChatMessage";
import { useSocket } from "../hooks/useSocket";
import { useParams } from "react-router-dom";

const ChatRoom: React.FC = () => {
  const [inputMessage, setInputMessage] = useState<string>("");

  const socket = useSocket();
  const { name, room } = useParams();

  const [users, setUsers] = useState<[]>([]);
  const [messages, setMessages] = useState<any>([]);
  const [peer, setPeer] = useState<SimplePeer.Instance | undefined>(undefined);
  const [myAudioStream, setMyAudioStream] = useState<any>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const bindEvents = (p: any) => {
    p.on("error", (err: Error) => {
      console.log(err);
    });

    p.on("signal", (data: any) => {
      socket?.emit("createOffer", data);
    });

    p.on("stream", (stream: any) => {
      if (document != null) {
        // @ts-ignore
        document!!.querySelector("#audio-tag")!!.srcObject = stream;
      }
    });
  };

  useEffect(() => {
    socket?.emit("join", { name, room }, (err: Error) => {
      if (err) {
        alert(err);
      } else {
        console.log("No error");
      }
    });

    socket?.on("shareAudioModal", async (name: any) => {
      // eslint-disable-next-line no-restricted-globals
      const success = confirm(`${name} 님이 오디오 채팅을 시작하길 원합니다.`);
      if (!success) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: true,
        });
        setPeer(
          new SimplePeer({
            initiator: true,
            stream,
            config: {
              iceServers: [
                { urls: "stun:stun.l.google.com:19302" },
                { urls: "stun:global.stun.twilio.com:3478?transport=udp" },
                {
                  urls: "turn:numb.viagenie.ca",
                  credential: "hiragana",
                  username: "mornirmornir@hotmail.com",
                },
              ],
            },
          })
        );
        bindEvents(peer);
      } catch (e) {
        console.log(e.message);
      }
    });

    socket?.on("updateUserList", (users: any) => setUsers(users));
    socket?.on("newMessage", (msg: any) => {
      setMessages((prev: any) => [...prev, msg]);
    });

    socket?.on("transmitOffer", (data: any) => {
      console.log("receiving Offer", data);
      if (peer === null) {
        setPeer(
          new SimplePeer({
            initiator: false,
            stream: myAudioStream,
            config: {
              iceServers: [
                {
                  urls: "stun:stun.l.google.com:19302",
                },
                {
                  urls: "stun:global.stun.twilio.com:3478?transport=udp",
                },
                {
                  urls: "turn:numb.viagenie.ca",
                  credential: "hiragana",
                  username: "mornirmornir@hotmail.com",
                },
              ],
            },
          })
        );
        bindEvents(peer);
      }

      peer?.signal(data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startAudioChat = async () => {
    try {
      const a = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });
      setMyAudioStream(a);
      socket?.emit("askAudio");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="chat">
      <aside className="chat__sidebar">
        <h3>People</h3>
        <div id="users">
          <ol>
            {users?.map((value: any) => (
              <ChatMessage msg={value} key={value} />
            ))}
          </ol>
        </div>
      </aside>

      <section className="chat__main">
        <ol className="chat__messages">
          {messages?.map((value: ChatMessagePayload, index: number) => (
            <ChatMessage msg={value} key={index} />
          ))}
        </ol>

        <footer className="chat__footer">
          <form>
            <input
              type="text"
              placeholder="Message"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              required
              autoFocus
              autoComplete="off"
            />

            <button
              type="submit"
              onClick={() =>
                socket?.emit("createMessage", { text: inputMessage }, () => {
                  setInputMessage("");
                })
              }
            >
              Send
            </button>
          </form>

          <button onClick={startAudioChat}>Audio Chat</button>
        </footer>
      </section>
      <audio id="audio-tag" autoPlay playsInline></audio>
    </div>
  );
};

export default ChatRoom;
