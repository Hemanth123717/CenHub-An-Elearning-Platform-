// import React from 'react'
// import { Navigate, Outlet, Route } from 'react-router-dom';
// import { getUserRole } from '../utils/useAuth';

// const AdminProtected = () => {
//     const token = localStorage.getItem('token')
//     const role = getUserRole(token);
//   return role === "ROLE_ADMIN" || role === "ROLE_SUPERADMIN" ? <Outlet/> : role === "ROLE_CLIENT" ? <Navigate to={"/"}/> : <Route/> ;
// }

// export default AdminProtected

// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { getUserRole } from '../utils/useAuth';

// const AdminProtected = () => {
//   const token = localStorage.getItem('token');
//   const role = getUserRole(token);

//   if (role === "ROLE_ADMIN" || role === "ROLE_SUPERADMIN") {
//     return <Outlet />;
//   } else if (role === "ROLE_CLIENT") {
//     return <Navigate to="/" />;
//   } else {
//     return <Navigate to="/login" />;
//   }
// };

// export default AdminProtected;


import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { getUserRole, isTokenExpired } from '../utils/useAuth';

const AdminProtected = () => {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    // const token = localStorage.getItem("token");
          if (!token || isTokenExpired(token)) {
                                    localStorage.removeItem("token");
                                    console.log("Navigating to login from Server Home")
                                    navigate("/login");
                                    return;
                                }
    const userRole = getUserRole(token);
    setRole(userRole);
    setLoading(false); // done checking
  }, []);

  if (loading) return null; // or show a spinner

  if (role === "ROLE_ADMIN" || role === "ROLE_SUPERADMIN") {
        return <Outlet />;
      } else if (role === "ROLE_CLIENT") {
        return <Navigate to="/" />;
      } else {
        return <Navigate to="/login" />;
      }
};

export default AdminProtected;