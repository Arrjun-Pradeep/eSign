import './App.css';
// import Drag from './component/drag/drag';
import Main from './component/main/main';
import { Routes, Route } from 'react-router-dom';
import Email from './component/email/email';
import Header from './component/header/header';
import Login from './component/login/login';
import Data from './component/dummy/dummy';
import Head from '../src/component/header2/head';
import React, { useState,useEffect } from 'react';
import {ethers} from 'ethers';
// import Drag from './component/drag/drag'
import Signup from "./component/signup/signup";
import Verify from './component/verify/verify';
import Sign from './component/sign/sign'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Main data={Data} />} />
        <Route exact path="/email" element={<Email />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/verify" element={<Verify />} />
        <Route exact path="/sign" element={<Sign />} />
      </Routes>
    </div>
  );
}

export default App;
