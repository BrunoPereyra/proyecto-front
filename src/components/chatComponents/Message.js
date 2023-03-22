import React, { useEffect } from 'react';
import "../../static/styles/chat/Messages.css"

const Message = ({ text, classMessage }) => {

  return (
    <div className="message">
      <span className={classMessage}>
        <p>
          {text}
        </p>
      </span>
    </div>
  );
};

export default Message;
