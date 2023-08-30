import React, { useEffect, useState } from 'react'
import Sidebar from '../../layout/Sidebar'
import { listUser} from '../../function/user'
import { listDepartment} from '../../function/department'
import { listDevice} from '../../function/device'
import { listLocation} from '../../function/location'
import { useSelector } from 'react-redux'
import { BsFillPersonFill,BsBuildingFillGear,
  BsDisplay,BsFillGeoAltFill} from "react-icons/bs";
const HomeAdmin = () => {
  const user = useSelector((state)=>(state.user))
  const[users,setUsers] = useState([])
  const[department,setDepartmant] = useState([])
  const[device,setDevice] = useState([])
  const[location,setLocation] = useState([])
  useEffect(()=>{
    loadData()
// eslint-disable-next-line
},[])
  const loadData = ()=>{
    listUser()
    .then((res)=>{setUsers(res.data)})
    .catch((err)=>{console.log(err)})

    listDepartment(user.user.token)
    .then((res)=>{setDepartmant(res.data)})
    .catch((err)=>{console.log(err)})

    listDevice(user.user.token)
    .then((res)=>{setDevice(res.data)})
    .catch((err)=>{console.log(err)})

    listLocation(user.user.token)
    .then((res)=>{setLocation(res.data)})
    .catch((err)=>{console.log(err)})
  }

  console.log(users)
  console.log(department)
  console.log(device)
  console.log(location)

  return (
    <div className='flex'>
      <div>
      <Sidebar/>
      </div>
     <div className='flex'>
      <div className='m-5 p-3 font-medium text-slate-200 text-center bg-sky-500 w-60 h-48 border rounded-lg text-3xl '>
        <span><BsFillPersonFill className='text-5xl'/></span>
        <p className='py-3 '>User </p>
        <p>{users.length} </p>
      </div>

      <div className='m-5 p-3 font-medium text-slate-200 text-center bg-purple-500 w-60 h-48 border rounded-lg text-3xl'>
        <BsBuildingFillGear className='text-5xl' /> 
        <p className='py-3 '>Department</p>
        <p>{department.length}</p>
      
      
      </div>
      <div className='m-5 p-3 font-medium text-slate-200 text-center bg-emerald-500 w-60 h-48 border rounded-lg text-3xl'>
        <BsDisplay className='text-5xl'/>
        <p className='py-3 '>Device</p>
        <p>{device.length}</p>
        
        </div>
      <div className='m-5 p-3 font-medium text-slate-200 text-center bg-amber-500 w-60 h-48 border rounded-lg text-3xl'>
        <BsFillGeoAltFill className='text-5xl' />
        <p className='py-3 '>Location</p>
        <p>{location.length}  </p>
         
        </div>
     </div>
    </div>
  )
}

export default HomeAdmin
