import React from "react";

import Login from "./components/auth/Login";
import { Routes,Route } from 'react-router-dom';
import { useDispatch } from "react-redux";
import Register from "./components/auth/Register";
import HomeAdmin from "./components/page/admin/HomeAdmin";
import HomeMember from "./components/page/member/HomeMember";
import HomeTech from "./components/page/technician/Hometech";

import { currentUser } from "./components/function/auth";
import { loginUser } from "./components/store/UserSlice";
import MemberRoute from "./components/router/MemberRoute";
import AdminRoute from "./components/router/AdminRoute";
import TechRoute from "./components/router/TechRoute";
import ManageUser from "./components/page/admin/ManageUser";
import Department from "./components/page/admin/Department";
import UpdateUser from "./components/page/admin/UpdateUser";
import Devices from "./components/page/admin/Devices";
import Location from "./components/page/admin/Location";
import FormRepair from "./components/page/member/FormRepair";
import OrderMember from "./components/page/member/OrderMember";
import OrderTechnician from "./components/page/technician/OrderTechnician";
function App() {
const dispatch = useDispatch()
const idtoken = localStorage.token
 if(idtoken){
  console.log( 'idtoken',idtoken)
  currentUser(idtoken)
  .then(res=>{
    dispatch(loginUser({
      token:idtoken,
      id:res.data._id,
      email:res.data.email,
      role: res.data.role, 
      firstname:res.data.firstname,
      lastname:res.data.lastname}))
      console.log('token',res.data)
  }).catch(err=>{
    console.log(err)
  })
 }
  return (

   <>
   
    <Routes>
    <Route path="/" element={<Login/>}></Route>
    {/* <Route path="/register" element={}></Route> */}
    {/* Admin */}
    <Route path="/admin/index" element={<AdminRoute><HomeAdmin/></AdminRoute>}></Route>
    <Route path="/admin/manage-user" element={<AdminRoute><ManageUser/></AdminRoute>}></Route>
    <Route path="/admin/create-user" element={<AdminRoute><Register/></AdminRoute>}></Route>
    <Route path="/admin/department" element={<AdminRoute><Department/></AdminRoute>}></Route>
    <Route path="/admin/update/:id" element={<AdminRoute><UpdateUser/></AdminRoute>}></Route>
    <Route path="/admin/devices" element={<AdminRoute><Devices/></AdminRoute>}></Route>
    <Route path="/admin/location" element={<AdminRoute><Location/></AdminRoute>}></Route>
  
    {/* Member */}
    <Route path="/member/index" element={<MemberRoute><HomeMember/></MemberRoute>}></Route>
    <Route path="/member/formrepair" element={<MemberRoute><FormRepair/></MemberRoute>}></Route>
    <Route path="/member/orderrepair" element={<MemberRoute><OrderMember/></MemberRoute>}></Route>


    <Route path="/technician/index" element={<TechRoute><HomeTech/> </TechRoute>}></Route>
    <Route path="/technician/orderrepair" element={<TechRoute><OrderTechnician/> </TechRoute>}></Route>
    </Routes>
   </>
  );
}

export default App;
