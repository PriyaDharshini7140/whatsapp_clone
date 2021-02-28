import { Avatar, IconButton } from '@material-ui/core'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { useParams } from 'react-router-dom';
import db from '../firebase/Firebase';
import firebase from "firebase"
import { useStateValue } from '../../reducer/StateProvider';
function Chat() {
     const [input, setInupt] = useState("")
     const [seed, setSeed] = useState("");
     const {roomId}= useParams();
     const [roomName, setRoomName] = useState("")
     const [messages,setMessages] = useState([])
     const [{user},dispatch] = useStateValue();


 useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot=>{
                setRoomName(snapshot.data().name)
            })
            db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp",'asc').onSnapshot(snapshot=>{
                setMessages(snapshot.docs.map(doc=> doc.data()))
            })
        }
         
      }, [roomId,messages])

     useEffect(() => {
        setSeed(Math.floor(Math.random()*5000))
         
      }, [roomId])

      
    const sendMessgae= (e)=>{
        e.preventDefault();
        console.log("you typed",input);
        db.collection("rooms").doc(roomId).collection("messages").add({
            message:input,
            name:user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInupt("")
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>last seen{new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                       <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
<div className="chat__body">
{messages.map((message)=>(
 <p className={`chat__message  ${message.name === user.displayName  && "chat__receiver"}`}>
 <span className="chat__name">{message.name}</span>
  {message.message}
  <span className="chat__timestamp">
      {new Date(message.timestamp?.toDate()).toUTCString()}
   </span>
  </p>
 ))}
 </div>
                  <div className="chat__footer">
                  <InsertEmoticonIcon/>
                  <form>
                      <input value={input} onChange={e=> setInupt(e.target.value)} placeholder="type a message" type="text"/>
                      <button type="submit" onClick={sendMessgae}>send a message</button>
                  </form>
                  <MicIcon/>
                  </div>
        </div>
    )
}

export default Chat
