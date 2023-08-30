import axios from "axios"

export const loginUser = async(value)=>{
    await axios.post( )

    
}



export const currentUser = async(authtoken)=>{
    console.log('currentUser',authtoken)
    return await axios.post(`${process.env.REACT_APP_API}/currenUser`,{},
{
 headers:{
    authtoken,
 }
})}
export const currentAdmin = async(authtoken)=>{
    console.log('currentAdmin',authtoken)
    return await axios.post(`${process.env.REACT_APP_API}/currenAdmin`,{},
{
 headers:{
    authtoken,
 }
})}