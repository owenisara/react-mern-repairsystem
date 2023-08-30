import axios from "axios"

export const createDevice = async(authtoken,value)=>{
    return await axios.post(`${process.env.REACT_APP_API}/createdevice`,value,
    {
     headers:{
        authtoken,
     }
    })}
 
 export const listDevice = async(authtoken)=>{
     return await axios.get(`${process.env.REACT_APP_API}/listdevice `,
     {
      headers:{
         authtoken,
      }
     })}
 
 export const readDevice = async(authtoken,id)=>{
    return await axios.get(`${process.env.REACT_APP_API}/device/${id}`,
    {
     headers:{
        authtoken,
     }
    })}
 export const removeDevice = async(authtoken,id)=>{
    return await axios.delete(`${process.env.REACT_APP_API}/device/${id}`,
    {
     headers:{
        authtoken,
     }
    })}
 export const updateDevice = async(authtoken,id,value)=>{
    return await axios.put(`${process.env.REACT_APP_API}/device/${id}`,value,
    {
     headers:{
        authtoken,
     }
    })}