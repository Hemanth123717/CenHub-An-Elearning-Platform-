// import React from 'react'
// import { getUserRole } from '../../utils/useAuth'
// import { Navigate, Outlet } from 'react-router-dom';

// const ClientProtected = () => {
//     const token = localStorage.getItem('token')
//     const role = getUserRole(token);
//   return role === "ROLE_CLIENT" || role === "ROLE_ADMIN" || role === "ROLE_SUPERADMIN" ? <Outlet/> : <Navigate to={"/"}/>;
// }

// export default ClientProtected

// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { getUserRole } from '../../utils/useAuth';

// const ClientProtected = () => {
//   const token = localStorage.getItem('token');
//   const role = getUserRole(token);

//   if (role === "ROLE_ADMIN" || role === "ROLE_SUPERADMIN" || role === "ROLE_CLIENT") {
//     return <Outlet />;
//   } else {
//     return <Navigate to="/login" />;
//   }
// };

// export default ClientProtected;


import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getUserRole } from '../../utils/useAuth';

const ClientProtected = () => {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = getUserRole(token);
    setRole(userRole);
    setLoading(false); // done checking
  }, []);

  if (loading) return null; // or show a spinner

  if (role === "ROLE_ADMIN" || role === "ROLE_SUPERADMIN" || role === "ROLE_CLIENT") {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ClientProtected;

