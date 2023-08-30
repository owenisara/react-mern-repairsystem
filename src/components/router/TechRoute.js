import React from 'react'
import LoadingRoute from './LoadingRoute'
import { useSelector } from 'react-redux'
const TechRoute = ({children}) => {
    const user = useSelector(state=>(state.user))
    return user&&user.user.token&&user.user.role === 'technician' ? children : <LoadingRoute/>
}

export default TechRoute
