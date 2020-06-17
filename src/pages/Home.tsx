import React from "react";

const Home: React.FC = () => {
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
            <input type="text" name="name" autoFocus required></input>
          </div>
          <div className="form-field">
            <label htmlFor="room">Room name</label>
            <input type="text" name="room" required></input>
          </div>
          <div className="form-field">
            <button type="submit">JOIN</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
