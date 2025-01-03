import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Room: React.FC = () => {
  const [name, setName] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const generateRoomId = () => {
    const randomId = Math.random().toString(36).substring(2, 10);
    setRoomId(randomId);
  };

  const handleJoinRoom = () => {
    if (name && roomId) {
      navigate(`/chat?name=${name}&roomId=${roomId}`);
    } else {
      alert("Please enter both name and room ID!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Join a Chat Room</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-4 py-2 rounded-lg w-72"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="border px-4 py-2 rounded-lg w-72"
        />
      </div>
      <button
        onClick={generateRoomId}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
      >
        Generate Room ID
      </button>
      <button
        onClick={handleJoinRoom}
        className="bg-green-500 text-white px-4 py-2 rounded-lg"
      >
        Join Room
      </button>
    </div>
  );
};

export default Room;
