// src/App.js
import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar'; // Import the Sidebar component
import sendIcon from '../Components/Assest/sendIcon.png';
import mic from '../Components/Assest/mic.png';


function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);
  const recognitionRef = useRef(null);  // Ref for SpeechRecognition instance

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        sendMessage(transcript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event);
      };
    }

    const timer = setTimeout(() => {
      setMessages([
        { type: 'bot', text: 'Hello! My name is Aro, your medical chatbot. How can I assist you today?' }
      ]);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    } else {
      console.warn('SpeechRecognition is not supported in this browser.');
    }
  };

  const sendMessage = (text) => {
    if (text.trim()) {
      const newMessage = { type: 'user', text: text };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput('');
      setLoading(true);

      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;

      const messagePayload = {
        message: text,
        history: []
      };

      fetch('https://df06-117-206-123-111.ngrok-free.app/webhooks/rest/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messagePayload),
      })
      .then(response => response.json())
      .then(data => {
        if (data.response) {
          const botMessage = { type: 'bot', text: data.response };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
        setLoading(false);
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      })
      .catch(error => {
        console.error('Error communicating with server:', error);
        setLoading(false);
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage(input);
    }
  };

  return (
    <div className="flex">
      <Sidebar /> {/* Add Sidebar component here */}
      <div className="flex flex-col h-screen bg-gray-100 flex-grow">
        <main className="flex-grow p-4 overflow-y-auto bg-chat-bg bg-cover bg-center" ref={chatBoxRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-center items-center mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
            </div>
          )}
        </main>
        <footer className="p-4 bg-white shadow-md sticky bottom-0">
          <div className="flex">
            <input
              type="text"
              className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="flex items-center justify-center px-4 py-2"
              onClick={() => sendMessage(input)}
              style={{ backgroundColor: 'transparent', border: 'none', padding: 0 }}
            >
              <img src={sendIcon} alt="Send" className="h-6 w-6" />
            </button>
            <button
              className="flex items-center justify-center px-4 py-2"
              onClick={startListening}
              style={{ backgroundColor: 'transparent', border: 'none', padding: 0 }}
            >
              <img src={mic} alt="Mic" className="h-6 w-6" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
