import React from 'react';

const Message = ({ text, sender }) => {
  return (
    <div className="message">
      {text}
    </div>
  );
};

export default Message;
