import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../Components/Sidebar/Sidebar'; // Import the Sidebar component
import sendIcon from '../Components/Assest/sendIcon.png';
import { Link } from 'react-router-dom';
import mic from '../Components/Assest/mic.png';
import profileImg from "../Components/Assest/profile.png";
import "./Chatpage.css"
import readAloudIcon from "../Components/Assest/readaloud.png";
import copyIcon from "../Components/Assest/copy.png";

function Chatpage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);  // State for mic listening
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
        { type: 'bot', text: 'Hello! My name is Aro, your medical chatbot. How can I assist you today?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
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

  const sendMessage = (text) => {
    if (text.trim()) {
      const newMessage = {
        type: 'user',
        text: text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput('');
      setLoading(true);

      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;

      const messagePayload = {
        message: text,
        history: []
      };

      fetch('https://d0ba-117-206-121-186.ngrok-free.app/webhooks/rest/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messagePayload),
      })
        .then(response => response.json())
        .then(data => {
          if (data.response) {
            const botMessage = {
              type: 'bot',
              text: data.response,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
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
        <header className="bg-white">
          <nav className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-5" aria-label="Global">
            <Link to='/' className="text-gray-500 italic sticky bottom-0 uppercase text-lg font-bold">ARO</Link>
          </nav>
        </header>

        <main className="flex-grow p-4 bg-white bg-cover bg-center overflow-y-auto" ref={chatBoxRef}>
  {messages.map((message, index) => (
    <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      {/* Bot messages */}
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
              <span className="text-sm font-normal text-gray-500">{message.time}</span>
            </div>
            <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl">
              <p className="text-sm font-normal text-gray-900">{message.text}</p>
            </div>
          </div>
        </div>
      )}

      {/* User messages */}
      {message.type === 'user' && (
        <div className="flex justify-end items-start gap-2.5">
          <div className="flex flex-col gap-1 w-full max-w-[320px]">
            <div className="flex items-center space-x-2 justify-end">
              <span className="text-sm font-semibold text-gray-900">You</span>
              <span className="text-sm font-normal text-gray-500">{message.time}</span>
            </div>
            <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-serverResponse text-white rounded-s-xl rounded-se-xl">
              <p className="text-sm font-normal text-gray-900">{message.text}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  ))}

  {/* Loader displayed next to bot's message when loading */}
  {loading && (
    <div className="flex justify-start mb-4">
      <img src={profileImg} alt="Bot Icon" className="h-8 w-8 rounded-full mr-2" />
      <div className="lds-ellipsis">
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
  )}
</main>


        <footer className="px-4 bg-white shadow-md sticky bottom-0">
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
              className="flex px-3 mt-0 bg-transparent hover:bg-blue-600 rounded-r-full"
              onClick={() => sendMessage(input)}
            >
              <img src={sendIcon} alt="Send" className="h-5 w-5 text-white" />
            </button>
            <button
              className="flex px-4 py-2"
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

export default Chatpage;
