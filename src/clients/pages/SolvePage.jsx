import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';
// import './App.css';
import "./css/SolvePage.css"
import { getUserCenID, isTokenExpired } from '../../utils/useAuth';

const boilerplateMap = {
  c: `#include <stdio.h>\n\nint main() {\n    // Write your code here\n    return 0;\n}`,
  cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your code here\n    return 0;\n}`,
  java: `class Main {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}`,
  python: `# Write your code here\nprint("Hello, World!")`,
};

const lightTheme = EditorView.theme({
  '&': {
    backgroundColor: '#ffffff',
    color: '#000000',
  },
});

const darkTheme = EditorView.theme({
  '&': {
    backgroundColor: '#0A192F',
    color: '#ffffff',
  },
});

function SolvePage() {

  const userNavigate = useNavigate();
  const apiUrl = import.meta.env.VITE_CLIENT_API_URL;
  const { id } = useParams();
  const [language, setLanguage] = useState('c');
  const [code, setCode] = useState(boilerplateMap['c']);
  const [output, setOutput] = useState('');
  const [time, setTime] = useState(0);
  const [showInputBox, setShowInputBox] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [questionHeading, setQuestionHeading] = useState('Question');
  const [testCaseResults, setTestCaseResults] = useState([]);
  const [expandedTestCases, setExpandedTestCases] = useState([]);
  const [questionData, setQuestionData] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(()=>{
    const token = localStorage.getItem("token");
                  
                          if (!token || isTokenExpired(token)) {
                              localStorage.removeItem("token");
                              userNavigate("/login");
                              return;
                          }
                  
                          // console.log("Token found =>", token);
  })

  useEffect(() => {
    fetch(`${apiUrl}/run/question/${id}`,{
        method: "GET",
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json" }
      })
      .then((response) => response.json())
                      .then((json) => {
                          setQuestionData(json);
                      })
                      .catch((error) => {
                          alert("Server Issue"+error);
                          // setLoading(false);
                      });
    // const fetchQuestion = async () => {
    //   try {
    //     const res = await fetch(`http://localhost:8080/run/question/${id}`);
    //     const data = await res.json();
    //     setQuestionData(data);
    //   } catch (err) {
    //     console.error("Failed to fetch question:", err);
    //   }
    // };
    // fetchQuestion();
  }, [id]);
  // useEffect(() => {
  //   fetch(`${apiUrl}/run/question/${id}`, {
  //     method: "GET",
  //     headers: { 
  //       "Authorization": `Bearer ${localStorage.getItem("token")}`,
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }
  //       return response.json();
  //     })
  //     .then((json) => {
  //       setQuestionData(json);
  //     })
  //     .catch((error) => {
  //       alert("Server Issue: " + error.message);
  //       console.error("Fetch question error:", error);
  //     });
  // }, [id]);


  const formatTime = (t) => {
    const h = String(Math.floor(t / 3600)).padStart(2, '0');
    const m = String(Math.floor((t % 3600) / 60)).padStart(2, '0');
    const s = String(t % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const getLanguageExtension = () => {
    switch (language) {
      case 'c':
      case 'cpp': return cpp();
      case 'java': return java();
      case 'python': return python();
      default: return cpp();
    }
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => setCode(event.target.result);
    reader.readAsText(file);
  };

  const handleReset = () => {
    setCode(boilerplateMap[language]);
    setOutput('');
    setCustomInput('');
    setTestCaseResults([]);
    setExpandedTestCases([]);
  };

  const handleRun = async () => {
  setOutput('');
  setTestCaseResults([]);
  setExpandedTestCases([]);
  setIsRunning(true);

  fetch(`${apiUrl}/run/test-cases/${id}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ language, code }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        console.log(json)
        if (Array.isArray(json)) {
          setTestCaseResults(json);
          setExpandedTestCases(Array(json.length).fill(false));
        } else if (json.error) {
          setOutput(json.error);
        } else {
          setOutput('Unexpected response from server.');
        }
      })
      .catch((error) => {
        console.error(error);
        setOutput('Error connecting to backend.');
      })
      .finally(() => {
        setIsRunning(false);
      });
  };

  function handleRunSubmit(){
    if(testCaseResults.length === 0 || testCaseResults.length < 0){
      alert("Run before Submiting");
      return;
    }
    setOutput('');
    setTestCaseResults([]);
    setExpandedTestCases([]);
    setIsRunning(true);

    const token = localStorage.getItem('token');
    const cenId = getUserCenID(token)

    const timeTaken = time;
    const clientId = cenId;
    console.log("Id => ",id," Language => ",language," Code => ",code," TimeTaken => ",timeTaken," ClientID => ",clientId)
    const questionId = id;

    const submissionRequest = {
      clientId: cenId,       // example
      questionId: id,     // example
      language: language,
      code: code,
      timeTaken: time       // in seconds or milliseconds
    };

    fetch(`${apiUrl}/run/submit`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(submissionRequest),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        // .then((json) => {
        //   console.log(json)
        //   if (Array.isArray(json)) {
        //     setTestCaseResults(json);
        //     setExpandedTestCases(Array(json.length).fill(false));
        //   } else if (json.error) {
        //     setOutput(json.error);
        //   } else {
        //     setOutput('Unexpected response from server.');
        //   }
        // })
        .catch((error) => {
          console.error(error);
          setOutput('Error connecting to backend.');
        })
        .finally(() => {
          setIsRunning(false);
        });
  }

  
  const handleRunWithCustomInput = () => {
    setOutput('');
    setTestCaseResults([]);
    setExpandedTestCases([]);
    setIsRunning(true);

    fetch(`${apiUrl}/run`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ language, code, input: customInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setOutput(`Error: ${data.error}`);
        } else {
          setOutput(data.output || 'No output');
        }
      })
      .catch((error) => {
        console.error(error);
        setOutput('Error connecting to backend.');
      })
      .finally(() => {
        setIsRunning(false);
      });
  };




  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    setCode(boilerplateMap[selectedLang]);
  };

  const toggleTestCase = (index) => {
    const updated = [...expandedTestCases];
    updated[index] = !updated[index];
    setExpandedTestCases(updated);
  };

  const passedCount = testCaseResults.filter(tc => tc.status === "Pass").length;
  const failedCount = testCaseResults.length - passedCount;

  return (
    <div className='container'>
      <div className='Questionpanel'>
        <div className='CodingMainQuestionsHead'>
          <div className='returnCodingToTestSeries' onClick={()=>userNavigate("/testSeries")}>⬅ Back</div>
          <p>{questionHeading}</p>
        </div>
        <div className='qbuttons'>

          <button onClick={() => setQuestionHeading('Question')}>Question</button>
          <button onClick={() => setQuestionHeading('Submissions')}>Submissions</button>
          <button onClick={() => setQuestionHeading('Community')}>Community</button>
        </div>

        {questionData && questionHeading === "Question" && (
          <div className='question-content'>
            <h3><strong>{questionData.title}</strong></h3>
            <h3><strong>Difficulty:</strong> {questionData.difficulty}</h3>
            <h3>{questionData.question}</h3>
            <h3><strong>Sample Input:</strong></h3>
            <pre>{questionData.sampleInput}</pre>
            <h3><strong>Sample Output:</strong></h3>
            <pre>{questionData.sampleOutput}</pre>
          </div>
        )}
      </div>

      <div className='editorpanel'>
        <div className='coding_top_layout'>
          <div className='timer'>
            <p>Timer: {formatTime(time)}</p>
          </div>
          <div className='top_controls_right'>
            <label htmlFor='language-select'>Choose Language:</label>
            <select id='language-select' value={language} onChange={handleLanguageChange}>
              <option value='c'>C</option>
              <option value='cpp'>C++</option>
              <option value='java'>Java</option>
              <option value='python'>Python</option>
            </select>
            <button onClick={() => document.getElementById('fileInput').click()}>Import</button>
            <input
              type='file'
              id='fileInput'
              accept='.c,.cpp,.java,.py,.txt'
              style={{ display: 'none' }}
              onChange={handleImport}
            />
            <button onClick={handleReset}>Reset</button>

            {/* 🔁 THEME TOGGLE SWITCH */}
            <div className="theme-toggle" onClick={() => setIsDarkTheme(prev => !prev)} title="Toggle Theme">
              <div className={`toggle-track ${isDarkTheme ? 'dark' : 'light'}`}>
                <div className="toggle-circle" />
              </div>
            </div>

          </div>
        </div>

        <div className='middle'>
          <CodeMirror
            value={code}
            height='40vh'
            width='100%'
            theme={isDarkTheme ? [oneDark, darkTheme] : lightTheme}
            extensions={[getLanguageExtension()]}
            onChange={(value) => setCode(value)}
          />
        </div>

        <div className='options'>
          <button onClick={() => setShowInputBox(!showInputBox)}>Custom Input</button>
          <button className='compile' onClick={customInput.trim() ? handleRunWithCustomInput : handleRun}>Run</button>
          <button className='submit' onClick={handleRunSubmit}>Submit</button>
        </div>

        {showInputBox && (
          <div className='input-area'>
            <textarea
              rows='4'
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder='Enter custom input here...'
            />
          </div>
        )}

        <div className='terminal'>
          <p>Terminal Output:</p>
          {isRunning && <p>⏳ Running test cases...</p>}
          {output && <pre>{output}</pre>}

          {testCaseResults.length > 0 && (
            <div className="summary-counts">
              <p><strong>Total Test Cases:</strong> {testCaseResults.length}</p>
              <p><strong>Passed:</strong> {passedCount}</p>
              <p><strong>Failed:</strong> {failedCount}</p>
            </div>
          )}

          {/* {testCaseResults.length > 0 && (
            <div className='testcases'>
              {testCaseResults.map((tc, index) => {
                const isPass = tc.status === 'Pass';
                return (
                  <div
                    key={index}
                    className={`testcase-summary ${isPass ? 'pass' : 'fail'}`}
                    onClick={() => toggleTestCase(index)}
                  >
                    <div className='testcase-title'>
                      {isPass ? '✓' : '✗'} <strong>Test Case {index + 1}</strong>
                    </div>
                    {expandedTestCases[index] && (
                      <div className='testcase-details'>
                        <div className='testcase-line'>Input: {tc.input.trim()}</div>
                        <div className='testcase-line'>Expected Output: {tc.expectedOutput}</div>
                        <div className='testcase-line'>Actual Output: {tc.actualOutput}</div>
                        <div className='testcase-status'>{tc.status}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )} */}

          {testCaseResults.length > 0 && (
            <div className='testcases'>
              {testCaseResults.map((tc, index) => {
                const isPass = tc.status === 'Pass';
                const isAccessible = index < 2; // Only allow first 2 test cases

                return (
                  <div
                    key={index}
                    className={`testcase-summary ${isPass ? 'pass' : 'fail'} ${!isAccessible ? 'locked' : ''}`}
                    onClick={() => {
                      if (isAccessible) toggleTestCase(index);
                    }}
                    style={{ cursor: isAccessible ? 'pointer' : 'not-allowed', opacity: isAccessible ? 1 : 0.6 }}
                  >
                    <div className='testcase-title'>
                      {isPass ? '✓' : '✗'} <strong>Test Case {index + 1}</strong>
                      {!isAccessible && <span style={{ marginLeft: '8px', color: 'gray' }}>(Hidden)</span>}
                    </div>

                    {isAccessible && expandedTestCases[index] && (
                      <div className='testcase-details'>
                        <div className='testcase-line'>Input: {tc.input.trim()}</div>
                        <div className='testcase-line'>Expected Output: {tc.expectedOutput}</div>
                        <div className='testcase-line'>Actual Output: {tc.actualOutput}</div>
                        <div className='testcase-status'>{tc.status}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default SolvePage;
