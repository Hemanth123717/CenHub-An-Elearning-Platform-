import React, { useContext, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import "./css/TestPage.css"
import { UserContext } from '../../components/util/UserContext';
import { getUserCenID, getUserRole, isTokenExpired } from '../../utils/useAuth';

const ClientTestPage = () => {
  const apiUrl = import.meta.env.VITE_CLIENT_API_URL;
  const [loading, setLoading] = useState(true);
  const userLocation = useLocation();
  const userNavigate = useNavigate();
  const {user} = useContext(UserContext)
  const {questions, testId} = userLocation.state || {};
  const subName = localStorage.getItem("TestSubjectName");
  const testType = "mcq"
  const urlSubjectQuestions = `${subName}McqTestQuestions`;
  const urlSubjectAnswers = `${subName}McqTestResult`;
  // const subName = localStorage.getItem("TestSubjectName")
  const currentTestId = localStorage.getItem("currentTestId");
  // console.log("questions in TestPages : "+questions)
  const [answersResult, setAnswersResult] = useState({
    answers: {}
  });
  const [question, setQuestion] = useState([]);
  // const totalTime = question.length*60;
  const totalTime = (question.length/2)*60;
  const [timer, setTimer] = useState(totalTime);
  const urlFetch = `${subName}QuestionsList`
  useEffect(()=>{
    if (!questions || questions.length === 0) {
      return;
    }
    else{
      fetch(`${apiUrl}/api/${subName}/${urlFetch}/List?ids=${questions}`,{
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json" }
      })
      .then((response)=>(response.json()))
      .then((json)=>{
        setQuestion(json);
        setLoading(false)
        setTimer(json.length * 60);
      })
      .catch((error)=>{
        alert("Server Issue");
      })
      // .finally(()=>setLoading(false));
      if(currentTestId === null){
        userNavigate("/tests");
      }
    }
  }, [])


  useEffect(() => {
    const navType = performance.getEntriesByType("navigation")[0]?.type;
    const shouldSubmit = localStorage.getItem("shouldSubmit");

    if (navType === "reload" && shouldSubmit === "true") {
      localStorage.removeItem("shouldSubmit");
      setLoading(true);  
      onClickSubmit(true);
    }
  }, []);

  // 2. Ask before reload and set flag if user confirms
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      localStorage.setItem("shouldSubmit", "true");

      // Show confirmation dialog
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const handlePopState = (event) => {
      const confirmLeave = window.confirm("Do you want to submit the test and go back?");
      if (confirmLeave) {
        setLoading(true)
        onClickSubmit(true); // auto-submit test
      } else {
        // Push the current state again to prevent going back
        window.history.pushState(null, '', window.location.pathname);
      }
    };
  
    window.history.pushState(null, '', window.location.pathname);
    window.addEventListener('popstate', handlePopState);
  
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);
  


  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     e.preventDefault();
  //     e.returnValue = ''; // This triggers the browser's default confirmation
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, []);

  // useEffect(()=>{
  //   const navEntries = performance.getEntriesByType('navigation');
  //   const isReload = navEntries[0]?.type === 'reload';
    
  //   if (isReload) {
  //     onClickSubmit(true);
  //   }
  // })



  const [isSubmitted, setIsSubmitted] = useState(false);
  const timerRef = useRef(null); // To store the interval ID
  const token = localStorage.getItem("token");
  const cenId = getUserCenID(token);
  const role = getUserRole(token);
  const navigate = useNavigate();

