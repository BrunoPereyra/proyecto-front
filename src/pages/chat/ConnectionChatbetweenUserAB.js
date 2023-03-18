import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"

import Post_service from "../../services/service"

import "../../static/styles/chat/ConnectionChatbetweenUserAB.css"
import io from 'socket.io-client';

export function ConnectionChatbetweenUserAB() {
    const navigate = useNavigate()
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const socket = io('http://localhost:3001', {
        query: { userId }
    });

    useEffect(() => {
        const loggedUser = window.localStorage.getItem("loggedAppUser")
        let userStorage;
      
        if (loggedUser) {
          userStorage = JSON.parse(loggedUser)
          Post_service.setToken(userStorage.token)
        } else {
          navigate("/login")
        }
      
        const fetchMessages = async () => {
          const response = await Post_service.Onechat(userStorage.id);
          const messages = await response.json();
          setMessages(messages);
        };
      
        fetchMessages();
      
        socket.on('message', (message) => {
          setMessages([...messages, message]);
        });
      }, [messages, socket, userId, navigate]);

    const sendMessage = () => {
        socket.emit('message', message);
        setMessage('');
    };

    return (
        <div className='ConnectionChatbetweenUserAB'>
            {messages.map((message, index) => (
                <div key={index}>{message.text}</div>
            ))}
            <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
            />
            <button onClick={sendMessage}>Enviar</button>
        </div>
    );
};

