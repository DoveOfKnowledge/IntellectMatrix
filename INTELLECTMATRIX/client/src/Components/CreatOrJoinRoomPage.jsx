import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

export const CreatOrJoinRoomPage = () => {
  const [username, setUsername] = useState('');
  const [roomID, setRoomID] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const socket = io('');

  const handleCreateRoom = async () => {
    if (username && roomID) {
      socket.emit('createRoom', { username, roomID });
    } else {
      setError('Please fill in both username and room ID');
    }
  };

  const handleJoinRoom = async () => {
    if (username && roomID) {
      socket.emit('joinRoom', { username, roomID });
    } else {
      setError('Please fill in both username and room ID');
    }
  };

  socket.on('roomCreated', (roomId) => {
    navigate(`/matrixthree/${roomId}`);
  });

  socket.on('roomJoined', (roomId) => {
    navigate(`/matrixthree/${roomId}`);
  });

  socket.on('roomError', (errorMessage) => {
    setError(errorMessage);
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

