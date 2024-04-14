import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import HomePage from './pages/homePage';
import Form from './pages/form';


function App() {

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path='/home' element={<HomePage />} />
      <Route path='/form' element={<Form />} />
    </Routes>
  )
}

export default App
