import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CreatOrJoinRoomPage } from './CreatOrJoinRoomPage';

export const DifficultyPage = () => {
  const { categoryIndex } = useParams();

  return (
    <div className="difficulty-container">
      <h1 className='diff-h1'>SELECT  DIFFICULTY  LEVEL</h1>
      <div className="difficulty-buttons">
        <Link to="/CreatOrJoinRoomPage">
          <button className="easy">EASY</button>
        </Link>
        <Link to="/CreatOrJoinRoomPage">
          <button className="medium">MEDIUM</button>
        </Link>
        <Link to="/CreatOrJoinRoomPage">
          <button className="difficult">DIFFICULT</button>
        </Link>
      </div>
    </div>
  );
};

