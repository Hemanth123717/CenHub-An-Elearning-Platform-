// import React from 'react'
// import { Navigate, Outlet } from 'react-router-dom';
// import { getUserRole } from '../utils/useAuth';

// const ServerProtected = () => {
//     const token = localStorage.getItem('token')
//     const role = getUserRole(token);
//   return role === "ROLE_SUPERADMIN" ? <Outlet/> : <Navigate to={"/ServerHome"}/>;
// }

// export default ServerProtected


// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { getUserRole } from '../utils/useAuth';

// const ServerProtected = () => {
//   const token = localStorage.getItem('token');
//   const role = getUserRole(token);

//   if (role === "ROLE_SUPERADMIN") {
//     return <Outlet />;
//   } else {
//     return <Navigate to="/login" />;
//   }
// };

// export default ServerProtected;


import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getUserRole } from '../utils/useAuth';

const ServerProtected = () => {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = getUserRole(token);
    setRole(userRole);
    setLoading(false); // done checking
  }, []);

  if (loading) return null; // or show a spinner

  if (role === "ROLE_SUPERADMIN") {
        return <Outlet />;
      } else {
        return <Navigate to="/login" />;
      }
};

export default ServerProtected;

