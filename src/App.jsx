// // // import { useContext, useEffect, useState } from 'react'
// // // import './App.css'
// // // // import Register from './components/Register'
// // // import { Route, Routes, BrowserRouter, Outlet, useLocation } from 'react-router-dom'

// // // // import Admin from './components/Admin/Admin'
// // // import Home from './WOW/Home'
// // // // import NavBar from './WOW/NavBar'
// // // import ClientControl from './WOW/ClientControl'
// // // import CodingChallenges from './WOW/CodingChallenges'
// // // // import ServerHome from './Server/ServerHome'
// // // import ServerLayout from './ServerLayout'
// // // import Contents from './WOW/Contents'
// // // import TestSeries from './WOW/TestSeries'
// // // import Ranking from './WOW/Ranking'
// // // import ViewClients from './WOW/ViewClients'
// // // import ProtectedRoute from './components/util/ProtectedRoutes'
// // // import { UserContext, UserProvider } from './components/util/UserContext'
// // // import Login from './WOW/Login'

// // // function App() {

// // //   // const {user} = useContext(UserContext);
// // //   const user = localStorage.getItem("ClientUserData");
// // //   const [loggined, setLoggined] = useState(false);

// // //   useEffect(()=>{
// // //     const user = localStorage.getItem("ClientUserData")
// // //     if(user!=null){
// // //       console.log("loggedIn")
// // //       setLoggined(()=>true);
// // //     }else{
// // //       setLoggined(()=>false);
// // //     }
// // //   },[])

// // //   return (
// // //     <UserProvider>
// // //         {
// // //           loggined
// // //           ?
// // //           <div className={`${loggined ? 'mainPageMainLayout' : ''}`}>
// // //             <div className={`${loggined ? 'mainPageLeftLayout' : ''}`}></div>
// // //             <div className={`${loggined ? 'mainPageRightLayout' : ''}`}>
// // //               <BrowserRouter>
// // //                 <Routes>
// // //                   <Route element={<ServerLayout/>}>
// // //                     <Route element={<ProtectedRoute/>}>
// // //                       <Route path='/' element={<Home/>}/>
// // //                       <Route path='/client_control' element={<ClientControl/>}/>
// // //                       <Route path='/events' element={<CodingChallenges/>}/>
// // //                       <Route path='/clients' element={<ViewClients/>}/>
// // //                       <Route path='/content' element={<Contents/>}/>
// // //                       <Route path='/TestSeries' element={<TestSeries/>}/>
// // //                       <Route path='/Ranking' element={<Ranking/>}/> 
// // //                     </Route>
// // //                     {/* <Route path='/admin' element={<Admin/>}/> */}
// // //                   </Route>
// // //                     {/* <Route path='/register' element={<Register/>}/> */}
// // //                     {/* <Route path='/server' element={<ServerHome/>}/> */}
// // //                     {/* <Route path='/login' element={<Login/>}/> */}
// // //                 </Routes>
// // //               </BrowserRouter>
// // //             </div>
// // //           </div>
// // //           :
// // //           <BrowserRouter>
// // //             <Routes>
// // //                 <Route path='/login' element={<Login/>}/>
// // //             </Routes>
// // //           </BrowserRouter>
// // //         }
// // //     </UserProvider>
// // //   )
// // // }

// // // export default App

// import { useEffect, useState } from 'react'
// import './App.css'
// import {
//   Route,
//   Routes,
//   BrowserRouter,
//   Navigate,
// } from 'react-router-dom'

// import ProtectedRoute from './components/util/ProtectedRoutes'
// import AdminServerLayout from './ServerLayout'
// import { UserProvider } from './components/util/UserContext'
// import Login from './Login'

// // Admin imports
// import AdminHome from './admin/Home'
// import AdminClientControl from './admin/ClientControl'
// import AdminCodingChallenges from './admin/CodingChallenges'
// import AdminContents from './admin/Contents'
// import AdminTestSeries from './admin/TestSeries'
// import AdminRanking from './admin/Ranking'
// import AdminViewClients from './admin/ViewClients'

// // Client imports
// import ClientHome from './clients/pages/ClientHome'
// import ClientInfiniteScroll from './clients/pages/InfiniteScroll'
// import ClientDashboard from './clients/pages/ClientDashboard'
// import ClientTestSeries from './clients/pages/ClientTestSeries'
// import ClientTests from './clients/pages/ClientTests'
// import ClientEvents from './clients/pages/ClientEvents'
// import ClientAboutUs from './clients/pages/ClientAboutUs'
// import ClientTestPage from './clients/pages/ClientTestPage'
// import ClientViewResults from './clients/pages/ClientViewResults'

