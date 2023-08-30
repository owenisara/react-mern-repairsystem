import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from '../layout/Sidebar'
import Swal from 'sweetalert2'
import { listDepartment } from '../function/department'
import { useNavigate } from 'react-router-dom'
const Register = () => {

    const [register,setRegister] = useState({})
    const[department,setDepartmant]= useState([])
    const navigate = useNavigate()
    const handleSubmit = (e)=>{
      e.preventDefault()
      axios.post(`${process.env.REACT_APP_API}/register`,register)
      .then(res=>{
        console.log(res.data)
        Swal.fire({
          icon: 'success',
          title: 'Create Success'
      })
        navigate('/admin/manage-user')
      }).catch(err=>console.log(err))
    }
    useEffect(()=>{
      loadData()
    },[])

    const loadData = ()=>{
      listDepartment()
      .then((res)=>{
        setDepartmant(res.data)
      }).catch(err=>console.log(err))
    } 
    console.log(department)
    const handleChange = (e)=>{
        setRegister({...register,[e.target.name]:e.target.value})
    }

    console.log(register)
  return (
    <div className=' flex'> 
      <Sidebar/>
    <div className="flex min-h-full flex-1 flex-col  px-1 py-5 lg:px-5">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
       Create Account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium leading-6 text-gray-900">
            First name
            </label>
          </div>
          <div className="mt-2">
            <input
              name="firstname"
              type="text"
              required
              onChange={handleChange}
              className="register-input"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium leading-6 text-gray-900">
            Lastname 
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="lastname"
              type="text"
              required
              onChange={handleChange}
              className="register-input"
            />
          </div>
        </div>
        <div>
          <label  className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              onChange={handleChange}
              className="register-input"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label  className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              name="password"
              type="password"
              required
              onChange={handleChange}
              className="register-input"
            />
          </div>
        </div>
        <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Department</label>
        <select  name='department' required defaultValue={'DEFAULT'}   onChange={handleChange}  
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
          focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
         <option  value="">Choose here</option>
         {department.length > 0 && department.map((item)=>(
           <option key={item._id} value={item._id}>{item.departmentname}</option>
         ))}
        </select>
        </div>
        <div>  
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
  </div>
  )
}

export default Register
