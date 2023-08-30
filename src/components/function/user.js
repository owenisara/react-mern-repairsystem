import axios from "axios"

export const listUser = async(authtoken)=>{
   
    return await axios.get(`${process.env.REACT_APP_API}/listuser`,{},
{
 headers:{
    authtoken,
 }
})}
export const ReadUser = async(authtoken,id)=>{
   
    return await axios.get(`${process.env.REACT_APP_API}/user/${id} `,
{
 headers:{
    authtoken,
 }
})}

export const EditUser = async(authtoken,id,value)=>{
   
   return await axios.put(`${process.env.REACT_APP_API}/user/${id}`,value,
{
headers:{
   authtoken,
}
})}

export const RemoveUser = async(authtoken,id)=>{
   console.log('idremove',id)
    return await axios.delete(`${process.env.REACT_APP_API}/user/${id}`,
{
 headers:{
    authtoken,
 }
})}

export const changeStatus = async(authtoken,id,enabled
   )=>{
   console.log('enabled',enabled)
   return await axios.put(`${process.env.REACT_APP_API}/changestatus/${id}`,{enabled
   },
{
headers:{
   authtoken,
}
})}
export const changeRole = async(authtoken,id,role
   )=>{
   console.log('role',role)
   return await axios.put(`${process.env.REACT_APP_API}/changerole/${id}`,{role
   },
{
headers:{
   authtoken,
}
})}

