import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "./css/Tests.css"
import { UserContext } from '../../components/util/UserContext';
import { getUserCenID, getUserRole, isTokenExpired } from '../../utils/useAuth';
import TestInstructions from './TestInstructions';

const ClientTests = () => {
    const apiUrl = import.meta.env.VITE_CLIENT_API_URL;
    const userLocation = useLocation();
    const userNavigate = useNavigate();
    const { subId , testType} = userLocation.state || {};
    const subName = localStorage.getItem("TestSubjectName");
    // const {user, setUser} = useContext(UserContext);
    // const user = localStorage.getItem("ClientUserData")
    const [currentTestData, setCurrentTestData] = useState([])
    const [currentTestQuestionsCount, setCurrentTestQuestionsCount] = useState([])
    const {user} = useContext(UserContext);

    const urlSubjectQuestions = `${subName}McqTestQuestions`;
    const urlSubjectAnswers = `${subName}McqTestResult`;

    // useEffect(()=>{
    //     fetch(`http://localhost:8080/api/Client/clientByCenId/${user.userCenId}`)
    //         .then((response)=>response.json())
    //         .then((json)=>{
    //             setCurrentTestData(json)
    //             console.log(currentTestData);
    //             console.log(typeof(currentTestData));
    //             const count = Object.keys(currentTestData?.testQuestionsData?.testQuestions || {}).length;
    //             setCurrentTestQuestionsCount(count)
    //             console.log("count => "+count)
    //         }).catch((error)=>(
    //             alert("Server Issue")
    //         ))
    //         if(currentTestData.length <= 0){
    //             console.log("Data Doesn't exist")
    //         }
    //         else{
    //             console.log("Data exist")
    //         }
    // }, [])

    const [loading, setLoading] = useState(true);
    // const [userData, setUserData] = useState(null);
    const [attemptedTests, setAttemptedTests] = useState([]);
    const [attempted, setAttempted] = useState(0)
    const [notAttempted, setNotAttempted] = useState(0);

    // useEffect(() => {
    //     setLoading(true)
    //     fetch(`${apiUrl}/api/Client/clientByCenId/${user.userCenId}`)
    //         .then((response) => response.json())
    //         .then((json) => {
    //             // setUserData(json);
    //             setCurrentTestData(json);
    //             // console.log("CurrentRestData=> " ,json);
    //             console.log("CurrentRestData=> " ,json);
    //             // const count = Object.keys(json[urlSubject] || {}).length;
    //             const count = Object.keys(json[urlSubject]).length;
    //             setCurrentTestQuestionsCount(count);
    //             // console.log("Current[0] => ",json.testQuestionsData.testResults[1]);
    //             localStorage.setItem("ClientUserTempData", JSON.stringify(json))
    //             const attemptedTests = [];
    //             let testAttempted = 0;
    //             let testNotAttempted = 0;
    //                 Array.from({length: count}, (_,index)=>{
    //                     const testResults = json[urlSubject]?.[index+1];
    //                     console.log(`Index at ${index+1} `+json[urlSubject]?.[index+1])
    //                 if(testResults[index+1].length === 0 ){
    //                     attemptedTests.push(false)
    //                     testNotAttempted+=1;
    //                 }
    //                 else{
    //                     testAttempted+=1;
    //                     attemptedTests.push(true)
    //                 }
    //                     })
    //                 setNotAttempted(testNotAttempted);
    //                 setAttempted(testAttempted);
    //                 setAttemptedTests(attemptedTests);
    //                 setLoading(false);
    //         })
    //         .catch((error) => {
    //             alert("Server Issue"+error);
    //             // setLoading(false);
    //         });
    // }, []);


    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem("token");
              
                      if (!token || isTokenExpired(token)) {
                          localStorage.removeItem("token");
                          userNavigate("/login");
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
                setCurrentTestData(json);
    
                const count = Object.keys(json[urlSubjectQuestions] || {}).length;
                setCurrentTestQuestionsCount(count);
    
                const attemptedTests = [];
                let testAttempted = 0;
                let testNotAttempted = 0;
    
                Array.from({ length: count }, (_, index) => {
                    const testResults = json[urlSubjectAnswers]?.[index + 1];
                    // console.log("TESTRESULT ", testResults)
                    if (!testResults || testResults.length === 0) {
                        attemptedTests.push(false);
                        testNotAttempted += 1;
                    } else {
                        attemptedTests.push(true);
                        testAttempted += 1;
                    }
                });
    
                setAttempted(testAttempted);
                setNotAttempted(testNotAttempted);
                setAttemptedTests(attemptedTests);
    
                localStorage.setItem("ClientUserTempData", JSON.stringify(json));
                setLoading(false);
            })
            .catch((error) => {
                alert("Server Issue: " + error);
                console.log(" while fetching user data Server Issue: " + error + " "+ cenId);
                setLoading(false);
            });
    }, []);
    

    
    function takeTestPage(subId, subName, testType, testId){
        // console.log("CurrentRestData=> " ,currentTestData);
        // console.log("Current[0] => ",currentTestData.testQuestionsData.testResults[1]);
        
        const questions = currentTestData[urlSubjectQuestions]?.[testId]
        // console.log(`TestQuestions for Test ${testId} ` + questions)
        // console.log(questions[1])
        // console.log(typeof(questions))
        localStorage.setItem("currentTestId", testId)
        userNavigate("/testPage", {state:{questions, testId, subName, testType}})
        // console.log(subId, subName, testId)
        // if(user === null){
        //     localStorage.removeItem("ClientUserData")
        //     location.reload();
        // }
        // else{
        //     fetch(`http://localhost:8080/api/Client/clientByCenId/${user.userCenId}`)
        //     .then((response)=>response.json())
        //     .then((json)=>{
        //         setCurrentTestData(JSON.stringify(json))
        //     })
        //     console.log(currentTestData);
        //     // console.log(user.userCenId)
        // }
        // console.log(Object.keys(currentTestData.testQuestionsData.testQuestions).length)
    }

    // function displayAttempted(){
    //     Array.from({length:attemptedTests.length}, (_,index)=>{
    //         console.log(attemptedTests[index]);
    //     })
    // }

    useEffect(()=>{
        if(userLocation.pathname == "/tests"){
            localStorage.removeItem("currentTestId")
        }
    },[])

    // const subjectName = "aptitude";


    // useEffect(()=>{
    //     fetch(`${apiUrl}/api/Client/clientByCenId/${user.userCenId}`)
    //                 .then((response) => response.json())
    //                 .then((json) => {
    //                     // setUserData(json);
    //                     setCurrentTestData(json);
    //                     // console.log("CurrentRestData=> " ,json);
    //                     console.log("CurrentRestData=> " , json[urlSubject][1]);
    //                     localStorage.setItem("ClientUserTempData", JSON.stringify(json))
    //                     setLoading(false);
    //                 })
    //                 .catch((error) => {
    //                     alert("Server Issue");
    //                     // setLoading(false);
    //                 });
    // }, [])

    function onClickViewResults(subName, testId){
        console.log("CurrentTestUserId => ",currentTestData)
        const questions = currentTestData[urlSubjectQuestions][testId]
        userNavigate(".", { replace: true, state: null })
        // alert("Test Already Completed");
        localStorage.setItem("currentTestId", testId)
        // localStorage.setItem("ClientUserTempData", JSON.stringify(currentTestData))
        // location.reload();
        userNavigate("/viewResults", {state:{questions}})
        // userNavigate("/viewResults");
    }

    const subjectDisplayNames = {
        java: "Java",
        python: "Python",
        cprogramming: "C Programming",
        cppprogramming: "C++",
        verbal: "Verbal",
        webdevelopment: "Web Development",
        dbms: "DBMS",
        aptitude: "Aptitude"
      };

  return (
    <div className='TestSeriesDiv'>
            <div className='glowBlob'></div>
            <div className="boltDiv topLeft"></div>
            <div className="boltDiv topRight"></div>
            <div className="boltDiv bottomLeft"></div>
            <div className="boltDiv bottomRight"></div>
            <div className='clientBottomNavBar'>
              <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/">Home</a></div>
              <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/events">Events</a></div>
              <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/dashboard">Dashboard</a></div>
              <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/aboutus">AboutUs</a></div>
            </div>
        <div className='glassEffectDiv'>
            <div className='testSeriesData'>
                <div className='testSeriesTopLayout'>
                                <div className='returnToTestSeries' onClick={()=>userNavigate("/testSeries")}>⬅ Back</div>
                                <div>{subjectDisplayNames[subName] || subName}</div>
                                <div>Attepted {attempted} out {currentTestQuestionsCount}</div>
                            </div>
                {
                    loading
                    ?
                    <div className="loadingMessage">Loading tests...</div>
                    :
                    <div className='testsTestSeriesData'>
                            {/* <div className='testSeriesTopLayout'>
                                <div className='returnToTestSeries' onClick={()=>userNavigate("/testSeries")}>&#60; Back</div>
                                <div>{subjectDisplayNames[subName] || subName}</div>
                                <div>Attepted {attempted} out {currentTestQuestionsCount}</div>
                            </div> */}
                            <div className='testSeriesBottomLayout'>
                                    {/* {console.log(currentTestQuestionsCount)}
                                    {
                                        Array.from({length: currentTestQuestionsCount}, (_,index)=>(
                                            <div key={index} className='testsBottomLayoutTests'>
                                                <div className='testsTakeTestId'>TestId {index}</div>
                                                <div className='testsTakeTest' onClick={()=>takeTestPage(subId, subName, 1)}>TakeTest</div>
                                            </div>
                                        ))
                                    } */}
                                    {
                                        loading
                                        ?
                                            <div></div>
                                        :
                                            <TestInstructions/>
                                    }
                                    {
                                        loading ? (
                                            <div className="loadingMessage">Loading tests...</div>
                                        ) : (
                                            Array.from({ length: currentTestQuestionsCount }, (_, index) => {
                                                // let alreadyComplted = "";
                                                const alreadyCompleted = JSON.stringify(attemptedTests[index]) === "true";
                                                return(
                                                    <div key={index} className={`${alreadyCompleted ? 'testsBottomLayoutTestsAttempted' : 'testsBottomLayoutTestsNotAttempted'}`}>
                                                        <div className='testsTakeTestId'>{subjectDisplayNames[subName] || subName} {index+1}</div>
                                                        {/* <div>{JSON.stringify(attemptedTests[index])}</div> */}
                                                        {
                                                            alreadyCompleted
                                                            ?
                                                            <div className='testsTakeTestCompleted' onClick={()=>onClickViewResults( subName, index+1)}>ViewResults</div>
                                                            :
                                                            <div className='testsTakeTest' onClick={() => takeTestPage(subId, subName, testType, index+1)}>TakeTest</div>
                                                            // <div className='testsTakeTest' onClick={()=>showInstructions()}>
                                                            //     TakeTest
                                                            // </div>
                                                        }
                                                    </div>
                                                )
                                            })
                                        )
                                    }
                                {/* <div className='testsBottomLayoutTests'>
                                    <div className='testsTakeTestId'>TestId</div>
                                    <div className='testsTakeTest' onClick={()=>takeTestPage(subId, subName, 1)}>TakeTest</div>
                                </div> */}
                            </div>
                        </div>
                }
                {/* <div><button onClick={displayAttempted}>Attempted</button></div> */}
            </div>
        </div>
    </div>
  )
}


export default ClientTests;