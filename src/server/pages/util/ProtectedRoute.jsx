import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from './UserContext';

const ProtectedRoute = () => {

    const { user, setUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true); // Added loading state

    useEffect(() => {
        const storedUser = localStorage.getItem("UserData");
        console.log("StoredUser => ", storedUser);

        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing stored user data:", error);
                localStorage.removeItem("UserData");
            }
        }
        setIsLoading(false); // Once checked, stop loading
    }, [setUser]);

    if (isLoading) {
        return <div>Loading...</div>; // Prevent premature redirect
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
  //   const serverUser = true;
  // return serverUser ? <Outlet/> : <Navigate to={"/login"}/>
}

export default ProtectedRoute