import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LoadingRoute from './LoadingRoute'
import { currentAdmin } from '../function/auth'
const AdminRoute = ({children}) => {
    const user = useSelector(state=>(state.user))
    const[isadmin,setIsAdmin] = useState(false)

    useEffect(()=>{
        if(user && user.user.token){
            currentAdmin(user.user.token)
            .then(res=>{
                console.log(res)
                setIsAdmin(true)
            }).catch(err=>{
                console.log(err)
                setIsAdmin(false)
            })
        }
    },[user])
    return isadmin ? children : <LoadingRoute/>
}

export default AdminRoute
