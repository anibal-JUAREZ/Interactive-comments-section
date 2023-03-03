

import { useState, useEffect } from "react";
import AddMessage from "./components/AddMessage";
import Container from "./components/Container";
import DeleteModal from "./components/DeleteModal";
import ShowComment from "./components/ShowComment";
import ShowMyComment from "./components/ShowMyComment";

function App() {
  const [data, setData] = useState({});

  // const getDataHandler = async () => {
  //   const response = await fetch('data.json');
  //   const json = await response.json();
  //   console.log(json);
  //   setData(json);
    
  // }

  useEffect(()=>{
    console.log('ici')
    fetch('data.json')
    .then((response) => response.json())
    .then((data) => setData(data));

   //getDataHandler();
    
  }, [])

  const addNewMessageHandler=(content, createdAt, score)=>{
      let id =0;
      data.comments.map(oneComment=>{
        if(oneComment.id>id){
          id=oneComment.id;
        }
      })
      setData(prevState=>{
        const copy = {...prevState}
        const newComment ={
          id:id+1,
          content,
          createdAt,
          score,
          "user": {
            "image": { 
              "png": copy.currentUser.image.png,
              "webp":copy.currentUser.image.webp
            },
            "username": copy.currentUser.username
          },
          "replies":[]
          }
          copy.comments.push(newComment);
          return copy;
        }
       
        
      )
     
  }

  const addNewReplyHandler=(content, createdAt, score,idMainMessage,username)=>{
    setData(prevState=>{
      const copy = {...prevState};

      const commentIndex= copy.comments.findIndex(element=>{
        return element.id === idMainMessage
      })

      let idReply = 0;
      copy.comments[commentIndex].replies.map(oneReply=>{
        if(oneReply.id > idReply){
          idReply = oneReply.id
        }
      })
      const newReply ={
        id:idReply+1,
        content,
        createdAt,
        score,
        "replyingTo":username,
        "user": {
          "image": { 
            "png": copy.currentUser.image.png,
            "webp":copy.currentUser.image.webp
          },
          "username": copy.currentUser.username
        },
       
        }

        copy.comments[commentIndex].replies.push(newReply);
       return copy;

    })
  }

  const editingMessageHandler = (editMessage, idMainMessage,idReply)=>{
   
    

    setData(prevState=>{
      const copy = {...prevState}
      const mainCommentIndex = copy.comments.findIndex(comment=>{
        return comment.id === idMainMessage
      })
  
      if(idReply){
        const replyMessageIndex = copy.comments[mainCommentIndex].replies.findIndex(reply=>{
          return reply.id === idReply
        })
        copy.comments[mainCommentIndex].replies[replyMessageIndex].content = editMessage;
      }else{
        copy.comments[mainCommentIndex].content = editMessage;
      }
      return copy;
    })

  


  }

  const deleteOneComment=(idMainMessage,idReply)=>{
    setData(prevState=>{
      const copy = {...prevState}
      const mainCommentIndex= copy.comments.findIndex(element=>{
        return element.id === idMainMessage
      })
      if(idReply){
        const replyMessageIndex = copy.comments[mainCommentIndex].replies.findIndex(reply=>{
          return reply.id === idReply
      })

      copy.comments[mainCommentIndex].replies.splice(replyMessageIndex, 1);

    }else{
      copy.comments.splice(mainCommentIndex, 1);
    }
    return copy
  })
 }
  return (
    <Container>
        
        {
          data.comments?.map(oneComment=>{
            if(oneComment.user.username !== data.currentUser.username){
              return <><ShowComment
                key={oneComment.id}
                content={oneComment.content}
                createdAt={oneComment.createdAt}
                score={oneComment.score}
                username={oneComment.user.username}
                userImage={oneComment.user.image.png}
                currentUser={data.currentUser}
                addNewReplyHandler={addNewReplyHandler}
                idMainMessage={oneComment.id}
              />
              <div className="all-replies">
              {oneComment.replies.map(oneReply=>{
                if(oneReply.user.username !==data.currentUser.username){
                  return <ShowComment
                  key={oneReply.id}
                  content={oneReply.content}
                  createdAt={oneReply.createdAt}
                  score={oneReply.score}
                  username={oneReply.user.username}
                  userImage={oneReply.user.image.png}
                  replyingTo={oneReply.replyingTo}
                  currentUser={data.currentUser}
                  idMainMessage={oneComment.id}
                  addNewReplyHandler={addNewReplyHandler}
                  
                />
                }else{
                  return <ShowMyComment
                  key={oneReply.id}
                  content={oneReply.content}
                  createdAt={oneReply.createdAt}
                  score={oneReply.score}
                  username={oneReply.user.username}
                  userImage={oneReply.user.image.png}
                  replyingTo={oneReply.replyingTo}
                  currentUser={data.currentUser}
                  idMainMessage={oneComment.id}
                  idReply={oneReply.id}
                  editingMessageHandler={editingMessageHandler}
                  deleteOneComment={deleteOneComment}
                />
                }
              
            })}</div>
              </>
              
            }else{
              return <><ShowMyComment
                key={oneComment.id}
                content={oneComment.content}
                createdAt={oneComment.createdAt}
                score={oneComment.score}
                username={oneComment.user.username}
                userImage={oneComment.user.image.png}
                currentUser={data.currentUser}
                idMainMessage={oneComment.id}
                editingMessageHandler={editingMessageHandler}
                deleteOneComment={deleteOneComment}
              />
                <div className="all-replies">
              {oneComment.replies.map(oneReply=>{
                if(oneReply.user.username !==data.currentUser.username){
                  return <ShowComment
                  key={oneReply.id}
                  content={oneReply.content}
                  createdAt={oneReply.createdAt}
                  score={oneReply.score}
                  username={oneReply.user.username}
                  userImage={oneReply.user.image.png}
                  replyingTo={oneReply.replyingTo}
                  currentUser={data.currentUser}
                  idMainMessage={oneComment.id}
                  addNewReplyHandler={addNewReplyHandler}
                />
                }else{
                  return <ShowMyComment
                  key={oneReply.id}
                  content={oneReply.content}
                  createdAt={oneReply.createdAt}
                  score={oneReply.score}
                  username={oneReply.user.username}
                  userImage={oneReply.user.image.png}
                  replyingTo={oneReply.replyingTo}
                  currentUser={data.currentUser}
                  idMainMessage={oneComment.id}
                  idReply={oneReply.id}
                  editingMessageHandler={editingMessageHandler}
                  deleteOneComment={deleteOneComment}
                />
                }
              
            })}</div>
              </>
            }
            
            
        
          })
        }
        { data.currentUser && <AddMessage
          currentUser={data.currentUser}
          addNewMessageHandler={addNewMessageHandler}
        /> }
      
    </Container>
  );
}

export default App;
