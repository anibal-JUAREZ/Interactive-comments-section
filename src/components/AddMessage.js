import React, {useState} from 'react'
import './AddMessage.css'
import Button from './UI/Button';
const AddMessage = ({currentUser,text,addNewMessageHandler, replyMessageHandler }) => {
  const [contentMessage, setContentMessage] = useState("");
  if(!text){
    text="SEND"
  }
  const getMessageHandler=(e)=>{
    setContentMessage(e.target.value);
    console.log(contentMessage);
  }
  
  const actionHandler = (action) =>{
      if(action ==="SEND"){
        if(contentMessage){
          addNewMessageHandler(contentMessage, "1 minute ago", 0);
          setContentMessage("");
        }
        
      }else if(action ==='REPLY'){
        replyMessageHandler(contentMessage, "1 minute ago", 0);
      }
      
    
  }

  return (
    <div className='send-message-section'>
        <img className='user-image' src={currentUser.image.png}/>
        <textarea onChange={getMessageHandler} className='message-section' placeholder='Add a comment...' rows={3} value={contentMessage}></textarea>
       <Button text={text}
        onClickHandler={actionHandler}
      />
    </div>
  )
}

export default AddMessage;