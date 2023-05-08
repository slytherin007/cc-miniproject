// import React, {useState,useEffect} from "react";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { ChatEngine } from "react-chat-engine";
// import { auth } from "../firebase";

// import {useAuth} from '../contexts/AuthContext'
// import axios from "axios";

// const Chats =() =>{
//     const history=useHistory();
//     const {user} =useAuth();
//     const [loading,setLoading]=useState(true)
    
//     console.log(user)
//     const handleLogout = async() =>{
//             await auth.signOut();
//             history.push('/');
//     }

//     const getFile =async(url)=>{
//         const response =await fetch(url);
//         const data=await response.blob();
//         return new File([data],"userPhoto.jpg",{type:'image/jpg'})
//     }

//     useEffect(()=>{
//         if(!user){
//             history.push('/');

//             return;
//         }

//         axios.get('https://api.chatengine.io/users/me',{
//         headers:{
//             "project-id":"ebd4b601-ceef-4578-bb2c-9153d3fa4a31",
//             "user-name":user.email,
//             "user-secret":user.uid,
//         }
//         })
//         .then(()=>{
//             setLoading(false);
//         })
        
//         .catch(()=>{
//             let formdata=new FormData();
//             formdata.append('email',user.email);
//             formdata.append('username',user.displayName);
//             formdata.append('secret',user.uid);
            
//             getFile(user.photoURL)
//                 .then((avatar)=>{
//                     formdata.append('avatar',avatar,avatar.name)

//                     axios.post('https://api.chatengine.io/users',
//                     formdata,
//                     {headers:{
//                         "private-key":"b6ae2908-c5e9-4f0c-a440-3b776f1f7cb8"
//                     }}
//                     )
//                     .then(()=>
//                         setLoading(false))
//                     .catch((error)=>console.log(error))
//                 })
//         })
//     },[user,history]);

//     if(!user || loading) return 'Loading...'

//     return(
//         <div className="chats-page">
            
//             <div className="nav-bar">
//             <div className="logo-tab">Unichat</div>
                
//                 <div onClick={handleLogout}className="logout-tab">
//                     Logout
//                 </div>
//             </div>
        
//         <ChatEngine
//         height="calc(100vh - 66px)"
//         projectID="ebd4b601-ceef-4578-bb2c-9153d3fa4a31"
//         userName={user.email}
//         userSecret={user.uid}
//         />

//         </div>
//     );
// }

// export default Chats;








import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";

import { useAuth } from '../contexts/AuthContext'
import axios from "axios";

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await auth.signOut();
    history.push('/');
  }

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], "userPhoto.jpg", { type: 'image/jpeg' });
  }

  useEffect(() => {
    if (!user) {
      history.push('/');
      return;
    }

    axios.get('https://api.chatengine.io/users/me', {
      headers: {
        "Project-ID": "ebd4b601-ceef-4578-bb2c-9153d3fa4a31",
        "User-Name": user.email,
        "User-Secret": user.uid
      }
    })
      .then(() => setLoading(false))
      .catch(() => {
        let formdata = new FormData();
        formdata.append('email', user.email);
        formdata.append('username', user.displayName);
        formdata.append('secret', user.uid);

        getFile(user.photoURL)
          .then((avatar) => {
            formdata.append('avatar', avatar, avatar.name);

            axios.post('https://api.chatengine.io/users', formdata, {
              headers: {
                "private-key": "b6ae2908-c5e9-4f0c-a440-3b776f1f7cb8"
              }
            })
              .then(() => setLoading(false))
              .catch((error) => console.log(error))
          })
      })
  }, [user, history]);

  if (!user || loading) 
  return 'Loading...';

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">
          Unichat
        </div>
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>

      <ChatEngine
        height='calc(100vh - 66px)'
        projectID='ebd4b601-ceef-4578-bb2c-9153d3fa4a31'
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
}

export default Chats;