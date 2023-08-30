import React,{useState,useEffect} from 'react'
import Sidebar from '../../layout/Sidebar'
import { listUser,RemoveUser,changeStatus,changeRole } from '../../function/user'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Switch,Select,Tag } from 'antd';
import moment from 'moment'
import Swal from 'sweetalert2'
const ManageUser = () => {
    const [data,setData]=useState([])
    const user = useSelector((state)=>(state.user))

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex) 
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  
    const navigate = useNavigate()
    useEffect(()=>{
        loadData()
        // eslint-disable-next-line
    },[])
    const loadData = ()=>{
        listUser()
        .then((res)=>{
            setData(res.data)
        }).catch((err)=>{
            console.log(err)
        })}
    console.log(data)
    const handleRead = (id)=>{
       navigate(`/admin/update/${id}`)
      console.log(id)
    }
    const handleRemove = (id)=>{
      console.log(id)
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
           RemoveUser(user.user.token,id)
       .then((res)=>{
         console.log(res)
         loadData()})
       .catch((err)=>{
         console.log(err)
       })}})}
     

       const handleChangeStatus =(id,status)=>{
          console.log('status',id,!status )
        changeStatus(user.user.token,id,!status)
        .then((res)=>{
          console.log(res)
          loadData()})
        .catch((err)=>{
          console.log(err)
        })
       }
       const handleChangeRole =(id,value)=>{
       
        console.log(id,value)
        changeRole(user.user.token,id,value)
        .then((res)=>{
          console.log(res)
          loadData()})
        .catch((err)=>{
          console.log(err)
        })
       }

       const prePage = () => {
        if (currentPage !== 1) {
          setCurrentPage(currentPage - 1);
    
        }
      };
      const changePage = (id) => {
        setCurrentPage(id);
      };
      const nextPage = () => {
        if (currentPage !== npage) {
          setCurrentPage(currentPage + 1);
        }
      };
  return (
    <div className='flex '>
      <div>
          <Sidebar/>
      </div>
  
    <div className=' flex min-h-full flex-1 flex-col  px-1 py-10 lg:px-10'>
    <table className="min-w-full text-left text-sm border  ">
  <thead className='border-b font-medium dark:border-neutral-500 '  >
    <tr>
      <th scope="col" className="px-5 py-4">#</th>
      <th scope="col" className="px-5 py-4" >Email</th>
      <th scope="col" className="px-5 py-4" >Firstname</th>
      <th scope="col" className="px-5 py-4" >Lastname</th>
      <th scope="col" className="px-5 py-4" >department</th>
      <th scope="col" className="px-5 py-4" >Role</th>
      <th scope="col" className="px-5 py-4" >Status</th>
      <th scope="col" className="px-5 py-4" >Created</th>
      <th scope="col" className="px-5 py-4" >Updated</th>
      <th scope="col" className="px-5 py-4 border-e" >Action</th>

    </tr>
  </thead>
  <tbody>
    { records.map((item,index)=>(
        <tr className='border-b transition duration-300 ease-in-out hover:bg-neutral-100' key={index}>
      <td className="whitespace-nowrap px-2 py-4 font-medium" >{index+1}</td>
      <td className="whitespace-nowrap px-2 py-4" >{item.email}</td>
      <td className="whitespace-nowrap px-2 py-4">{item.firstname}</td>
      <td className="whitespace-nowrap px-2 py-4">{item.lastname}</td>
      <td className="whitespace-nowrap px-2 py-4">{item.department.departmentname}</td>
      <td className="whitespace-nowrap px-2 py-4"><Select
      defaultValue={item.role}
      style={{ width: 120 }}
      onChange={(value)=>handleChangeRole(item._id,value)}
      options={[
        { value: 'admin',label:<Tag color="purple">admin</Tag>},
        { value: 'technician',label:<Tag color="gold">technician</Tag>},
        { value: 'member',label:<Tag color="green">member</Tag>},]}/></td>
      <td className="whitespace-nowrap px-2 py-4"><Switch size="small" className=' bg-slate-400' checked={item.enabled} onClick={()=>handleChangeStatus(item._id,item.enabled)} /></td>
      <td className="whitespace-nowrap px-2 py-4">{moment(item.createdAt).format('DD-MMM-YYYY') }</td>
      <td className="whitespace-nowrap px-2 py-4">{moment(item.updatedAt).format('DD-MMM-YYYY')}</td>
      <td className="whitespace-nowrap px-2 py-4 border-e">
     <span  onClick={()=>handleRemove(item._id)}  className="w-20 border  text-white px-2 cursor-pointer rounded-md bg-red-500">
     Delete
     </span> 
     <span onClick={()=>handleRead(item._id)} className='w-20 border text-white px-2 cursor-pointer rounded-md bg-yellow-500'>
      Edit
     </span>
      </td>
    </tr>
    ))
    }
  </tbody>
</table>
<ul className=" flex mt-2 ">
          <li
            dir="ltr"
            onClick={prePage}
            className="p-1 border cursor-pointer rounded-s-lg"
          >
            <p className="">Prev</p>
          </li>
          {numbers.map((n, i) => (
            <li
              onClick={() => changePage(n)}
              className={`p-1 px-2 border   cursor-pointer ${
                currentPage === n ? "bg-blue-300" : ""
              }`}
              key={i}
            >
              <p className="">{n}</p>
            </li>
          ))}
          <li
            dir="rtl"
            onClick={nextPage}
            className="  p-1 border cursor-pointer rounded-s-lg"
          >
            <p className="">Next</p>
          </li>
        </ul>
    </div>
  </div>
  )
}

export default ManageUser
