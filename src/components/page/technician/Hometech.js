import React, { useEffect, useState } from 'react'
import Sidebar from '../../layout/Sidebar'
import { listRepair,waitingRepair,completeRepair,waitingpartsRepair,} from '../../function/repair'
import { useSelector } from 'react-redux'
import { BsListUl,BsTools,BsCheckCircleFill,BsHourglassSplit } from "react-icons/bs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
const HomeTech  = () => {
  const user = useSelector((state)=>(state.user))
  const[orderRepair,setOrderRepair]= useState([])
  const[orderWaitRepair,setOrderWaitRepair]= useState([])
  const[orderWaitPartsRepair,setOrderWaitPartsRepair]= useState([])
  const[orderCompleteRepair,setOrderCompleteRepair]= useState([])
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: [`รอซ่อม : ${orderWaitRepair.length }`, 
    `รออะไหล่ : ${orderWaitPartsRepair.length}`, 
    `เสร็จเรียบร้อย : ${orderCompleteRepair.length }`],
    datasets: [
      {
        label: 'จำนวน',
        data: [orderWaitRepair.length, orderWaitPartsRepair.length, orderCompleteRepair.length, ],
        backgroundColor: [
          'rgba(255, 12, 15, 0.8)',
          'rgba(255, 205, 40, 0.8)',
          'rgba(0, 255, 145, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };
 

  useEffect(()=>{
    loaddata()
    // eslint-disable-next-line
},[])
const loaddata = ()=>{
listRepair()
.then((res)=>{
    setOrderRepair(res.data)
}).catch(err=>{
    console.log(err)
})
waitingRepair()
.then((res)=>{
  setOrderWaitRepair(res.data)
}).catch(err=>{
    console.log(err)
})
waitingpartsRepair()
.then((res)=>{
  setOrderWaitPartsRepair(res.data)
}).catch(err=>{
    console.log(err)
})
completeRepair()
.then((res)=>{
  setOrderCompleteRepair(res.data)
}).catch(err=>{
    console.log(err)
})}

  return (
    <div className='flex'>
    <div>
    <Sidebar/>
    </div>
     <div className='flex w-full '> 
     <div className='w-80 h-fit py-5 border flex-col bg-gray-200 m-5 justify-center rounded-lg'>
      <p className='text-xl font-bold text-zinc-700 text-center m-3'>Pie Chart</p>
      <Doughnut data={data} className='text-center '  /> 
    </div>
    <div className='flex-col border h-fit m-5 rounded-lg bg-gray-200 '> 
    <div className='flex  justify-center'>
    <div className='m-3 p-3 font-medium text-slate-200 text-center bg-sky-500 w-60 h-48 border rounded-lg text-3xl '>
     <span><BsListUl/></span>
     <p className='py-3 '>งานทั้งหมด</p>
     <p>{orderRepair.length}</p>
   </div>
   <div className='m-3 p-3 font-medium text-slate-200 text-center bg-red-500 w-60 h-48 border rounded-lg text-3xl '>
     <span><BsTools/></span>
     <p className='py-3 '>รอซ่อม</p>
     <p>{orderWaitRepair.length}</p>
   </div>
   </div>
   <div className='flex  justify-center'>
   <div className='m-3 p-3 font-medium text-slate-200 text-center bg-yellow-500 w-60 h-48 border rounded-lg text-3xl '>
     <span><BsHourglassSplit/></span>
     <p className='py-3 '>รออะไหล่</p>
     <p>{orderWaitPartsRepair.length}</p>
   </div>
   <div className='m-3 p-3 font-medium text-slate-200 text-center bg-emerald-500 w-60 h-48 border rounded-lg text-3xl '>
     <span><BsCheckCircleFill/></span>
     <p className='py-3 '>เสร็จเรียบร้อย</p>
     <p>{orderCompleteRepair.length}</p>
   </div>
   </div>
  </div>
     </div>
 
  </div>
  )
}

export default HomeTech
