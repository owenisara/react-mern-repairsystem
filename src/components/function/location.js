import axios from "axios"

export const createLocation = async(authtoken,value)=>{
    return await axios.post(`${process.env.REACT_APP_API}/createlocation`,value,
    {
     headers:{
        authtoken,
     }
    })}
 
 export const listLocation = async(authtoken)=>{
     return await axios.get(`${process.env.REACT_APP_API}/listlocation`,
     {
      headers:{
         authtoken,
      }
     })}
 
 export const readLocation = async(authtoken,id)=>{
    return await axios.get(`${process.env.REACT_APP_API}/location/${id}`,
    {
     headers:{
        authtoken,
     }
    })}
 export const removeLocation = async(authtoken,id)=>{
    return await axios.delete(`${process.env.REACT_APP_API}/location/${id}`,
    {
     headers:{
        authtoken,
     }
    })}
 export const updateLocation = async(authtoken,id,value)=>{
    return await axios.put(`${process.env.REACT_APP_API}/location/${id}`,value,
    {
     headers:{
        authtoken,
     }
    })}