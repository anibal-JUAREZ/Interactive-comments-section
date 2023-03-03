import React, {useState} from 'react'
import AddMessage from './AddMessage';

import './ShowComment.css'
import LikeBar from './UI/LikeBar';

 const ShowComment = ({content, createdAt, score, username, userImage,replyingTo, currentUser,idMainMessage,addNewReplyHandler}) => {
    const [showReply, setShowReply] = useState(false);
    let userInformation;
    if(replyingTo){
        userInformation = <span>{`@${replyingTo}`}</span>
        console.log(replyingTo)
    }
    const showReplyInputHandler = ()=>{
        setShowReply(true);
    }

    const replyMessageHandler=(contentMessage, createdAt, score)=>{
        addNewReplyHandler(contentMessage, createdAt, score,idMainMessage,username);
        setShowReply(false);
    }
    
  return (
    <>
        <div className='comment-section'>
            <LikeBar score={score}/>
            <div className='comment-section-general'>
                <div className='comment-infomation'>
                    <div className='comment-user-info'>
                        <img  className='user-photo' src={userImage}/>
                        <p>{username}</p>
                        <p>{createdAt}</p>
                    </div>
                    <div className='reply-section' onClick={showReplyInputHandler}>
                    <img src={'./images/icon-reply.svg'}/>
                    <p>Reply</p>
                    </div>
                </div>
                
                    
                    <p>{userInformation} {content}</p>
                
                
            </div>
        </div>
        {showReply && <AddMessage text="REPLY" currentUser={currentUser} replyMessageHandler={replyMessageHandler}/>}

    </>
  )
}

export default ShowComment;