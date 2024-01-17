import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Store/auth';

export const Home = () => {
  const {isLoggedIn} = useAuth();

  return (
    <div className="home-container">
      <div className="content-container">
        <h1>Welcome to Intellect Matrix</h1>
        <p>Challenge your mind and have fun!</p>
        <NavLink to= {isLoggedIn ? '/Games' : '/Login'} >
          <button className="play-button">
            {isLoggedIn ? 'Play Now' : 'Get Started'}
          </button>
        </NavLink>
      </div>
    </div>
  );
};

