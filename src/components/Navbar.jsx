import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
export const Navbar = () => {
 const { user, logout } = useAuth();
 const navigate = useNavigate();
 const handleLogout = () => {
 logout();
 navigate('/login');
 };
 return (
 <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justifybetween">
 <div className="flex items-center gap-2 text-indigo-600 font-bold text-lg">
 <CheckSquare className="w-5 h-5" />
 <span>Task Manager</span>
 </div>
 {user && (
 <div className="flex items-center gap-4">
 <span className="text-sm text-gray-600">Hi, {user.name}</span>
 <button
 onClick={handleLogout}
 className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600"
 >
 <LogOut className="w-4 h-4" />
 Logout
 </button>
 </div>
 )}
 </nav>
 );
};
