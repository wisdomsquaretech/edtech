'use client';

import { useState, useEffect } from 'react';

export default function AuthForm({ mode }: { mode: 'login' | 'register' }) {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [isLoginMode, setIsLoginMode] = useState(mode === 'login');

  useEffect(() => {
    setIsLoginMode(mode === 'login');
  }, [mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Your login/register logic here
    console.log(isLoginMode ? 'Logging in...' : 'Registering...');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-xl font-bold mb-4">{isLoginMode ? 'Login' : 'Register'}</h1>

      {!isLoginMode && (
        <input
          type="text"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      {!isLoginMode && (
        <input
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
        />
      )}

      <button type="submit">{isLoginMode ? 'Login' : 'Register'}</button>
    </form>
  );
}