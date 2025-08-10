import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './pages/home';
import Login from './pages/login';
import RegisterPage from './pages/register';
import { ToastContainer } from 'react-toastify';
import StudentDashboard from './pages/studentDashboard';
import StudentRegisterForm from './pages/studentRegisterForm';

function App() {
  return (
    <div>
    <ToastContainer />
      <Routes>
        <Route path="/"              element={<HomePage />} />
        <Route path="/auth/login"    element={<Login />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/profile/student" element = {<StudentRegisterForm/>} />
        <Route path="/dashboard/student" element={<StudentDashboard />}/>
      </Routes>
    </div>
  );
}

export default App;
