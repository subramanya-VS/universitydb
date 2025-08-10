import React, { useState, useEffect } from 'react';
import { api } from '../service/refresh';      // your axios instance
import { toast } from 'react-toastify';

export default function StudentDashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);

  const stored = localStorage.getItem('user');
  const user = stored ? JSON.parse(stored) : {};
  const username = user.username;
  const role = user.role;

  useEffect(() => {
    api.get('/dashboard/student')
      .then(response => {
        setDashboardData(response.data);    
      })
      .catch(err => {
        console.error('Failed to fetch dashboard:', err);
        toast.error('Could not load dashboard');
        setError('Failed to load dashboard');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user,role]);

  if (loading) return <p className="p-4">Loading your dashboard…</p>;
  if (error)   return <p className="p-4 text-red-600">{error}</p>;

  // replace these with your real fields
  const {FName, LName, program, section,sem,studentId } = dashboardData;
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold">
        Welcome back, {FName} {LName}!
      </h1>
      <p><strong>Student ID:</strong> {studentId}</p>
      <p><strong>Semester:</strong> {sem}</p>
      <p><strong>Program:</strong> {program}</p>
      <p><strong>Section:</strong> {section}</p>
    </div>
  );
}
