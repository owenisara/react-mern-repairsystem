import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LoadingRoute = () => {
    const[count,setCount]=useState(3)
    const navigate = useNavigate()
    const user = useSelector((state)=>(state.user))
    console.log(user)
    console.log(user.user.role)
    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((currentCount)=> --currentCount)
        },1000)  
     count=== 0 &&  navigate('/')   
        return ()=> clearInterval(interval)
        // eslint-disable-next-line
     },[count,user.user.role])
  return (
    <div>
      <h1>
        No Permission , redirect in {count}
     </h1>
    </div>
  )
}

export default LoadingRoute