// // Server imports
// import ServerHome from './server/pages/Home'
// import { getUserRole } from './utils/useAuth'

// function App() {
//   const [loggined, setLoggined] = useState(false)
//   const [checkingLogin, setCheckingLogin] = useState(true)
//   const token = localStorage.getItem("token");
//   const role = getUserRole(token)

//   useEffect(() => {
//     const user = localStorage.getItem('token')
//     if (user != null) {
//       console.log('loggedIn')
//       setLoggined(true)
//     } else {
//       setLoggined(false)
//     }
//     setCheckingLogin(false)
//   }, [])

//   // if (checkingLogin) return <div>Loading...</div>

//   // return (
//   //   <UserProvider>
//   //     <BrowserRouter>
//   //       {
//   //         loggined ? (
//   //           <div className='mainPageMainLayout'>
//   //             <div className='mainPageLeftLayout'></div>
//   //             <div className='mainPageRightLayout'>
//   //               <Routes>
//   //                 <Route element={<AdminServerLayout />}>
//   //                   <Route element={<ProtectedRoute />}>
//   //                     <Route path='/' element={<AdminHome />} />
//   //                     <Route path='/client_control' element={<AdminClientControl />} />
//   //                     <Route path='/events' element={<AdminCodingChallenges />} />
//   //                     <Route path='/clients' element={<AdminViewClients />} />
//   //                     <Route path='/content' element={<AdminContents />} />
//   //                     <Route path='/TestSeries' element={<AdminTestSeries />} />
//   //                     <Route path='/Ranking' element={<AdminRanking />} />
//   //                     {/* <Route path='/' element={<>
//   //                       <ClientInfiniteScroll/>
//   //                       <ClientHome/>
//   //                     </>}/>
//   //                     <Route path='/dashboard' element={<ClientDashboard/>}/>
//   //                     <Route path='/testSeries' element={<ClientTestSeries/>}/>
//   //                     <Route path='/tests' element={<ClientTests/>}/>
//   //                     <Route path='/events' element={<ClientEvents/>}/>
//   //                     <Route path='/aboutus' element={<ClientAboutUs/>}/>
//   //                     <Route path='/testPage' element={<ClientTestPage/>}/>
//   //                     <Route path='/viewResults' element={<ClientViewResults/>}/> */}
//   //                   </Route>
//   //                 </Route>
//   //               </Routes>
//   //             </div>
//   //           </div>
//   //         ) : (
//   //           <Routes>
//   //             <Route path='/login' element={<Login />} />
//   //             <Route path='*' element={<Navigate to="/login" />} />
//   //           </Routes>
//   //         )
//   //       }
//   //     </BrowserRouter>
//   //   </UserProvider>
//   // )
//   return (
//     <UserProvider>
//       <BrowserRouter>
//         <Routes>
//           {/* CLIENTPANEL */}
//           {/* {!loggined ? (
//             <>
//               <Route path="/login" element={<Login />} />
//               <Route path="*" element={<Navigate to="/login" />} />
//             </>
//           ) : ( */}
//             {
//               role === "ROLE_ADMIN"
//               ?
//               <Route element={<AdminServerLayout />}>
//                 <Route element={<ProtectedRoute />}>
//                   <Route path="/" element={<AdminHome />} />
//                   <Route path="/client_control" element={<AdminClientControl />} />
//                   <Route path="/events" element={<AdminCodingChallenges />} />
//                   <Route path="/clients" element={<AdminViewClients />} />
//                   <Route path="/content" element={<AdminContents />} />
//                   <Route path="/TestSeries" element={<AdminTestSeries />} />
//                   <Route path="/Ranking" element={<AdminRanking />} />
//                 </Route>
//               </Route>
//               :
//               <Route></Route>
//             }
//             {/* ADMINPANEL */}
//             {/* <Route path='/Ranking' element={<AdminRanking />} /> */}
//             {
//               role === "ROLE_CLIENT"
//               ?
//               <Route element={<ProtectedRoute />}>
//               <Route path='/' element={<>
//                 <ClientInfiniteScroll/>
//                 <ClientHome/>
//               </>}/>
//                 <Route path='/dashboard' element={<ClientDashboard/>}/>
//                   <Route path='/testSeries' element={<ClientTestSeries/>}/>
//                   <Route path='/tests' element={<ClientTests/>}/>
//                   <Route path='/events' element={<ClientEvents/>}/>
//                   <Route path='/aboutus' element={<ClientAboutUs/>}/>
//                   <Route path='/testPage' element={<ClientTestPage/>}/>
//                   <Route path='/viewResults' element={<ClientViewResults/>}/>
//                       <Route path="/login" element={<Login />} />
//                       <Route path="*" element={<Navigate to="/login" />} />
//                 </Route>
//               :
//               <Route></Route>
//             }
//           {/* )} */}
//           {/* SUPERADMINPANEL */}
//           {
//             role === "ROLE_SUPERADMIN"
//             ?
//             <Route element={<ProtectedRoute/>}>
//               <Route path='/' element={<ServerHome/>}/>
//             </Route>
//             :
//             <Route></Route>
//           }
//           <Route path="/login" element={<Login />} />
//           <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//       </BrowserRouter>
//     </UserProvider>
//   )  
// }

