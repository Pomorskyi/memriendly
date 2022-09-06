import React, { useEffect } from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom'
import { useAuth } from './AuthContext/AuthContext'

export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth()

    return currentUser ? <Outlet {...rest} /> : <Navigate to="/signup" />;
}
