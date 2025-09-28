import React, { useState } from 'react';

const USERS_KEY = 'app_demo_users_v1';

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch { return [] }
}

export default function LoginPage({ onDone = () => {}, onSwitchToSignup = () => {} }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = readUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      localStorage.setItem('app_demo_session', JSON.stringify({ email }));
      onDone();
    } else {
      // nicer inline feedback
      alert('Invalid credentials. Try signing up or check your email/password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600">
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex flex-col items-center justify-center p-10 bg-gradient-to-br from-indigo-700 to-purple-700 text-white">
          <svg width="68" height="68" viewBox="0 0 24 24" fill="none" className="mb-6">
            <path d="M12 2l3 6 6 .5-4.5 3.5L19 20l-7-4-7 4 2.5-7.5L3 8.5 9 8 12 2z" fill="rgba(255,255,255,0.18)"/>
          </svg>
          <h3 className="text-2xl font-bold mb-2">Welcome back</h3>
          <p className="text-sm text-indigo-100 max-w-xs text-center">Sign in to access your presentations and live polls. Fast, simple, and private demo auth.</p>
        </div>

        <div className="p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign in to your account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-sm text-gray-600">Email</span>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="mt-1 block w-full rounded-md border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </label>

            <label className="block">
              <span className="text-sm text-gray-600">Password</span>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Your password"
                className="mt-1 block w-full rounded-md border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
            </label>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input id="remember" type="checkbox" className="h-4 w-4 text-indigo-600" />
                <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
              </div>
              <button type="button" className="text-sm text-indigo-600 hover:underline">Forgot password?</button>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button type="submit" className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md shadow">Sign in</button>
              <button type="button" onClick={onSwitchToSignup} className="flex-1 px-4 py-3 border border-gray-200 rounded-md">Create account</button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">By continuing you agree to the terms </div>
        </div>
      </div>
    </div>
  );
}
