import React, {useState} from 'react'
import './ShowMyComment.css'
import LikeBar from './UI/LikeBar'

import Button from './UI/Button'
import DeleteModal from './DeleteModal'
 const ShowMyComment = ({content, createdAt, score, username, userImage,replyingTo,idMainMessage,editingMessageHandler,idReply, deleteOneComment}) => {
    const [showUpdateButton, setUpdateButton] = useState(false);
    const [editMessage, setEditMessage] = useState(content);
    const [showDeleteModal, setShowModalDelete] = useState(false);

    const getEditedMessage = (e)=>{
        setEditMessage(e.target.value);
        
    }

    const editMessageHandler =()=>{
        editingMessageHandler(editMessage, idMainMessage,idReply);
        setUpdateButton(false);
    }

    const hideDeleteModal=()=>{
        setShowModalDelete(!showDeleteModal);
    }

    let userInformation;
    if(replyingTo){
        userInformation = <span>{`@${replyingTo}`}</span>
        
    }
    const showUpdateButtonHandler = ()=>{
        setUpdateButton(true);
    }

    const deleteComment =()=>{
        deleteOneComment(idMainMessage,idReply);
    }
  return (
    <>
        <div className='comment-section'>
            <LikeBar score={score}/>
            <div className='comment-section-information'>
                <div className='comment-infomation'>
                    <div className='comment-user-information'>
                        <img  className='user-photo' src={userImage}/>
                        <p>{username}</p>
                        <p>you</p>
                        <p>{createdAt}</p>
                    </div>
                    <div className='operations-sections'>
                        <div className='delete-section' onClick={hideDeleteModal}>
                            <img src={'./images/icon-delete.svg'}/>
                            <p>Delete</p>
                        </div>
                        <div className='edit-section' onClick={showUpdateButtonHandler}>
                            <img src={'./images/icon-edit.svg'}/>
                            <p>Edit</p>
                        </div>
                    </div>
                </div>
                {!showUpdateButton && <p>{userInformation} {content}</p>}
                { showUpdateButton && <textarea value={editMessage} onChange={getEditedMessage}></textarea> }
                <div className='button-update'>
                {showUpdateButton && <Button text="UPDATE" editMessageHandler={editMessageHandler}/>}
                </div>
            </div>
        </div>
        {showDeleteModal && <DeleteModal hideDeleteModal={hideDeleteModal} deleteComment={deleteComment}/>}

    </>
  )
}

export default ShowMyComment;