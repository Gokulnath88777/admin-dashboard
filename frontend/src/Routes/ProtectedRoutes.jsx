import { AuthContext } from '@/context/AuthProvider';
import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

function ProtectedRoutes({ allowedRoles }) {
    const { user,loading } = useContext(AuthContext)
    console.log(user)
    if(loading)return null;
    
    if (!user) {
        console.log('Not user')
        return <Navigate to='/register' replace></Navigate>
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        console.log(allowedRoles)
        return <Navigate to='/unauthorize'></Navigate>
    }

    return (
        <>
            <Outlet />
        </>
    );
}

export default ProtectedRoutes