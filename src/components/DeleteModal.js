import React from 'react'
import './DeleteModal.css';
 const DeleteModal = ({hideDeleteModal, deleteComment}) => {

    const closeModalHandler=()=>{
        hideDeleteModal();
    }

    const deleteCommentHandler =()=>{
        deleteComment()
    }

  return (
    <>
        <div className='backdrop'></div>
        <div className='delete-section-modal'>
            <p>Delete comment</p>
            <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone</p>
            <div className='buttons'>
                <button onClick={closeModalHandler}>NO, CANCEL</button>
                <button onClick={deleteCommentHandler}>YES, DELETE</button>
            </div>
        </div>
    </>
  )
}


export default DeleteModal;