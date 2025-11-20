import React, { useActionState, useContext, useEffect, useState } from 'react'
import "./css/TestSeries.css"
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../../utils/useAuth';


const ClientTestSeries = () => {

  const apiUrl = import.meta.env.VITE_CLIENT_API_URL;
  const navigate = useNavigate();
  const [switchMcqCoding, setSwitchingMcqCoding] = useState(false);
  const [overallTestsData, setOverAlltestsData] = useState([]);
  // const {user, setUser} = useContext(UserContext)

  
  function navToTestsPageWithSubjectID(subId, subName){
     // retrive the subject by using subId
    //  api should be like http://localhost:8080/api/client/subName/subId/testId/
    console.log(subName, subId);
    localStorage.setItem("TestSubjectName", subName);
    navigate("/tests", { state: { subName, subId }});
  }

  useEffect(()=>{
    const token = localStorage.getItem("token");
                  
                          if (!token || isTokenExpired(token)) {
                              localStorage.removeItem("token");
                              userNavigate("/login");
                              return;
                          }
                  
                          console.log("Token found =>", token);
  })

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    console.log("stored Token : ", localStorage.getItem("token"));
    const token = localStorage.getItem("token")
    fetch(`${apiUrl}/api/SubjectsList/getAllSubjects`,{
      method: "GET",
      headers: { 
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        
        "Content-Type": "application/json" }
    })
    .then((response) => response.json())
                    .then((json) => {
                        // setUserData(json);
                        setSubjects(json);
                        // console.log("CurrentRestData=> " ,json);
                        // console.log("CurrentSubjectsData=> " , json[0]["name"]);
                        setLoading(false);
                    })
                    .catch((error) => {
                        alert("Server Issue for subject");
                        localStorage.removeItem("token");
                        location.reload();
                        // setLoading(false);
                    });
  }, [])

  const [codingQuestions, setCodingQuestions] = useState([]);
  const [codingQuestionsLoading, setCodingQuestionsLoading] = useState(false);

  useEffect(() => {
        fetch(`${apiUrl}/run/questions`,{
        method: "GET",
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json" }
      })
      .then((response) => response.json())
                      .then((json) => {
                          // setUserData(json);
                          // console.log("CurrentRestData=> " ,json);
                          // console.log("CurrentSubjectsData=> " , json[0]["name"]);
                          setCodingQuestions(json);
                      })
                      .catch((error) => {
                          alert("Server Issue"+error);
                          // setLoading(false);
                      });
        // const res = await fetch('http://localhost:8080/run/questions');
        // const data = await res.json();
  }, []);

  // useEffect(() => {
  //   console.log("Stored Token:", localStorage.getItem("token"));
  //   const token = localStorage.getItem("token");

  //   fetch(`${apiUrl}/api/SubjectsList/getAllSubjects`, {
  //     method:"GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       console.log("Raw response:", response); // ✅ log the response
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       const contentType = response.headers.get("content-type");
  //       console.log("Content-Type:", contentType); // ✅ log content type

  //       if (contentType && contentType.includes("application/json")) {
  //         return response.json();
  //       } else {
  //         throw new Error("Expected JSON but received something else");
  //       }
  //     })
  //     .then((json) => {
  //       console.log("Parsed JSON:", json); // ✅ log parsed data
  //       setSubjects(json);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Fetch error:", error); // ✅ log error
  //       alert("Server Issue for subject");
  //     });
  // }, []);



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
            <div className={`${switchMcqCoding ? 'testSeriesCodingData' : 'testSeriesData'}`}>
              <div className='testSeriesTopLayout'>
                <div className='testSeriesTopLeftLayout'>
                  <div className='testSeriesTopLeftMiddleLayout'>
                    <div className={`${switchMcqCoding ? 'testSeriesTopLeftMiddleLayoutOptionDisabled' : 'testSeriesTopLeftMiddleLayoutOptionEnabled' }`} onClick={()=>setSwitchingMcqCoding(false)}>Mcq</div>
                    <div className={`${switchMcqCoding ? 'testSeriesTopLeftMiddleLayoutOptionEnabled' : 'testSeriesTopLeftMiddleLayoutOptionDisabled' }`} onClick={()=>setSwitchingMcqCoding(true)}>Coding</div>
                  </div>
                </div>
                {/* <div className='testSeriesTopMiddleLayout'></div> */}
                <div className='testSeriesTopRightLayout'>
                    <div className='testSeriesSearchDiv'>
                      <input type="text" className='testSeriesSearch' placeholder='search event'/>
                    </div>
                </div>
              </div>
              {
                switchMcqCoding
                ?
                // <div className='testSeriesBottomLayout'>Under Construction</div>
                  <div className="question-list-container">
                    {/* <h2 style={{ color: "white", marginBottom: "20px" }}>Programming Challenges</h2> */}
                    {codingQuestions.map((q) => (
                      <div key={q.id} className="question-card">
                        <div className="card-header">
                          <h3>{q.title}</h3>
                          <button onClick={() => navigate(`/solve/${q.id}`)}>Solve Challenge</button>
                        </div>
                        <p className="info">Difficulty: {q.difficulty}</p>
                        <p className="info">Success Rate: {q.successRate || 'N/A'}%</p>
                        {/* <p>{q.description || "Solve this challenge to test your skills."}</p> */}
                      </div>
                    ))}
                  </div>
                :
                <div className='testSeriesBottomLayout'>
                  {/* <div className='testSeriesBottomLayoutTests' onClick={()=>navToTestsPageWithSubjectID(1, "Quantitative Aptitude ")}>Aptitude</div> */}
                  {
                    loading
                    ?
                    <div className='Loading'>Loading Subjects...</div>
                    :
                    subjects.map((subject)=>{
                      return(
                        <div className='testSeriesBottomLayoutTests' key={subject.id} onClick={()=>navToTestsPageWithSubjectID(subject.id, subject.name, "mcq")}>{subjectDisplayNames[subject.name] || subject.name}</div>
                      )
                    })
                  }
                  {/* <div className='testSeriesBottomLayoutTests'>Id Bottom layout Mcq Test subjects</div>
                  <div className='testSeriesBottomLayoutTests'>Id Bottom layout Mcq Test subjects</div>
                  <div className='testSeriesBottomLayoutTests'>Id Bottom layout Mcq Test subjects</div> */}
                </div>
              }
            </div>
        </div>
    </div>
  )
}

export default ClientTestSeries