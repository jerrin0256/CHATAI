import React, { useEffect, useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import socket from '../services/socket';
import '../App.css';

const Chat = () => {
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      setSocketConnected(true);
      console.log('Connected to socket server');
    });

    socket.on('disconnect', () => {
      setSocketConnected(false);
      console.log('Disconnected from socket server');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return (
    <div className="chat-container">
      <h1>ChatAI {socketConnected }</h1>
      <ChatWindow />
    </div>
  );
};

export default Chat;