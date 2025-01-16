'use client';

import { useEffect } from 'react';
import io from 'socket.io-client';

let socket;

export default function SocketMessageList () {
  useEffect(() => {
    // Connect to the Socket.IO server
    socket = io();

    // Listen for the "newMessage" event
    socket.on('newMessage', (data) => {
      console.log('New message received:', data.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = async () => {
    await fetch('/api/v1/socket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Hello from the client!' }),
    });
  };

  return (
    <div>
      <h1>Socket.IO with Next.js App Router</h1>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}