// export default App


// // import { useEffect, useState } from 'react'
// // import {
// //   Route,
// //   Routes,
// //   BrowserRouter,
// //   Navigate,
// //   useLocation,
// // } from 'react-router-dom'
// // import './App.css'

// // import { UserProvider } from './components/util/UserContext'
// // import ProtectedRoute from './components/util/ProtectedRoutes'
// // import Login from './Login'

// // // Layout
// // import NavSidebar from './NavSidebar'

// // // Admin Pages
// // import AdminHome from './admin/Home'
// // import AdminClientControl from './admin/ClientControl'
// // import AdminCodingChallenges from './admin/CodingChallenges'
// // import AdminContents from './admin/Contents'
// // import AdminTestSeries from './admin/TestSeries'
// // import AdminRanking from './admin/Ranking'
// // import AdminViewClients from './admin/ViewClients'

// // // Client Pages
// // import ClientHome from './clients/pages/ClientHome'
// // import ClientInfiniteScroll from './clients/pages/InfiniteScroll'
// // import ClientDashboard from './clients/pages/ClientDashboard'
// // import ClientTestSeries from './clients/pages/ClientTestSeries'
// // import ClientTests from './clients/pages/ClientTests'
// // import ClientEvents from './clients/pages/ClientEvents'
// // import ClientAboutUs from './clients/pages/ClientAboutUs'
// // import ClientTestPage from './clients/pages/ClientTestPage'
// // import ClientViewResults from './clients/pages/ClientViewResults'

// // // Server Pages
// // import ServerHome from './server/pages/Home'
// // import { getUserRole } from './utils/useAuth'

// // function App() {
// //   const token = localStorage.getItem('token');
// //   const [loggined, setLoggined] = useState(false)
// //   const role = getUserRole(token);
// //   const [checkingLogin, setCheckingLogin] = useState(true)

// //   useEffect(() => {
// //     // const token = localStorage.getItem('token')
// //     const userRole = localStorage.getItem('role') // Ex: ROLE_CLIENT / ROLE_ADMIN / ROLE_SUPERADMIN
// //     if (token && userRole) {
// //       setLoggined(true)
// //       // setRole(userRole)
// //     } else {
// //       setLoggined(false)
// //       // setRole(null)
// //     }
// //     setCheckingLogin(false)
// //   }, [])

// //   if (checkingLogin) return <div>Loading...</div>

// //   const renderRoutes = () => {
// //     if (!loggined) {
// //       return (
// //         <>
// //           <Route path="/login" element={<Login />} />
// //           <Route path="*" element={<Navigate to="/login" />} />
// //         </>
// //       )
// //     }

// //     const routes = []

// //     if (role === 'ROLE_CLIENT' || role === 'ROLE_ADMIN' || role === 'ROLE_SUPERADMIN') {
// //       routes.push(
// //         <Route key="clientRoot" path="/" element={<><ClientInfiniteScroll /><ClientHome /></>} />,
// //         <Route key="clientDashboard" path="/dashboard" element={<ClientDashboard />} />,
// //         <Route key="clientTestSeries" path="/testSeries" element={<ClientTestSeries />} />,
// //         <Route key="clientTests" path="/tests" element={<ClientTests />} />,
// //         <Route key="clientEvents" path="/events" element={<ClientEvents />} />,
// //         <Route key="clientAboutUs" path="/aboutus" element={<ClientAboutUs />} />,
// //         <Route key="clientTestPage" path="/testPage" element={<ClientTestPage />} />,
// //         <Route key="clientViewResults" path="/viewResults" element={<ClientViewResults />} />,
// //       )
// //     }

