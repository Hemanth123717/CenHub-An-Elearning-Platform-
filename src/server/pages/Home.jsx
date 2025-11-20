import React, { useContext } from 'react'
import { useEffect, useState } from 'react'
import { UserContext } from './util/UserContext';
import { useNavigate } from 'react-router-dom';
import "./css/Home.css"
import { getUserCenID, isTokenExpired } from '../../utils/useAuth';
import AddAdminsExcel from './AddAdminsExcel';

const Home = () => {
  const navigate = useNavigate();
  // const {user, setUser} = useContext(UserContext);
  const apiUrl = import.meta.env.VITE_CLIENT_API_URL;
  const [specificAdmin, setSpecificAdmin] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  // const [] = useState(false);
  const [editPassword, setEditPassword] = useState("");
  const [editPasswordDone, setEditPasswordDone] = useState(false);
  const [reqList, setReqList] = useState(false);
  const [pendingFetched, setPendingFetched] = useState(false);
    function openEditPanel(id) {
      if(id == null){
        setOpenEdit(prevState=>!prevState);
        setSpecificAdmin(null)
      }
      else{
        fetch(`${apiUrl}/api/Client/activeAdmins`,{
          method: "GET",
          headers: { 
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json" },
        }).then((response)=>response.json()).then((json=>{
          setSpecificAdmin(json[0])
          // console.log("Specific Admin=> ", json)
        })).catch((error)=>console.error(`Error fetching ${id} details`,error));
        setOpenEdit(prevState=>!prevState);
      }
    }
    
    
    useEffect(()=>{
      // console.log(`${apiUrl}`)
      const token = localStorage.getItem("token");
        if (!token || isTokenExpired(token)) {
            localStorage.removeItem("token");
            navigate("/login");
            return;
        }
      if(specificAdmin?.password){
        setEditPassword((prev) => specificAdmin.password);
      }
    },[specificAdmin]);
    
    function handlePasswordInput(e){
      setEditPassword(e.target.value)
    }
    
    // const [changePassword, setChangePassword] = useState({
    //   password : `${editPassword}`
    // })
    function editDetails(id) {
      // setChangePassword(editPassword);
      const updatedPassword = {password: editPassword};
      fetch(`${apiUrl}/api/Client/updateAdmin/${id}`,{
        method:"PATCH",
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json" },
        body: JSON.stringify(updatedPassword),
      }).then(response => response.json())
      .then((data) => {
        // console.log(`password changed successful for ${id}`);
        setEditPasswordDone(true);
        const startTime = Date.now();
        setTimeout(()=>{
          // console.log("Duration on screen:", Date.now() - startTime, "ms");
          setEditPasswordDone(false);
        }, 500)
      })
      .catch((error) => console.error("Error:", error));
    }
  
    // function updateOpenEditPanelData(id, name, cenId, password){
    //   fetch()
    // }
  
  
    function requestListView(){
      setReqList(prevValue => !prevValue);
      // console.log(reqList);
    }
  
    const [pendingCount, setPendingCount] = useState(0);
    const [pendingAdmins, setPendingAdmins] = useState([])
    const [passActive, setPassActive] = useState(
      {
        status : "active"
      }
    )
  
    const [notAccessed, setNotAccessed] = useState(
      {
        status : "notaccessed"
      }
    )
  
    const [activeRemoved, setActiveRemoved] = useState(
      {
        status : "removed"
      }
    )
  
    useEffect(()=>{
      const token = localStorage.getItem("token");
      if (!token || isTokenExpired(token)) {
                                localStorage.removeItem("token");
                                // console.log("Navigating to login from Server Home")
                                navigate("/login");
                                return;
                            }
                    
                            // console.log("Token found =>", token);
      // if(reqList & ! pendingFetched){
        fetch(`${apiUrl}/api/Client/pendingAdmins`,{
          method: "GET",
          headers: { 
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json" },
        })
        .then((response)=>response.json())
        .then((json=>{setPendingAdmins(json), setPendingFetched(true)}))
        .catch((error) => console.error("Error fetching pending data:", error))
      // }
      setPendingCount(pendingAdmins.length)
    },[reqList, pendingFetched])
  
  
    function adminActive(cenId){
      fetch(`${apiUrl}/api/Client/updateClientByCenId/${cenId}`, {
        method: "PATCH",
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json" },
        body: JSON.stringify(passActive),
      }).then(response => response.json())
      .then(data => {
        // console.log(`${cenId} activate successful`);
        setPendingFetched(false);
        setReqList(true);
        // setReqList(false);
      })
      .catch((error) => console.error("Error:", error));
      // setPendingFetched(false)
      // setPendingFetched(true)
    }
  
    const [activeAdmins, setActiveAdmins] = useState([])
    // const [activeFetched, setActiveFetched] = useState(true)
  
    useEffect(()=>{
      fetch(`${apiUrl}/api/Client/activeAdmins`,{
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json" }
      })
      .then(response=>response.json())
      .then(json => setActiveAdmins(json))
      .catch((error) => console.error("Error fetching active data:", error))
    }, [activeAdmins])
  
    // function DeleteAdmin(id){
    //   fetch(`${apiUrl}/Delete/${id}`, {
    //     method: "DELETE",
    //   })
    //   .then(setPendingFetched(true))
    // }
  
  
    function pendingRemovedAdminStatus(id, name, cenId, pass){
      // console.log("cenId=> ",cenId)
      fetch(`${apiUrl}/api/Client/updateClientByCenId/${cenId}`, {
        method: "PATCH",
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json" },
        body: JSON.stringify(notAccessed),
      }).then(response => response.json())
      .then(data => {
        // console.log(`${cenId} Not Accessed successful`);
        setPendingFetched(false);
        setReqList(true);
        // setReqList(false);
      })
      .catch((error) => console.error("Error:", error));
    }
  
  
    function RemovedAdminStatus(cenId){
      fetch(`${apiUrl}/api/Client/updateClientByCenId/${cenId}`, {
        method : 'PATCH',
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json" },
        body: JSON.stringify(activeRemoved),
      }).then(data=>{
        // console.log(`${cenId} Access Removed`);
        // setPendingFetched(false);
        // setReqList(true);
      })
      .catch((error) => console.error("Error: ", error));
    }

    function serverLogout(){
      const token = localStorage.getItem('token');
                    fetch(`${apiUrl}/api/Client/Logout/${getUserCenID(token)}`, {
                      method: "PATCH",
                      headers: {
                        "Authorization": `Bearer ${token}`,
                        // body: JSON.stringify({ cenId: getUserCenID(token) })
                      }
                    })
      localStorage.removeItem("token");
      alert("logout successfull");
      location.reload();
    }


    const [addAdminExcelSheet, setAddAdminExcelSheet] = useState(false)
    function addAdminExcel(){
      setAddAdminExcelSheet(prev => !prev)
    }
  
  
    // useEffect(()=>{
    //   fetch("${apiUrl}/status/")
    // });
  
    return (
      <div>
        {
          // editPasswordDone?
          <div className={`editPasswordDone ${editPasswordDone ? "editPasswordDoneVisible": "editPasswordDoneHidden"}`}>
            EditDone
          </div>
          // :
          // <div></div>
        }
        <div className={`editMain ${openEdit ? 'openEditVisible' : 'openEditHidden'}`} onClick={()=>openEditPanel(null)}>
          <div className={`${openEdit ? 'editPanel' : 'editPanelHidden'}`} onClick={(e) => e.stopPropagation()}>
          {
            specificAdmin != null ?(
              <div className="Form" key={specificAdmin}>
                <div className="form_row">
                  <div className="form_group">
                  <label htmlFor="name">Name</label>
                  <input className='form_group_input' type="text" id="name" disabled value={specificAdmin.name}/>
                  </div>
                  <div className="form_group">
                    <label htmlFor="email">Email</label>
                    <input className='form_group_input' type="email" id="email" disabled value={specificAdmin.mailId}/>
                  </div>
                </div>
                <div className="form_row">
                  <div className="form_group">
                    <label htmlFor="cenId">ceniD</label>
                    <input className='form_group_input' type="text" id="cenId" disabled value={specificAdmin.cenId}/>
                  </div>
                  <div className="form_group">
                    <label htmlFor="password">Password</label>
                    <input className='form_group_input' type="text" id="password" value={editPassword} onChange={handlePasswordInput}/>
                  </div>
                </div>
                  <button className="form_editbut" type="submit" onClick={()=>editDetails(specificAdmin.id)}>Edit</button>
              </div>
            )
            :
            (<div></div>)
          }
        </div>
      </div>

      <div className={`addAdminExcelMainDiv ${addAdminExcelSheet ? 'addAdminExcelVisible' : 'addAdminExcelHidden'}`} onClick={()=>addAdminExcel()}>
          <div className={`${addAdminExcelSheet ? 'addAdminExcelPanel' : 'addAdminExcelPanelHidden'}`} onClick={(e) => e.stopPropagation()}>
          {
            addAdminExcelSheet
            ?
              <AddAdminsExcel/>
            :
              <div></div>
          }
        </div>
      </div>
        <div className={`mainPage ${openEdit ? 'mainPageBlur' : 'mainPageUnBlur'}`}>
        {/* <div className='requestBox' onClick={requestListView}>
          <div className={`requestList ${ reqList ? 'requestListVisible' : 'requestListHidden'}`}>
  
          </div>
        </div> */}
        <div className={`leftLayout ${reqList ? 'leftLayoutBlur' : ''}`}>
          <div className='side_plate'>
            <div className='Title'>CEN HUB SERVER CONTROL</div>
          </div>
          <div className='serverCutmLogo'>
          </div>
          <div className='requestDiv'>
            <div className={`${reqList ? 'blurDivVisible' : 'blurDivHidden'}`} onClick={requestListView}></div>
          <div className={` requestBox ${ reqList ?'requestBoxClose': 'requestBoxOpen'}`} onClick={requestListView} >
            {
              pendingCount == 0
              ?
              (<div></div>)
              :
              (<div className='pendingCount'>{pendingCount}</div> )
              // <div className='pendingCount'></div>
            }
            <div className={`requestList ${ reqList ? 'requestListVisible' : 'requestListHidden'}`} onClick={(e)=>e.stopPropagation()}>
              <div className='addAdminsExcelDiv' onClick={()=>addAdminExcel()}>
                  Add Admins
              </div>
              {
                pendingAdmins != null && pendingAdmins.length > 0 
                ?
                (pendingAdmins.map((admin, index)=>(
                  <div className={`${reqList ? "pendingList": "pendingListHide"}`}  key={index}>
                    <div className={`pendingListNameDiv`}>
                      <div className={`pendingListName`}>{admin.name}</div>
                    </div>
                    <div className={`pendingListStatusDiv`}>
                      <div className={`pendingListAccept`} onClick={()=>adminActive(admin.cenId)}>Accept</div>
                      <div className={`pendingListReject`} onClick={()=> pendingRemovedAdminStatus(admin.id, admin.name, admin.cenId, admin.password)}>Reject</div>
                    </div>
                  </div>
                ))) 
                :
                (<div className={`${reqList ? 'noPendingDivVisible' : 'noPendingDivHidden'}`}>Server Issue or No pending list</div>)
              }
            </div>
          </div>
          </div>
        </div>
       <div className='rightLayout'>
        <div className='top_layout'>
          <div className='adminTitle'>Admins</div>
          <div className="search-bar">
            <input className='searchBarInput' type="text" id='searchInput' placeholder="Search..."></input>
            {/* <label className="search-icon" htmlFor='searchInput'></label> */}
          </div>
              <div className='panelsDiv'>
                <button className='panelButton'><a className='panelAnchor' href="/admin">Admin Panel</a></button>
                <button className='panelButton'><a className='panelAnchor' href="/">Client Panel</a></button>
              </div>
          <div>
            <button onClick={serverLogout} className='serverLogoutBut'>Logout</button>
          </div>
        </div>
        <div className='bottom_layout'>
              {
                activeAdmins != null && activeAdmins.length > 0
                ?
                (activeAdmins.map((admin, index)=>(
                  <div className='Admin_list' key={index}>
                    <div className="list">
                      <p className='listCount'>{admin.cenId}</p>
                      <p className='listName'>{admin.name}</p>
                      <div onClick={()=>openEditPanel(admin.cenId)} className='editBut'>✏️
                      </div>
                      <div className='removeBut' onClick={()=> RemovedAdminStatus(admin.cenId)}>🗑️</div>
                    </div>
                  </div>)
                ))
                :
                (<div>No active admins List</div>)
              }
        </div>
       </div>
      </div>
      </div>
    )
}


export default Home;