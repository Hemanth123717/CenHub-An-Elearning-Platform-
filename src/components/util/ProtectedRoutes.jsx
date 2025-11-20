// // import React, { useContext, useEffect, useState } from 'react'
// // import { Navigate, Outlet } from 'react-router-dom';
// // import { UserContext } from './UserContext';
// // import { isTokenExpired } from '../../utils/useAuth';

// // const ProtectedRoute = () => {

// //     const { user, setUser } = useContext(UserContext);
// //     const [isLoading, setIsLoading] = useState(true); // Added loading state

// //     useEffect(() => {
// //         const storedUser = localStorage.getItem("token");
// //         const navigate = useNavigate(); // React Router v6 hook

// //         if (!token || isTokenExpired(token)) {
// //             localStorage.removeItem("token");
// //             navigate("/login");
// //             return;
// //         }
// //         console.log("StoredUser => ", storedUser);

// //         if (storedUser) {
// //             try {
// //                 const parsedUser = storedUser;
// //                 setUser(parsedUser);
// //             } catch (error) {
// //                 console.error("Error parsing stored user data:", error);
// //                 localStorage.removeItem("token");
// //             }
// //         }
// //         setIsLoading(false); // Once checked, stop loading
// //     }, [setUser]);

// //     if (isLoading) {
// //         return <div>Loading...</div>; // Prevent premature redirect
// //     }

// //     return user ? <Outlet /> : <Navigate to="/login" />;
// //   //   const serverUser = true;
// //   // return serverUser ? <Outlet/> : <Navigate to={"/login"}/>
// // }

// // export default ProtectedRoute

// // // ProtectedRoute.jsx
// // // import React from 'react';
// // // import { Navigate } from 'react-router-dom';

// // // const ProtectedRoute = ({ children }) => {
// // //   const isAuthenticated = localStorage.getItem('token'); // Check if token exists

// // //   if (!isAuthenticated) {
// // //     return <Navigate to="/login" replace />; // Redirect to login if not authenticated
// // //   }

// // //   return children; // Render children if authenticated
// // // };

// // // export default ProtectedRoute;


// import React, { useContext, useEffect, useState } from 'react';
// import { Navigate, Outlet, useNavigate } from 'react-router-dom';
// import { UserContext } from './UserContext';
// import { isTokenExpired } from '../../utils/useAuth';

// const ProtectedRoute = () => {
//     const { user, setUser } = useContext(UserContext);
//     const [isLoading, setIsLoading] = useState(true);
//     const navigate = useNavigate(); // ✅ moved outside useEffect

//     // useEffect(() => {
//     //     const token = localStorage.getItem("token");

//     //     if (!token || isTokenExpired(token)) {
//     //         localStorage.removeItem("token");
//     //         console.log("Navigating to login from ProtectedRoute")
//     //         navigate("/login");
//     //         return;
//     //     }

//     //     console.log("Token found =>", token);

//     //     try {
//     //         setUser(token); // or decode and set user object if needed
//     //     } catch (error) {
//     //         console.error("Error setting user:", error);
//     //         localStorage.removeItem("token");
//     //         console.log("Navigating to Server Home from Login After removing Token")
//     //         navigate("/login");
//     //         return;
//     //     }

//     //     setIsLoading(false);
//     // }, [navigate, setUser]);

//     useEffect(() => {
//         const token = localStorage.getItem("token");
    
//         if (!token || isTokenExpired(token)) {
//             localStorage.removeItem("token");
//             console.log("Navigating to login from ProtectedRoute");
//             setIsLoading(false); // 👈 Ensure loading is stopped
//             navigate("/login");
//             return;
//         }
    
//         console.log("Token found =>", token);
    
//         try {
//             setUser(token); // or decode if needed
//         } catch (error) {
//             console.error("Error setting user:", error);
//             localStorage.removeItem("token");
//             setIsLoading(false); // 👈 Ensure loading is stopped
//             navigate("/login");
//             return;
//         }
    
//         setIsLoading(false);
//     }, [navigate, setUser]);
    


//     // if (isLoading) {
//     //     return <div>Loading...</div>;
//     // }

//     // return user ? <Outlet /> : <Navigate to="/login" />;
//     return isLoading ? <div>Loading...</div> : <Outlet />;
// };

// export default ProtectedRoute;


import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { getUserRole } from '../../utils/useAuth';

const ProtectedRoutes = () => {
    const [token,setToken] = useState("")
    const [role,setRole] = useState("")
    useEffect(()=>{
        setToken(localStorage.getItem("token"))
        setRole(getUserRole);
    },[])
  return (token!==null ? <Outlet/> : <Navigate to={"/login"}/>)
}

export default ProtectedRoutes;
