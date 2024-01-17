import React from 'react'
import { NavLink } from 'react-router-dom';
import Logo from "../Images/logo.png"
import "./Navbar.css";
import { useAuth } from '../Store/auth';

export const Navbar = () => {

  const{ isLoggedIn} = useAuth();
  console.log("login or not ", isLoggedIn);

  return (
    <>
    <header>
        <div className="container">
            <div className="logo-brand">
              <NavLink to="/" >
                <img src={Logo} alt="INTELLECT MATRIX" />
              </NavLink>
              </div>
              <nav>
                <ul> 
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/contact">Contact</NavLink></li>

                {isLoggedIn ? (
                  <>
                <li><NavLink to="/games">Games</NavLink></li>
                <li><NavLink to="/logout">Logout</NavLink></li>
                </>
              ): (
              <>
                <li><NavLink to="/login">Login</NavLink></li>
                <li><NavLink to="/register">Register</NavLink></li>
              </>
              )}
                </ul>
                </nav>
            </div>
    </header>
    </>
  );
};

