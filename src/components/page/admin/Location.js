import React, { useEffect, useState } from 'react'
import Sidebar from '../../layout/Sidebar'
import { listLocation,readLocation,createLocation,
removeLocation,updateLocation } from '../../function/location'
import Swal from 'sweetalert2'
import { useSelector } from 'react-redux'
const Location = () => {
    const user = useSelector((state)=>(state.user))
    const [data,setData] = useState([])
    const[location,setLocation] = useState({locationname:""})
    const [readData,setReadData] = useState({})
    const [editbtn,setEditbtn] = useState(false)
    const handleChange = (e)=>{
        e.preventDefault()
        setLocation({[e.target.name]:e.target.value})
        console.log(location)
    }
    useEffect(()=>{
        loadData()
// eslint-disable-next-line
    },[])
    const loadData = ()=>{
        listLocation(user.user.token)
        .then((res)=>{
           setData(res.data)
        }).catch((err)=>{
            console.log(err)
        })}
    const handleCreate = (e)=>{
        e.preventDefault()
        createLocation(user.user.token,location )
        .then((res)=>{
            console.log(res.data)
            setLocation({locationname:""})
            loadData()
            Swal.fire({
                icon: 'success',
                title: 'Create Success'
            }
            )
         }).catch((err)=>{
             console.log(err)
         })}   
    const handleRemove = (id)=>{
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
          removeLocation(user.user.token,id)
        .then((res)=>{
            console.log(res.data)
            loadData()
        })
        .catch((err)=>console.log(err))
        }
      }) 
    }
    const handleEdit = (id)=>{
      console.log(id)
      setEditbtn(true)
      readLocation(user.user.token,id)
        .then((res)=>{
          setLocation(res.data)
          setReadData(res.data)
        })
        .catch((err)=>console.log(err))
    }
    const handleUpdate = (e)=>{
      e.preventDefault()
      console.log(location._id)
      updateLocation(user.user.token,readData._id,location)
      .then((res)=>{
        console.log(res.data)
        setEditbtn(false)
        setLocation({locationname:""})
        loadData()
    })
    .catch((err)=>console.log(err))
      console.log("Update data ") 
    }
    console.log('read',readData)
  return (
    <div className='flex '>
    <div>
    <Sidebar/>
    </div>

    <div className=" mt-5 text-center  sm:mx-auto sm:w-full sm:max-w-2xl">
        <span className='mt-1 text-2xl font-bold leading-9 tracking-tight text-gray-900'>Location</span>
        <form onSubmit={editbtn ? handleUpdate : handleCreate}>
        <div className='mt-5' >
            <label className="block text-sm font-medium leading-6 text-gray-900">
            </label>
            <div className="mt-2">
              <input name="locationname" value={location.locationname} type="text"  required onChange={handleChange}
                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 
                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="mt-5" > 
          {
            editbtn ? 
             <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-yellow-500 px-3 py-1.5 text-sm font-semibold leading-6
             text-white shadow-sm hover:bg-yellow-400 ">
            Save
          </button> 
            : 
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6
             text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Create
          </button>}
          </div>
        </form>
        <ul  className="pt-5">
            {data.length > 0 && data.map((item)=>(
                 <li key={item._id} className="flex justify-between gap-x-6 p-5 border">
                 <div className="flex gap-x-4  ">
                   <div className="min-w-0 flex-auto">         
                       <p className={`mt-1 truncate text-zinc-800  font-medium`}>{item.locationname}</p>         
                   </div>
                 </div>
                 <div className=" flex  items-end   ">
                   <p onClick={()=>handleRemove(item._id)}  className="w-20 border cursor-pointer rounded-md bg-red-500
                    text-white mt-1 truncate  leading-5 ">delete</p>
                   <p onClick={()=>handleEdit(item._id)} className="w-20 border cursor-pointer rounded-md bg-yellow-400
                    text-white mt-1 truncate  leading-5 ">edit</p>
                 </div>
               </li>
            )) }   
        </ul>
     </div> 
    
  </div>
  )
}

export default Location
