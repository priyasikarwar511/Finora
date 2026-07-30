import './App.css';
import Homepage from './components/Pages/Homepage';
import { useState } from 'react';
import Login from './components/Authentication/Login';
import Mainpage from './components/Pages/mainpage'
import { Route,Routes } from "react-router-dom";

function App() {

  return (
   
      
      <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/mainpage" element={<Mainpage />} />
      </Routes>
     
    

  );
}
export default App;

