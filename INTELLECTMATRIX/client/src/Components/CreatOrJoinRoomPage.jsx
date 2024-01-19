import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import "./CreatOrJOinRoomPage.css";
import { toast } from 'react-toastify';


export const CreatOrJoinRoomPage = () => {
  const [username, setUsername] = useState('');
  const [roomID, setRoomID] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const socket = io('http://localhost:5173');


  const handleCreateRoom = async () => {
    if (username && roomID) {
      socket.emit('createRoom', { username, roomID });
      toast.success("room created successfully");
    } else {
      toast.error('Please fill in both username and room ID');
    }
  };

  const handleJoinRoom = async () => {
    if (username && roomID) {
      socket.emit('joinRoom', { username, roomID });
      toast.success("room joined successfully");    
    } else {
      toast.error('Please fill in both username and room ID');
    }
  };

  socket.on('roomCreated', (roomId) => {
    navigate(`/matrixthree/${roomId}`);
  });

  socket.on('roomJoined', (roomId) => {
    navigate(`/matrixthree/${roomId}`);
  });



  return (
    <div className='createjoin-container'>
      <h1 className='cj-h1'>Create or Join Room</h1>
      <label>Username</label>
      <input
        className='cj-input'
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <label>Room ID</label>
      <input
      className='cj-input'
        type="text"
        placeholder="Enter room ID"
        value={roomID}
        onChange={(e) => setRoomID(e.target.value)}
      />
      <br />
      <button className='cj-btn' onClick={handleCreateRoom}>Create Room</button>
      <button className='cj-btn' onClick={handleJoinRoom}>Join Room</button>
    </div>
  );
};

