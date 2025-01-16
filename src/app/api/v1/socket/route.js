export async function POST(req) {
    const body = await req.json();
    const { message } = body;
  
    if (!message) {
      return new Response(JSON.stringify({ success: false, error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  
    // Emit the event via the global `io` instance
    if (global.io) {
      global.io.emit('newMessage', { message });
      return new Response(JSON.stringify({ success: true, message: 'Event emitted' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ success: false, error: 'Socket.IO not initialized' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
  