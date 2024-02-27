import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import HomePage from './pages/homePage';


function App() {

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path='/home' element={<HomePage />} />
    </Routes>
  )
}

export default App
