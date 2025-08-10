import React, { useContext, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../service/refresh';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const [username, setUsername]         = useState('');
  const [password, setPassword]         = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole]                 = useState('student');
  const [loading, setLoading]           = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // Client-side validation
    if (!username.trim() || !password) {
      return toast.error('Username and password are required');
    }
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }

    try {
      setLoading(true);

      const {data} = await api.post('auth/register', {
        username,
        password,
        role
        });
      const returnedRole = data.user?.role || returnedRole
      if (data.success) {
        toast.success('Registration successful!');
        localStorage.setItem('token', data.token);
          if(returnedRole === 'student'){
            navigate('/profile/student');
            localStorage.setItem('username', JSON.stringify(data.user.username));
          }
          else if(returnedRole === 'instructor'){
            navigate('register/instructor');
            localStorage.setItem('username', JSON.stringify(data.user.username));
          }
      } else {
        toast.error(data.message || 'Registration failed');
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
    console.error('Server replied with:', err.response.data);
      }
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <label className="block mb-4">
          <span className="text-gray-700">Username</span>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="mt-1 block w-full border rounded p-2"
            placeholder="Enter username"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Password</span>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="mt-1 block w-full border rounded p-2"
            placeholder="Enter password"
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Confirm Password</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            className="mt-1 block w-full border rounded p-2"
            placeholder="Confirm password"
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">Role</span>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            className="mt-1 block w-full border rounded p-2"
          >
            <option value="student">Student</option>
            <option value="instructor">Instructor</option>
            <option value="admin">Admin</option>
          </select>
        </label>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded text-white ${
            loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Registering...' : 'Sign Up'}
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/auth/login')}
            className="text-blue-600 hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}
