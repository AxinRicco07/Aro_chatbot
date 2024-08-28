import React, { useState, useRef } from 'react';

function App() {
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! My name is Aro, your medical chatbot. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);  // State to track loading
  const chatBoxRef = useRef(null);

  const sendMessage = () => {
    if (input.trim()) {
      // Add the user's message to the messages array
      const newMessage = { type: 'user', text: input };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInput('');  // Clear the input field
      setLoading(true);  // Set loading to true while waiting for the response

      // Scroll the chatbox to the bottom
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;

      // Prepare the message object to be sent to the server
      const messagePayload = {
        message: input,
        history: []  // Sending an empty history array as per your requirement
      };

      // Send the message to the server
      fetch('https://1a0f-117-202-155-207.ngrok-free.app/webhooks/rest/webhook', {
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
          const botMessage = { type: 'bot', text: data.response };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
        setLoading(false);  // Set loading to false after receiving the response
        // Scroll the chatbox to the bottom
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      })
      .catch(error => {
        console.error('Error communicating with server:', error);
        setLoading(false);  // Set loading to false in case of an error
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
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
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
