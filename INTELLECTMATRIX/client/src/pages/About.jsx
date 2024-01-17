import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Store/auth';

 export const About = () => {
  const {user} = useAuth();
  return (
    <div className="about-us-container">
      <div className="about-us-content">
        <h1>About Us</h1>
        <p>
          Welcome, {user ? `${user.username} to our website` : `to our website`}
        </p>
        <p>
          Welcome to Intellect Matrix, where learning meets fun! Our mission is to provide an engaging and challenging gaming experience that stimulates your mind. With a fusion of traditional tic-tac-toe and trivia questions, Intellect Matrix aims to entertain and educate.
        </p>
        <p>
          Our diverse range of question categories, varying difficulty levels, and timed challenges ensure a dynamic and intellectually stimulating gameplay. We believe in the power of combining education with entertainment to create an innovative and enjoyable gaming environment.
        </p>
        <p>
          Join us on this journey of knowledge and excitement. Play, learn, and challenge yourself with Intellect Matrix!
        </p>
        <Link to="/contact" className="About-button">
          Contact Us
        </Link>
      </div>
    </div>
  );
};



