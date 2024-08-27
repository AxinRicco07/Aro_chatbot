import React, { useState, useRef } from 'react';
import './Chatpage.css';

const Chatpage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatBoxRef = useRef(null);

  const sendMessage = () => {
    if (input.trim()) {
      // Add the user's message to the messages array
      const newMessage = { text: input, sender: 'person-a' };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput('');  // Clear the input field
  
      // Scroll the chatbox to the bottom
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  
      // Prepare the message object
      const messagePayload = {
        message: input,
        history: []  // Sending an empty history array
      };
  
      // Send the message to the server
      fetch('https://b84b-117-202-153-214.ngrok-free.app/webhooks/rest/webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messagePayload),
      })
      .then(response => response.json())
      .then(data => {
        if (data.response) {
          // Add the server's response to the messages array
          const rasaMessage = { text: data.response, sender: 'person-b' };
          setMessages((prevMessages) => [...prevMessages, rasaMessage]);
  
          // Scroll the chatbox to the bottom
          chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
      })
      .catch(error => {
        console.error('Error communicating with server:', error);
      });
    }
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chatpage">
      <div className='chat-body'>
        <div className="chat-container" ref={chatBoxRef}>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
        </div>
      </div>
      <div className="input-container">
        <input
          type="text"
          name='input'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown} // Handle Enter key
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chatpage;
