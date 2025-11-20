import React, { useEffect, useState } from 'react'
import "./css/TestSeries.css"

// own dropdown menu
const TestSeries = () => {

  // const [prompt, SetPrompt] = useState(`Generate 10 multiple choice questions (MCQs) on the C programming language  with correct answer and its explanation`);

  const [selectedSub, setSelectedSub] = useState();
  const [selectedTestLevel, setSelectedTestLevel] = useState();
  const [selectedMcqCount, setSelectedMcqCount] = useState();
  // async function GenerateTestQuestions()
  // {

  //   if(selectedSub === null || selectedTestLevel === null || selectedMcqCount === null){
  //     alert("select the Data to generate Test");
  //   }
  //   const prompt = `Generate ${selectedMcqCount} multiple choice questions (MCQs) on the ${selectedSub} with correct answer and its explanation and the difficulty level should be ${selectedTestLevel}`
  //   document.getElementById('output').textContent = "Waiting for response...";

  //   try {
  //     const response =  fetch(`http://localhost:8080/api/azure/ask`, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ question: prompt })
  //     });

  //     const data =  response.json();
  //     document.getElementById('output').textContent = JSON.parse(data.response) || "No response received.";
  //   } catch (error) {
  //     console.error(error);
  //     document.getElementById('output').textContent = "Error contacting the backend.";
  //   }
  // }



  // try {
  //   const response = fetch(url, options);
  //   const result = response.text();
  //   console.log(result);
  // } catch (error) {
  //   console.error(error);
  // }

  async function GenerateTestQuestions() {
    if (!selectedSub || !selectedTestLevel || !selectedMcqCount) {
      alert("Select all the fields to generate the test.");
      return;
    }
  
    const prompt = `Generate ${selectedMcqCount} multiple choice questions (MCQs) on the ${selectedSub} with correct answer and its explanation and the difficulty level should be ${selectedTestLevel} in json format without nay additional text or information`;
    document.getElementById('output').textContent = "Waiting for response...";
  
    // try {
    //   const response = await fetch(`http://localhost:8080/api/azure/ask`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ question: prompt })
    //   });
  
    //   const data = await response.json();
      
    //   // Try parsing response to JSON if it's in string format
    //   let finalOutput;
    //   try {
    //     finalOutput = JSON.parse(data.response); // If it's already JSON stringified
    //   } catch {
    //     finalOutput = data.response; // If it's already an object or plain text
    //   }

      
  
    //   document.getElementById('output').textContent = JSON.stringify(finalOutput, null, 2);
    // } catch (error) {
    //   console.error(error);
    //   document.getElementById('output').textContent = "Error contacting the backend.";
    // }

    const url = 'https://search-gpt.p.rapidapi.com/';
    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': 'feadc20307mshce0f7748bf3b295p129955jsn74351c7f23c6',
        'x-rapidapi-host': 'search-gpt.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      body: {
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
  

  function handleSubjectChange(e){
    setSelectedSub(e.target.value);
    // console.log(e.target.value);
  }

  function handleTestLevelChange(e){
    setSelectedTestLevel(e.target.value);
  }

  function handleMcqCountChange(e){
    setSelectedMcqCount(e.target.value);
  }

  const [testName, setTestName] = useState("")

  function handleTestName(error){
    setTestName((prev)=>{error.target.value})
  }

  const [testImageUrl, setTestImageUrl] = useState("")

  function handleTestImageUrl(error){
    setTestImageUrl((prev)=>error.target.value)
  }
  
  return (
    <div className='clientDiv'>
      <div className='backgroundDiv'>
        <div className='testSeries'>
            <div className='justifycontentSE'>
              <label htmlFor="examName">Exam Name</label>
              <input type="text" id='examName' value={testName} onChange={handleTestName}/>
            </div>
            <div className='justifycontentSE'>
              <label htmlFor="imgUrl">Provide Image Url</label>
              <input type="text" id='examName' value={testName} onChange={handleTestImageUrl}/>
            </div>
            <div className='justifycontentSE'>
              <label htmlFor="subjectSelect">Select Subject</label>
              <select name="" id="subjectSelect" onChange={handleSubjectChange}>
                <option value="">Select option</option>
                <option value="java">Java</option>
                <option value="C Programming">C</option>
                <option value="C++ Programming">C++</option>
                <option value="DBMS">DBMS</option>
                <option value="Web Development">WEB DEVELOPMENT</option>
                <option value="Aptitude">APTITUDE</option>
              </select>
            </div>
          <div className='justifycontentSE'>
            <label htmlFor="SelectTestLevel">Select Test Level</label>
            <select name="" id="SelectTestLevel" onChange={handleTestLevelChange}>
            <option value="">Select option</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Harm">Hard</option>
              <option value="Compete">Compete</option>
            </select>
          </div>
          <div className='justifycontentSE'>
            <label htmlFor="mcqCount">Select No of Mcq's</label>
            <select name="" id="mcqCount" onChange={handleMcqCountChange}>
            <option value="">Select option</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              {/* <option value="25">25</option>
              <option value="30">30</option>
              <option value="25">35</option>
              <option value="40">40</option> */}
            </select>
          </div>
          <div className='justifycontentSE'>
            <label htmlFor="selectTestType">Select Test Category</label>
            <select name="" id="selectTestType">
              <option value="">Select option</option>
              <option value="weeklyTest">Weekly Test</option>
              <option value="monthlyTest">Monthly Test</option>
            </select>
          </div>
          <div className='justifycontentSE'>
            <label htmlFor="testDate">Test Date</label>
            <input type="date" name="" id="testDate" className='' />
          </div>
          <div className='justifycontentSE' onClick={GenerateTestQuestions}>
            <button className='saveButtonVisible'>Generate</button>
          </div>
        </div>
        <pre id="output">Response will appear here...</pre>
      </div>

      {/* <div>
        Add New Event
      </div> */}
    </div>
  )
}

export default TestSeries