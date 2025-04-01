import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));

    console.log(isAuthenticated, typeof isAuthenticated);

    return isAuthenticated ? children : <Navigate to='/login' />;
};

export default ProtectedRoute;
