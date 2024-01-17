import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import simg from "../Images/sportspage.jpg";
import himg from "../Images/hollywoodpage.jpg";
import soimg from "../Images/songpage.jpg";
import aimg from "../Images/animepage.jpg";
import gkimg from "../Images/gkpage.jpg";
import bimg from "../Images/bollywoodpage.jpg";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const categories = [
    {name: 'SPORTS', description: 'Test your sports knowledge with exciting questions!', image: (simg)},
    {name: 'HOLLYWOOD', description: 'Guess the famous movies and actors in Hollywood.',image: (himg)},
    {name: 'SONG', description: 'Identify songs and artists from various genres.',image:(soimg)},
    {name: 'ANIME', description: 'Explore the world of anime with trivia questions.',image:(aimg)},
    {name: 'GENERAL KNOWLEDGE', description: 'General Knowledge questions from various domains.', image:(gkimg)},
    {name: 'BOLLYWOOD', description: 'Bollywood movie trivia for film enthusiasts.', image:(bimg)},
  ];


export const Games = () => {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
  
    return (
      <div className="game-container">
        <h1 className='gh1'> SELECT CATEGORY</h1>
        <Slider {...settings}>
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <img src={category.image} alt={category.name} />
              <h2 className='gh2'>{category.name}</h2>
              <p className='gp'>{category.description}</p>
              <Link to={`/difficultypage/${index + 1}`}>
                <button className='gamebtn'>START</button>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    );
  };  