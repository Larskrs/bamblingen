'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import InfiniteFlowNumber from '../InfiniteFlowNumber';

let socket;

export default function SocketMessageList () {

  const [numb, setNumb] = useState(0)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    // Connect to the Socket.IO server
    socket = io();

    // Listen for the "newMessage" event
    socket.on('newMessage', (data) => {
      console.log('New message received:', data.message);
      setMessages([...messages, data.message])
      setNumb(numb+1)
    });

    return () => {
      socket.disconnect();
    };
  }, [numb, messages]);

  const sendMessage = async () => {
    await fetch('/api/v1/socket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Hello from the client!' }),
    });
  };

  return (
    <div>
      <InfiniteFlowNumber number={numb} />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}
