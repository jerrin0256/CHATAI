import React, { useEffect, useState } from 'react';
import './AIReplyBubble.css';

const AIReplyBubble = ({ message }) => {
  const [displayedText, setDisplayedText] = useState('');
  const typingSpeed = 25;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + message.charAt(index));
      index++;
      if (index === message.length) clearInterval(interval);
    }, typingSpeed);
    return () => clearInterval(interval);
  }, [message]);

  return (
    <div className="ai-bubble">
      <div className="ai-avatar">🤖</div>
      <div className="ai-text">{displayedText}</div>
    </div>
  );
};

export default AIReplyBubble;
