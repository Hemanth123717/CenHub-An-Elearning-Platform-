import React, { useEffect, useRef, useState } from 'react'
import "./css/ViewClients.css"
import { getUserCenID, getUserRole } from '../utils/useAuth';

const ViewClients = () => {
    const clientApiUrl = import.meta.env.VITE_CLIENT_API_URL;
    const [allClients, setAllClients] = useState([]);


    // const [getUsersByStatus, setgetUsersByStatus] = useState("active")
    // const [loading, setLoading] = useState(true);
    // // const status = "active";
    // useEffect(()=>{
    //     setLoading(false)
    //     const token = localStorage.getItem("token");
    //     // console.log(`${clientApiUrl}/api/Client/allClients/active`)
    //     // fetch(`${clientApiUrl}/api/Client/clients`, {
    //     fetch(`${clientApiUrl}/api/Client/myusers/${getUsersByStatus}`, {
    //         method:"POST",
    //         headers: { 
    //             "Authorization": `Bearer ${token}`,
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             cenId: getUserCenID(token),
    //             role: getUserRole(token)
    //         })

    //     }).then((response)=>response.json())
    //     .then(json=>setAllClients(json))
    //     .catch((error)=>console.error(error))
    //     setLoading(true)
    // }, [allClients, getUsersByStatus])


    const [getUsersByStatus, setgetUsersByStatus] = useState("active");
    // const [allClients, setAllClients] = useState([]);
    const [loading, setLoading] = useState(false);

    // Handles status tab click
    const handleStatusClick = (status) => {
        if (status !== getUsersByStatus) {
            setgetUsersByStatus(status);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const token = localStorage.getItem("token");

            try {
                const response = await fetch(`${clientApiUrl}/api/Client/myusers/${getUsersByStatus}`, {
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
    }, [getUsersByStatus]);

    const clientActive = {
        status : "active"
    }

    // function ActiveClientStatus(id){
        
    //     fetch(`${clientApiUrl}/api/Client/updateClient/${id}`, {
    //         method:"PATCH",
    //         headers: { 
    //             "Authorization": `Bearer ${localStorage.getItem("token")}`,
    //             "Content-Type": "application/json" },
    //         body: JSON.stringify(clientActive),
    //     }).then(data=>{
    //     console.log(`${id} is Active`);
    //     setgetUsersByStatus("active")
    //     // setPendingFetched(false);
    //     // setReqList(true);
    //     }).catch((error) => console.error("Error: ", error));
    // }
    async function ActiveClientStatus(id, name) {
        const confirm = window.confirm(`Want to Activate ${name} account`)
        if(confirm){
            try {
                const response = await fetch(`${clientApiUrl}/api/Client/updateClientStatus/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(clientActive)  // Directly pass the status object
                });

                const result = await response.text(); // Use .text() if backend returns plain text

                if (!response.ok) {
                    console.error(`Failed to set client Activate: ${result}`);
                    alert(`Failed to set client Activate: ${result}`);
                    return;
                }

                console.log(result);
                setgetUsersByStatus("active");

            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred while updating the client status.");
            }
        }
    }




    const clientPending = {
        status : "pending"
    }

    // function PendingClientStatus(id){
        
    //     fetch(`${clientApiUrl}/api/Client/updateClient/${id}`, {
    //         method:"PATCH",
    //         headers: { 
    //             "Authorization": `Bearer ${localStorage.getItem("token")}`,
    //             "Content-Type": "application/json" },
    //         body: JSON.stringify(clientPending),
    //     }).then(data=>{
    //     console.log(`${id} is Pending`);
    //     // setPendingFetched(false);
    //     // setReqList(true);
    //     }).catch((error) => console.error("Error: ", error));
    // }

    async function PendingClientStatus(id, name) {
        const confirm = window.confirm(`Want to make ${name} account in Pending`)
        if(confirm){
            try {
                const response = await fetch(`${clientApiUrl}/api/Client/updateClientStatus/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(clientPending)  // Directly pass the status object
                });

                const result = await response.text(); // Use .text() if backend returns plain text

                if (!response.ok) {
                    console.error(`Failed to set client Pending: ${result}`);
                    alert(`Failed to set client Pending: ${result}`);
                    return;
                }

                console.log(result);
                setgetUsersByStatus("pending");

            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred while updating the client status.");
            }
        }
    }



    const clientRemoved = {
        status : "removed"
    }

    // function RemovedClientStatus(id){
        
    //     fetch(`${clientApiUrl}/api/Client/updateClient/${id}`, {
    //         method:"PATCH",
    //         headers: { 
    //             "Authorization": `Bearer ${localStorage.getItem("token")}`,
    //             "Content-Type": "application/json" },
    //         body: JSON.stringify(clientRemoved),
    //     }).then(data=>{
    //     console.log(`${id} Access Removed`);
    //     setgetUsersByStatus("removed")
    //     // setPendingFetched(false);
    //     // setReqList(true);
    //     }).catch((error) => console.error("Error: ", error));
    // }

    async function RemovedClientStatus(id, name) {
        const confirm = window.confirm(`Want to remove ${name} account`)
        if(confirm){
            try {
                const response = await fetch(`${clientApiUrl}/api/Client/updateClientStatus/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(clientRemoved)  // Directly pass the status object
                });

                const result = await response.text(); // Use .text() if backend returns plain text

                if (!response.ok) {
                    console.error(`Failed to set client Removal: ${result}`);
                    alert(`Failed to set client Removal: ${result}`);
                    return;
                }

                console.log(result);
                setgetUsersByStatus("removed");

            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred while updating the client status.");
            }
        }
    }


    const [clientEditPanel, setClientEditPanel] = useState(false);

    // function openClientEditPanel(id){
    //     setClientEditPanel((prev)=>!prev)
    // }

    const [specificClient, setSpecificClient] = useState(null)

    function openClientEditPanel(id){
        setClientEditPanel((prev)=>!prev)
        // specificClient
        if(id != null){
            fetch(`${clientApiUrl}/api/Client/client/${id}`,
                {
                    method:"GET",
                    headers: { 
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json" }
                }
            ).then((response)=>response.json()).then((json)=>setSpecificClient(json)).catch((error)=>console.error(error))
        }
        setSpecificClient(null);
    }

    // const [password, setPassword] = useState()
    function inputPasswordHandle(e){
        setSpecificClient(prevState =>({
            ...prevState,
            password : e.target.value
        }))
    }

    const [Updated, setUpdated] = useState(false)
    const [password, setPassword] = useState("")
    useEffect(()=>{
        if(!specificClient){
            return
        }
        setPassword(specificClient.password)
    }, [specificClient])

    function saveEditedClient(id){
        if(!password){
            alert("Password cannot be empty")
            return
        }
        if(!specificClient){
            alert("server Issue")
            return
        }
        setUpdated(true)
        const updatedPassword = {password: password};
            fetch(`${clientApiUrl}/api/Client/updateClient/${id}`, {
                method:"PATCH",
                headers: { 
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json" },
                body: JSON.stringify(updatedPassword),
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

    const tooltipRef = useRef(null);
      const [tooltipStyle, setTooltipStyle] = useState({
        display: 'none',
        top: 0,
        left: 0,
        text: '',
      });
    
      const handleMouseMove = (e) => {
        setTooltipStyle({
          display: 'block',
          top: e.pageY - 170,
          left: e.pageX + 10,
          text: e.currentTarget.getAttribute('data-tooltip'),
        });
      };
    
      const handleMouseLeave = () => {
        setTooltipStyle((prev) => ({
          ...prev,
          display: 'none',
        }));
      };

  return (
    <div className={`clientDiv`}>
        <div ref={tooltipRef} id="tooltip" style={{
                                            position: 'absolute',
                                            top: tooltipStyle.top,
                                            left: tooltipStyle.left,
                                            display: tooltipStyle.display,
                                            backgroundColor:'transparent',
                                            width:'30px',
                                            height:'20px',
                                            color: 'black',
                                            fontWeight:'BOLD',
                                            padding: '5px 10px',
                                            borderRadius: '4px',
                                            pointerEvents: 'none',
                                            zIndex: 999,
                                            filter: 'drop-shadow(2px 4px 6px) black',
                                          }}>{tooltipStyle.text}</div>
            <div className={`${clientEditPanel ? 'clientEditPanelVisible' : 'clientEditPanelHide'}`}>
                <div className='backgroundBlur' onClick={()=>openClientEditPanel(null)}>
                    {/* clientEditPanel */}
                </div>
                <div className={`${clientEditPanel ? 'ClientFormDivVisible' : 'ClientFormDivHide'}`} onClick={(e) => e.stopPropagation()}>
                <div className={`${Updated ? 'clientEditUpdatedVisible' : 'clientEditUpdatedHidden'}`}>Updated</div>
                    {/* clientForm */}
                    {
                        specificClient != null
                        ?
                            <div className={`${clientEditPanel ? 'editClientFormDivVisible' : 'editClientFormDivHide'}`}>
                                <div className={`${clientEditPanel ? 'editClientFormVisible' : 'editClientFormhide'}`}>
                                    <label htmlFor="" className={`${clientEditPanel ? 'editClientLabelVisible' : 'editClientLabelHide'}`}>Student Name</label>
                                    <input type="text" value={specificClient.name} className={`${clientEditPanel ? 'editClientInputVisible inputDisabled' : 'editClientInputHide'}`} disabled/>
                                </div>
                                <div className={`${clientEditPanel ? 'editClientFormVisible' : 'editClientFormhide'}`}>
                                    <label htmlFor="" className={`${clientEditPanel ? 'editClientLabelVisible' : 'editClientLabelHide'}`}>Student cen Id</label>
                                    <input type="text" value={specificClient.cenId} className={`${clientEditPanel ? 'editClientInputVisible inputDisabled' : 'editClientInputHide'}`} disabled/>
                                </div>
                                <div className={`${clientEditPanel ? 'editClientFormVisible' : 'editClientFormhide'}`}>
                                    <label htmlFor="" className={`${clientEditPanel ? 'editClientLabelVisible' : 'editClientLabelHide'}`}>Student Email</label>
                                    <input type="text" name="" id="" value={specificClient.mailId} className={`${clientEditPanel ? 'editClientInputVisible inputDisabled' : 'editClientInputHide'}`} disabled/>
                                </div>
                                <div className={`${clientEditPanel ? 'editClientFormVisible' : 'editClientFormhide'}`}>
                                    <label htmlFor="" className={`${clientEditPanel ? 'editClientLabelVisible' : 'editClientLabelHide'}`}>Student Password</label>
                                    <input type="text" value={password} className={`${clientEditPanel ? 'editClientInputVisible' : 'editClientInputHide'}`} onChange={inputPasswordHandle} required/>
                                </div>
                                <div className={`${clientEditPanel ? 'editClientFormVisible' : 'editClientFormhide'}`}>
                                    <label htmlFor="" className={`${clientEditPanel ? 'editClientLabelVisible' : 'editClientLabelHide'}`}>Student ContactNumber</label>
                                    <input type="text" value={specificClient.contactNo} className={`${clientEditPanel ? 'editClientInputVisible inputDisabled' : 'editClientInputHide'}`} disabled/>
                                </div>
                                {/* <div>
                                {specificClient.clientId}
                                </div> */}
                                <div className={`${clientEditPanel ? 'editClientFormVisible' : 'editClientFormhide'}`}>
                                    <button className={`${clientEditPanel ? 'saveButtonVisible' : 'saveButtonHide'}`} onClick={()=>saveEditedClient(specificClient.clientId)}>Save</button>
                                </div>
                            </div>
                        :
                        <div></div>
                    }
                </div>
            </div>
        {/* Client */}
        <div className='backgroundDiv'>
            <div className='centerDiv'>
            <div className='clientData'>Students Data</div>
                {/* <div className='viewAllClients'>
                    <div>
                        <div onClick={()=>setgetUsersByStatus("active")}>Active</div>
                        <div onClick={()=>setgetUsersByStatus("pending")}>Panding</div>
                        <div onClick={()=>setgetUsersByStatus("removed")}>Removed</div>
                    </div>
                    {
                        (allClients && allClients.length>0) || loading
                        ?
                        (
                            allClients.map((client, index)=>(
                                // <div className='clients' key={index}>{client.name}</div>
                                <div className='client_list clients' key={index}>
                                    <div className="list_data">
                                        <p className='listCount'>{client.cenId}</p>
                                        <p className='listName'>{client.name}</p>
                                        <div onClick={()=>openClientEditPanel(client.clientId)} className='editBut'>✏️
                                        </div>
                                        <div className='removeBut' onClick={()=> RemovedClientStatus(client.cenId)}>🗑️</div>
                                    </div>
                                </div>
                            ))
                        )
                        :
                        <div>server Issue or No Students Exist</div>
                    }
                </div> */}
                <div className='viewAllClients'>
                    <div className='changeClientsStatusDiv'>
                        <div className= {` statusActivePendingRemove ${getUsersByStatus === "active" ? "statusActivePendingRemovedActive" : "statusActivePendingRemovePassive"}`} onClick={() => handleStatusClick("active")}>Active</div>
                        <div className= {` statusActivePendingRemove ${getUsersByStatus === "pending" ? "statusActivePendingRemovedActive" : "statusActivePendingRemovePassive"}`} onClick={() => handleStatusClick("pending")}>Pending</div>
                        <div className= {` statusActivePendingRemove ${getUsersByStatus === "removed" ? "statusActivePendingRemovedActive" : "statusActivePendingRemovePassive"}`} onClick={() => handleStatusClick("removed")}>Removed</div>
                    </div>

                    {
                        loading ? (
                            <div>Loading...</div>
                        ) : (
                            allClients && allClients.length > 0 ? (
                                allClients.map((client, index) => (
                                    <div className='client_list clients' key={index}>
                                        <div className="list_data">
                                            <p className='listCount'>{client.cenId}</p>
                                            <p className='listName'>{client.name}</p>
                                            {/* <div onClick={() => openClientEditPanel(client.clientId)} className='editBut'>✏️</div> */}
                                            {
                                                getUsersByStatus === "active"
                                                ?
                                                    <div onClick={() => openClientEditPanel(client.clientId, client.name)} className='editBut'
                                                    data-tooltip="Edit"
                                                    onMouseMove={handleMouseMove}
                                                    onMouseLeave={handleMouseLeave}
                                                    >✏️</div>
                                                :
                                                    getUsersByStatus === "pending"
                                                    ?
                                                        <div onClick={() => ActiveClientStatus(client.cenId, client.name)} className='editBut'
                                                        data-tooltip="Activate"
                                                        onMouseMove={handleMouseMove}
                                                        onMouseLeave={handleMouseLeave}
                                                        >✅</div>
                                                    :
                                                        getUsersByStatus === "removed"
                                                        ?
                                                            <div onClick={() => ActiveClientStatus(client.cenId, client.name)} className='editBut'
                                                            data-tooltip="Activate"
                                                            onMouseMove={handleMouseMove}
                                                            onMouseLeave={handleMouseLeave}
                                                            >✅</div>
                                                        :
                                                            <div className='editBut'></div>
                                            }
                                            {/* <div className='removeBut' onClick={() => RemovedClientStatus(client.cenId)}>🗑️</div> */}
                                            {
                                                getUsersByStatus === "active"
                                                ?
                                                    <div className='removeBut' onClick={() => RemovedClientStatus(client.cenId, client.name)}
                                                    data-tooltip="Remove"
                                                    onMouseMove={handleMouseMove}
                                                    onMouseLeave={handleMouseLeave}
                                                    >🗑️</div>
                                                :
                                                    getUsersByStatus === "pending"
                                                    ?
                                                        <div className='removeBut' onClick={() => RemovedClientStatus(client.cenId, client.name)}
                                                        data-tooltip="Remove"
                                                        onMouseMove={handleMouseMove}
                                                        onMouseLeave={handleMouseLeave}
                                                        >🗑️</div>
                                                    :
                                                        getUsersByStatus === "removed"
                                                        ?
                                                            <div className='removeBut'></div>
                                                        :
                                                            <div className='editBut'></div>
                                            }
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>No clients found or server error.</div>
                            )
                        )
                    }
                </div>

            </div>
        </div>
    </div>
  )
}

export default ViewClients