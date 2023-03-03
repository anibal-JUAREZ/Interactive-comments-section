import React from 'react'
import './Button.css'

 const Button = ({text, onClickHandler,editMessageHandler}) => {
   const sendActionHandler=()=>{
     if(text === 'UPDATE'){
      editMessageHandler();
     }else{
       onClickHandler(text);
     }
      
   }
  return (
    <button onClick={sendActionHandler} className='button'>{text}</button>
  )
}


export default Button;