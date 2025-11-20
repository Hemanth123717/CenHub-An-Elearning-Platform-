import React, { useEffect, useState } from 'react'
import "./css/NavBar.css"
import { useAsyncError, useLocation } from 'react-router-dom';
import { getUserCenID, getUserRole } from '../utils/useAuth';

const NavBar = () => {
  const apiUrl = import.meta.env.VITE_CLIENT_API_URL;
  const [isVisible, setIsVisible] = useState(false);
  const userLocation = useLocation();
  const isHomePage = userLocation.pathname === "/";

  useEffect (() => {
        if(isHomePage){
          const timer = setTimeout(()=>{
            setIsVisible(true)
          }, 3000);
          return () => clearTimeout(timer)
        }
        else{
          setIsVisible(true)
        }
      }, [isHomePage]);

      function adminLogout(){
        const token = localStorage.getItem('token');
                      fetch(`${apiUrl}/api/Client/Logout/${getUserCenID(token)}`, {
                        method: "PATCH",
                        headers: {
                          "Authorization": `Bearer ${token}`,
                          // body: JSON.stringify({ cenId: getUserCenID(token) })
                        }
                      })
        localStorage.removeItem("token");
        location.reload();
        alert("logout successfull");
      }

      const [role,setRole] = useState("");
      const token = localStorage.getItem("token");

      useEffect(()=>{
        if(location.pathname === "/admin"){
          document.getElementById('home').className = "homeIfSelected";
        }
        else if(location.pathname === "/Ranking"){
          document.getElementById('ranking').className = "rankingIfSelected";
        }
        else if(location.pathname === "/client_control"){
          document.getElementById('clientControl').className = "restnavBarIfSelected";
        }
        else if(location.pathname === "/clients"){
          document.getElementById('clients').className = "restnavBarIfSelected";
        }
        else if(location.pathname === "/content"){
          document.getElementById('content').className = "restnavBarIfSelected";
        }
        else if(location.pathname === "/adminEvents"){
          document.getElementById('codingChallanges').className = "restnavBarIfSelected";
        }
        else if(location.pathname === "/adminTestSeries"){
          document.getElementById('testSeries').className = "restnavBarIfSelected";
        }
        setRole(getUserRole(token));
      },[location])
  
  return (
    <div className={`navBar ${isHomePage ? (isVisible ? "visible" : "hidden") : "visible"}`}>
        <nav>
            <ul>
                <li id='home'><a id='home' href="/admin">Home</a></li>
                <li id='clientControl'><a href="/client_control">Control</a></li>
                <li id='clients'><a href="/clients">Student List</a></li>
                <li id='content'><a href="/content">Content</a></li>
                <li id='codingChallanges'><a href="/adminEvents">Events</a></li>
                <li id='testSeries'><a href="/adminTestSeries">Test Series</a></li>
                <li id='testSeries'><a href="/studentsdashboard">Dashboard</a></li>
                {/* <li id='ExcelEvents'><a href="/clientExcel">Excel</a></li> */}
                <li id='ranking'><a href="/Ranking">Ranking</a></li>
            </ul>
        </nav>
        {
          role.length>0
          ?
          <div className='adminPanelsDiv'>
            {
              role === "ROLE_SUPERADMIN"
              ?
                  <button className='adminPanelsButton'><a className='adminPanelsAnchor' href="/ServerHome">Server Panel</a></button>
              :
                <div></div>
            }
            <button className='adminPanelsButton'><a className='adminPanelsAnchor' href="/">Client Panel</a></button>
          </div>
          :
          <div></div>
        }
        <div className='navBut'>
            <button onClick={adminLogout}>Logout</button>
        </div>
    </div>
  )
}

export default NavBar