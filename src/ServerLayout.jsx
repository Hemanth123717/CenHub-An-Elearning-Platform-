// import React, { useEffect, useState } from 'react'
// import NavBar from './WOW/NavBar';
// import { Outlet, useLocation} from 'react-router-dom';


// const ServerLayout = ({showNavInHome}) => {
//     const location = useLocation();

//     // const serverPages = ["/client_control", "/", "/clients", "/content", "/TestSeries", "/Ranking", "/"];
//     const serverPages = ["/server"]
//     // const signPages = ["/login", "/register"]
    
//     // useEffect(() => {
//     //   const root = document.getElementById("root");
//     //   if (location.pathname === "/login" || location.pathname === "/register") {
//     //       document.body.className = "loginBody";
//     //       root.className = "rootClass"
//     //     }else if (!serverPages.includes(location.pathname)) {
//     //       document.body.className = "body";
//     //       root.className = "homeRoot";
//     //     }
//     //      else{
//     //         document.body.className = "";  // Clear the class if on a server page
//     //     }
//     //     return () => {
//     //         document.body.className = "";  // Cleanup on unmount or path change
//     //     };
//     // }, [location.pathname]);
//     useEffect(() => {
//         const root = document.getElementById("root");
    
//         if (location.pathname.startsWith("/login") || location.pathname.startsWith("/register")) {
//           document.body.className = "loginBody";
//           // root.className = "rootClass"
//           // if (root) root.className = "rootClass";
//           // root.classList.add = "rootClass"
//         } else if (!serverPages.includes(location.pathname)) {
//             document.body.className = "body";
//             if (root) root.className = "homeRoot";
//         } else {
//             document.body.className = "";
//             if (root) root.className = "";
//         }
    
//         return () => {
//             document.body.className = "";
//             if (root) root.className = "";
//         };
//     }, [location.pathname]);

//     // const location = useLocation();
//   return (
//     <div>
//         {!serverPages.includes(location.pathname) && (
//         <>
//           <div className='leftTopCir circle'></div>
//           <div className='leftBottomCir circle'></div>
//           <div className='rightCir circle'></div>
//           <div>
//             <NavBar/>
//           </div>
//         </>
//       )}
//       <Outlet/>
//     </div>
//   )
// }

// export default ServerLayout

// // import React, { useEffect } from 'react'
// // import NavBar from './WOW/NavBar';
// // import { Outlet, useLocation } from 'react-router-dom';

// // const ServerLayout = ({ showNavInHome }) => {
// //   const location = useLocation();
// //   const pathname = location.pathname;

// //   const serverPages = ["/server"];

// //   useEffect(() => {
// //     const root = document.getElementById("root");

// //     // Debug print
// //     console.log("Current pathname:", pathname);

// //     if (pathname.includes("/login") || pathname.includes("/register")) {
// //       document.body.className = "loginBody";
// //       if (root) root.className = "";
// //     } else if (!serverPages.includes(pathname)) {
// //       document.body.className = "body";
// //       if (root) root.className = "homeRoot";
// //     } else {
// //       document.body.className = "";
// //       if (root) root.className = "";
// //     }

// //     return () => {
// //       document.body.className = "";
// //       if (root) root.className = "";
// //     };
// //   }, [pathname]);

// //   const hideNavBar = pathname.includes("/login") || pathname.includes("/register") || serverPages.includes(pathname);

// //   return (
// //     <div>
// //       {!hideNavBar && (
// //         <>
// //           <div className='leftTopCir circle'></div>
// //           <div className='leftBottomCir circle'></div>
// //           <div className='rightCir circle'></div>
// //           <NavBar />
// //         </>
// //       )}
// //       <Outlet />
// //     </div>
// //   );
// // }

// // export default ServerLayout;

// import React, { useLayoutEffect } from 'react';
// import NavBar from './admin/NavBar';
// import { Outlet, useLocation } from 'react-router-dom';

// const ServerLayout = ({ showNavInHome }) => {
//   const location = useLocation();
//   const pathname = location.pathname;

//   const serverPages = ["/server"];

//   useLayoutEffect(() => {
//     const root = document.getElementById("root");

//     // Remove loading class to make content visible
//     if (root?.classList.contains("loading")) {
//       root.classList.remove("loading");
//     }

//     if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
//       document.body.className = "loginBody";
//       if (root) root.className = "rootClass";
//     } else if (!serverPages.includes(pathname)) {
//       document.body.className = "body";
//       if (root) root.className = "homeRoot";
//     } else {
//       document.body.className = "";
//       if (root) root.className = "";
//     }

//     return () => {
//       document.body.className = "";
//       if (root) root.className = "";
//     };
//   }, [pathname]);

//   const hideNavBar =
//     pathname.startsWith("/login") ||
//     pathname.startsWith("/register") ||
//     serverPages.includes(pathname);

//   return (
//     <div>
//       {!hideNavBar && (
//         <>
//           {/* <div className="leftTopCir circle"></div>
//           <div className="leftBottomCir circle"></div>
//           <div className="rightCir circle"></div> */}
//           <NavBar />
//         </>
//       )}
//       <Outlet />
//     </div>
//   );
// };

// export default ServerLayout;


// ServerLayout.jsx (You shared this earlier)
import React, { useLayoutEffect } from 'react';
import NavBar from './admin/NavBar';
import { Outlet, useLocation } from 'react-router-dom';
import { getUserRole } from './utils/useAuth';

const ServerLayout = ({ showNavInHome }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const serverPages = ["/server"];

  useLayoutEffect(() => {
    const root = document.getElementById("root");
    if (root?.classList.contains("loading")) {
      root.classList.remove("loading");
    }
    if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
      document.body.className = "loginBody";
      if (root) root.className = "rootClass";
    } else if (!serverPages.includes(pathname)) {
      document.body.className = "body";
      if (root) root.className = "homeRoot";
    }else {
      document.body.className = "";
      if (root) root.className = "";
    }
    return () => {
      document.body.className = "";
      if (root) root.className = "";
    };
  }, [pathname]); // Dependency on pathname

  const hideNavBar =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    serverPages.includes(pathname);

  return (
    <div>
      {!hideNavBar && <NavBar />}
      <Outlet />
    </div>
  );
};

export default ServerLayout;