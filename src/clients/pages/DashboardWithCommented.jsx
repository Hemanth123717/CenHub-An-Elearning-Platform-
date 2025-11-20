import React, { useContext, useEffect, useState } from 'react'
import "./css/Dashboard.css"
import DashboardChart from './DashboardChart'
import AllPlots from "./AllPlots"
import { UserContext } from '../../components/util/UserContext'

export const Dashboard = () => {

    const {user} = useContext(UserContext)
    const apiUrl = import.meta.env.VITE_CLIENT_API_URL;
    // Data config
        const [graphData, setGraphData] = useState({})
    
        // Custom plugin for center text
        const [graphCenterTextPlugin, setGraphCenterTestPlugin] = useState({});
    
        // Chart options
        const [graphOptions, setGraphOptions] = useState({});
        const [loading, setLoading] = useState(true);

        const [top20, setTop20] = useState([]);

        useEffect(() => {
            fetch("http://localhost:8080/api/Client/clients/overAllTop5",{
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
                setError(true);
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
        

    // useEffect(()=>{
    //         fetch(`${apiUrl}/api/Client/clientByCenId/${user.userCenId}`)
    //                     .then((response) => response.json())
    //                     .then((json) => {
    //                         // setUserData(json);
    //                         // setCurrentTestData(json);
    //                         console.log("CurrentRestData=> " ,json);
    //                         localStorage.setItem("ClientUserTempData", JSON.stringify(json))
    //                         const scored = 10;
    //                         const total = 15;
    //                         setGraphData({
    //                             labels: ['Scored', 'NotScored'],
    //                             datasets: [
    //                                 {
    //                                 data: [scored, total - scored],
    //                                 backgroundColor: ['#4caf50', '#e0e0e0'],
    //                                 borderWidth: 0,
    //                                 },
    //                             ],
    //                             })
    //                             setGraphOptions({
    //                                 cutout: '60%',
    //                                 plugins: {
    //                                     legend: { display: false },
    //                                     tooltip: { enabled: true },
    //                                 },
    //                                 responsive: true,
    //                                 maintainAspectRatio: false,
    //                                 })
    //                             setGraphCenterTestPlugin({
    //                                 id: 'centerText',
    //                                 beforeDraw: (chart) => {
    //                                     const { width } = chart
    //                                     const { height } = chart
    //                                     const { ctx } = chart
                                
    //                                     ctx.restore()
    //                                     const fontSize = (height / 100).toFixed(2)
    //                                     ctx.font = `${fontSize}em sans-serif`
    //                                     ctx.textBaseline = 'middle'
                                
    //                                     const text = `${scored} / ${total}`
    //                                     const textX = Math.round((width - ctx.measureText(text).width) / 2)
    //                                     const textY = height / 2
                                
    //                                     ctx.fillStyle = '#ffffff'
    //                                     ctx.fillText(text, textX, textY)
    //                                     ctx.save()
    //                                 },
    //                                 })
    //                         setLoading(false);
    //                     })
    //                     .catch((error) => {
    //                         alert("Server Issue");
    //                         // setLoading(false);
    //                     });
    //     },[])

        // const clientId = localStorage.getItem("")
        // const {user} = useContext(UserContext);

        // useEffect(() => {
                    
        //         }, []);

        const [userData, setuserData] = useState([]);
        const [selectedSubTotalMarks, setSelectedSubTotalMarks] = useState();
        const [totalMarks, setTotalMarks] = useState(0);
        const [obtainedMarks, setObtainedMarks] = useState(0);

        function changeDashboard(subjectName){
            fetch(`${apiUrl}/api/Client/clientByCenId/${user.userCenId}`,{
                headers: { 
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json" }
            })
                        .then((response) => response.json())
                        .then((json) => {
                            // setUserData(json);
                            setuserData(json);
                            console.log("CurrentRestData=> " ,json);
                            // console.log("CurrentRestData=> " ,Object.keys(json[`${subjectName}McqTestResult`]).length);
                            // console.log("CurrentRestData=> " ,json[`${subjectName}McqTestResult`][1].length-1);
                            // setTotalMarks(Object.keys(json[`${subjectName}McqTestResult`]).length*Object.keys(json[`${subjectName}McqTestResult`][0]).length);
                            // console.log("Total Marks => ", Object.keys(json[`${subjectName}McqTestResult`]).length*Object.keys(json[`${subjectName}McqTestResult`][0]).lengths)
                            // localStorage.setItem("ClientUserTempData", JSON.stringify(json))
                            setTotalMarks(Object.keys(json[`${subjectName}McqTestResult`]).length*15);
                            const scored = 50;
                            const total = Object.keys(json[`${subjectName}McqTestResult`]).length*15;
                            setGraphData({
                                labels: ['Scored', 'NotScored'],
                                datasets: [
                                    {
                                    data: [scored, total - scored],
                                    backgroundColor: ['#4caf50', '#e0e0e0'],
                                    borderWidth: 0,
                                    },
                                ],
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
                                setGraphCenterTestPlugin({
                                    id: 'centerText',
                                    beforeDraw: (chart) => {
                                        const { width } = chart
                                        const { height } = chart
                                        const { ctx } = chart
                                
                                        ctx.restore()
                                        const fontSize = (height / 100).toFixed(2)
                                        ctx.font = `${fontSize}em sans-serif`
                                        ctx.textBaseline = 'middle'
                                
                                        const text = `${scored} / ${total}`
                                        const textX = Math.round((width - ctx.measureText(text).width) / 2)
                                        const textY = height / 2
                                
                                        ctx.fillStyle = '#ffffff'
                                        ctx.fillText(text, textX, textY)
                                        ctx.save()
                                    },
                                    })
                            setLoading(false);
                        })
                        .catch((error) => {
                            alert("Server Issue");
                            // setLoading(false);
                        });
                    
                
        }
        
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
                                {
                                    subsLoading
                                    ?
                                        <div>Subjects Loading....</div>
                                    :
                                        <select name="" id="" onChange={(e) => changeDashboard(e.target.value)}>
                                            <option value="" defaultChecked>Select Subject</option>
                                            {
                                                subjectsList.map((subject)=>(
                                                    <option value={subject.name} key={subject.id}>{subject.name}</option>
                                                ))
                                            }
                                        </select>
                                }
                            {loading ? <div className='dashboardLoadingMessage'>Loading Dashboard...</div> : (
                                <DashboardChart
                                    title={graphCenterTextPlugin}
                                    data={graphData}
                                    options={graphOptions}
                                />
                                // <AllPlots
                                //     title={graphCenterTextPlugin}
                                //     data={graphData}
                                //     options={graphOptions}
                                // />
                                )}
                            </div>
                        </div>
                        <div className="topTopRightLayout">
                            <div className='topCodersLayout'>
                            <div className='top20CodersDiv'>
                                <div className='top20CodersHead'>Top 20 coders</div>
                                <div className='top20Coders'>
                                    <div>Name</div>
                                    <div>TotalMarks</div>
                                </div>
                                {
                                top20 && top20.length > 0
                                    ?
                                    top20.map((student, index) => (
                                    <div className='top20Coders' key={index} title={`Hovering on ${student.name}`}>
                                        <div>{student.name}</div>
                                        <div>{student.totalMarks}</div>
                                    </div>
                                    ))
                                    :
                                    <div>Server Issue</div>
                                }
                            </div>
                            </div>
                            <div className='yoursRank'></div>
                        </div>
                    </div>
                    <div className="topBottomLayout">
                        <div className='bottomLayoutContent'><div>No Rewards Obtained</div></div>
                        <div className='bottomLayoutContent'><div>No previous Contests</div></div>
                        <div className='bottomLayoutContent'><div>Previous Tests</div></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
