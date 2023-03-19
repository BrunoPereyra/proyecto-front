import React from 'react';

const Message = ({ text, sender }) => {
  return (
    <div className={`message ${sender === 'user' ? 'user-message' : 'other-message'}`}>
      {text}
    </div>
  );
};

export default Message;
