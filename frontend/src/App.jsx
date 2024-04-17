import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/auth/LoginPage.jsx';
import SignupPage from './pages/auth/SignupPage.jsx';
import HomePage from './pages/HomePage.jsx';
import Form from './pages/form.jsx';


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