// //     if (role === 'ROLE_ADMIN' || role === 'ROLE_SUPERADMIN') {
// //       routes.push(
// //         <Route key="adminHome" path="/admin" element={<AdminHome />} />,
// //         <Route key="adminClientControl" path="/admin/client_control" element={<AdminClientControl />} />,
// //         <Route key="adminEvents" path="/admin/events" element={<AdminCodingChallenges />} />,
// //         <Route key="adminClients" path="/admin/clients" element={<AdminViewClients />} />,
// //         <Route key="adminContent" path="/admin/content" element={<AdminContents />} />,
// //         <Route key="adminTestSeries" path="/admin/TestSeries" element={<AdminTestSeries />} />,
// //         <Route key="adminRanking" path="/admin/Ranking" element={<AdminRanking />} />,
// //       )
// //     }

// //     if (role === 'ROLE_SUPERADMIN') {
// //       routes.push(
// //         <Route key="superAdminHome" path="/server" element={<ServerHome />} />
// //       )
// //     }

// //     // fallback
// //     routes.push(<Route key="fallback" path="*" element={<Navigate to="/" />} />)

// //     return routes
// //   }

// //   return (
// //     <UserProvider>
// //       <BrowserRouter>
// //         {loggined && <NavSidebar role={role} />}
// //         <div className={loggined ? 'mainPageRightLayout' : ''}>
// //           <Routes>
// //             {renderRoutes()}
// //           </Routes>
// //         </div>
// //       </BrowserRouter>
// //     </UserProvider>
// //   )
// // }

// // export default App


// import { useEffect, useState } from 'react'
// import './App.css'
// import {
//   Route,
//   Routes,
//   BrowserRouter,
//   Navigate,
// } from 'react-router-dom'

// import ProtectedRoute from './components/util/ProtectedRoutes'
// import AdminServerLayout from './ServerLayout'
// import { UserProvider } from './components/util/UserContext'
// import Login from './Login'

// // Admin imports
// import AdminHome from './admin/Home'
// import AdminClientControl from './admin/ClientControl'
// import AdminCodingChallenges from './admin/CodingChallenges'
// import AdminContents from './admin/Contents'
// import AdminTestSeries from './admin/TestSeries'
// import AdminRanking from './admin/Ranking'
// import AdminViewClients from './admin/ViewClients'

// // Client imports
// import ClientHome from './clients/pages/ClientHome'
// import ClientInfiniteScroll from './clients/pages/InfiniteScroll'
// import ClientDashboard from './clients/pages/ClientDashboard'
// import ClientTestSeries from './clients/pages/ClientTestSeries'
// import ClientTests from './clients/pages/ClientTests'
// import ClientEvents from './clients/pages/ClientEvents'
// import ClientAboutUs from './clients/pages/ClientAboutUs'
// import ClientTestPage from './clients/pages/ClientTestPage'
// import ClientViewResults from './clients/pages/ClientViewResults'

// // Server imports
// import ServerHome from './server/pages/Home'
// import { getUserRole } from './utils/useAuth'

// function App() {
//   const [loggined, setLoggined] = useState(false)
//   const [checkingLogin, setCheckingLogin] = useState(true)
//   const token = localStorage.getItem("token");
//   const role = getUserRole(token)

//   useEffect(() => {
//     const user = localStorage.getItem('token')
//     if (user != null) {
//       console.log('loggedIn')
//       setLoggined(true)
//     } else {
//       setLoggined(false)
//     }
//     if(role === "ROLE_ADMIN"){
//       const root = document.getElementById("root").style.backgroundColor = "";
//     }
//     setCheckingLogin(false)
//   }, [])

//   const renderRoutes = () => {
//     switch (role) {
//       case 'ROLE_ADMIN':
//         return (
//           <Route element={<AdminServerLayout />}>
//               <Route path="/" element={<AdminHome />} />
//               <Route path="/client_control" element={<AdminClientControl />} />
//               <Route path="/events" element={<AdminCodingChallenges />} />
//               <Route path="/clients" element={<AdminViewClients />} />
//               <Route path="/content" element={<AdminContents />} />
//               <Route path="/TestSeries" element={<AdminTestSeries />} />
//               <Route path="/Ranking" element={<AdminRanking />} />
//           </Route>
//         );
  
