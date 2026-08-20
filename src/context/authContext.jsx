import React, { createContext, useContext, useEffect, useState } from 'react';
import API from '../services/api';
const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
 const [user, setUser] = useState(() => {
 const stored = localStorage.getItem('user');
 return stored ? JSON.parse(stored) : null;
 });
 const [loading, setLoading] = useState(false);
 useEffect(() => {
 if (user) {
 localStorage.setItem('user', JSON.stringify(user));
 } else {
 localStorage.removeItem('user');
 }
 }, [user]);
 const login = async (email, password) => {
 setLoading(true);
 try {
 const { data } = await API.post('/auth/login', { email, password });
 localStorage.setItem('token', data.token);
 setUser({ _id: data._id, name: data.name, email: data.email });
 return { success: true };
 } catch (error) {
 return { success: false, message: error.response?.data?.message || 'Login failed' };
 } finally {
 setLoading(false);
 }
 };
 const register = async (name, email, password) => {
 setLoading(true);
 try {
 const { data } = await API.post('/auth/register', { name, email, password });
 localStorage.setItem('token', data.token);
 setUser({ _id: data._id, name: data.name, email: data.email });
 return { success: true };
 } catch (error) {
 return { success: false, message: error.response?.data?.message || 'Registration failed'
};
 } finally {
 setLoading(false);
 }
 };
 const logout = () => {
 localStorage.removeItem('token');
 setUser(null);
 };
 return (
 <AuthContext.Provider value={{ user, loading, login, register, logout }}>
 {children}
 </AuthContext.Provider>
 );
};
export const useAuth = () => useContext(AuthContext);