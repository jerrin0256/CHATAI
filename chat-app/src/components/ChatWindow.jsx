
import React, { useState } from 'react';
import MessageInput from './MessageInput'; // adjust the path as needed
import './ChatWindow.css';
import '../App.css';



const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false); // ✅ define isTyping

  const handleSend = async (message) => {
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setIsTyping(true);
  
    try {
      const res = await fetch('https://chatai-backe.onrender.com/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
  
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Something went wrong!' }]);
    } finally {
      setIsTyping(false);
    }
  };
  

  return (
    <div className="chat-window">
      <div className="messages">
        {messages.map((msg, idx) => (
         <div key={idx} className={msg.role === 'user' ? 'user' : 'assistant'}>
         {msg.content}
       </div>
        ))}
        {isTyping && (
          <div className="bot typing">
            Typing...
          </div>
        )}
      </div>
      <MessageInput onSend={handleSend} loading={isTyping} /> {/* ✅ pass loading prop */}
    </div>
  );
};

export default ChatWindow;
