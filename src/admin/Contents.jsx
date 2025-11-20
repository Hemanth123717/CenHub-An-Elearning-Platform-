import React, { useEffect, useState } from 'react'
import "./css/Content.css"

const Contents = () => {
    const clientApiUrl = import.meta.env.VITE_CLIENT_API_URL;
    const [subjectsList, setSubjectsList] = useState([])
    // console.log(subjectsList);

    const [questions, setQuestions] = useState([]);
    const [contentEditPanel, setContentEditPanel] = useState(false);
    const [specificContnet, setSpecificContent] = useState(false);
    const [Updated, setUpdated] = useState(false)
    const [removed, setRemoved] = useState(false)
    const [subsLoading, SetSubsLoading] = useState(true);
    const [loading, SetLoading] = useState(true);

    useEffect(()=>{
        SetSubsLoading(true);
        fetch(`${clientApiUrl}/api/SubjectsList/getAllSubjects`,{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        })
        .then((response)=>(response.json()))
        .then((json)=>{
            setSubjectsList(json);
            SetSubsLoading(false);
        })
    }, [])

    // useEffect(()=>{
    //     // setSubjectsList("C")
    //     // fetch("http://localhost:8080/api/JavaEasy/allQuestions", {
    //     //     method:"GET",  
    //     // }).then((response)=>response.json())
    //     // .then((json)=>setQuestions(json))
    //     // .catch((error)=>console.error(error))
    //     if(subjectsList) {
    //         fetch(`${clientApiUrl}/api/JavaEasy/findByStatus/active`, {
    //             method:"GET",  
    //         }).then((response)=>response.json())
    //         .then((json)=>setQuestions(json))
    //         .catch((error)=>console.error(error))
    //     }
    // }, [subjectsList, removed])


    function openContentEditPanel(id){
        if(!id){
            setContentEditPanel(false)
            return
        }
        setContentEditPanel(true)
        fetch(`${clientApiUrl}/api/${selectedSub}/${selectedSub}Question/${id}`,
            {
                method:"GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }
            }
        ).then((response)=>response.json()).then((json)=>setSpecificContent(json)).catch((error)=>console.error(error))
    }

    const [questionRemoved, setQuestionRemoved] = useState(
        {
            status:'removed'
        }
    )

    function updateQuestionStatus(id){
        if(!id){
            alert("Server Issue")
            return
        }

        fetch(`${clientApiUrl}/api/${selectedSub}/update${selectedSub}/${id}`, {
            method : 'PATCH',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },body: JSON.stringify(questionRemoved),})
        .then(data=>{
            setRemoved((prev)=>!prev)
            console.log(`${id} question Removed`);
            // setPendingFetched(false);
            // setReqList(true);
            onChangeSubject(selectedSub);
          })
          .catch((error) => console.error("Error: ", error));
    }

    const [addQuestionVisible, setAddQuestionVisible] = useState(false)
    function addQuestionFun(){
        setAddQuestionVisible(true);
    }



    function onChangeCurrentQuestion(e){
        const {id, value} = e.target;
        setSpecificContent((prevState)=>({
            ...prevState,
            [id]: value
        }))
    }

    function updateCurrentQuestion(){
        console.log("updateCurrentQuestion")
        if(specificContnet === null){
            alert("Server Issue")
            return;
        }
        setUpdated(true)
        fetch(`${clientApiUrl}/api/${selectedSub}/update${selectedSub}/${specificContnet.id}`, {
            method:"PATCH",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(specificContnet),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // Parse response JSON
        })
        .then(data=>{
        console.log(`${id} Updated`);
        })
        .catch((error) => console.error("Error: ", error))
        .finally(() => {
            setTimeout(() => {
                setUpdated(false);
            }, 300);
        });
    }

    const [showExcelData, setShowExcelData] = useState(false);

    function addExcelSheetData(){
        setShowExcelData(true);
    }

    const [selectedSub, setSelectedSub] = useState("");
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

      function onChangeSubject(subject){
            // setSubjectsList("C")
        // fetch("http://localhost:8080/api/JavaEasy/allQuestions", {
        //     method:"GET",  
        // }).then((response)=>response.json())
        // .then((json)=>setQuestions(json))
        // .catch((error)=>console.error(error))
        if(subject) {
            fetch(`${clientApiUrl}/api/${subject}/findByStatus/active`, {
                method:"GET",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json"
                }  
            }).then((response)=>response.json())
            .then((json)=>setQuestions(json))
            .catch((error)=>console.error(error))
        }
        SetLoading(false);
      }

  return (
    <div className='clientDiv'>
        {
            showExcelData
            ?
            (
                <div className='backgroundDivForExcelSheet' onClick={()=>setShowExcelData(false)}>
                    <div></div>
                </div>
            )
            :
            <div></div>
        }
        <div className='backgroundDiv backgroundDivContent'>
        <div className={`${addQuestionVisible ? 'addQuestionMainDivVisible' : 'addQuestionMainDivHide'}`}>
            <div className={`${addQuestionVisible ? 'addQuestionBackgroundBlurVisible' : 'addQuestionBackgroundBlurHide'}`} onClick={()=>setAddQuestionVisible(false)}></div>
            <div className={`${addQuestionVisible ? 'addQuestionFormDivVisible' : 'addQuestionFormDivHide'}`}>
                    <div  className={`${addQuestionVisible ? 'addQuestionDivVisible': 'addQuestionDivHidden'}`}>
                        <label htmlFor="question" className='question'>Question</label><br />
                        <input type="text" className='AddQuestionInput'/>
                    </div>
                    <div className={`${addQuestionVisible ? 'allAddQuestionOptionsVisible': 'allAddQuestionOptionsHidden'}`}>
                        <div  className={`${addQuestionVisible ? 'optionAddQuestionVisible': 'optionAddQuestionHidden'}`}>
                            <label htmlFor="option1" className={`${addQuestionVisible ? 'optionsAddQuestionLabelVisible': 'optionsAddQuestionLabelHidden'}`}>option 1</label><br />
                            <input type="text" className={`${addQuestionVisible ? 'optionAddQuestionInputVisible': 'optionAddQuestionInputHidden'}`}/>
                        </div>
                        <div  className={`${addQuestionVisible ? 'optionAddQuestionVisible': 'optionAddQuestionHidden'}`}>
                            <label htmlFor="option2" className={`${addQuestionVisible ? 'optionsAddQuestionLabelVisible': 'optionsAddQuestionLabelHidden'}`}>option 2</label><br />
                            <input type="text" className={`${addQuestionVisible ? 'optionAddQuestionInputVisible': 'optionAddQuestionInputHidden'}`}/>
                        </div>
                        <div  className={`${addQuestionVisible ? 'optionAddQuestionVisible': 'optionAddQuestionHidden'}`}>
                            <label htmlFor="option3" className={`${addQuestionVisible ? 'optionsAddQuestionLabelVisible': 'optionsAddQuestionLabelHidden'}`}>option 3</label><br />
                            <input type="text" className={`${addQuestionVisible ? 'optionAddQuestionInputVisible': 'optionAddQuestionInputHidden'}`}/>
                        </div>
                        <div  className={`${addQuestionVisible ? 'optionAddQuestionVisible': 'optionAddQuestionHidden'}`}>
                            <label htmlFor="option4" className={`${addQuestionVisible ? 'optionsAddQuestionLabelVisible': 'optionsAddQuestionLabelHidden'}`}>option 4</label><br />
                            <input type="text" className={`${addQuestionVisible ? 'optionAddQuestionInputVisible': 'optionAddQuestionInputHidden'}`}/>
                        </div>
                        <div  className={`${addQuestionVisible ? 'optionAddQuestionVisible': 'optionAddQuestionHidden'}`}>
                            <label htmlFor="answer" className={`${addQuestionVisible ? 'optionsAddQuestionLabelVisible': 'optionsAddQuestionLabelHidden'}`}>Answer</label><br />
                            <input type="text" className={`${addQuestionVisible ? 'optionAddQuestionInputVisible': 'optionAddQuestionInputHidden'}`}/>
                        </div>
                        <div className={`${addQuestionVisible ? 'addQuestionSaveButDivVisible' : 'addQuestionSaveButDivHide'}`}>
                            <button className={`${addQuestionVisible ? 'addQuestionSaveButtonVisible' : 'addQuestionSaveButtonHide'}`}>Add</button>
                        </div> 
                    </div>
                    {/* <div></div> */}
            </div>
        </div>
        <div className={`${contentEditPanel ? 'clientEditPanelVisible' : 'clientEditPanelHide'}`}>
                <div className='backgroundBlur' onClick={()=>openContentEditPanel(null)}>
                    {/* clientEditPanel */}
                </div>
                <div className={`${contentEditPanel ? 'ClientFormDivVisible' : 'ClientFormDivHide'}`} onClick={(e) => e.stopPropagation()}>
                <div className={`${Updated ? 'clientEditUpdatedVisible' : 'clientEditUpdatedHidden'}`}>Updated</div>
                    {/* clientForm */}
                    {
                        specificContnet != null
                        ?
                            <div className={`${contentEditPanel ? 'editClientFormDivVisible' : 'editClientFormDivHide'}`}>
                                <div  className={`${contentEditPanel ? 'editQuestionDivVisible': 'editQuestionDivHidden'}`}>
                                    <label htmlFor="question" className='question'>Question</label>
                                    <input type="text" className='questionInput' id='question' defaultValue={specificContnet.question} onChange={onChangeCurrentQuestion}/>
                                </div>
                                <div className={`${contentEditPanel ? 'allOptionsVisible': 'allOptionsHidden'}`}>
                                    <div  className={`${contentEditPanel ? 'optionVisible': 'optionHidden'}`}>
                                        <label htmlFor="option1" className={`${contentEditPanel ? 'optionsLabelVisible': 'optionsLabelHidden'}`}>option 1</label>
                                        <input type="text" className={`${contentEditPanel ? 'optionInputVisible': 'optionInputHidden'}`} id='option1' defaultValue={specificContnet.option1} onChange={onChangeCurrentQuestion}/>
                                    </div>
                                    <div  className={`${contentEditPanel ? 'optionVisible': 'optionHidden'}`}>
                                        <label htmlFor="option2" className={`${contentEditPanel ? 'optionsLabelVisible': 'optionsLabelHidden'}`}>option 2</label>
                                        <input type="text" className={`${contentEditPanel ? 'optionInputVisible': 'optionInputHidden'}`} id='option2' defaultValue={specificContnet.option2} onChange={onChangeCurrentQuestion}/>
                                    </div>
                                    <div  className={`${contentEditPanel ? 'optionVisible': 'optionHidden'}`}>
                                        <label htmlFor="option3" className={`${contentEditPanel ? 'optionsLabelVisible': 'optionsLabelHidden'}`}>option 3</label>
                                        <input type="text" className={`${contentEditPanel ? 'optionInputVisible': 'optionInputHidden'}`} id='option3' defaultValue={specificContnet.option3} onChange={onChangeCurrentQuestion}/>
                                    </div>
                                    <div  className={`${contentEditPanel ? 'optionVisible': 'optionHidden'}`}>
                                        <label htmlFor="option4" className={`${contentEditPanel ? 'optionsLabelVisible': 'optionsLabelHidden'}`}>option 4</label>
                                        <input type="text" className={`${contentEditPanel ? 'optionInputVisible': 'optionInputHidden'}`} id='option4' defaultValue={specificContnet.option4} onChange={onChangeCurrentQuestion}/>
                                    </div>
                                    <div  className={`${contentEditPanel ? 'optionVisible': 'optionHidden'}`}>
                                        <label htmlFor="answer" className={`${contentEditPanel ? 'optionsLabelVisible': 'optionsLabelHidden'}`}>Answer</label>
                                        <input type="text" className={`${contentEditPanel ? 'optionInputVisible': 'optionInputHidden'}`} id='correctAnswer' defaultValue={specificContnet.correctOption} onChange={onChangeCurrentQuestion}/>
                                    </div>
                                    <div className={`${contentEditPanel ? 'addQuestionSaveButDivVisible' : 'addQuestionSaveButDivHide'}`}>
                                        <button className={`${contentEditPanel ? 'addQuestionSaveButtonVisible' : 'addQuestionSaveButtonHide'}`} onClick={()=>updateCurrentQuestion(specificContnet.id)}>Update</button>
                                    </div>
                                </div>
                                <div></div>
                            </div>
                        :
                        <div></div>
                    }
                </div>
            </div>
            <div className='content'>
                <div className='contentLeftLayout'>
                    {/* <div className='contentTitle'>SUBJECTS</div> */}
                    <div className='contentSubjects'>
                        <div className='subjectsListUL'>
                            {
                                subsLoading
                                ?
                                    (
                                        <p>Loading Subjects...</p>
                                    )
                                :
                                (
                                    subjectsList.length > 0 
                                    ?
                                        subjectsList.map((subject)=>{
                                            // <div className={`subjectsList ${subjectsList === "C" ? 'changeSubjectBackgroundToWhite' : ''}`} onClick={()=>setSubjectsList("C")}>Java</div>
                                            // console.log(subject.name);
                                            return <div key={subject.id} className={`subjectsList ${selectedSub===subject.name ? 'changeSubjectBackgroundToWhite' : ''}`} onClick={()=>{setSelectedSub(subject.name), onChangeSubject(subject.name)}}>{subjectDisplayNames[subject.name] || subject.name}</div>
                                        })
                                    :
                                        <div>No Subjects Exist</div>
                                )
                            }
                        </div>
                    <div className='addNewSubButtonDiv'>
                        <button className='addNewSubButton'>Add Subject</button>
                    </div>
                    </div>
                </div>
                {
                    selectedSub === ""
                    ?
                    (<div>No subject is selected</div>)
                    :
                        loading
                        ?
                            <p>Loading Questions....</p>
                        :
                        (<div className={`contentRightLayout ${selectedSub ? "subjectsListVisible" : "subjectsListHide" }`}>
                            <div className='questionsList'>
                                <div className='questionsStatic'>
                                    Questions List
                                </div>
                                {
                                    questions && questions.length>0
                                    ?
                                    (questions.map((question)=>(
                                        <div className='questionsDiv' key={question.id}>
                                            {/* <div className='questions' onClick={()=>{editQuestion(question.id)}}> */}
                                            <div className='questions'>
                                                {question.question}
                                            </div>
                                            <div className='questionEdit' onClick={()=>openContentEditPanel(question.id)}>✏️</div>
                                            <div className='questionDelete' onClick={()=>updateQuestionStatus(question.id)}>🗑️</div>
                                        </div>
                                        )))
                                    :
                                    (
                                        <div className='serverIssueDiv'>
                                            {/* <div className='serverIssue'>Server issue</div> */}
                                            <div>Server Issue</div>
                                        </div>
                                    )
                                }
                            </div>
                            <div className='questionsAddDiv'>
                                <button className='addQuestion' onClick={addQuestionFun}>Add Question</button>
                                <button className='addQuestionExcelSheet' onClick={addExcelSheetData}>Excel Sheet</button>
                            </div>
                        </div>)
                }
            </div>
        </div>
    </div>
  )
}

export default Contents