import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../components/util/UserContext';
import { getUserCenID, getUserRole, isTokenExpired } from '../../utils/useAuth';
import { useNavigate } from 'react-router-dom';
import "./css/AboutUs.css"

const ClientAboutUs = () => {

    const {user} = useContext(UserContext)
    const apiUrl = import.meta.env.VITE_CLIENT_API_URL;
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem("token");
              
                      if (!token || isTokenExpired(token)) {
                          localStorage.removeItem("token");
                          navigate("/login");
                          return;
                      }
              
                      console.log("Token found =>", token);
          
            //   const cenId = getUserCenID(token);
            //   const role = getUserRole(token);
            // fetch(`${apiUrl}/api/Client/clientByCenId/${cenId}`,{
            //     headers: { 
            //         "Authorization": `Bearer ${localStorage.getItem("token")}`,
            //         "Content-Type": "application/json" }
            // })
            //             .then((response) => response.json())
            //             .then((json) => {
            //                 // setUserData(json);
            //                 // setCurrentTestData(json);
            //                 // console.log("CurrentRestData=> " ,json);
            //                 // if(localStorage.getItem("ClientUserTempData")){
            //                 //     // console.log("Removed")
            //                 //     localStorage.removeItem("ClientUserTempData")
            //                 // }
            //                 localStorage.setItem("ClientUserTempData", JSON.stringify(json))
            //                 setLoading(false);
            //             })
            //             .catch((error) => {
            //                 alert("Server Issue");
            //                 // setLoading(false);
            //             });
        }, [user])
    return (
        <div className='DashboardDiv'>
                <div className='glowBlob'></div>
                <div className="boltDiv topLeft"></div>
                <div className="boltDiv topRight"></div>
                <div className="boltDiv bottomLeft"></div>
                <div className="boltDiv bottomRight"></div>
                <div className='clientBottomNavBar'>
                    <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/">Home</a></div>
                    <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/testseries">TestSeries</a></div>
                    <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/dashboard">Dashboard</a></div>
                    <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/events">Events</a></div>
                </div>
            <div className='glassEffectDiv'>
                {/* {
                    loading
                    ?
                    <div className='loadingMessage'>Loading...</div>
                    :
                    // <div className='ClientData'>
                    <div className='loadingMessage'>
                        Under Construction
                    </div>
                } */}
                <div className="about-container">
                    <h1>About Us</h1>
                    <p>
                        Welcome to our online testing platform! We are committed to providing a reliable and fair testing experience for all users.
                    </p>

                    <h2>What We Offer</h2>
                    <ul>
                        <li>Timed assessments with automatic evaluation.</li>
                        <li>Question randomization for fairness.</li>
                        <li>Instant feedback after test completion.</li>
                        <li>Secure test environment (auto-submit on reload).</li>
                    </ul>

                    <h2>Our Mission</h2>
                    <p>
                        To provide a seamless, secure, and standardized testing environment for learners of all levels, helping them assess their knowledge effectively.
                    </p>

                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions, please contact us at <a href="cenhub.ed@gmail.com">cenhub.ed@gmail.com</a>.
                    </p>
                    </div>
            </div>
        </div>
  )
}

export default ClientAboutUs;