import React, { useContext, useEffect, useState } from 'react'
import "./css/ClientEvents.css"
import { UserContext } from '../../components/util/UserContext';
import { getUserCenID, getUserRole, isTokenExpired } from '../../utils/useAuth';
import { useNavigate } from 'react-router-dom';

const Events = () => {

  const {user} = useContext(UserContext)
  const apiUrl = import.meta.env.VITE_CLIENT_API_URL;
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem("token");
              
                      if (!token || isTokenExpired(token)) {
                          localStorage.removeItem("token");
                          navigate("/login");
                          return;
                      }
              
                      console.log("Token found =>", token);
          
              const cenId = getUserCenID(token);
              const role = getUserRole(token);
          fetch(`${apiUrl}/api/Client/clientByCenId/${cenId}`,{
            headers: { 
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json" }
          })
                      .then((response) => response.json())
                      .then((json) => {
                          // setUserData(json);
                          // setCurrentTestData(json);
                          // console.log("CurrentRestData=> " ,json);
                          // if(localStorage.getItem("ClientUserTempData")){
                          //     // console.log("Removed")
                          //     localStorage.removeItem("ClientUserTempData")
                          // }
                          localStorage.setItem("ClientUserTempData", JSON.stringify(json))
                          setLoading(false);
                      })
                      .catch((error) => {
                          alert("Server Issue");
                          // setLoading(false);
                      });
      }, [user])
  return (
    <div className='eventsDiv'>
            <div className='glowBlob'></div>
            <div className="boltDiv topLeft"></div>
            <div className="boltDiv topRight"></div>
            <div className="boltDiv bottomLeft"></div>
            <div className="boltDiv bottomRight"></div>
            <div className='clientBottomNavBar'>
              <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/">Home</a></div>
              <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/testseries">TestSeries</a></div>
              <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/dashboard">Dashboard</a></div>
              <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/aboutus">AboutUs</a></div>
            </div>
        <div className='glassEffectDiv'>
            {
              loading
              ?
              <div className='loadingMessage'>loading Events...</div>
              :
              <div className='clientEventsData'>
                <div className='clientEventsTopLayout'>
                      {/* <div className="clientEventsTopLeftLayout">UpComing <br /> Events</div> */}
                      <div className="clientEventsTopLeftLayout">Events</div>
                      <div className="clientEventsTopRightLayout">
                        <div className='clientSearchDiv'>
                          <input type="text" className='eventSearch' placeholder='search event'/>
                        </div>
                      </div>
                    </div>
                  <div className='clientEventsBottomLayout'>
                    <div className='clientAllTypeEventsDiv'>
                      <div>Upcoming</div>
                      <div>Ongoing</div>
                      <div>Ended</div>
                    </div>
                    <div className='clientsEventsPagesDiv'>No Events</div>
                  </div>
                </div>
            }
          </div>
    </div>
  )
}

export default Events