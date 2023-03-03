import {useReducer} from 'react'
import './LikeBar.css'

const reducer =(state, action)=>{
  if(action.type==='INCREMENT'){
      return {
        count:state.count + 1
      }
  }else{
    if(state.count > 0){
      return{
        count:state.count - 1
      }
    }else{
      return{
        count:0
      }
    }
  }
}


const LikeBar = ({score}) => {

  const [state, dispatch]= useReducer(reducer, {count:score})

  const decreaseHandler=()=>{
    dispatch({type:'DECREMENT'})
  }

  const increaseHandler=()=>{
    dispatch({type:'INCREMENT'})
  }

  return (
    <div className='like-bar'>
        <p onClick={increaseHandler} className='increase-button'>+</p>
        <p className='amount-likes'>{state.count}</p>
        <p onClick={decreaseHandler} className='decrease-button'>-</p>
    </div>
  )
}

export default LikeBar;