useEffect(() => {
                      if (!token || isTokenExpired(token)) {
                          localStorage.removeItem("token");
                          navigate("/login");
                          return;
                      }
              
                      // console.log("Token found =>", token);
          
  if (question.length === 0 || isSubmitted) return;

  timerRef.current = setInterval(() => {
    setTimer(prev => {
      if (prev <= 1) {
        clearInterval(timerRef.current);
        if (!isSubmitted) {
          setIsSubmitted(true);
          alert("Time's up! Test will submit automatically");
          localStorage.removeItem("currentTestId");
          onClickSubmit(true);
        }
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timerRef.current);
}, [question, isSubmitted]);


  
  // console.log("Result => "+answersResult.answers[0]);
  
  const allCheckedRadio = document.querySelectorAll('input[name="a"]')
  const [currentQuestion, setCurrentQuestion] = useState();
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  
  // function onClickChangedOptions(){
  //   const selectedOption = document.querySelector('input[name="a"]:checked').value;
  //   // console.log(selectedOption); 
  //   setAnswersResult(prev=>({
  //     answers: {
  //       ...prev.answers,
  //       [count]: selectedOption
  //     }
  //   }));
  // }


    // on selecting an option
  function onClickChangedOptions() {
    console.log('answersResult:', answersResult.answers);
    const selected = document.querySelector('input[name="a"]:checked');
    if (!selected) return;
    const selectedOption = selected.value;

    setAnswersResult(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [count]: selectedOption,
      }
    }));
  }


  // function onClickChangedOptions() {
  //   const selectedInput = document.querySelector('input[name="a"]:checked');
  //   const selectedOption = selectedInput ? selectedInput.value : null;
  
  //   console.log(selectedOption);
  
  //   setAnswersResult(prev => ({
  //     answers: {
  //       ...prev.answers,
  //       [count]: selectedOption // can be null if nothing selected
  //     }
  //   }));
  // }
  

  function onClickNextButton() {
    if (count === question.length-1) {
      setMessage("No Next Question");
    } else {
      setMessage("");
      setCount(prev => prev + 1);
    }
    // if(selectedOption!=null){
    //   setAnswersResult(prev=>({
    //     answers: {
    //       ...prev.answers,
    //       [count]: selectedOption
    //     }
    //   }));
    // }
    // if(count>=0 && count<question.length-1){
    //   allCheckedRadio.forEach(radioBut=>{
    //     radioBut.checked = false;
    //   })
    // }
  }

  // const [updateClientMarks, setUpdateClientMarks] = useState([]);
  // const updatedData = {
  //                       "testQuestionsData": {
  //                         "testResults": {
  //                             testId:[]
  //                         }
  //                     }
  //                 }

  const [total, setTotal] = useState(0)

//  useEffect(() => {
//   const handleBeforeUnload = (e) => {
//     onClickSubmit(true); // Auto submit without confirmation
//     e.preventDefault(); // Standard practice
//     e.returnValue = ''; // Required for showing prompt in some browsers
//   };

//   const handleVisibilityChange = () => {
//       if (document.visibilityState === 'hidden') {
//         onClickSubmit(true); // Auto submit on tab switch
//       }
//     };

//     const handlePageHide = () => {
//       onClickSubmit(true); // Auto submit on page hide (mobile, Safari)
//     };

//     // Attach events
//     window.addEventListener('beforeunload', handleBeforeUnload);
//     document.addEventListener('visibilitychange', handleVisibilityChange);
//     window.addEventListener('pagehide', handlePageHide);

//     // Cleanup
//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//       window.removeEventListener('pagehide', handlePageHide);
//     };
//   }, [onClickSubmit]);

  // const [switchAppsAlert, setSwitchAppsAlert] = useState(0)




  // const switchAppsAlertRef = useRef(0);

  // useEffect(() => {
  //     const handleBeforeUnload = (e) => {
  //       // Call the submit function to auto-submit
  //       onClickSubmit(true); // Auto submit without confirmation
  //       // Prevent the default action
  //       e.preventDefault();
  //       // Set returnValue to show the confirmation dialog
  //       e.returnValue = ''; // Required for showing prompt in some browsers
  //     };


  //     const handleVisibilityChange = () => {
  //       if (document.visibilityState === 'hidden') {
  //         // Optionally, you can show a confirmation dialog here
  //         // const confirmation = window.confirm("Are you sure you want to leave this page? Your answers may not be saved.");
  //         // alert("Don't Switch beteen tabs or apps")
  //         setSwitchAppsAlert((prev)=>prev+1)
  //         if (switchAppsAlert >= 1) {
  //           onClickSubmit(true); // Auto submit on tab switch
  //         }


  //         if (switchAppsAlertRef.current >= 2) {
  //           onClickSubmit(true); // Auto submit after switching apps/tabs twice
  //         }
  //       }
  //     };

  //     const handlePageHide = () => {
  //       onClickSubmit(true); // Auto submit on page hide (mobile, Safari)
  //     };

  //     // Attach events
  //     window.addEventListener('beforeunload', handleBeforeUnload);
  //     document.addEventListener('visibilitychange', handleVisibilityChange);
  //     window.addEventListener('pagehide', handlePageHide);

  //     // Cleanup
  //     return () => {
  //       window.removeEventListener('beforeunload', handleBeforeUnload);
  //       document.removeEventListener('visibilitychange', handleVisibilityChange);
  //       window.removeEventListener('pagehide', handlePageHide);
  //     };
  //   }, [onClickSubmit]);



  const switchAppsAlertRef = useRef(0);
  // const isReloadingRef = useRef(false);  // Flag to track reload in progress

  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     isReloadingRef.current = true; // Mark that reload is happening
  //     onClickSubmit(true);            // Submit on reload/close

  //     // Show the browser confirmation dialog
  //     e.preventDefault();
  //     e.returnValue = ''; // Needed for some browsers to show prompt
  //   };

  //   const handleVisibilityChange = () => {
  //     if (isReloadingRef.current) {
  //       // If reload is happening, ignore visibility change events
  //       return;
  //     }

  //     if (document.visibilityState === 'hidden') {
  //       switchAppsAlertRef.current += 1;

  //       if (switchAppsAlertRef.current == 1) {
  //         alert("This is your last warning. Switching again will auto-submit the test.");
  //       }

  //       if (switchAppsAlertRef.current >= 2) {
  //         onClickSubmit(true); // Auto submit on second tab switch
  //       }
  //     }
  //   };

  //   const handlePageHide = () => {
  //     onClickSubmit(true);
  //   };

  //   // Attach event listeners
  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   document.addEventListener('visibilitychange', handleVisibilityChange);
  //   window.addEventListener('pagehide', handlePageHide);

  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //     document.removeEventListener('visibilitychange', handleVisibilityChange);
  //     window.removeEventListener('pagehide', handlePageHide);
  //   };
  // }, [onClickSubmit]);







  useEffect(() => {
  let submitted = false;

  const handleBeforeUnload = (e) => {
    // Just show the confirm dialog, DON'T submit here
    e.preventDefault();
    e.returnValue = '';
    // onClickSubmit(true);
  };

  const handleUnload = () => {
    // Actual submit happens here — only if user confirms reload
    onClickSubmit(true); // Must be sync if it's a network call
    // No alert here — it's ignored by browser
  };

  const handlePageHide = () => {
    if (!submitted) {
      submitted = true;
      alert("Test submited");
      onClickSubmit(true, "Switching Beteen Apps and Websites");  // Submit only when page is actually unloading
    }
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      switchAppsAlertRef.current += 1;

      if (switchAppsAlertRef.current === 1) {
        alert("This is your last warning. Switching again will auto-submit the test.");
      }

      if (switchAppsAlertRef.current >= 2) {
        onClickSubmit(true, "Switching Beteen apps or Websites");
      }
    }
  };
  window.addEventListener('beforeunload', handleBeforeUnload);
  window.addEventListener('pagehide', handlePageHide);
  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('unload', handleUnload);

  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
    window.removeEventListener('pagehide', handlePageHide);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('unload', handleUnload);
  };
}, [onClickSubmit]);