//       case 'ROLE_CLIENT':
//         return (
//             <Route>
//               <Route path="/" element={<><ClientInfiniteScroll /><ClientHome /></>} />
//               <Route path="/dashboard" element={<ClientDashboard />} />
//               <Route path="/testSeries" element={<ClientTestSeries />} />
//               <Route path="/tests" element={<ClientTests />} />
//               <Route path="/events" element={<ClientEvents />} />
//               <Route path="/aboutus" element={<ClientAboutUs />} />
//               <Route path="/testPage" element={<ClientTestPage />} />
//               <Route path="/viewResults" element={<ClientViewResults />} />
//             </Route>
//         );
  
//       case 'ROLE_SUPERADMIN':
//         return (
//             <Route path="/" element={<ServerHome />} />
//         );
  
//       default:
//         return (
//           <>
//             <Route path="/login" element={<Login />} />
//             <Route path="*" element={<Navigate to="/login" />} />
//           </>
//         );
//     }
//   };
  

//   return (
//     <UserProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route element={<ProtectedRoute/>}>
//             {renderRoutes()}
//           </Route>
//           <Route path="/login" element={<Login />} />
//           <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//       </BrowserRouter>
//     </UserProvider>
//   );
  
// }

// export default App

import { useEffect, useState } from 'react'
import './App.css'
import {
  Route,
  Routes,
  BrowserRouter,
  Navigate,
} from 'react-router-dom'

import ProtectedRoute from './components/util/ProtectedRoutes'
import AdminServerLayout from './ServerLayout'
import { UserProvider } from './components/util/UserContext'
import Login from './Login'

// Admin imports
import AdminHome from './admin/Home'
// import AdminClientControl from './admin/ClientControl'
import AdminClientControl from './admin/UpdatedClientControl'
import AdminCodingChallenges from './admin/CodingChallenges'
import AdminContents from './admin/Contents'
import AdminTestSeries from './admin/TestSeries'
import AdminRanking from './admin/Ranking'
import AdminViewClients from './admin/ViewClients'
import AdminStudentsDashboard from './admin/StudentsDashboard'

// Client imports
import ClientHome from './clients/pages/ClientHome'
import ClientInfiniteScroll from './clients/pages/InfiniteScroll'
import ClientDashboard from './clients/pages/ClientDashboard'
import ClientTestSeries from './clients/pages/ClientTestSeries'
import ClientTests from './clients/pages/ClientTests'
import ClientEvents from './clients/pages/ClientEvents'
import ClientAboutUs from './clients/pages/ClientAboutUs'
import ClientTestPage from './clients/pages/ClientTestPage'
import ClientViewResults from './clients/pages/ClientViewResults'

// Server imports
import ServerHome from './server/pages/Home'
import { getUserCenID, getUserRole } from './utils/useAuth'
import ClientProtected from './clients/pages/ClientProtected'
import AdminProtected from './admin/AdminProtected'
import ServerProtected from './server/ServerProtected'
import FullDashboard from './clients/pages/Dashboard/FullDashboard'
import AddClientsExcel from './admin/AddClientsExcel'
import SolvePage from './clients/pages/SolvePage'

