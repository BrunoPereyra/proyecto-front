import React from 'react';
import Message from './Message';

const Conversation = ({ messages }) => {
  return (
    <div className="conversation">
      {messages.map((message) => (
        <Message key={message._id} text={message.text} sender={message.sender} />
      ))}
    </div>
  );
};

export default Conversation;
