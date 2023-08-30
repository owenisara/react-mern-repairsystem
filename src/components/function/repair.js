import axios from "axios"

export const listRepair = async (authtoken)=>{
    return await axios.get(`${process.env.REACT_APP_API}/listrepair `,
    {
     headers:{
        authtoken,
     }
    })
}
export const readRepair = async (authtoken,id)=>{
    return await axios.get(`${process.env.REACT_APP_API}/repair/${id}`,
    {
     headers:{
        authtoken,
     }
    })
}

export const createRepair = async (authtoken,value)=>{
    return await axios.post(`${process.env.REACT_APP_API}/createrepair `,value,
    {
     headers:{
        authtoken,
     }
    })
}

export const updateRepair = async (authtoken,value,id)=>{
    return await axios.put(`${process.env.REACT_APP_API}/repair/${id} `,value,
    {
     headers:{
        authtoken,
     }
    })
}
export const updateStatus = async (authtoken,value,id)=>{
    return await axios.put(`${process.env.REACT_APP_API}/statusrepair/${id}`,value,
    {
     headers:{
        authtoken,
     }
    })
}

export const waitingRepair = async (authtoken)=>{
    return await axios.get(`${process.env.REACT_APP_API}/waitingrepair `,
    {
     headers:{
        authtoken,
     }
    })
}
export const waitingpartsRepair = async (authtoken)=>{
    return await axios.get(`${process.env.REACT_APP_API}/waitingpartsrepair `,
    {
     headers:{
        authtoken,
     }
    })
}
export const completeRepair = async (authtoken)=>{
    return await axios.get(`${process.env.REACT_APP_API}/completerepair `,
    {
     headers:{
        authtoken,
     }
    })
}

