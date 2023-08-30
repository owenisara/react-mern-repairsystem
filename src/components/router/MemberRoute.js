import React from 'react'
import { useSelector } from 'react-redux'
import LoadingRoute from './LoadingRoute'



const MemberRoute = ({children}) => {
    const user = useSelector(state=>(state.user))
    console.log(user)
  return user&&user.user.token&&user.user.role === 'member' ? children : <LoadingRoute/>
}

export default MemberRoute



  


