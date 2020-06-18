import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  return (
    <div className="centered-form">
      <div className="centered-form__form">
        <form>
          <div className="form-field">
            <h3>React</h3>
            <h3>Join a Chat</h3>
          </div>
          <div className="form-field">
            <label htmlFor="name">Display name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              required
            ></input>
          </div>
          <div className="form-field">
            <label htmlFor="room">Room name</label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              required
            ></input>
          </div>
          <div className="form-field">
            <button
              type="submit"
              onClick={() => history.push(`/chat-room/${room}/${name}`)}
            >
              JOIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
