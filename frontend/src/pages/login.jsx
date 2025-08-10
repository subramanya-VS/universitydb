import React, { useContext, useState } from 'react';
import { api } from '../service/refresh';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthContext';

function Login() {
  const { backendURL, setIsLoggedIn } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // ensure cookies are sent
      const {data} = await api.post('auth/login', { username, password });

      if (data.success && data.token) {
        // store token however you need
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({
          username: data.user.username,
          role: data.user.role,
          id: data.user.id,
          token: data.token
        }));
        
        setIsLoggedIn(true);

        // redirect based on role
        switch (data.user.role) {
          case 'student':
            navigate('/dashboard/student');
            break;
          case 'instructor':
            navigate('/dashboard/instructor');
            break;
          default:
            navigate('/');
        }
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <label className="block mb-2">
          <span className="text-gray-700">Username</span>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="mt-1 block w-full border rounded p-2"
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
          />
        </label>
        
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Login;
