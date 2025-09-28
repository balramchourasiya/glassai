import React, { useState } from 'react';

const USERS_KEY = 'app_demo_users_v1';

function readUsers() { try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { return [] } }
function writeUsers(users) { try { localStorage.setItem(USERS_KEY, JSON.stringify(users)); } catch {} }

export default function SignupPage({ onDone = () => {}, onSwitchToLogin = () => {} }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return alert('Please provide email and password');
    if (password !== confirm) return alert('Passwords do not match');
    const users = readUsers();
    if (users.find(u => u.email === email)) return alert('A user with that email already exists');
    users.push({ email, password });
    writeUsers(users);
    localStorage.setItem('app_demo_session', JSON.stringify({ email }));
    onDone();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
      <div className="w-full max-w-3xl bg-white/95 backdrop-blur-md rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="hidden md:flex items-center justify-center p-10 bg-gradient-to-br from-green-600 to-blue-600 text-white">
          <div>
            <h3 className="text-2xl font-bold mb-2">Create your free demo account</h3>
            <p className="text-sm text-green-100 max-w-xs">Quick signup to try polls and collaborative features. No real emails are sent.</p>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-sm text-gray-600">Email</span>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-green-300" placeholder="you@company.com" />
            </label>

            <label className="block">
              <span className="text-sm text-gray-600">Password</span>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-green-300" placeholder="Create a password" />
            </label>

            <label className="block">
              <span className="text-sm text-gray-600">Confirm Password</span>
              <input type="password" required value={confirm} onChange={e => setConfirm(e.target.value)} className="mt-1 block w-full rounded-md border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-green-300" placeholder="Repeat password" />
            </label>

            <div className="flex flex-col sm:flex-row gap-3">
              <button type="submit" className="flex-1 px-4 py-3 bg-gradient-to-r from-green-500 to-teal-400 text-white rounded-md shadow">Create account</button>
              <button type="button" onClick={onSwitchToLogin} className="flex-1 px-4 py-3 border border-gray-200 rounded-md">Have an account? Sign in</button>
            </div>
          </form>

          <div className="mt-6 text-sm text-gray-500">By signing up you agree to the terms.</div>
        </div>
      </div> no re
    </div>
  );
}
