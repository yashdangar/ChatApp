import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const Chat: React.FC = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name") || "Anonymous";
  const roomId = searchParams.get("roomId") || "Unknown";
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:8080");
    socketRef.current.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    socketRef.current.onopen = () => {
      const joinPayload = JSON.stringify({
        type: "join",
        payload: { name, roomId },
      });
      socketRef.current?.send(joinPayload);
    };

    return () => {
      socketRef.current?.close();
    };
  }, [name, roomId]);

  const sendMessage = () => {
    if (message && socketRef.current) {
      const chatPayload = JSON.stringify({
        type: "chat",
        payload: { name, message },
      });
      socketRef.current.send(chatPayload);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">
          Room: {roomId} | User: {name}
        </h1>
        <div className="bg-white border rounded-lg p-4 h-96 overflow-y-auto">
          {messages.map((msg, index) => (
            <p key={index} className="mb-2">
              {msg}
            </p>
          ))}
        </div>
      </div>
      <div className="w-full max-w-2xl flex mt-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border px-4 py-2 rounded-l-lg"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
