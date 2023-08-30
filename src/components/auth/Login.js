import React,{useEffect, useState} from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import{loginUser } from '../store/UserSlice'
import fixpic from '../../pic/fixpic.png'
import Swal from 'sweetalert2'
const Login = () => {
  const user = useSelector((state)=>(state.user))
  const dispatch = useDispatch()
  const [loginForm,setLoginForm] = useState({})
  const navigate = useNavigate()
  const handleSubmit = async (e) =>{
    e.preventDefault()
   await  axios.post(`${process.env.REACT_APP_API}/login`,loginForm)
    .then(res=>{
      console.log(res.data) 
      dispatch(loginUser({
        token:res.data.token,
        id:res.data.payload.user.id,
        email:res.data.payload.user.email,
        role:res.data.payload.user.role,
        firstname:res.data.payload.user.firstname,
        lastname:res.data.payload.user.lastname
      }) )
      localStorage.setItem('token',res.data.token)
     
      if(res.data.payload.user.role === 'admin' ){
        navigate('/admin/index')
      }
      else if(res.data.payload.user.role === 'technician' ){
        navigate('/technician/index')
      }
      else{
        navigate('/member/orderrepair')
      }
    }).catch(err=>{
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'ERROR: The username or password you entered is incorrect. Lost your password?',
        footer:''
      })
    })
  }
  useEffect(()=>{
if(user && user.user.token&&user.user.role === 'admin'){
  navigate('/admin/index')
 }
 else if(user && user.user.token &&user.user.role === 'member' ){
  navigate('/member/index')
 }
 // eslint-disable-next-line
  },[])
 

  const handleChange = (e)=>{
    setLoginForm({...loginForm,[e.target.name]:e.target.value})
}
  return (
    <div className="flex min-h-full flex-1 flex-col  justify-center px-6 py-2 lg:px-8">
      <div className="sm:mx-auto sm:w-full  p-5 sm:max-w-sm">
        <img
          className="mx-auto h-72 w-80"
          src={fixpic}
          alt="Your Company"
        />
       
        <h2 className="mt-4 pb-3 text-center text-2xl font-bold leading-5 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      

      <div className="mt-1 sm:mx-auto sm:w-full   sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="email"className="block text-sm font-medium leading-6 text-gray-900">
              Email address
            </label>
            <div className="mt-1">
              <input id="email"name="email" type="email" required onChange={handleChange}
                className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 
                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password"className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                name="password" type="password" required
                onChange={handleChange}
                className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 
                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400
                 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5
               text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 
               focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
               focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div></div>
    </div>
  );
};

export default Login;
