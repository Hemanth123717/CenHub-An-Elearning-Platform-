import React, { useContext, useEffect, useState } from 'react'
import "./css/Dashboard.css"
import OverAllDashboardChart from './OverAllDashboardChart'
import AttemptedDashboardPie from './attemptedDashboardPie'
// import AttemptedDashboardChart from './DashboardChart'
import AllPlots from "./AllPlots"
import { UserContext } from '../../components/util/UserContext'
import { getUserCenID, getUserRole, isTokenExpired } from '../../utils/useAuth'
import { useNavigate } from 'react-router-dom'
import FullDashboard from './Dashboard/FullDashboard'

const ClientDashboard = () => {

    const {user} = useContext(UserContext)
    const apiUrl = import.meta.env.VITE_CLIENT_API_URL;
    // Data config
        const [overallGraphData, setOverallGraphData] = useState({})
        const [attemptedGraphData, setAttemptedGraphData] = useState({})
    
        // Custom plugin for center text
        const [graphCenterTextPlugin, setGraphCenterTestPlugin] = useState({});
        const [attemptedGraphCenterTextPlugin, setAttemptedGraphCenterTestPlugin] = useState({});
        const [currentTestQuestionsCount, setCurrentTestQuestionsCount] = useState([])
    
        // Chart options
        const [graphOptions, setGraphOptions] = useState({});
        const [attemptedGraphOptions, setAttemptedGraphOptions] = useState({});

        const [loading, setLoading] = useState(true);

        const [top20, setTop20] = useState([]);
        const token = localStorage.getItem("token");
        const navigate = useNavigate();

        useEffect(() => {
                  
            if (!token || isTokenExpired(token)) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }
    
            // console.log("Token found =>", token);
              
            fetch(`${apiUrl}/api/Client/Top20ActiveClients`,{
                headers: { 
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json" }
            })
              .then((res) => res.json())
              .then((data) => {
                if (Array.isArray(data)) {
                  setTop20(data);
                } else {
                  setTop20([]); // If data is not an array, treat as empty
                }
              })
              .catch((err) => {
                console.error("Error fetching leaderboard:", err);
                // setError(true);
              });
          }, []);

        const [subsLoading, SetSubsLoading] = useState(true);

        const [subjectsList, setSubjectsList] = useState([])

        useEffect(()=>{
            SetSubsLoading(true);
            fetch(`${apiUrl}/api/SubjectsList/getAllSubjects`,{
                headers: { 
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json" }
            })
            .then((response)=>(response.json()))
            .then((json)=>{
                setSubjectsList(json);
                SetSubsLoading(false);
            })
        }, [])


        const [userData, setuserData] = useState([]);
        const [selectedSubTotalMarks, setSelectedSubTotalMarks] = useState();
        const [totalMarks, setTotalMarks] = useState(0);
        const [obtainedMarks, setObtainedMarks] = useState(0);
        const [subjectsData, setSubjectsData] = useState([])

        const [userMarksData,setuserMarksData] = useState();
        const [overAllmarksLoading,setoverAllmarksLoading] = useState(false);
        

        useEffect(()=>{
            const cenId = getUserCenID(token)
            // setLoading(true)
            setoverAllmarksLoading(true)
            fetch(`${apiUrl}/api/Client/clientByCenId/${cenId}`,{
                headers: { 
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json" }
            })
                        .then((response) => response.json())
                        .then((json) => {
                            // setUserData(json);
                            setuserMarksData(json);
                            console.log("CurrentRestData=> " ,json);
                            setoverAllmarksLoading(false)
                            // setLoading(false)
                        })
        },[])

        const [prevTestsloading, setprevTestsLoading] = useState(true);
        const [attemptedTests, setAttemptedTests] = useState([]);
        const [attempted, setAttempted] = useState(0)
        const [notAttempted, setNotAttempted] = useState(0);
        const [subName, setSubName] = useState(null);
        const [currentTestData, setCurrentTestData] = useState([])
        const [graphsLoading,setGraphsLoading] = useState(false)

        // function changeDashboard(subjectName){
        //     // document.getElementById("dashboardSubs").classList.add("dashboardSubsSelected")
        //     if(subjectName==="select"){
        //         setprevTestsLoading(true)
        //         setSubName(null)
        //         setLoading(true)
        //         // setprevTestsLoading(true)
        //         return;
        //     }
        //     setLoading(false)
        //     setGraphsLoading(true)
        //     const urlSubjectQuestions = `${subjectName}McqTestQuestions`;
        //     const urlSubjectAnswers = `${subjectName}McqTestResult`;
        //     const cenId = getUserCenID(token);
        //     const role = getUserRole(token);
        //     fetch(`${apiUrl}/api/Client/clientByCenId/${cenId}`,{
        //         headers: { 
        //             "Authorization": `Bearer ${localStorage.getItem("token")}`,
        //             "Content-Type": "application/json" }
        //     })
        //                 .then((response) => response.json())
        //                 .then((json) => {
        //                     setCurrentTestData(json);
        //                     setSubName(subjectName)
    
        //                     const count = Object.keys(json[urlSubjectQuestions] || {}).length;
        //                     setCurrentTestQuestionsCount(count);
                
        //                     const attemptedTests = [];
        //                     let testAttempted = 0;
        //                     let testNotAttempted = 0;
                
        //                     Array.from({ length: count }, (_, index) => {
        //                         const testResults = json[urlSubjectAnswers]?.[index + 1];
        //                         // console.log("TESTRESULT ", testResults)
        //                         if (!testResults || testResults.length === 0) {
        //                             attemptedTests.push(false);
        //                             testNotAttempted += 1;
        //                         } else {
        //                             attemptedTests.push(true);
        //                             testAttempted += 1;
        //                         }
        //                     });
                
        //                     setAttempted(testAttempted);
        //                     setNotAttempted(testNotAttempted);
        //                     setAttemptedTests(attemptedTests);
                
        //                     localStorage.setItem("ClientUserTempData", JSON.stringify(json));
        //                     setprevTestsLoading(false);
        //                     setuserData(json);
        //                     console.log("CurrentRestData=> " ,json);
                            
        //                     setTotalMarks(Object.keys(json[`${subjectName}McqTestResult`]).length*15);
        //                     console.log("Result=> ", json[`${subjectName}McqTestResult`][1])
        //                     // console.log("Size=> ", Object.keys(json[`${subjectName}McqTestResult`]).length)
        //                     let obtainedMarks=0;
        //                     let attempted=0;
        //                     for (let index = 1; index < Object.keys(json[`${subjectName}McqTestResult`]).length; index++) {
        //                         // console.log(`index ${index} length =>`,json[`${subjectName}McqTestResult`][index].length>0)
        //                         // console.log(`obtainedMarks => `, json[`${subjectName}McqTestResult`][index][json[`${subjectName}McqTestResult`][index].length])
        //                         if(json[`${subjectName}McqTestResult`][index].length>0){
        //                             attempted+=1;
        //                             obtainedMarks+=parseInt(json[`${subjectName}McqTestResult`][index][json[`${subjectName}McqTestResult`][index].length-1]);
        //                             console.log("Obtained Marks =>",obtainedMarks)
        //                             console.log("attempted Tests =>",attempted)
        //                         }
        //                         // console.log(`${index} marks => `,json[`${subjectName}McqTestResult`][index][json[`${subjectName}McqTestResult`][index].length-1])
        //                         // const element = array[index];
                                
        //                     }
        //                     const scored = parseInt(obtainedMarks);
        //                     const total = Object.keys(json[`${subjectName}McqTestResult`]).length*15;
        //                     setOverallGraphData({
        //                         labels: ['Scored', 'NotScored'],
        //                         datasets: [
        //                             {
        //                             data: [scored, total - scored],
        //                             backgroundColor: ['#4caf50', '#e0e0e0'],
        //                             borderWidth: 0,
        //                             },
        //                         ],
        //                         })
        //                         setGraphCenterTestPlugin({
        //                             id: 'centerText',
        //                             beforeDraw: (chart) => {
        //                                 const { width } = chart
        //                                 const { height } = chart
        //                                 const { ctx } = chart
                                
        //                                 ctx.restore()
        //                                 const fontSize = (height / 200).toFixed(2)
        //                                 ctx.font = `${fontSize}em sans-serif`
        //                                 ctx.textBaseline = 'middle'
                                
        //                                 // const text = `${scored} / ${total}`
        //                                 const text = `Total Scored`
        //                                 const textX = Math.round((width - ctx.measureText(text).width) / 2)
        //                                 const textY = height / 2
                                
        //                                 ctx.fillStyle = '#ffffff'
        //                                 ctx.fillText(text, textX, textY)
        //                                 ctx.save()
        //                             },
        //                             })

        //                         console.log("Attempted=> ", attempted)
        //                         const attemptedScored = parseInt(attempted);
        //                         const attemptedTotal = 30;
        //                         console.log("Attempted=> ", attemptedScored)
        //                         console.log("AttemptedTotal=> ", attemptedTotal)
        //                         setAttemptedGraphData({
        //                             labels: ['Attempted', 'NotAttempted'],
        //                             datasets: [
        //                                 {
        //                                 data: [attemptedScored, attemptedTotal - attemptedScored],
        //                                 backgroundColor: ['#4caf50', '#e0e0e0'],
        //                                 borderWidth: 0,
        //                                 },
        //                             ],
        //                             })
        //                             setAttemptedGraphCenterTestPlugin({
        //                                 id: 'attemptedCenterText',
        //                                 beforeDraw: (chart) => {
        //                                     const { width } = chart
        //                                     const { height } = chart
        //                                     const { ctx } = chart
                                    
        //                                     ctx.restore()
        //                                     const fontSize = (height / 200).toFixed(2)
        //                                     ctx.font = `${fontSize}em sas-serif`
        //                                     ctx.textBaseline = 'middle'
                                    
        //                                     // const text = `${attemptedScored} / ${attemptedTotal}`
        //                                     const text = `Attempted Tests`
        //                                     const textX = Math.round((width - ctx.measureText(text).width) / 2)
        //                                     const textY = height / 2
                                    
        //                                     ctx.fillStyle = '#ffffff'
        //                                     ctx.fillText(text, textX, textY)
        //                                     ctx.save()
        //                                 },
        //                                 })
        //                         setGraphOptions({
        //                             cutout: '60%',
        //                             plugins: {
        //                                 legend: { display: false },
        //                                 tooltip: { enabled: true },
        //                             },
        //                             responsive: true,
        //                             maintainAspectRatio: false,
        //                             })
        //                             setAttemptedGraphOptions({
        //                                 cutout: '60%',
        //                                 plugins: {
        //                                     legend: { display: false },
        //                                     tooltip: { enabled: true },
        //                                 },
        //                                 responsive: true,
        //                                 maintainAspectRatio: false,
        //                                 })
        //                     setGraphsLoading(false)
        //                 })
        //                 .catch((error) => {
        //                     alert("Server Issue whith dashboard"+error);
        //                     // setLoading(false);
        //                 });
                
        // }

        function changeDashboard(subjectName){
            // document.getElementById("dashboardSubs").classList.add("dashboardSubsSelected")
            if(subjectName==="select"){
                setprevTestsLoading(true)
                setSubName(null)
                setLoading(true)
                // setprevTestsLoading(true)
                return;
            }
            setLoading(false)
            setGraphsLoading(true)
            const urlSubjectQuestions = `${subjectName}McqTestQuestions`;
            const urlSubjectAnswers = `${subjectName}McqTestResult`;
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
                            setSubName(subjectName)
    
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
                            setprevTestsLoading(false);
                            setuserData(json);
                            console.log("CurrentRestData=> " ,json);
                            
                            setTotalMarks(Object.keys(json[`${subjectName}McqTestResult`]).length*15);
                            console.log("Result=> ", json[`${subjectName}McqTestResult`][30])
                            // console.log("Size=> ", Object.keys(json[`${subjectName}McqTestResult`]).length)
                            let obtainedMarks=0;
                            let attempted=0;
                            // for (let index = 1; index <= Object.keys(json[`${subjectName}McqTestResult`]).length; index++) {
                            //     // console.log("Result=> ", json[`${subjectName}McqTestResult`][index])
                            //     // console.log(`index ${index} length =>`,json[`${subjectName}McqTestResult`][index].length>0)
                            //     // console.log(`obtainedMarks => `, json[`${subjectName}McqTestResult`][index][json[`${subjectName}McqTestResult`][index].length])
                            //     if(json[`${subjectName}McqTestResult`][index].length>0){
                            //         attempted+=1;
                            //         obtainedMarks+=parseInt(json[`${subjectName}McqTestResult`][index][json[`${subjectName}McqTestResult`][index].length-2]);
                            //         console.log("Obtained Marks =>",obtainedMarks)
                            //         console.log("attempted Tests =>",attempted)
                            //     }
                            //     // console.log(index)
                            //     // console.log(`${index} marks => `,json[`${subjectName}McqTestResult`][index][json[`${subjectName}McqTestResult`][index].length-1])
                            //     // const element = array[index];
                                
                            // }
                            for (let index = 1; index <= Object.keys(json[`${subjectName}McqTestResult`]).length; index++) {
                            // console.log("Result=> ", json[`${subjectName}McqTestResult`][index])
                            // console.log(`index ${index} length =>`,json[`${subjectName}McqTestResult`][index].length>0)
                            // console.log(`obtainedMarks => `, json[`${subjectName}McqTestResult`][index][json[`${subjectName}McqTestResult`][index].length])

                            if (json[`${subjectName}McqTestResult`][index].length > 0) {
                                attempted += 1;
                                obtainedMarks += parseInt(json[`${subjectName}McqTestResult`][index][json[`${subjectName}McqTestResult`][index].length - 4]);

                                const status = json[`${subjectName}McqTestResult`][index][json[`${subjectName}McqTestResult`][index].length - 3];
                                const date = json[`${subjectName}McqTestResult`][index][json[`${subjectName}McqTestResult`][index].length - 2];
                                const time = json[`${subjectName}McqTestResult`][index][json[`${subjectName}McqTestResult`][index].length - 1];

                                console.log("Obtained Marks =>", obtainedMarks);
                                console.log("Attempted Tests =>", attempted);
                                console.log("Status =>", status);
                                console.log("Date =>", date);
                                console.log("Time =>", time);
                            }

                            // console.log(index)
                            // console.log(`${index} marks => `,json[`${subjectName}McqTestResult`][index][json[`${subjectName}McqTestResult`][index].length-1])
                            // const element = array[index];
                        }

                            const scored = parseInt(obtainedMarks);
                            const total = Object.keys(json[`${subjectName}McqTestResult`]).length*15;
                            setOverallGraphData({
                                labels: ['Scored', 'NotScored'],
                                datasets: [
                                    {
                                    data: [scored, total - scored],
                                    backgroundColor: ['#4caf50', '#e0e0e0'],
                                    borderWidth: 0,
                                    },
                                ],
                                })
                                setGraphCenterTestPlugin({
                                    id: 'centerText',
                                    beforeDraw: (chart) => {
                                        const { width } = chart
                                        const { height } = chart
                                        const { ctx } = chart
                                
                                        ctx.restore()
                                        const fontSize = (height / 200).toFixed(2)
                                        ctx.font = `${fontSize}em sans-serif`
                                        ctx.textBaseline = 'middle'
                                
                                        // const text = `${scored} / ${total}`
                                        const text = `Total Scored`
                                        const textX = Math.round((width - ctx.measureText(text).width) / 2)
                                        const textY = height / 2
                                
                                        ctx.fillStyle = '#ffffff'
                                        ctx.fillText(text, textX, textY)
                                        ctx.save()
                                    },
                                    })

                                console.log("Attempted=> ", attempted)
                                const attemptedScored = parseInt(attempted);
                                const attemptedTotal = 30;
                                console.log("Attempted=> ", attemptedScored)
                                console.log("AttemptedTotal=> ", attemptedTotal)
                                setAttemptedGraphData({
                                    labels: ['Attempted', 'NotAttempted'],
                                    datasets: [
                                        {
                                        data: [attemptedScored, attemptedTotal - attemptedScored],
                                        backgroundColor: ['#4caf50', '#e0e0e0'],
                                        borderWidth: 0,
                                        },
                                    ],
                                    })
                                    setAttemptedGraphCenterTestPlugin({
                                        id: 'attemptedCenterText',
                                        beforeDraw: (chart) => {
                                            const { width } = chart
                                            const { height } = chart
                                            const { ctx } = chart
                                    
                                            ctx.restore()
                                            const fontSize = (height / 200).toFixed(2)
                                            ctx.font = `${fontSize}em sas-serif`
                                            ctx.textBaseline = 'middle'
                                    
                                            // const text = `${attemptedScored} / ${attemptedTotal}`
                                            const text = `Attempted Tests`
                                            const textX = Math.round((width - ctx.measureText(text).width) / 2)
                                            const textY = height / 2
                                    
                                            ctx.fillStyle = '#ffffff'
                                            ctx.fillText(text, textX, textY)
                                            ctx.save()
                                        },
                                        })
                                setGraphOptions({
                                    cutout: '60%',
                                    plugins: {
                                        legend: { display: false },
                                        tooltip: { enabled: true },
                                    },
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    })
                                    setAttemptedGraphOptions({
                                        cutout: '60%',
                                        plugins: {
                                            legend: { display: false },
                                            tooltip: { enabled: true },
                                        },
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        })
                            setGraphsLoading(false)
                        })
                        .catch((error) => {
                            alert("Server Issue whith dashboard"+error);
                            // setLoading(false);
                        });
                
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
    <div className='DashboardDiv'>
            <div className='glowBlob'></div>
            <div className="boltDiv topLeft"></div>
            <div className="boltDiv topRight"></div>
            <div className="boltDiv bottomLeft"></div>
            <div className="boltDiv bottomRight"></div>
            <div className='clientBottomNavBar'>
                <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/">Home</a></div>
                <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/events">Events</a></div>
                <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/testseries">TestSeries</a></div>
                <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/aboutus">AboutUs</a></div>
            </div>
        <div className='glassEffectDiv'>
            <div className='DashboardData'>
                <div className='topLayout'>
                    <div className="topTopLayout">
                        <div className="topTopLeftLayout">
                            <div className='graphLayout'>
                                <div className='subjectsDashboardInfoDiv'>
                                    {
                                        subsLoading
                                        ?
                                            <div>Subjects Loading....</div>
                                        :
                                            <select className='dashboardSelectSubject' name="" id="dashboardSubs" onChange={(e) => changeDashboard(e.target.value)}>
                                                {/* <option value="select" defaultChecked><div className='subOption'>Select Subject</div></option> */}
                                                <option value="select" defaultChecked className='subOption'>All Subjects</option>
                                                {
                                                    subjectsList.map((subject)=>(
                                                        <option value={subject.name} key={subject.id}>{subjectDisplayNames[subject.name] || subject.name}</option>
                                                    ))
                                                }
                                            </select>
                                    }
                                    {
                                        subName === null
                                        ?
                                            <div>All Subjects</div>
                                        :
                                            <div>subject : {subjectDisplayNames[subName] || subName}</div>

                                    }
                                </div>
                            {/* {loading ? <div className='dashboardLoadingMessage'>Select Subject</div> : ( */}
                                {loading ? <div className='fullDashboard'>
                                    {
                                        userMarksData != null
                                        ?
                                            <FullDashboard userMarksData={userMarksData}/>
                                        :
                                            <div className='loadingDashboard'>Loading...</div>
                                    }
                                </div> : (
                                    <>
                                        {
                                            graphsLoading
                                            ?
                                                <div className='loadingDashboard'>Loading...</div>
                                            :
                                            <div className='dashboardPlots'>
                                                <OverAllDashboardChart
                                                    title={graphCenterTextPlugin}
                                                    data={overallGraphData}
                                                    options={graphOptions}
                                                />
                                                <AttemptedDashboardPie
                                                    title={attemptedGraphCenterTextPlugin}
                                                    data={attemptedGraphData}
                                                    options={attemptedGraphOptions}
                                                    />
                                            </div>
                                        
                                        }
                                    </>
                                )}

                            </div>
                        </div>
                        <div className="topTopRightLayout">
                            <div className='topCodersLayout'>
                            <div className='top20CodersDiv'>
                                <div className='top20CodersHead'>Top 20 coders</div>
                                {/* <div className='top20CodersBorderDiv'> */}
                                    <div className='top20Coders'>
                                        <div className='top20CodersData'>cenId</div>
                                        <div className='top20CodersData'>Name</div>
                                        <div className='top20CodersData'>TotalScore</div>
                                    </div>
                                    {
                                    top20 && top20.length > 0
                                        ?
                                        top20.map((student, index) => (
                                        <div className='top20Coders' key={index} title={`Hovering on ${student.name}`}>
                                            <div className='top20CodersData'>{student.cenId}</div>
                                            <div className='top20CodersData'>{student.name}</div>
                                            <div className='top20CodersData'>{student.totalMarks}</div>
                                        </div>
                                        ))
                                        :
                                        <div className='top20Coders'>Loading...</div>
                                    }
                                {/* </div> */}
                            </div>
                            </div>
                            <div className='yoursRank'></div>
                        </div>
                    </div>
                    <div className="topBottomLayout">
                        <div className='bottomLayoutContent'><div>No Rewards Obtained</div></div>
                        <div className='bottomLayoutContent'><div>No previous Contests</div></div>
                        <div className='bottomLayoutContent'>
                            <div className="prevTestsHeadDiv">Prev Tests</div>
                            {/* No Previous Tests */}
                            {
                                                                    prevTestsloading ? (
                                                                        <div className="">Select Subject</div>
                                                                    ) : (
                                                                        (() => {
                                                                        // collect indexes of completed tests
                                                                        const completedTestIndexes = [];
                                                                        for (let i = 0; i < currentTestQuestionsCount; i++) {
                                                                            if (attemptedTests[i] === true || attemptedTests[i] === "true") {
                                                                            completedTestIndexes.push(i);
                                                                            }
                                                                        }

                                                                        if (completedTestIndexes.length === 0) {
                                                                            return <div>No completed tests</div>;
                                                                        }

                                                                        return (
                                                                            <div className='prevTestsDiv'>
                                                                            {/* {subName && (
                                                                                <div className="prevtestsTakeTestId">
                                                                                {subjectDisplayNames[subName] || subName}
                                                                                </div>
                                                                            )} */}

                                                                            {completedTestIndexes.map(index => (
                                                                                <div key={index} className="prevtestsBottomLayoutTestsAttempted">
                                                                                {subjectDisplayNames[subName] || subName} {index + 1} - Completed
                                                                                </div>
                                                                            ))}
                                                                            </div>
                                                                        );
                                                                        })()
                                                                    )
                                                                    }
                        {/* {
                                        loading ? (
                                            <div className="loadingMessage">Loading tests...</div>
                                        ) : (
                                            Array.from({ length: currentTestQuestionsCount }, (_, index) => {
                                                // let alreadyComplted = "";
                                                const alreadyCompleted = JSON.stringify(attemptedTests[index]) === "true";
                                                return(
                                                    <>
                                                        {
                                                            prevTestsloading ? (
                                                                <div className="loadingMessage">Loading tests...</div>
                                                            ) : (
                                                                Array.from({ length: currentTestQuestionsCount }, (_, index) => {
                                                                    // let alreadyComplted = "";
                                                                    const alreadyCompleted = JSON.stringify(attemptedTests[index]) === "true";
                                                                    if(alreadyCompleted===false){
                                                                        return null;
                                                                    }
                                                                    return(
                                                                        <>
                                                                            {
                                                                                    <div key={index} className={`${alreadyCompleted ? 'testsBottomLayoutTestsAttempted' : 'testsBottomLayoutTestsNotAttempted'}`}>
                                                                                        {
                                                                                            subName === null
                                                                                            ?
                                                                                            <div></div>
                                                                                            :
                                                                                            <div className='testsTakeTestId'>{subjectDisplayNames[subName] || subName} {index+1}</div>
                                                                                        }
                                                                                        <div>{JSON.stringify(attemptedTests[index])}</div>
                                                                                        {
                                                                                            alreadyCompleted
                                                                                            ?
                                                                                            <div>Completed</div>
                                                                                            :
                                                                                            <div></div>
                                                                                        }
                                                                                    </div>
                                                                            }
                                                                        </>
                                                                    )
                                                                })
                                                            )
                                                        }

                                                        {
                                                            prevTestsloading ? (
                                                                <div className="loadingMessage">Loading tests...</div>
                                                            ) : (
                                                                // Filter out completed tests first
                                                                (() => {
                                                                const completedTestIndexes = [];
                                                                for (let i = 0; i < currentTestQuestionsCount; i++) {
                                                                    if (JSON.stringify(attemptedTests[i]) === "true") {
                                                                    completedTestIndexes.push(i);
                                                                    }
                                                                }

                                                                if (completedTestIndexes.length === 0) {
                                                                    return <div>No completed tests</div>;
                                                                }

                                                                return (
                                                                    <div>
                                                                    {
                                                                        subName && (
                                                                        <div className="testsTakeTestId">
                                                                            {subjectDisplayNames[subName] || subName}
                                                                        </div>
                                                                        )
                                                                    }
                                                                    {completedTestIndexes.map(index => (
                                                                        <div key={index} className="testsBottomLayoutTestsAttempted">
                                                                        Test {index + 1} - Completed
                                                                        </div>
                                                                    ))}
                                                                    </div>
                                                                );
                                                                })()
                                                            )
                                                            }

                                                            {
                                                                prevTestsloading ? (
                                                                    <div className="loadingMessage">Loading tests...</div>
                                                                ) : (
                                                                    (() => {
                                                                    const completedTestIndexes = [];
                                                                    for (let i = 0; i < currentTestQuestionsCount; i++) {
                                                                        if (JSON.stringify(attemptedTests[i]) === "true") {
                                                                        completedTestIndexes.push(i);
                                                                        }
                                                                    }
                                                                    console.log("Completed test indexes:", completedTestIndexes);
                                                                    console.log("attemptedTests array:", attemptedTests);

                                                                    if (completedTestIndexes.length === 0) {
                                                                        return <div>No completed tests</div>;
                                                                    }

                                                                    return (
                                                                        <div>
                                                                        {subName && (
                                                                            <div className="testsTakeTestId">
                                                                            {subjectDisplayNames[subName] || subName}
                                                                            </div>
                                                                        )}

                                                                        {completedTestIndexes.map(index => (
                                                                            <div key={index} className="testsBottomLayoutTestsAttempted">
                                                                            Test {index + 1} - Completed
                                                                            </div>
                                                                        ))}
                                                                        </div>
                                                                    );
                                                                    })()
                                                                )
                                                                }

                                                                {
                                                                    prevTestsloading ? (
                                                                        <div className="loadingMessage">Loading tests...</div>
                                                                    ) : (
                                                                        (() => {
                                                                        // collect indexes of completed tests
                                                                        const completedTestIndexes = [];
                                                                        for (let i = 0; i < currentTestQuestionsCount; i++) {
                                                                            if (attemptedTests[i] === true || attemptedTests[i] === "true") {
                                                                            completedTestIndexes.push(i);
                                                                            }
                                                                        }

                                                                        if (completedTestIndexes.length === 0) {
                                                                            return <div>No completed tests</div>;
                                                                        }

                                                                        return (
                                                                            <div>
                                                                            {subName && (
                                                                                <div className="testsTakeTestId">
                                                                                {subjectDisplayNames[subName] || subName}
                                                                                </div>
                                                                            )}

                                                                            {completedTestIndexes.map(index => (
                                                                                <div key={index} className="testsBottomLayoutTestsAttempted">
                                                                                Test {index + 1} - Completed
                                                                                </div>
                                                                            ))}
                                                                            </div>
                                                                        );
                                                                        })()
                                                                    )
                                                                    }
                                                                    {
                                                                        prevTestsloading ? (
                                                                            <div className="loadingMessage">Loading tests...</div>
                                                                        ) : (
                                                                            Array.from({ length: currentTestQuestionsCount }, (_, index) => {
                                                                            const alreadyCompleted = JSON.stringify(attemptedTests[index]) === "true";
                                                                            if (!alreadyCompleted) return null;  // Skip non-completed tests

                                                                            return (
                                                                                <div key={index} className="testsBottomLayoutTestsAttempted">
                                                                                <div className='testsTakeTestId'>{subjectDisplayNames[subName] || subName} {index + 1}</div>
                                                                                <div
                                                                                    className='testsTakeTestCompleted'
                                                                                    onClick={() => onClickViewResults(subName, index + 1)}
                                                                                >
                                                                                    ViewResults
                                                                                </div>
                                                                                </div>
                                                                            );
                                                                            })
                                                                        )
                                                                        }


                                                    </>
                                                )
                                            })
                                        )
                                    } */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ClientDashboard;