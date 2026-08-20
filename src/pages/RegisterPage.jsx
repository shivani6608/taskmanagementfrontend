import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export const RegisterPage = () => {
 const { register, loading } = useAuth();
 const navigate = useNavigate();
 const [name, setName] = useState('');
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [error, setError] = useState('');
 const handleSubmit = async (e) => {
 e.preventDefault();
 setError('');
 if (!name || !email || !password) {
 setError('Name, email and password are required');
 return;
 }
 if (password.length < 6) {
 setError('Password must be at least 6 characters');
 return;
 }
 const result = await register(name, email, password);
 if (result.success) {
 navigate('/');
 } else {
 setError(result.message);
 }
 };
 return (
 <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 w-full max-wsm">
 <h1 className="text-xl font-semibold mb-6 text-center">Create account</h1>
 {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
 <form onSubmit={handleSubmit} className="space-y-4">
 <input
 value={name}
 onChange={(e) => setName(e.target.value)}
 placeholder="Full name"
 className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
 />
 <input
 type="email"
 value={email}
 onChange={(e) => setEmail(e.target.value)}
 placeholder="Email"
 className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
 />
 <input
 type="password"
 value={password}
 onChange={(e) => setPassword(e.target.value)}
 placeholder="Password"
 className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
 />
 <button
 type="submit"
 disabled={loading}
 className="w-full bg-indigo-600 text-white rounded-lg py-2 text-sm font-medium
hover:bg-indigo-700 disabled:opacity-50"
 >
 {loading ? 'Creating account...' : 'Register'}
 </button>
 </form>
 <p className="text-sm text-center text-gray-500 mt-4">
 Already have an account?{' '}
 <Link to="/login" className="text-indigo-600 hover:underline">
 Log in
 </Link>
 </p>
 </div>
 </div>
 );
};
