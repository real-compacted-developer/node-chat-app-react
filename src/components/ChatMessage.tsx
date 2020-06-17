import React from "react";

interface ChatMessageProps {
  readonly from: string;
  readonly time: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ from, time, children }) => {
  return (
    <>
      <li className="message">
        <div className="message__title">
          <h4>{from}</h4>
          <span>{time}</span>
        </div>
        <div className="message__body">
          <p>{children}</p>
        </div>
      </li>
    </>
  );
};

export default ChatMessage;
