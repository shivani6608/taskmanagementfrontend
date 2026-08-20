import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
export const ProtectedRoute = ({ children }) => {
 const { user } = useAuth();
 const token = localStorage.getItem('token');
 if (!token || !user) {
 return <Navigate to="/login" replace />;
 }
 return children;
};
