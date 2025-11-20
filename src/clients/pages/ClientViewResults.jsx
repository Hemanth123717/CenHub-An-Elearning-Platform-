import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import "./css/ViewResults.css"
import DashboardChart from './OverAllDashboardChart';
import { isTokenExpired } from '../../utils/useAuth';


const ClientViewResults = () => {

    const userLocation = useLocation();
    const apiUrl = import.meta.env.VITE_CLIENT_API_URL;
    const [loading, setLoading] = useState(true);
    const {questions} = userLocation.state || {};
    const subName = localStorage.getItem("TestSubjectName")
    const currentTestId = localStorage.getItem("currentTestId");
    const urlSubjectQuestions = `${subName}McqTestQuestions`;
    const urlSubjectAnswers = `${subName}McqTestResult`; 
    const [question, setQuestion] = useState([]);
    const clientTempData = JSON.parse(localStorage.getItem("ClientUserTempData"))
    const testResults = clientTempData[urlSubjectAnswers][currentTestId];
    const resultArray = testResults;
    const [currentTestMarksObtained, setCurrentTestMarksObtained] = useState();
    const [totalMarks, setTotalMarks] = useState();
    // console.log("Test Results => ",JSON.stringify(testResults))
    console.log("Result Results => ",JSON.stringify(resultArray[resultArray.length-1]))

    // Data config
    const [graphData, setGraphData] = useState({})

    // Custom plugin for center text
    const [graphCenterTextPlugin, setGraphCenterTestPlugin] = useState({});

    // Chart options
    const [graphOptions, setGraphOptions] = useState({});

    const urlFetch = `${subName}QuestionsList`

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

    const additionalDataSize = 4;
    
    
    useEffect(()=>{
        const token = localStorage.getItem("token");
                      
                              if (!token || isTokenExpired(token)) {
                                  localStorage.removeItem("token");
                                  userNavigate("/login");
                                  return;
                              }
        console.log("testResults => ",testResults);
        // console.log("Questions => ",questions);
        fetch(`${apiUrl}/api/${subName}/${urlFetch}/List?ids=${questions}`,{
            headers: { 
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json" }
        })
        .then((response)=>(response.json()))
        .then((json)=>{
            setQuestion(json);
            setCurrentTestMarksObtained(resultArray[resultArray.length-additionalDataSize]);
            // console.log("resultArray length => ",resultArray.length)
            setTotalMarks(resultArray.length);
            setLoading(false);
            const scored = Number(resultArray[resultArray.length - additionalDataSize]);
            const total = resultArray.length - additionalDataSize;
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
        })
        .catch((error)=>{
            alert("Server Issue");
        })
        // if (test1Results && test1Results.length > 1) {
        //     const rawString = test1Results[1];
        //     resultArray = rawString.split(",");
        // }
        // console.log("Result Array => ",resultArray)
      }, [])

  return (
    <div className='ViewResultsDiv'>
            {/* <div className='glowBlob'></div> */}
            <div className="boltDiv topLeft"></div>
            <div className="boltDiv topRight"></div>
            <div className="boltDiv bottomLeft"></div>
            <div className="boltDiv bottomRight"></div>
            <div className='clientBottomNavBar'>
              {/* <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/">Home</a></div>
              <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/events">Events</a></div>
              <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/dashboard">Dashboard</a></div>
              <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/aboutus">AboutUs</a></div> */}
              <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/tests">Return to Tests</a></div>
            </div>
        <div className='glassEffectDiv'>
            <div className='viewResultsDataDiv'>
                            <div>
                                {/* <div>{resultArray[16]}</div> */}
                                <div>{subjectDisplayNames[subName] || subName} {currentTestId}</div>
                            </div>
              <div className='viewResults'>
                {
                    loading 
                    ?
                    (
                        <div className="loadingMessage">Loading result...</div>
                    )
                    :
                    (
                        <div>
                            <div>
                                <div>
                                    Marks Obtained {currentTestMarksObtained} / {totalMarks-additionalDataSize}
                                </div>
                                {
                                    graphData?.datasets && graphOptions && graphCenterTextPlugin &&
                                    <div>
                                    <DashboardChart 
                                    title={graphCenterTextPlugin}
                                    data={graphData} 
                                    options={graphOptions}
                                    // color="green"
                                    />
                                </div>}
                                {
                                    loading ? (
                                        <div className="loadingMessage">Loading result...</div>
                                    ) : (
                                        // <div className='QuestionsTabDiv'>{JSON.stringify(question)}</div>
                                        question.map((item, index) => {
                                            return (
                                              <div className='resultQuestionsTabDiv' key={index}>
                                                <div className='QuestionHead'>Question {index + 1} : {item.question}</div>
                                                <div>
                                                  <div className='questionOptions'>Option 1 : {item.option1}</div>
                                                  <div className='questionOptions'>Option 2 : {item.option2}</div>
                                                  <div className='questionOptions'>Option 3 : {item.option3}</div>
                                                  <div className='questionOptions'>Option 4 : {item.option4}</div>
                                                  <div className='questionOptions'>Correct Option : {item.correctOption}</div>
                                                  <div className='questionOptions'>Explanation : {item.explanation}</div>
                                                  <div className='questionOptionsAnswer'>User Answer : {resultArray[index]==="NULL"? "NotAnswered" :resultArray[index]}</div>
                                                </div>
                                              </div>
                                            );
                                          })
                                    )
                                    }
                            </div>
                        </div>
                    )
                }
              </div>
            </div>
        </div>
    </div>
  )
}

export default ClientViewResults