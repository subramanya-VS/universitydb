import React, { useState } from 'react';
import { api } from '../service/refresh'; // same instance you use for auth
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

export default function StudentRegisterForm() {
  const [Fname, setFname]         = useState('');
  const [Lname, setLname]         = useState('');
  const [studentId, setStudentId] = useState('');
  const [sem, setSem]             = useState('');
  const [program, setProgram]     = useState('');
  const [section, setSection]     = useState('');
  const [loading, setLoading]     = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // simple validation
    if (!Fname || !Lname || !studentId) {
      return toast.error('Please fill in at least name and student ID');
    }

    try {
      setLoading(true);
      // assuming your backend endpoint is POST /dashboard/student/register
      const { data } = await api.post('profile/student', {
        Fname, Lname, studentId, sem, program, section
      });
      if (data.success) {
        toast.success('Student created!');
        // clear form
        setFname(''); setLname(''); setStudentId('');
        setSem(''); setProgram(''); setSection('');
        navigate('/student/dashboard')
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error('Student register error', err.response?.data || err);
      toast.error('Failed to create student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 bg-white rounded">
      <h2 className="text-xl font-bold">Register Student</h2>

      <input
        value={Fname}
        onChange={e => setFname(e.target.value)}
        placeholder="First Name"
        className="w-full border rounded p-2"
        required
      />

      <input
        value={Lname}
        onChange={e => setLname(e.target.value)}
        placeholder="Last Name"
        className="w-full border rounded p-2"
        required
      />

      <input
        value={studentId}
        onChange={e => setStudentId(e.target.value)}
        placeholder="Student ID"
        className="w-full border rounded p-2"
        required
      />

      <input
        value={sem}
        onChange={e => setSem(e.target.value)}
        placeholder="Semester"
        className="w-full border rounded p-2"
      />

      <input
        value={program}
        onChange={e => setProgram(e.target.value)}
        placeholder="Program"
        className="w-full border rounded p-2"
      />

      <input
        value={section}
        onChange={e => setSection(e.target.value)}
        placeholder="Section"
        className="w-full border rounded p-2"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {loading ? 'Creating…' : 'Create Student'}
      </button>
    </form>
  );
}
