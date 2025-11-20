import React, { useEffect, useState } from 'react'
import "./css/ClientControl.css"
import { Route, Routes } from 'react-router-dom'
import showImg from "../Images/show.jpg"
import AddClientsExcel from './AddClientsExcel'

const UpdatedClientControl = () => {
  const clientApiUrl = import.meta.env.VITE_CLIENT_API_URL;
  const [isVisible, setIsVisible] = useState(false);
  const [addRemove, setAddRemove] = useState(true);
  const [showPass, setShowPass] = useState(true)

  // useEffect(()=>{
  //   setAddRemove()
  // })

  function onClickAdd(){
    setAddRemove((prev)=>true)
  }

  function onClickRemove(){
    setAddRemove((prev)=>false)
  }

  useEffect (()=>{
    const timer = setTimeout(()=>{
      setIsVisible(true);
    }, 200);
    return () => clearTimeout(timer)
  }, []);

  // function showPassToText(){
  //   document.getElementById("pass").type = "text";
  //   setShowPass((prev)=>true)
  // }

  function showTextToPass(){
    // document.getElementById("pass").type = "password";
    setShowPass((prev)=>!prev)
  }

  const [clientName, setClientName] = useState("")
  const [clientPassword, setClientPassword] = useState("")
  const [clientMail, setClientMail] = useState("")
  const [clientNumber, setClientNumber] = useState("")
  const [clientCenId, setClientCenId] = useState("")
  const [addClientVisible, setAddClientVisible] = useState(false)
  const [loadingScreen, setLoadingScreen] = useState(false)

  function enableLoading(){
    setLoadingScreen(true)
  }

  function disableLoading(){
    setLoadingScreen(false)
  }

  function addNewClient(){
    if(clientName == "" || clientMail == "" || clientCenId == "" || clientNumber == "" || clientPassword == ""){
      alert("Fill all the details")
    }
    else{
      enableLoading();
      fetch(`${clientApiUrl}/api/Client/addClient`, {
        method: "POST",
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json" },
        body: JSON.stringify({
          name: clientName,
          mailId: clientMail,
          cenId: clientCenId,
          contactNo: clientNumber,
          password: clientPassword,
        }),
      }).then((response)=>{
        if(!response.ok) {
          disableLoading();
          alert("Invalid Data")
          throw new Error("Invalid Data");
      }
      return response.json();
      }).then(()=>{
          setAddClientVisible(true);
          return new Promise((resolve) => setTimeout(resolve, 2000));
      })
      .then(()=>{setAddClientVisible(false)})
      .catch((error)=>{
        disableLoading();
        (console.error(error))

        if (error.message === "Failed to fetch") {
          alert("Server Issue: Unable to connect.");
        } else {
          alert("An error occurred: " + error.message);
        }
      }).finally(() => disableLoading());
    
      // if (response.ok) {
      //   alert("Client added successfully");
        setClientName("");
        setClientMail("");
        setClientCenId("");
        setClientNumber("");
        setClientPassword("");
      // } else {
      //   alert("Failed to add client or Client Already Exist");
      // }
    }
  }

  function handleNameInput(e){
    setClientName(e.target.value)
  }

  function handlePasswordInput(e){
    setClientPassword(e.target.value)
  }

  function handleMailInput(e){
    setClientMail(e.target.value)
  }

  function handleClientNumberInput(e){
    setClientNumber(e.target.value)
  }

  function handleCenIdInput(e){
    setClientCenId(e.target.value)
  }

  const [confirmCenIdRemove, setConfirmCenIdRemove] = useState("")
  const [cenIdRemove, setCenIdRemove] = useState("")
  const [removeClientVisible, setRemoveClientVisible] = useState(false)

  function removeClient(){
    if(!confirmCenIdRemove || !cenIdRemove){
      alert("Fill all the details")
      return
    }

    if(confirmCenIdRemove === cenIdRemove){
      // fetch(`http://localhost:8080/api/Client/updateClientByCenId/${cenIdRemove}`,{
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     status : "removed"
      //   }),
      // }).then(()=>{
      //     setRemoveClientVisible(true);
      //     return new Promise((resolve) => setTimeout(resolve, 2000));
      // })
      // .then(()=>{setRemoveClientVisible(false)})
      // .catch((error)=>(console.error(error)))
      // // })
      // setCenIdRemove("")
      // setConfirmCenIdRemove("")
      // fetch(`http://localhost:8080/api/Client/clientByCenId/${cenIdRemove}`, {
      //   method: "GET",
      //   headers: { "Content-Type": "application/json" },
      // })
      // .then((response) => response.json())
      // .then((json) => {
      //   if (json && json.status !== "removed") {
      //     return fetch(`http://localhost:8080/api/Client/updateClientByCenId/${cenIdRemove}`, {
      //       method: "PATCH",
      //       headers: { "Content-Type": "application/json" },
      //       body: JSON.stringify({ status: "removed" }),
      //     });
      //   } else {
      //     throw new Error("Client already removed or does not exist");
      //   }
      // })
      // .then(() => {
      //   setRemoveClientVisible(true);
      //   setTimeout(() => setRemoveClientVisible(false), 2000);
      // })
      // .catch((error) => {
      //   console.error(error);
      //   alert("Error removing client");
      // });

      enableLoading();
      fetch(`${clientApiUrl}/api/Client/clientByCenId/${cenIdRemove}`, { 
        method: "GET",
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json" },
       })
      .then((response) => {
          if (!response.ok) {
              throw new Error("Client not found");
          }
          return response.json();
      })
      .then((json) => {
          if (json.status !== "removed") {
              return fetch(`${clientApiUrl}/api/Client/updateClientByCenId/${cenIdRemove}`, {
                  method: "PATCH",
                  headers: { 
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json" },
                  body: JSON.stringify({ status: "removed" }),
              }).then(()=>{
                  setRemoveClientVisible(true);
                  setTimeout(() => setRemoveClientVisible(false), 2000);
              });
          } else {
              throw new Error("Client already removed");
          }
      })
      // .then(() => {
      //     setRemoveClientVisible(true);
      //     setTimeout(() => setRemoveClientVisible(false), 2000);
      // })
      .catch((error) => {
          console.error(error);
          disableLoading();
          alert(error.message);
      })
      .finally(() => disableLoading());

    
      setCenIdRemove("");
      setConfirmCenIdRemove("");
    }
    else{
      alert("check the CenID")
    }
  }

  function handleCenIdRemove(e){
    setCenIdRemove(e.target.value)
  }

  function handleConfirmCenIdRemove(e){
    setConfirmCenIdRemove(e.target.value)
  }

  return (
    // <div className='clientDiv'>
    <div className={`clientDiv ${isVisible ? "visiblebackgroundDiv" : "hiddenbackgroundDiv"}`}>
        <div className={`${loadingScreen ? 'loadingScreenDivVisible' : 'loadingScreenDivHide'}`}></div>
        <div className={`${addClientVisible ? "addNewClientVisible" : "addNewClientHidden" }`}></div>
        <div className={`${removeClientVisible ? "removeClientVisible" : "removeClientHidden" }`}></div>
        {/* Client */}
        <div className='backgroundDiv'>
          <div className='centerDiv'>
            <div className='flexDiv'>
              <div className={`clientAdd ${addRemove ? 'clientAddTrue' : 'clientAddFalse'}`} onClick={onClickAdd}><div className='clientAddRemove'>Add</div></div>
              <div className={`clientRemove ${addRemove ? 'clientRemoveFalse' : 'clientRemoveTrue'}`} onClick={onClickRemove}><div className='clientAddRemove'>Remove</div></div>
            </div>
            { addRemove

              ? 
              <div className='dataDiv'>
                <AddClientsExcel/>
              </div>
            :
            <div className='dataDiv'>
              <div className='removeForm'>
                <div className='cenIdDiv'>
                  <label htmlFor="cenId" className='removeCenIdLabel'>CenId</label>
                  <br />
                  <input type="text" id='cenId' className='addCenIdInput' required value={cenIdRemove} onChange={handleCenIdRemove}/>
                </div>
                <div className='confirmCenIdDiv'>
                  <label htmlFor="confirmCenId" className='removeConfirmCenIdLabel'>Confirm CenId</label>
                  <br />
                  <input type="text" id='confirmCenId' className='confirmCenIdInput' required value={confirmCenIdRemove} onChange={handleConfirmCenIdRemove}/>
                </div>
                <div>
                  <button className='removeButDiv' onClick={()=>removeClient()}>Remove</button>
                </div>
              </div>
            </div>
            }
          </div>
        </div>
    </div>
  )
}

export default UpdatedClientControl