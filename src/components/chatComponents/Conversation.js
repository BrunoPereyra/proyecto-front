import React from 'react';
import Message from './Message';

const Conversation = ({ messages }) => {
  return (
    <div key={messages.length} className="conversation">
      {messages.map((message) =>
      (
        <div key={message._id}>
          <Message text={message.text} sender={message.sender} />
        </div>
      ))}
    </div>
  );
};

export default Conversation;
