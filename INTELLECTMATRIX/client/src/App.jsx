import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Home} from "./pages/Home";
import { Games } from './pages/Games';
import {About} from "./pages/About";
import {Contact} from "./pages/Contact"
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
import { Logout } from './pages/Logout';
import {Error} from "./pages/Error";
import {Footer} from "./Components/Footer";
import { Navbar } from './Components/Navbar';
import { CreatOrJoinRoomPage } from './Components/CreatOrJoinRoomPage';
import { DifficultyPage } from './Components/DifficultyPage';
import { MatrixThree } from './Components/MatrixThree';


const App = () => {

  return (
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/games" element={<Games/>} />   
        <Route path="/difficultypage/:categoryIndex" element={<DifficultyPage/>} />
        <Route path="/creatorjoinroompage" element={<CreatOrJoinRoomPage/>} />
        <Route path="/matrixthree/:roomID" element={<MatrixThree/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="*" element={<Error/>} />
      </Routes>
      <Footer/>
      </BrowserRouter>
  );
};

export default App
