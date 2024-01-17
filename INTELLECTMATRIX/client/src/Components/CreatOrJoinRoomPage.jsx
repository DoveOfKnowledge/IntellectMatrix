import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

export const CreatOrJoinRoomPage = () => {
  const [username, setUsername] = useState('');
  const [roomID, setRoomID] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const socket = io('http://localhost:5000'); // Update with your server URL

  const handleCreateRoom = () => {
    socket.emit('createRoom', { username, roomID });
  };

  const handleJoinRoom = () => {
    socket.emit('joinRoom', { username, roomID });
  };

  socket.on('roomCreated', (roomId) => {
    navigate(`/matrixthree/${roomId}`);
  });

  socket.on('roomJoined', (roomId) => {
    navigate(`/matrixthree/${roomId}`);
  });

  socket.on('roomFull', () => {
    setError('Room is full. Please try another room.');
  });

  return (
    <div>
      <h1>Create or Join Room</h1>
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Enter room ID"
        value={roomID}
        onChange={(e) => setRoomID(e.target.value)}
      />
      <br />
      <button onClick={handleCreateRoom}>Create Room</button>
      <button onClick={handleJoinRoom}>Join Room</button>
      {error && <p>{error}</p>}
    </div>
  );
};

