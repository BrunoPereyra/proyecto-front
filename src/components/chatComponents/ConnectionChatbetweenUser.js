import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Conversation from './Conversation';
import "../../static/styles/chat/ConnectionChatbetweenUserAB.css"
import service from "../../services/service"
import { useNavigate } from "react-router-dom"

export function ConnectionChatbetweenUserAB({ OnechatId }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate()
  
  const socket = io('http://localhost:3001', {
    query: { userId } 
  });
  async function getChat() {
    try {
      const Messagesdata = await service.Onechat(OnechatId)
      console.log(Messagesdata);
      
      setMessages(Messagesdata.data)
      
    } catch (error) {
      console.log(error);
    }
  }
  socket.on('message', async (message) => {
    setMessages([
      ...messages,
      message
    ])
  })
  useEffect(() => {
    let loggedUser = window.localStorage.getItem("loggedAppUser")
    
    if (loggedUser) {
      const userStorage = JSON.parse(loggedUser)
      setUserId(userStorage.id)
      service.setToken(userStorage.token)
    } else {
      navigate("/login")
    }
    
    getChat()

  }, [])
  

  const sendMessage = async () => {
    socket.emit('message_destinatario', message, OnechatId)
    setMessage('');
  };
  function HandleSubmit(e) {
    e.preventDefault();
    sendMessage();
  }
  function HandleChange(e) {
    setMessage(e.target.value)
  }
  return (
    <div className="ConnectionChatbetweenUserAB">
      <Conversation userId={userId} messages={messages} />
      <form className='ConnectionChatbetweenUserAB_form' onSubmit={HandleSubmit}>
        <input
          type="text"
          value={message}
          onChange={HandleChange}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};


