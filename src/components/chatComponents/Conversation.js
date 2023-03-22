import React, { useEffect, useRef } from 'react';
import Message from './Message';
import "../../static/styles/chat/Conversation.css"

const Conversation = ({ messages, userId }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ block: "end" });
  }, [messages]);

  return (
    <div className="conversation">
      {messages.map((message, index) => (
        message.senderId === userId ?
          <div className='conversation_message_Id conversation_senderId' key={index}>
            <div className='conversation_senderId_message'>
              <Message ref={messages.length === index + 1 ? messagesEndRef : null} classMessage="senderId" text={message.text} sender={message.sender} />
            </div>
          </div>
          :
          <div className='conversation_message_Id conversation_recipientId conversation_message_width' key={index}>
            <div className='conversation_recipientId_message'>
              <Message ref={messages.length === index + 1 ? messagesEndRef : null} classMessage="recipientId" text={message.text} sender={message.sender} />
            </div>
          </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Conversation;
