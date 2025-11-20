import React, { useContext, useEffect, useRef, useState } from 'react'
import './css/Home.css'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'
import { UserContext } from '../../components/util/UserContext';
import { getUserCenID, getUserRole, isTokenExpired } from '../../utils/useAuth';

const ClientHome = () => {
  const apiUrl = import.meta.env.VITE_CLIENT_API_URL;
    const userLocation = useLocation();
    const {user} = useContext(UserContext);
    const [homeDivClicked, setHomeDivClicked] =  useState(false)
    const [currentTestData, setCurrentTestData] = useState([])
    const [loading, setLoading] = useState(true);
    function homeDivClick(){
        setHomeDivClicked((prev)=>!prev)
    }
    const navigate = useNavigate()
    function clientLogout(){
      const token = localStorage.getItem('token');
              fetch(`${apiUrl}/api/Client/Logout/${getUserCenID(token)}`, {
                method: "PATCH",
                headers: {
                  "Authorization": `Bearer ${token}`,
                  // body: JSON.stringify({ cenId: getUserCenID(token) })
                }
              })
      localStorage.removeItem("token");
      alert("logout successfull");
      location.reload();
    }

    const token = localStorage.getItem("token");
    const [role, setRole] = useState("");

    // useEffect(() => {
    //         // fetch(`${apiUrl}/api/Client/clientByCenId/${user.cenId}`)
    //         //     .then((response) => response.json())
    //         //     .then((json) => {
    //         //         // setUserData(json);
    //         //         setCurrentTestData(json);
    //         //         console.log("CurrentRestData=> " ,json);
    //         //         // localStorage.setItem("ClientUserTempData", JSON.stringify(json))
    //         //         setLoading(false);
    //         //     })
    //         //     .catch((error) => {
    //         //         alert("Server Issue");
    //         //         // setLoading(false);
    //         //     });
    //         const cenId = getUserCenID(token);
    //         fetch(`http://localhost:8080/api/client/clientByCenId/${cenId}`, {
    //           method: "GET",
    //           headers: { 
    //             "Authorization": `Bearer ${localStorage.getItem("token")}`,
    //             "Content-Type": "application/json" }
    //           })
    //           .then(res => res.json())
    //           .then(data => console.log(data),setLoading(false))
    //           .catch(err => console.error("Error:", err));
    //           const root = document.getElementById("root");
    //           const role = getUserRole(token);
    //           if (root && role=="ROLE_CLIENT") root.className = "clientRootClass";
    //     }, []);

  //   useEffect(() => {
  //     const token = localStorage.getItem("token");
      
  //             if (!token || isTokenExpired(token)) {
  //                 localStorage.removeItem("token");
  //                 navigate("/login");
  //                 return;
  //             }
      
  //             console.log("Token found =>", token);
  
  //     const cenId = getUserCenID(token);
  //     const role = getUserRole(token);
  
  //     // Set root class based on role
  //     const root = document.getElementById("root");
  //     if (root && role === "ROLE_CLIENT") {
  //         root.className = "clientRootClass";
  //     }
  
  //     // Fetch user data
  //     fetch(`http://localhost:8080/api/client/clientByCenId/${cenId}`, {
  //         method: "GET",
  //         headers: {
  //             "Authorization": `Bearer ${token}`,
  //             "Content-Type": "application/json"
  //         }
  //     })
  //     .then(res => res.json())
  //     .then(data => {
  //         console.log("CurrentTestData =>", data);
  //         setCurrentTestData(data);
  //         setLoading(false);
  //     })
  //     .catch(err => {
  //         console.error("Error:", err);
  //         alert("Server Issue", err);
  //         setLoading(false); // Only set false here on failure if needed
  //     });
  // }, []);

const ranEffect = useRef(false);

useEffect(() => {
  console.log("User Data => ", currentTestData)
  if (ranEffect.current) return; // Prevent second run
  ranEffect.current = true;

  const token = localStorage.getItem('token');
  if (!token || isTokenExpired(token)) {
      localStorage.removeItem("token");
      navigate("/login");
      return;
  }

  const cenId = getUserCenID(token);
  const role = getUserRole(token);
  setRole(getUserRole(token))
  const root = document.getElementById("root");
  if (root && role === "ROLE_CLIENT") {
      root.className = "clientRootClass";
  }

  // if(token.length > 1){
    fetch(`${apiUrl}/api/Client/clientByCenId/${cenId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "Content-Type": "application/json"
        }
    })
    .then(async (res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        // console.log("CurrentTestData =>", data);
        setCurrentTestData(data);
        setLoading(false);
    })
    .catch(err => {
        console.error("Error:", err);
        // alert("Server Issue: " + err.message);
        setLoading(false);
    });
  // }
}, []);

// useEffect(() => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     console.log("No token found yet, skipping fetch.");
//     return;
//   }

//   const cenId = getUserCenID(token);
//   const role = getUserRole(token);
//   const root = document.getElementById("root");
//   if (root && role === "ROLE_CLIENT") {
//       root.className = "clientRootClass";
//   }

//   fetch(`http://localhost:8080/api/client/clientByCenId/${cenId}`, {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   })
//     .then((res) => {
//       if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//       return res.json();
//     })
//     .then((data) => {
//       // use the data
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }, []);




// useEffect(() => {
//   const checkAndFetch = async () => {
//     const token = localStorage.getItem("token");

//     // 1. Check token existence and expiry
//     if (!token || isTokenExpired(token)) {
//       localStorage.removeItem("token");
//       navigate("/login");
//       return;
//     }

//     console.log("Token found =>", token);

//     // 2. Decode safely and get role/cenId
//     let cenId, role;
//     try {
//       cenId = getUserCenID(token);
//       role = getUserRole(token);
//     } catch (e) {
//       console.error("Token decode error:", e);
//       navigate("/login");
//       return;
//     }

//     // 3. Optional: Set class based on role
//     const root = document.getElementById("root");
//     if (root && role === "ROLE_CLIENT") {
//       root.className = "clientRootClass";
//     }

//     // 4. Fetch user data
//     try {
//       const response = await fetch(`http://localhost:8080/api/client/clientByCenId/${cenId}`, {
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("CurrentTestData =>", data);
//       setCurrentTestData(data);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error:", err);
//       alert("Server Issue");
//       setLoading(false);
//     }
//   };

//   checkAndFetch();
// }, [navigate]);



  const tooltipRef = useRef(null);
  const [tooltipStyle, setTooltipStyle] = useState({
    display: 'none',
    top: 0,
    left: 0,
    text: '',
  });

  const handleMouseMove = (e) => {
    setTooltipStyle({
      display: 'block',
      top: e.pageY + 10,
      left: e.pageX + 10,
      text: e.currentTarget.getAttribute('data-tooltip'),
    });
  };

  const handleMouseLeave = () => {
    setTooltipStyle((prev) => ({
      ...prev,
      display: 'none',
    }));
  };

  const [profile, setProfile] = useState(false)
  function openProfile(){
    setProfile((prev)=>!prev)
  }
  
  return (
    <div className='homeDiv'>
      <div ref={tooltipRef} id="tooltip" style={{
                                            position: 'absolute',
                                            top: tooltipStyle.top,
                                            left: tooltipStyle.left,
                                            display: tooltipStyle.display,
                                            backgroundColor:'transparent',
                                            width:'30px',
                                            height:'20px',
                                            color: 'white',
                                            fontWeight:'BOLD',
                                            padding: '5px 10px',
                                            borderRadius: '4px',
                                            pointerEvents: 'none',
                                            zIndex: 999,
                                            filter: 'drop-shadow(2px 4px 6px) black',
                                          }}>{tooltipStyle.text}</div>
        {
          loading
          ?
            (<div className="loadingMessage">Loading...</div>)
          :
            (
              <div className='homeDiv'>
                  {/* <div className='userProfile' onClick={clientLogout}>{JSON.stringify(user)}</div> */}
                  {
                    role.length>0
                    ?
                    <div className='clientPanelsDiv'>
                      {
                        role === "ROLE_SUPERADMIN"
                        ?
                            <button className='clientPanelsButton'><a 
                            data-tooltip="Server"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                             className='clientPanelsAnchor' href="/ServerHome">Server Panel</a></button>
                        :
                          <div></div>
                      }
                      {
                        role === "ROLE_SUPERADMIN" || role === "ROLE_ADMIN"
                        ?
                            <button className='clientPanelsButton'><a
                            data-tooltip="Admin"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                             className='clientPanelsAnchor' href="/admin">Admin Panel</a></button>
                        :
                          <div></div>
                      }
                    </div>
                    :
                    <div></div>
                  }
                  <div className='userProfileLogout'
                  data-tooltip="Logout"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={clientLogout}>Logout</div>
                  <div className='userProfile'
                  data-tooltip="Profile"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={()=>openProfile()}>Profile</div>
                  {
                      profile
                      ?
                      <div className='userProfileDataDiv'>
                        {/* {getUserCenID(token)} */}
                        <div className='userProfileData'>
                          CenID:&nbsp;
                          <div className='userProfileDataLightText'>{
                            currentTestData.cenId
                          }</div>
                        </div>
                        <div className='userProfileData'>
                          Name:&nbsp;
                          <div className='userProfileDataLightText'>{
                            currentTestData.name
                          }</div>
                        </div>
                        <div className='userProfileData'>
                          MailId:&nbsp;
                          <div className='userProfileDataLightText'>{
                            currentTestData.mailId
                          }</div>
                        </div>
                      </div>
                      :
                      <div></div>
                    }
                  
                  <div className={`${homeDivClicked ? 'homeNav homeEventsDivVisible': 'homeEventsDivHide'}`} 
                  data-tooltip="Events"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={(e)=>{e.stopPropagation();  navigate("/events");}}>
                  </div>
                  <div className={`${homeDivClicked ? 'homeNav homeTestSeriesVisible': 'homeTestSeriesHide'}`} 
                  data-tooltip="TestSeries"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={(e)=>{e.stopPropagation(); navigate("/testSeries");}}>
                    {/* <span className="tooltip">TestSeries</span> */}
                  </div>
                  <div className={`${homeDivClicked ? 'homeNav homeAboutUsVisible': 'homeAboutUsHide'}`} 
                  data-tooltip="AboutUS"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={(e)=>{e.stopPropagation();  navigate("/aboutus");}}>
                    {/* <span className="tooltip">About</span> */}
                  </div>
                  <div className={`${homeDivClicked ? 'homeNav homeDashboardVisible': 'homeDashboardHide'}`} 
                  data-tooltip="Dashboard"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={(e)=>{e.stopPropagation();  navigate("/dashboard");}}>
                    {/* <span className="tooltip">Dashboard</span> */}
                  </div>
                  <div className={`home ${homeDivClicked ? 'homeClicked': 'homeUnClicked'}`} onClick={homeDivClick}>
                      {/* Home */}
                      {/* <div className={`${homeDivClicked ? 'homeNav homeEventsDivVisible': 'homeEventsDivHide'}`} onClick={(e)=>{e.stopPropagation();}}>
                      </div>
                      <div className={`${homeDivClicked ? 'homeNav homeTestSeriesVisible': 'homeTestSeriesHide'}`} onClick={(e)=>{e.stopPropagation();}}>
                      </div>
                      <div className={`${homeDivClicked ? 'homeNav homeAboutUsVisible': 'homeAboutUsHide'}`} onClick={(e)=>{e.stopPropagation();}}>
                      </div>
                      <div className={`${homeDivClicked ? 'homeNav homeDashboardVisible': 'homeDashboardHide'}`} onClick={(e)=>{e.stopPropagation();}}>
                      </div> */}
                  </div>
              </div>
            )
        }
    </div>
  )
}

export default ClientHome