function App() {
  const [loggined, setLoggined] = useState(false)
  const [checkingLogin, setCheckingLogin] = useState(true)
  const apiUrl = import.meta.env.VITE_CLIENT_API_URL;
  const token = localStorage.getItem("token");
  const role = getUserRole(token)

  // const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  // if (isMobileDevice) {
  //   return (
  //     <div style={{ textAlign: "center", marginTop: "50px", fontSize: "1.2rem", color: "red" }}>
  //       Please use a desktop or laptop to access this site.
  //     </div>
  //   );
  // }

  document.onkeydown = e =>{
    if(e.key == "F12"){
      return false;
    }

    if(e.ctrlKey && e.key == "u"){
      return false;
    }

    // if(e.ctrlKey && e.key == "c"){
    //   return false;
    // }

    if(e.ctrlKey && e.key == "v"){
      return false;
    }

    if(e.ctrlKey && e.key == "s"){
      return false;
    }
  }

  useEffect(() => {
    const user = localStorage.getItem('token')
    if (user != null) {
      // console.log('loggedIn')
      setLoggined(true)
    } else {
      setLoggined(false)
    }
    if(role === "ROLE_ADMIN"){
      const root = document.getElementById("root").style.backgroundColor = "";
    }
    setCheckingLogin(false)
  }, [])

  useEffect(() => {
    if(token != null){
      const fetchClientData = () => {
        fetch(`${apiUrl}/api/Client/renderRefresh`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
          }
        }).catch((e)=>{
          console.log("error + ",e);
          localStorage.removeItem("token");
          location.reload();
        })
      };

      fetchClientData(); // Run immediately on mount

      const interval = setInterval(fetchClientData, 1000); // 5 minutes

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, []);

  // useEffect(() => {
  //   if (token != null) {
  //     const fetchClientData = async () => {
  //       try {
  //         const response = await fetch(`${apiUrl}/api/Client/renderRefresh`, {
  //           method: "GET",
  //           headers: {
  //             "Authorization": `Bearer ${localStorage.getItem('token')}`,
  //           }
  //         });

  //         if (!response.ok) {
  //           throw new Error(`HTTP error! Status: ${response.status}`);
  //         }

  //         const data = await response.json();
  //         console.log("Fetched client data:", data);

  //       } catch (error) {
  //         console.error("Error fetching client data:", error);
  //       }
  //     };

  //     fetchClientData(); // Run immediately on mount

  //     const interval = setInterval(fetchClientData, 5 * 60 * 1000); // 5 minutes

  //     return () => clearInterval(interval); // Cleanup on unmount
  //   }
  // }, [token, apiUrl]); // token and apiUrl should be in dependency array



  const renderRoutes = () => {
    switch (role) {
      case 'ROLE_ADMIN':
        return (
          <Route element={<AdminServerLayout />}>
              <Route path="/" element={<AdminHome />} />
              <Route path="/client_control" element={<AdminClientControl />} />
              <Route path="/events" element={<AdminCodingChallenges />} />
              <Route path="/clients" element={<AdminViewClients />} />
              <Route path="/content" element={<AdminContents />} />
              <Route path="/TestSeries" element={<AdminTestSeries />} />
              <Route path="/Ranking" element={<AdminRanking />} />
              <Route path='/studentsdashboard' element={<AdminStudentsDashboard/>}/>
              {/* <Route path="/clientExcel" element={<AddClientsExcel />} /> */}
          </Route>
        );
  
      case 'ROLE_CLIENT':
        return (
            <Route>
              <Route path="/" element={<><ClientInfiniteScroll /><ClientHome /></>} />
              <Route path="/dashboard" element={<ClientDashboard />} />
              <Route path="/testSeries" element={<ClientTestSeries />} />
              <Route path="/tests" element={<ClientTests />} />
              <Route path="/events" element={<ClientEvents />} />
              <Route path="/aboutus" element={<ClientAboutUs />} />
              <Route path="/testPage" element={<ClientTestPage />} />
              <Route path="/viewResults" element={<ClientViewResults />} />
              <Route path="/FullDashboard" element={<FullDashboard />} />
              <Route path="/solve/:id" element={<SolvePage />} />
            </Route>
        );
  
      case 'ROLE_SUPERADMIN':
        return (
            <Route path="/" element={<ServerHome />} />
        );
  
      default:
        return (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        );
    }
  };
  

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute/>}>
          <Route element={<ClientProtected/>}>
              <Route path="/" element={<><ClientInfiniteScroll /><ClientHome /></>} />
              <Route path="/dashboard" element={<ClientDashboard />} />
              <Route path="/testSeries" element={<ClientTestSeries />} />
              <Route path="/tests" element={<ClientTests />} />
              <Route path="/events" element={<ClientEvents />} />
              <Route path="/aboutus" element={<ClientAboutUs />} />
              <Route path="/testPage" element={<ClientTestPage />} />
              <Route path="/viewResults" element={<ClientViewResults />} />
              <Route path='/FullDashboard' element={<FullDashboard/>}/>
              <Route path="/solve/:id" element={<SolvePage />} />
            </Route>
            <Route element={<AdminServerLayout />}>
              <Route element={<AdminProtected/>}>
                <Route path="/admin" element={<AdminHome />} />
                <Route path="/client_control" element={<AdminClientControl />} />
                <Route path="/adminEvents" element={<AdminCodingChallenges />} />
                <Route path="/clients" element={<AdminViewClients />} />
                <Route path="/content" element={<AdminContents />} />
                <Route path="/adminTestSeries" element={<AdminTestSeries />} />
                <Route path="/Ranking" element={<AdminRanking />} />
                <Route path='/studentsdashboard' element={<AdminStudentsDashboard/>}/>
                {/* <Route path="/clientExcel" element={<AddClientsExcel />} /> */}
              </Route>
          </Route>
          <Route element={<ServerProtected/>}>
            <Route path="/serverHome" element={<ServerHome />} />
          </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
  
}

export default App