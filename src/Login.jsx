import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Login.css"
// import cutmLogo from '../Images/Cutm-logo.png'
import cutmLogo from './Images/Cutm-logo.png'
import { UserContext } from './components/util/UserContext'
import { getUserRole } from './utils/useAuth'
// import { UserContext } from '../../client/src/pages/utils/UserContext'

const Login = () => {
    const clientApiUrl = import.meta.env.VITE_CLIENT_API_URL;
    // const {setUser} = useContext(UserContext);
    const [loginOrSignup, setLoginOrSignup] = useState(true);
    const navigate = useNavigate();
    function onClickSignup(){
        setLoginOrSignup(false)
    }

    function onClickLogin(){
        setLoginOrSignup(true)
    }

    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(
        {
            userCenId:"",
            password:"",
            userOtp:"",
            mailId:"",
        }
    )

    const [currUser,setCurrUser] = useState([])
    const {user, setUser} = useContext(UserContext);

    // function logInForAccess(){
    //     // console.log(userData)
    //         const cenId = userData.userCenId;
    //         const password = userData.password
    //         //    http://localhost:8080/api/Client/clientLogin/{id}/{password}
    //         // fetch(`${apiUrl}/api/public/client/clientLogin/${cenId}/${password}`,{
    //         //     // method:'POST',
    //         //     // headers: {
    //         //     //     'Content-Type': 'application/json',
    //         //     // },
    //         //     // body: JSON.stringify({ cenId, password }),
    //         // })
    //         // .then(response=>response.json())
    //         // .then((json)=>{
    //         //     console.log("Login Response:", json);
    //         //     // if(json){
    //         //         // const userObj = { userCenId: userData.userCenId, password: userData.password };
    //         //         setCurrUser(json);
    //         //         setUser(json);
    //         //         localStorage.setItem("ClientUserData", JSON.stringify(json));
    //         //         console.log(json);
    //         //         // setIsAuthenticated(true);
    //         //         navigate("/home");
    //         //     // }
    //         //     // else{
    //         //     //     alert("login not found")
    //         //     // }
    //         // })
    //         // .catch(error=>{
    //         //     alert("server issue"+error)
    //         // })

    //         // fetch(`${apiUrl}/api/public/client/clientLogin/${cenId}/${password}`)
    //         // .then((response) => response.json())
    //         // .then((json) => {
    //         //     console.log("Login Response:", json); // <--- check this carefully

    //         //     setCurrUser(json);
    //         //     setUser(json); // <-- THIS sets context
    //         //     localStorage.setItem("ClientUserData", JSON.stringify(json));
    //         //     navigate("/");
    //         // })
    //         fetch(`${apiUrl}/api/public/client/clientLogin`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ id: userData.userCenId, password: userData.password })
    //         })
    //         .then(response => response.json())
    //         .then((json) => {
    //             console.log("Login Response:", json);
    //             setCurrUser(json);
    //             setUser(json);
    //             localStorage.setItem("ClientUserData", JSON.stringify(json));
    //             navigate("/");
    //         });            


    // }

    const [optDiv, setOtpDiv] = useState(false);
    const [loading, setLoading] = useState(false);

    function logInForAccess() {
        setLoading(true);
        fetch(`${clientApiUrl}/api/public/client/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cenId: userData.userCenId,
                password: userData.password,
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Invalid login");
            }
            return response.text(); // ✅ Change here
        })
        .then(token => {
            localStorage.setItem("userData", token);
            setUser({ cenId: userData.userCenId });
            // console.log("Navigating from login")
            // navigate("/");
            const localUserData = localStorage.getItem("userData");
            // console.log("Type of localUserData=> ",localUserData);
            if( localUserData === "inactive"){
                alert("Contact Admin Your Account is in pending")
            }
            if(localUserData === "OTPSent"){
                alert("OTP Sent to Mail")
                setOtpDiv(true);
            }
            if(localUserData === "Invalid"){
                alert("Invalid Credentials")
            }
            if(localUserData === "MultipleDevice"){
                alert("User is already logged in on another device.")
            }
            const role = getUserRole(localUserData);
            if( localUserData != null){
                // console.log(localStorage.getItem("token"));
                if(role==="ROLE_CLIENT"){
                    navigate("/");
                }
                else if(role === "ROLE_ADMIN"){
                    navigate("/admin");
                } else if(role==="ROLE_SUPERADMIN"){
                    navigate("/ServerHome");
                }
                else{
                    localStorage.removeItem("token")
                    navigate("/login")
                }
            }
        })
        .catch(error => {
            alert("Login failed: " + error.message);
        }).finally(()=>{
            setLoading(false);
        });
    }



    function logInForGeneratingOtpAccess() {
        setLoading(true);
        fetch(`${clientApiUrl}/api/public/client/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cenId: userData.userCenId,
                mailId: userData.mailId,
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Invalid login");
            }
            return response.text(); // ✅ Change here
        })
        .then(token => {
            localStorage.setItem("userData", token);
            setUser({ cenId: userData.userCenId });
            // console.log("Navigating from login")
            // navigate("/");
            const localUserData = localStorage.getItem("userData");
            // console.log("Type of localUserData=> ",localUserData);
            if( localUserData === "inactive"){
                alert("Contact Admin Your Account is in Pending")
            }
            if( localUserData === "inactive"){
                alert("Contact Admin Your Account is in Removed")
            }
            if(localUserData === "OTPSent"){
                alert("Otp Sent to Mail")
                setOtpDiv(true);
            }
            if(localUserData === "Invalid"){
                alert("Invalid Credentials")
            }
            if(localUserData === "MultipleDevice"){
                alert("User is already logged in on another device.")
            }
            const role = getUserRole(localUserData);
            if( localUserData != null){
                // console.log(localStorage.getItem("token"));
                if(role==="ROLE_CLIENT"){
                    navigate("/");
                }
                else if(role === "ROLE_ADMIN"){
                    navigate("/admin");
                } else if(role==="ROLE_SUPERADMIN"){
                    navigate("/ServerHome");
                }
                else{
                    localStorage.removeItem("token")
                    navigate("/login")
                }
            }
        })
        .catch(error => {
            alert("Login failed: " + error.message);
        }).finally(()=>{
            setLoading(false);
        });
    }
    
    

    function hadleUserCenIdInput(e){
        setUserData(prev=>({
            ...prev,
            userCenId: e.target.value
        }));
        // console.log(userData)
    }

    function hadleUserMailId(e){
        setUserData(prev=>({
            ...prev,
            mailId: e.target.value
        }));
    }

    // const [otp, setOtp] = useState(0);

    function hadleUserOtp(e){
        setUserData(prev=>({
            ...prev,
            userOtp: e.target.value
        }));
        // console.log(userData)
    }

    function hadleUserPassword(e){
        setUserData(prev=>({
            ...prev,
            password: e.target.value
        }))
        // console.log(userData)
    }

    useEffect(()=>{
        const localUserData = localStorage.getItem("token");
        // console.log("Type of localUserData=> ",localUserData);
        // if( localUserData != null){
        //     console.log(localStorage.getItem("ClientUserData"));
        //     navigate("/");
        // }
        const role = getUserRole(localUserData);
        if( localUserData != null){
            // console.log(localStorage.getItem("token"));
            if(role==="ROLE_CLIENT"){
                navigate("/");
            }
            else if(role === "ROLE_ADMIN"){
                navigate("/admin");
            } else if(role==="ROLE_SUPERADMIN"){
                navigate("/ServerHome");
            }
            else{
                localStorage.removeItem("token")
                navigate("/login")
            }
        }
        // if(localUserData.length === 0){
        //     navigate("/")
        // }
        // if(isAuthenticated){
        //     navigate("/");
        // }
    // }, [isAuthenticated, navigate])
        // }, [navigate])
    }, [navigate])

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    
    //     if (token && !sessionStorage.getItem("hasRedirected")) {
    //         sessionStorage.setItem("hasRedirected", "true");
    //         console.log("Redirecting to / due to token");
    //         // If your app needs a full reload:
    //         // window.location.href = "/";
            
    //         // If just navigation is fine (React routing):
    //         navigate("/");
    //     }
    // }, [navigate]);

    // const [receivedOtpData, setReceivedOtpData] = useState("")

    function VerifyOtp(){
        setLoading(true);
        setOtpDiv(false)
        fetch(`${clientApiUrl}/api/public/client/verify-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cenId: userData.userCenId,
                emailOtp: userData.userOtp,
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Invalid login");
            }
            return response.text(); // ✅ Change here
        })
        .then(token => {
            localStorage.setItem("token", token);
            setUser({ cenId: userData.userCenId });
            // console.log("Navigating from login")
            // navigate("/");
            const localUserData = localStorage.getItem("token");
            // console.log("Type of localUserData=> ",localUserData);
            if( localUserData === "expired"){
                alert("OTP Expired")
            }
            if(localUserData === "notFound"){
                alert("Invalid Client")
            }
            const role = getUserRole(localUserData);
            if( localUserData != null){
                // console.log(localStorage.getItem("token"));
                if(role==="ROLE_CLIENT"){
                    navigate("/");
                }
                else if(role === "ROLE_ADMIN"){
                    navigate("/admin");
                } else if(role==="ROLE_SUPERADMIN"){
                    navigate("/ServerHome");
                }
                else{
                    localStorage.removeItem("token")
                    navigate("/login")
                }
            }
        })
        .catch(error => {
            alert("Login failed: " + error.message);
        }).finally(()=>{
            setLoading(false);
        })
    }

    const [userSignupData, setUserSignupData] = useState({
        cenId: '',
        email: '',
        phone: '',
        password: '',
        name:'',
        mentorId:''
    });

    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserSignupData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validateForm = () => {
        const { name, cenId, email, phone, password, mentorId } = userSignupData;

        if (!name || name.trim().length < 5 || !/^[a-zA-Z\s]+$/.test(name.trim())) {
            return "Name must be at least 3 characters long and contain only letters and spaces.";
        }

        if (!cenId || !/^\d{12,}$/.test(cenId)) {
            return "CenId must be digits only and at least 12 digits long.";
        }

        // if (!email || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        //     return "Invalid email format.";
        // }

        if (!email || !/^[a-zA-Z0-9._%+-]+@(cutmap\.ac\.in|cutmac\.in)$/.test(email)) {
            return "Invalid email format. Use cutm mail only";
        }


        if (!phone || !/^\d{10}$/.test(phone)) {
            return "Phone must be exactly 10 digits and contain no special characters.";
        }

        if (!password || !/^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W]).*$/.test(password)) {
            return "Password must have at least 8 characters, one uppercase, one lowercase, one number, and one special character.";
        }

        if (!mentorId || mentorId === "") {
            return "Please select a mentor.";
        }

        return null; // No errors
    };

    const signUptoLogin = () => {
        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        setError('');
        console.log('Sending:', userSignupData);

        fetch(`${clientApiUrl}/api/public/client/clientSignUp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: userSignupData.name,
                mailId: userSignupData.email,
                password: userSignupData.password,
                cenId: parseInt(userSignupData.cenId),
                contactNo: parseInt(userSignupData.phone),
                mentorId: userSignupData.mentorId ? parseInt(userSignupData.mentorId) : null
            })
        })
        .then(response => {
            if (!response.ok) throw new Error("Signup failed");
            return response.text();
        })
        .then(data => {
            if(data === "mobileNumberAlreadyExist"){
                setError("Mobile Number Already Exist")
                // onClickLogin()
            }
            if(data === "mailIdAlreadyExist"){
                setError("Email Already Exist")
                // onClickLogin()
            }
            if(data === "cenIdAlreadyExist"){
                setError("CenId Already Exist")
                // onClickLogin()
            }
            if(data === "created"){
                setError("Signup success")
                alert("Signup success")
                setUserSignupData(
                    {
                        cenId: '',
                        email: '',
                        phone: '',
                        password: '',
                        name: '',
                        mentorId: ''
                }
                )
                setError("")
                onClickLogin()
            }
            console.log("Signup success:", data);
            // Optional: show success message or navigate
        })
        .catch(err => {
            console.error("Error:", err);
            setError("Signup request failed.");
        })
        // .finally(()=>{
        //     onClickLogin();
        // })
    };

    const [mentorLoading, setMentorLoading] = useState(true)

    const [mentors, setMentors] = useState([]);

    useEffect(() => {
        fetch(`${clientApiUrl}/api/public/client/mentors`)
        .then((response) => response.json())
        .then((data) => {
            setMentors(data);
            setMentorLoading(false)
        })
        .catch((error) => {
            console.error("Error fetching mentors:", error);
        });
    }, []);

    const [forgotpassloading, setForgotPassLoading] = useState(false);

    function forgotPassword(){
        setForgotPassLoading(true);
    }
    

  return (
    <div className='mainLoginPage'>
        <div className='loginPageLeftlayout'>
            <div className='loginPageLeftlayoutTopBut'><button className={`${loginOrSignup ? 'loginAndSignUpBut': "loginAndSignUpButFalse"}`} onClick={onClickLogin}>Login</button></div>
            <div className='loginPageLeftlayoutDownBut'><button className={`${loginOrSignup ? 'loginAndSignUpButFalse': "loginAndSignUpBut"}`} onClick={onClickSignup}>Signup</button></div>
        </div>
        <div className='loginPageRightlayout'>
            {
                loginOrSignup
                ?
                    <div className='loginFormDiv'>
                        <div className='cutmLogo'><img className='logoImgTag' src={`${cutmLogo}`} alt="" /></div>
                        <div className='loginHead'>Welcome Back 👋</div>
                        <div className='loginSubHead'>Today is a new day. You shape it. SignIn to start learning.</div>
                        <div className='loginForm'>
                            
                            {
                                loading
                                ?
                                    <div className='formLoadingLoadingDiv'>Verifying...</div>
                                :
                                    <div className='formLoadingClass'>
                                        {
                                            optDiv
                                            ?
                                                <div className='loginOtpParentDiv'>
                                                    <div className='loginOtpDiv'>
                                                        <label htmlFor="LoginOtp" className='LoginOtpLabel'>OTP</label>
                                                        <div className='flex LoginOtpInput'>
                                                            <input type="text" id='LoginOtp' className='LoginOtpInput' placeholder='Enter Otp' value={userData.userOtp} onChange={hadleUserOtp}/>
                                                        </div>
                                                            <button className='VerifyOtpButton' onClick={()=>VerifyOtp()}>verify otp</button>
                                                    </div>
                                                </div>
                                            :
                                                forgotpassloading
                                                ?
                                                <div className='loginCenIdParentDiv'>
                                                        <div className='loginCenIdDiv'>
                                                            <label htmlFor="LoginCenId" className='cenIdLabel'>CenID</label>
                                                            <input type="text" id='LoginCenId' className='cenIdInput' placeholder='Enter CenId' value={userData.userCenId} onChange={hadleUserCenIdInput}/>
                                                        </div>
                                                        <div className='loginPasswordDiv'>
                                                            <label htmlFor="LoginEmail" className='passwordLabel'>Email</label>
                                                            <input type="text" id='LoginEmail' className='passwordInput' placeholder='Enter Email' value={userData.mailId} onChange={hadleUserMailId}/>
                                                        </div>
                                                        <div className='signInButDiv'>
                                                            <button className='signInButtonInput' onClick={()=>logInForGeneratingOtpAccess()}>Generate OTP</button>
                                                        </div>
                                                    </div>
                                                :
                                                    <div className='loginCenIdParentDiv'>
                                                        <div className='loginCenIdDiv'>
                                                            <label htmlFor="LoginCenId" className='cenIdLabel'>CenID</label>
                                                            <input type="text" id='LoginCenId' className='cenIdInput' placeholder='Enter CenId' value={userData.userCenId} onChange={hadleUserCenIdInput}/>
                                                        </div>
                                                        <div className='loginPasswordDiv'>
                                                            <label htmlFor="LoginPassword" className='passwordLabel'>Password</label>
                                                            <input type="password" id='LoginPassword' className='passwordInput' placeholder='Enter Password' value={userData.password} onChange={hadleUserPassword}/>
                                                        </div>
                                                        <div className='forgotPass' onClick={()=>forgotPassword()}>
                                                            Forgot password
                                                        </div>
                                                        <div className='signInButDiv'>
                                                            <button className='signInButtonInput' onClick={()=>logInForAccess()}>SignIn</button>
                                                        </div>
                                                    </div>
                                        }
                                    </div>
                                }
                            {/* <div className='LoginOrGoogle'>
                                <div className='loginOrDiv'><hr className='hrLine'/></div>
                                <div>Or</div>
                                <div className='loginOrDiv'><hr className='hrLine'/></div>
                            </div>
                            <div className='continueWithGoogleButDiv'>
                                <input className='continueWithGoogleButton' type="button" value="Continue with Google" />
                            </div> */}
                            <div className=''>
                                Don't you have an Account <span className='forgotPass' onClick={onClickSignup}>SignUp</span>
                            </div>
                        </div>
                    </div>
                :
                    <div className='signUpFormDiv'>
                    <div className='cutmLogo'><img className='logoImgTag' src={`${cutmLogo}`} alt="" /></div>
                    <div className='signUpHead'>Welcome To CenHub 👋</div>
                    <div className='signUpSubHead'>Today is a new day. You shape it. SignUp to start learning.</div>
                    <div className='signUpHead'>Create Account</div>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <div className='signUpForm'>
                        <div className='SignUpCenIdDiv'>
                            <input type="text" className='signUpCenIdInput' placeholder='Enter Name' name="name" value={userSignupData.name} onChange={handleInputChange}/>
                        </div>
                        <div className='SignUpCenIdDiv'>
                            <input type="text" className='signUpCenIdInput' placeholder='Enter CenId' name="cenId" value={userSignupData.cenId} onChange={handleInputChange}/>
                        </div>
                        <div className='singUpEmailDiv'>
                            <input type="text" className='signupEmailInput' placeholder='Enter Email' name="email" value={userSignupData.email} onChange={handleInputChange}/>
                        </div>
                        <div className='signUpPhoneNumberDiv'>
                            <input type="text" className='signupPhoneInput' placeholder='Enter Phone' name="phone" value={userSignupData.phone} onChange={handleInputChange}/>
                        </div>
                        <div className='signUpPasswordDiv'>
                            <input type="text" className='signupPasswordInput' placeholder='Enter Password' name="password" value={userSignupData.password} onChange={handleInputChange}/>
                        </div>
                        <div className='signUpPasswordDiv'>
                            {
                                mentorLoading
                                ?
                                    <div>loading...</div>
                                :
                                    <select
                                        className="custom-select"
                                        name="mentorId"
                                        value={userSignupData.mentorId || ""}
                                        onChange={handleInputChange}
                                        >
                                        <option value="">Select a mentor</option>
                                        {mentors.map((mentor) => (
                                            <option key={mentor.clientId} value={mentor.clientId}>
                                            {mentor.name} ({mentor.mailId})
                                            </option>
                                        ))}
                                    </select>


                            }
                        </div>
                        <div className='signUpButDiv'>
                            <button className='signUpButtonInput' type="button" onClick={()=>{onClickLogin, signUptoLogin()}}>SignUp</button>
                        </div>
                        <div>
                            Already have an Account{" "}
                            <span className='forgotPass' onClick={onClickLogin}>
                                Login
                            </span>
                        </div>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default Login