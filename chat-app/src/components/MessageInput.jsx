

import React, { useState, useRef } from 'react';
import './MessageInput.css';
import '../App.css';

const MessageInput = ({ onSend, loading }) => {
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setInput('');
  };

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Your browser does not support speech recognition.');
      return;
    }

    if (!recognitionRef.current) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => prev + ' ' + transcript);
      };

      recognitionRef.current.onerror = (e) => {
        console.error('Speech recognition error:', e);
        setListening(false);
      };

      recognitionRef.current.onend = () => {
        setListening(false);
      };
    }

    if (listening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={loading ? "Waiting for response..." : "Type or speak your message..."}
        disabled={loading}
      />
      <button
        type="button"
        onClick={toggleListening}
        className={listening ? 'mic-button mic-listening' : 'mic-button'}
        disabled={loading}
        title="Toggle Voice"
      >
        🎤
      </button>
      <button type="submit" disabled={loading || !input.trim()}>
        {loading ? '...' : 'Send'}
      </button>
    </form>
  );
};

export default MessageInput;

