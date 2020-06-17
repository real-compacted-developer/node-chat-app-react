import React from "react";
import ChatMessage from "../components/ChatMessage";

const ChatRoom: React.FC = () => {
  return (
    <div className="chat">
      <aside className="chat__sidebar">
        <h3>People</h3>
        <div id="users">
          <ol>
            <li>sad</li>
          </ol>
        </div>
      </aside>

      <section className="chat__main">
        <ol className="chat__messages">
          <ChatMessage from="SDA" time="2020. 06. 12.">
            asdasd
          </ChatMessage>
        </ol>

        <footer className="chat__footer">
          <form>
            <input
              type="text"
              placeholder="Message"
              required
              autoFocus
              autoComplete="off"
            />

            <button type="submit">Send</button>
          </form>

          <button>Audio Chat</button>
        </footer>
      </section>
      <audio id="audio-tag" autoPlay playsInline></audio>
    </div>
  );
};

export default ChatRoom;
