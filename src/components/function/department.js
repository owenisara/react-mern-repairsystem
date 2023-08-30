import axios from "axios"

export const createDepartment = async(authtoken,value)=>{
   return await axios.post(`${process.env.REACT_APP_API}/createdepartment`,value,
   {
    headers:{
       authtoken,
    }
   })}

export const listDepartment = async(authtoken)=>{
    return await axios.get(`${process.env.REACT_APP_API}/listdepartment `,
    {
     headers:{
        authtoken,
     }
    })}

export const readDepartment = async(authtoken,id)=>{
   return await axios.get(`${process.env.REACT_APP_API}/department/${id}`,
   {
    headers:{
       authtoken,
    }
   })}
export const removeDepartment = async(authtoken,id)=>{
   return await axios.delete(`${process.env.REACT_APP_API}/department/${id}`,
   {
    headers:{
       authtoken,
    }
   })}
export const updateDepartment = async(authtoken,id,value)=>{
   return await axios.put(`${process.env.REACT_APP_API}/department/${id}`,value,
   {
    headers:{
       authtoken,
    }
   })}

