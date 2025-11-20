import React, { useEffect, useState } from 'react'
import { getUserCenID, getUserRole } from '../utils/useAuth';
import OverAllDashboardChart from '../clients/pages/OverAllDashboardChart';
import AttemptedDashboardPie from '../clients/pages/attemptedDashboardPie';
import FullDashboard from '../clients/pages/Dashboard/FullDashboard';
import "./css/StudentsDashboard.css"



const StudentsDashboard = () => {

  const clientApiUrl = import.meta.env.VITE_CLIENT_API_URL;
  const [allClients, setAllClients] = useState([]);
  // const [getUsersByStatus, setgetUsersByStatus] = useState("active");
  const [loading, setLoading] = useState(false);
  const [loadingDash, setLoadingDash] = useState(true);
  const [currentTestData, setCurrentTestData] = useState({});

  const [selectedCenId, setSelectedCenId] = useState("");
  const [specificStudent, setSpecificStudent] = useState(null);
  const [prevTestsloading, setprevTestsLoading] = useState(false);
  const [subName, setSubName] = useState(null);
  const [subsLoading, SetSubsLoading] = useState(true);
  const [subjectsList, setSubjectsList] = useState([]);
  const [datesLoading, SetDatesLoading] = useState(true);
  const [datesList, setDatesList] = useState([]);
  const [userMarksData,setuserMarksData] = useState();
  const [overAllmarksLoading,setoverAllmarksLoading] = useState(false);
  const [graphsLoading,setGraphsLoading] = useState(false)
  const [graphCenterTextPlugin, setGraphCenterTestPlugin] = useState({});
  const [attemptedGraphCenterTextPlugin, setAttemptedGraphCenterTestPlugin] = useState({});
  const [overallGraphData, setOverallGraphData] = useState({})
  const [attemptedGraphData, setAttemptedGraphData] = useState({})
  const [graphOptions, setGraphOptions] = useState({});
  const [attemptedGraphOptions, setAttemptedGraphOptions] = useState({});
  const [currentTestQuestionsCount, setCurrentTestQuestionsCount] = useState([]);
  const [attempted, setAttempted] = useState(0);
  const [notAttempted, setNotAttempted] = useState(0);
  const [attemptedTests, setAttemptedTests] = useState([]);
  const [filteredKeys, setFilteredKeys] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [mcqData, setMcqData] = useState(null);

  const token = localStorage.getItem('token')

  useEffect(()=>{
              if(selectedCenId === "select"){
                // setSelectedSubjectName("select");  // Reset subject
                // setSelectedDate("select");
                SetSubsLoading(true)
                SetDatesLoading(true)
                setuserMarksData([0]);
                return;
              }
              // setLoading(true)
              setoverAllmarksLoading(true)
              console.log("Selected client => " ,selectedCenId)
              fetch(`${clientApiUrl}/api/Client/clientByCenId/${selectedCenId}`,{
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
          },[selectedCenId])


  // const handleChange = (cenId) => {
  //   if(cenId === "select"){
  //     SetSubsLoading(true);
  //     SetDatesLoading(true);
  //     return;
  //   }
  //   // const cenId = cenId;
  //   console.log("CenId => ",cenId)
  //   onChangeStudent();
  //   setSelectedCenId(cenId);

  //   // Find and set the full student object
  //   const selected = allClients.find(
  //     (student) => String(student.cenId) === cenId
  //   );
  //   setSpecificStudent(selected || null);
  //   console.log("selected student => ",selected)
  //   console.log("selected student Type => ",typeof(selected))
  //   // changeDashboard("select")
  // };

    const handleChange = (cenId) => {
    if (cenId === "select") {
      // Reset states
      setSubName(null)
      setuserMarksData([0])
      setSelectedCenId("select");
      setSelectedSubjectName("select");  // Reset subject
      setSelectedDate("select");         // Reset date if applicable
      setSpecificStudent(null);          // Clear student data
      // setFilteredData(fullGraphData);    // <-- Show full graph again (assuming you have fullGraphData)
      
      setLoadingDash(true)
      setGraphsLoading(true)
      
      // Optional: reset loading states if needed
      SetSubsLoading(false);
      SetDatesLoading(false);

      return;
    }

    console.log("CenId => ", cenId);
    onChangeStudent();
    setSelectedCenId(cenId);

    // Find and set the full student object
    const selected = allClients.find(
      (student) => String(student.cenId) === cenId
    );
    setSpecificStudent(selected || null);
    console.log("selected student => ", selected);
    console.log("selected student Type => ", typeof selected);
  };


  const [selectedSubjectName, setSelectedSubjectName] = useState("");
  const [selectedSubjectObj, setSelectedSubjectObj] = useState(null);

  const handleSubjectChange = (name) => {
    if(name==="select"){
      setGraphsLoading(true)
      setLoadingDash(true)
      setSubName(null)
      return;
    }
    setSelectedSubjectName(name);
    console.log("Subject => ", name)

    const selected = specificStudent?.[`${name}McqTestResult`] || null;
    setSelectedSubjectObj(selected || null);
    setMcqData(selected || null); // ✅ Save data for use later
    console.log("Selected Subject Data of client => ",selected)
    const data = selected;
    const dateSet = new Set();

    Object.values(data).forEach((arr) => {
      if (!Array.isArray(arr) || arr.length === 0) return;

      arr.forEach((entry) => {
        if (typeof entry === "string" && entry.startsWith("Completed Date")) {
          const datePart = entry.split("Completed Date ")[1];
          if (datePart) {
            dateSet.add(datePart.trim());
          }
        }
      });
    });

  setDatesList(Array.from(dateSet));
  SetDatesLoading(false)
  changeDashboard(name)
  };



  useEffect(() => {
          const fetchData = async () => {
              setLoading(true);
              const token = localStorage.getItem("token");
  
              try {
                  const response = await fetch(`${clientApiUrl}/api/Client/myusers/active`, {
                      method: "POST",
                      headers: {
                          "Authorization": `Bearer ${token}`,
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                          cenId: getUserCenID(token),
                          role: getUserRole(token)
                      })
                  });
  
                  const text = await response.text();
                  try {
                      const json = JSON.parse(text);
                      console.log(json)
                      setAllClients(json);
                  } catch (err) {
                      console.error("Non-JSON response:", text);
                      setAllClients([]);
                  }
              } catch (error) {
                  console.error("Fetch error:", error);
                  setAllClients([]);
              } finally {
                  setLoading(false);
              }
          };
  
          fetchData();
      }, []);

      // const onDateChange = (e) => {
      //   const chosenDate = e.target.value;
      //   setSelectedDate(chosenDate);

      //   const filtered = Object.entries(data)
      //     .filter(([key, arr]) => 
      //       Array.isArray(arr) && 
      //       arr.some(entry => entry === `Completed Date ${chosenDate}`)
      //     )
      //     .map(([key]) => key);

      //   setFilteredKeys(filtered);
      // };

      const onDateChange = (e) => {
        const chosenDate = e.target.value;
        // setSelectedDate(chosenDate);

        // if (!mcqData) return;

        // const filtered = Object.entries(mcqData)
        //   .filter(([key, arr]) =>
        //     Array.isArray(arr) &&
        //     arr.some(entry => entry === `Completed Date ${chosenDate}`)
        //   )
        //   .map(([key]) => key);

        // setFilteredKeys(filtered); // ✅ Now you get keys for selected date
      };





      function onChangeStudent(){
        // setSelectedSubject("select");
        setSelectedSubjectName(null);
        SetSubsLoading(true);
            fetch(`${clientApiUrl}/api/SubjectsList/getAllSubjects`,{
                headers: { 
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json" }
            })
            .then((response)=>(response.json()))
            .then((json)=>{
                setSubjectsList(json);
                SetSubsLoading(false);
            })
      }

      function changeDashboard(subjectName){
                  // document.getElementById("dashboardSubs").classList.add("dashboardSubsSelected")
                  if(subjectName==="select"){
                      setprevTestsLoading(true)
                      setSubName(null)
                      setLoadingDash(true)
                      // setprevTestsLoading(true)
                      return;
                  }
                  setLoadingDash(false)
                  setGraphsLoading(true)
                  const urlSubjectQuestions = `${subjectName}McqTestQuestions`;
                  const urlSubjectAnswers = `${subjectName}McqTestResult`;
                  const cenId = getUserCenID(token);
                  const role = getUserRole(token);
                  // fetch(`${clientApiUrl}/api/Client/clientByCenId/${selectedCenId}`,{
                  //     headers: { 
                  //         "Authorization": `Bearer ${localStorage.getItem("token")}`,
                  //         "Content-Type": "application/json" }
                  // })
                  //             .then((response) => response.json())
                  //             .then((json) => {
                                  const json = specificStudent;
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
                                  // setuserData(json);
                                  console.log("CurrentRestData=> " ,json);
                                  
                                  // setTotalMarks(Object.keys(json[`${subjectName}McqTestResult`]).length*15);
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
                              // })
                              // .catch((error) => {
                              //     alert("Server Issue whith dashboard"+error);
                              //     // setLoading(false);
                              // });
                      
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
    <div className="studentDashboard">
      <div className='shapes'>
            <div className="leftTopCir circle"></div>
            <div className="leftBottomCir circle"></div>
            <div className="rightCir circle"></div>
          </div>

           <div className='studentsDashboardSelectDiv'>
                  <div className='studentsDashboardSelectLableDiv'>
                    <div>Select Student : </div>
                    <select value={selectedCenId} className='dashboardSelectSubject' onChange={(e)=>{handleChange(e.target.value)}}>
                      <option value="select" defaultChecked className='subOption'>Student</option>
                      {loading ? (
                        <option disabled>Loading Student...</option>
                      ) : (
                        allClients.map((student) => (
                          <option key={student.cenId} value={String(student.cenId)}>
                            {student.name} ({student.cenId})
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                {
                  subsLoading ? (
                    <div className='studentsDashboardLoadingDiv'>Loading Subjects....</div>
                  ) : (
                    <div className='studentsDashboardSelectLableDiv'>
                      <div>Select Subject : </div>
                      <select
                        className='dashboardSelectSubject'
                        name=""
                        id="dashboardSubs"
                        value={selectedSubjectName}
                        onChange={(e) => {
                          handleSubjectChange(e.target.value);
                        }}
                      >
                        <option value="select" defaultChecked className='subOption'>
                          All Subjects
                        </option>
                        {
                          subjectsList.map((subject) => (
                            <option value={subject.name} key={subject.id}>
                              {subjectDisplayNames[subject.name] || subject.name}
                            </option>
                          ))
                        }
                      </select>
                    </div>
                  )
                }
              {
                datesLoading ? (
                  <div className='studentsDashboardLoadingDiv'>Loading Dates....</div>
                ) : (
                  <div className='studentsDashboardSelectLableDiv'>
                    <div>Select Date : </div>
                    <select
                      className='dashboardSelectSubject'
                      onChange={onDateChange}
                      defaultValue="select"
                    >
                      <option value="select" disabled>Date</option>
                      {datesList.map((date, idx) => (
                        <option value={date} key={idx}>{date}</option>
                      ))}
                    </select>
                  </div>
                )
              }
           </div>



        {/* {
            subName === null
            ?
                <div>All Subjects</div>
            :
                <div>subject : {subjectDisplayNames[subName] || subName}</div>
        } */}

        {/* {
                                        userMarksData != null
                                        ?
                                            <FullDashboard userMarksData={userMarksData}/>
                                        :
                                            <div className='loadingDashboard'>Loading...</div>
                                    } */}

        <div className='studentsDashboardGraphLayout'>
            <div className='subjectsDashboardInfoDiv'>
                {
                    subName === null
                    ?
                        <div>All Subjects</div>
                    :
                        <div>subject : {subjectDisplayNames[subName] || subName}</div>

                }
            </div>
        {/* {loading ? <div className='dashboardLoadingMessage'>Select Subject</div> : ( */}
            {loadingDash ? <div className='fullDashboard'>
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
                        <div className='StudentsDashboardPlots'>
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

            {selectedDate && filteredKeys.length > 0 && (
              <div>
                <h3>Data for {selectedDate}</h3>
                {filteredKeys.map(key => (
                  <div key={key}>
                    <h4>Entry {key}</h4>
                    <ul>
                      {data[key].map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}


        </div>

    </div>
  )
}

export default StudentsDashboard