// useEffect(() => {
//   const handleBeforeUnload = (e) => {
//     // Show confirmation dialog
//     e.preventDefault();
//     e.returnValue = ''; // Required for most browsers
//   };

//   const handleUnload = () => {
//     // Actual submit happens here — only if user confirms reload
//     onClickSubmit(true, ); // Must be sync if it's a network call
//     // No alert here — it's ignored by browser
//   };

//   window.addEventListener('beforeunload', handleBeforeUnload);
//   window.addEventListener('unload', handleUnload);

//   return () => {
//     window.removeEventListener('beforeunload', handleBeforeUnload);
//     window.removeEventListener('unload', handleUnload);
//   };
// }, [onClickSubmit]);





  function onClickSubmit(autoSubmit, reason){
    // console.log(testId)
    if(!reason){
      reason = "Page Refreshed"
    }
    const now = new Date();

    // Extract date in YYYY-MM-DD format
    const date = now.toISOString().split('T')[0];

    // Extract time in HH:mm:ss format
    const time = now.toTimeString().split(' ')[0];
    if(autoSubmit === false){
      const confirmed = window.confirm("Are you sure you want to submit the Test");
      if(confirmed){
        setLoading(true)
        let marks = 0;
        let answerArray = Array(15).fill("NULL");
        Array.from({length:Object.keys(answersResult.answers).length}, (_,index)=>{
          answerArray[index] = answersResult.answers[index];
          // console.log("CorrectOption=> ",question[index].correctOption, " SelectedOption=> ",answersResult.answers[index], " SameOrNot=> ", question[index].correctOption == answersResult.answers[index])
          // console.log("CorrectOption=> ",question[index].correctOption, " SelectedOption=> ",answerArray[index], " SameOrNot=> ", question[index].correctOption == answersResult.answers[index])
          if(question[index].correctOption == answersResult.answers[index]){
            // setTotal(prev=>prev+1)
            marks = marks+1;
          }
          // console.log("Selected=> ", index, " Answer=> ", answersResult.answers[index])
        })
        Array.from({length:Object.keys(answersResult.answers).length}, (_,index)=>{
          // console.log("CorrectOption=> ",question[index].correctOption, " SelectedOption=> ",answerArray[index], " SameOrNot=> ", question[index].correctOption == answersResult.answers[index])
        })
        // console.log("Marks Obtained => ", total,"/",question.length);
        setTotal(marks);
        answerArray[answerArray.length] = marks;
        console.log("Reason ",reason)
        answerArray[answerArray.length] = reason;
        answerArray[answerArray.length] = "Completed Date "+date;
        answerArray[answerArray.length] = "Completed Time "+time;
    
        // const cenId = cenId
        // if(marks == 0){
        //   marks = -1;
        // }
        // console.log("Details => ", cenId, subName, testType, currentTestId);
        fetch(`${apiUrl}/api/Client/updateClientResultByCenId/${cenId}/${subName}/${testType}/${currentTestId}`, {
          method:'PATCH',
          headers: { 
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json" },
          body: JSON.stringify({
            [urlSubjectAnswers]: {
              [currentTestId]: answerArray
          }
          })
        }).then((response)=>{
          setLoading(true);
          if(response.ok){
            localStorage.removeItem("currentTestId");
            alert("Test Submited")
          }
          else{
            alert("An error occured")
          }
        }).catch((error)=>{
          // console.log("Server Issue ", error)
          alert("Server Issue", error)
        }).finally(()=>{
          // localStorage.removeItem("currentTestId");
          userNavigate('/tests');
          // location.reload();
        })
      }
    }
    else if(autoSubmit){
        setLoading(true)
        let marks = 0;
        let answerArray = Array(15).fill("NULL");
        Array.from({length:Object.keys(answersResult.answers).length}, (_,index)=>{
          answerArray[index] = answersResult.answers[index];
          // console.log("CorrectOption=> ",question[index].correctOption, " SelectedOption=> ",answersResult.answers[index], " SameOrNot=> ", question[index].correctOption == answersResult.answers[index])
          // console.log("CorrectOption=> ",question[index].correctOption, " SelectedOption=> ",answerArray[index], " SameOrNot=> ", question[index].correctOption == answersResult.answers[index])
          if(question[index].correctOption == answersResult.answers[index]){
            // setTotal(prev=>prev+1)
            marks = marks+1;
          }
          // console.log("Selected=> ", index, " Answer=> ", answersResult.answers[index])
        })
        Array.from({length:Object.keys(answersResult.answers).length}, (_,index)=>{
          // console.log("CorrectOption=> ",question[index].correctOption, " SelectedOption=> ",answerArray[index], " SameOrNot=> ", question[index].correctOption == answersResult.answers[index])
        })
        // console.log("Marks Obtained => ", total,"/",question.length);
        setTotal(marks);
        answerArray[answerArray.length] = marks;
        console.log("Resaon => ", reason);
        answerArray[answerArray.length] = reason;
        answerArray[answerArray.length] = "Completed Date "+date;
        answerArray[answerArray.length] = "Completed Time "+time;
    
        // const cenId = cenId
        // if(marks == 0){
        //   marks = -1;
        // }
        // console.log("Details => ", cenId, subName, testType, currentTestId);
        const urlapi = `${apiUrl}/api/Client/updateClientResultByCenId/${cenId}/${subName}/${testType}/${currentTestId}`
        // console.log(`Url api => ${urlapi}`);
        fetch(`${urlapi}`, {
          method:'PATCH',
          headers: { 
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json" },
          body: JSON.stringify({
            [urlSubjectAnswers]: {
              [currentTestId]: answerArray
          }
          })
        }).then((response)=>{
          setLoading(true);
          if(response.ok){
            localStorage.removeItem("currentTestId");
            alert("Test Submited")
          }
          else{
            alert("An error occured")
          }
        })
        // .catch((error)=>{
        //   console.log("Server Issue ", error)
        //   alert("Server Issue", error)
        // })
        .finally(()=>{
          userNavigate('/tests');
          // location.reload();
        })
    }
    
    // userNavigate("/tests")
  }
  
  function onClickPrevious() {
    if (count === 0) {
      setMessage("No Previous Question");
    } else {
      setMessage("");
      setCount(prev => prev - 1);
    }
    // if(count>0 && count<=question.length-1){
    //   allCheckedRadio.forEach(radioBut=>{
    //     radioBut.checked = false;
    //   })
    // }
  }

  useEffect(() => {
    if (question.length > 0 && count >= 0 && count < question.length) {
      setCurrentQuestion(question[count]);
    }
  }, [count, question]);
  
  // useEffect(()=>{
  //   setCurrentQuestion(question[count]);
  // },[count])
  // useEffect(()=>{

  // },count)

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  
  // const [instructions, setInstructions] = useState(false)
  
  
  //   useEffect(()=>{
    //     setInstructions((prev)=>!prev)
    //     setLoading(true)
    //   },[])
    
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
    const [allQuestionNumbersDiv, setAllQuestionNumbersDiv] = useState(true);
    
  return (

    <div className='TestPageDiv'>
            <div className='glowBlob'></div>
            <div className="boltDiv topLeft"></div>
            <div className="boltDiv topRight"></div>
            <div className="boltDiv bottomLeft"></div>
            <div className="boltDiv bottomRight"></div>
            {/* <div className='clientBottomNavBar'>
              <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/">Home</a></div>
              <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/events">Events</a></div>
              <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/dashboard">Dashboard</a></div>
              <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/aboutus">AboutUs</a></div>
            </div> */}
        <div className='glassEffectDiv'>
            {/* {
              instructions
                ?
                  <TestInstructions/>
                :
                  <div></div>
            } */}
            <div className='testPageData'>
                  <div className='testPageTestHead'>
                    <div>{subjectDisplayNames[subName] || subName}</div>
                    <div>Time-left: {formatTime(timer)}</div>
                  </div>
                  <hr className='horizontalLineTestPage'/>
                  <div className='QuestionsTab'>
                    {
                      loading
                      ?
                        <div>loading...</div>
                      :
                        <div className='allQuestionNumbersDiv'>
                        {/* <div onClick={()=>setAllQuestionNumbersDiv(prev=>!prev)}>Show Questions</div> */}
                        {/* <div> */}
                          {/* {
                            allQuestionNumbersDiv
                            ? */}
                              {/* <div className='allQuestionNumbersDiv'> */}
                                {
                                  question.map((item,index)=>(
                                    // <div key={index}>{item}</div>
                                    // <div onClick={()=>setCount(index)} className={`allQuestionNumbersDivOptions`}>{index+1}</div>
                                    <div key={index} onClick={()=>setCount(index)} className={`${answersResult.answers?.[index] ? `allQuestionNumbersDivOptionsSelected` : `allQuestionNumbersDivOptionsNotSelected`}`}>{index+1}</div>
                                  ))
                                }
                              {/* </div> */}
                            {/* :
                              <div></div>
                          } */}
                        {/* </div> */}
                      </div>
                    }
                  {/* {
                      loading ? (
                          <div className="loadingMessage">Loading tests...</div>
                      ) : (
                          <div className='QuestionsTabDiv'>{JSON.stringify(question)}</div>
                      )
                  } */}
                {/* {
                  loading ? (
                    <div className="loadingMessage">Loading tests...</div>
                ) : (
                    // <div className='QuestionsTabDiv'>{JSON.stringify(question)}</div>
                      // currentQuestion.map((item,index)=>(
                        <div className='QuestionsTabDiv' key={count}>
                          <div>{currentQuestion.question}</div>
                          <div>
                            <div>
                              <div className='questionOptions'>{currentQuestion.option1}</div>
                              <div className='questionOptions'>{currentQuestion.option2}</div>
                            </div>
                            <div>
                              <div className='questionOptions'>{currentQuestion.option3}</div>
                              <div className='questionOptions'>{currentQuestion.option4}</div>
                            </div>
                            <div>
                              Correct Option {currentQuestion.correctOption}
                            </div>
                          </div>
                          
                        </div>
                      // ))
                  )
                } */}
                {
                  loading ? (
                    <div className="loadingMessage">Loading...</div>
                  ) : currentQuestion ? (
                    <div className='QuestionsTabDiv'>
                      <div>{currentQuestion.question}</div>
                      {/* <div> */}
                        {/* <div>
                          <div className='questionOptions'>{currentQuestion.option1}</div>
                          <div className='questionOptions'>{currentQuestion.option2}</div>
                        </div>
                        <div>
                          <div className='questionOptions'>{currentQuestion.option3}</div>
                          <div className='questionOptions'>{currentQuestion.option4}</div>
                        </div>
                        <div>
                          Correct Option: {currentQuestion.correctOption}
                        </div> */}
                        <div className='allOptionsDiv'>
                            <div className='questionOptions'>
                                <input type="radio" name="a" value={currentQuestion.option1} id="option1" onChange={onClickChangedOptions} checked={answersResult.answers[count]===currentQuestion.option1}/>
                                <label className='testOptions' htmlFor="option1">{currentQuestion.option1}</label>
                              </div>
                              <div className='questionOptions'>
                                <input type="radio" name="a" value={currentQuestion.option2} id="option2" onChange={onClickChangedOptions} checked={answersResult.answers[count]===currentQuestion.option2}/>
                                <label className='testOptions' htmlFor="option2">{currentQuestion.option2}</label>
                              </div>
                              <div className='questionOptions'>
                                <input type="radio" name="a" value={currentQuestion.option3} id="option3" onChange={onClickChangedOptions} checked={answersResult.answers[count]===currentQuestion.option3}/>
                                <label className='testOptions' htmlFor="option3">{currentQuestion.option3}</label>
                              </div>
                              <div className='questionOptions'>
                                <input type="radio" name="a" value={currentQuestion.option4} id="option4" onChange={onClickChangedOptions} checked={answersResult.answers[count]===currentQuestion.option4}/>
                                <label className='testOptions' htmlFor="option4">{currentQuestion.option4}</label>
                              </div>
                              {/* <div>
                                Correct Option {currentQuestion.correctOption}
                            </div> */}
                          </div>
                        </div>
                        // </div>
                  ) : (
                    <div>No Question Found</div>
                  )
                }
                          <div className='testPageBottomLayout'>
                            <div className='testPageBottomLayoutMessageAndCountDiv'>
                              <div>{count+1}/{question.length}</div>
                              {message && <div style={{ color: 'red' }}>{message}</div>}
                            </div>
                            <div className='testPageBottomLayoutButtons'>
                              <div className='clientTestNextPrevOption'><button className='clientTestNextPrevOptionButton' onClick={onClickPrevious} >Previous</button></div>
                              {
                                Object.keys(answersResult.answers).length === 15
                                ?
                                  <div className='clientTestNextPrevOption'><button className='clientTestNextPrevOptionButton' onClick={()=>onClickSubmit(false, "Submited")} >submit</button></div>
                                :
                                  // <div className='clientTestNextPrevOption'></div>
                                  <div></div>
                              }
                              <div className='clientTestNextPrevOption'><button className='clientTestNextPrevOptionButton' onClick={onClickNextButton} >Next</button></div>
                            </div>
                          </div>
                          {/* <div>
                            {JSON.stringify(question[1])}
                          </div> */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ClientTestPage