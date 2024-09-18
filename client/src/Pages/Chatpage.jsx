import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar'; // Import the Sidebar component
import sendIcon from '../Components/Assest/sendIcon.png';
import { Link } from 'react-router-dom';
import mic from '../Components/Assest/mic.png';
import profileImg from "../Components/Assest/profile.png"
import readAloudIcon from "../Components/Assest/readaloud.png"
import copyIcon from "../Components/Assest/copy.png"

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);  // New state for mic listening
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
        setIsListening(false); // Stop loader after receiving speech
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event);
        setIsListening(false); // Stop loader in case of error
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
      if (isListening) {
        // Stop listening
        recognitionRef.current.stop();
        setIsListening(false);
      } else {
        // Start listening
        recognitionRef.current.start();
        setIsListening(true);
      }
    } else {
      console.warn('SpeechRecognition is not supported in this browser.');
    }
  };

  const handleReadAloud = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };
  
  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Text copied to clipboard');
    }).catch((err) => {
      console.error('Could not copy text: ', err);
    });
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

      fetch('https://a6d7-117-206-123-111.ngrok-free.app/webhooks/rest/webhook', {
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
      <header class="bg-white">
  <nav class="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-5" aria-label="Global">
  <Link to='/' className="text-gray-500  italic sticky bottom-0 uppercase text-lg font-bold">ARO</Link>
  </nav>
  </header>
        <main className="flex-grow p-4 bg-white bg-cover bg-center overflow-y-auto" ref={chatBoxRef}>
        
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              {/* Profile icon for bot messages */}
              {message.type === 'bot' && (
                <div className="flex items-start gap-2.5">
                <img
                  src={profileImg}
                  alt="Bot Icon"
                  className="h-8 w-8 rounded-full mr-2"
                />
                <div className="flex flex-col gap-1 w-full max-w-[320px]">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-900">Aro Bot</span>
                    <span className="text-sm font-normal text-gray-500">11:46</span> {/* You can add dynamic time */}
                  </div>
                  <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl">
                    <p className="text-sm font-normal text-gray-900">{message.text}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-normal text-gray-500">Delivered</span>
                    {/* Read Aloud Icon */}
                    <button onClick={() => handleReadAloud(message.text)} className=" p-2 bg-transparent">
                      <img src={readAloudIcon} alt="Read Aloud" className="h-4 w-4" />
                    </button>
                    {/* Copy Icon */}
                    <button onClick={() => handleCopyText(message.text)} className=" p-2 bg-transparent">
                      <img src={copyIcon} alt="Copy Text" className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              )}
              {/* User message style */}
              {message.type === 'user' && (
                <div
                  className={`max-w-xs p-3 rounded-lg bg-blue-500 text-white`}
                >
                  {message.text}
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex flex-row gap-2">
              <div className="animate-pulse bg-gray-300 w-12 h-12 rounded-full"></div>
              <div className="flex flex-col gap-2">
                <div className="animate-pulse bg-gray-300 w-28 h-5 rounded-full"></div>
                <div className="animate-pulse bg-gray-300 w-36 h-5 rounded-full"></div>
              </div>
            </div>
          )}
          {/* Loader for mic listening */}
          {isListening && (
  <div className="flex justify-center items-center mt-4">
    {/* Loader SVG */}
    <svg className="pl w-24 h-24" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pl-grad1" x1="1" y1="0.5" x2="0" y2="0.5">
          <stop offset="0%" stopColor="hsl(313, 90%, 55%)" />
          <stop offset="100%" stopColor="hsl(223, 90%, 55%)" />
        </linearGradient>
        <linearGradient id="pl-grad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(313, 90%, 55%)" />
          <stop offset="100%" stopColor="hsl(223, 90%, 55%)" />
        </linearGradient>
      </defs>
      <circle className="pl__ring animate-ring" cx="100" cy="100" r="82" fill="none" stroke="url(#pl-grad1)" strokeWidth="36" strokeDasharray="0 257 1 257" strokeDashoffset="0.01" strokeLinecap="round" transform="rotate(-90, 100, 100)" />
      <line className="pl__ball animate-ball" stroke="url(#pl-grad2)" x1="100" y1="18" x2="100.01" y2="182" strokeWidth="36" strokeDasharray="1 165" strokeLinecap="round" />
    </svg>
    {/* Listening text */}
    <span className="ml-4 text-xl font-semibold text-gray-700">Listening...</span>
  </div>
)}

        </main>

        <footer className="px-4  bg-white shadow-md sticky bottom-0">
          <div className="flex item-center">
            <input
              type="text"
              className="flex-grow px-4 mt-0 mb-4 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
              required
              placeholder="Type here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button
              className="flex  px-3 mt-0  bg-transparent hover:bg-blue-600 rounded-r-full"
              onClick={() => sendMessage(input)}
            >
              <img src={sendIcon} alt="Send" className="h-5 w-5 text-white" />
            </button>
            <button
              className="flex   px-4 py-2"
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
