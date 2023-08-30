import React, { useEffect, useState } from "react";
import { listRepair, readRepair } from "../../function/repair";
import Sidebar from "../../layout/Sidebar";
import { Button, Modal,Select } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
const OrderMember = () => {
  const [orderRepair, setOrderRepair] = useState([]);
  const [detailRepair, setDetailRepair] = useState({});
  const[filterOrder,setFilterOrder]=useState([])
  const user = useSelector((state) => state.user);
  // modle
  const showModal = (id) => {
    readRepair(user.user.token, id)
      .then((res) => {
        setDetailRepair(res.data);
      })
      .catch((err) => {
        console.log();
      });

    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filterOrder.slice(firstIndex, lastIndex) 
  const npage = Math.ceil(filterOrder.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  let colors = [];
  useEffect(() => {
    loaddata();
    // eslint-disable-next-line
  }, []);
  const loaddata = () => {
    listRepair()
      .then((res) => {
        setOrderRepair(res.data);
        setFilterOrder(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const changeOptions = (value) => {
    console.log(`selected ${value}`);
    if(value==='ทั้งหมด'){
      setFilterOrder(orderRepair)
    }
    else{
      setFilterOrder(orderRepair.filter(orderRepair => orderRepair.statusRepair === value) ) 
      setCurrentPage(1);
    }
  };

  for (let i = 0; i <= records.length; i++) {
    if (records[i]?.statusRepair === "รอซ่อม") {
      colors.push("text-red-600");
    } else if (records[i]?.statusRepair === "รออะไหล่") {
      colors.push("text-amber-600");
    } else if (records[i]?.statusRepair === "กำลังดำเนินการ") {
      colors.push("text-blue-600");
    } else if (records[i]?.statusRepair === "เสร็จเรียบร้อย") {
      colors.push("text-green-600");
    }
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

  console.log(detailRepair);
  console.log('record',records)
  
  return (
    <div className=" flex">
      <aside>
        <Sidebar />
      </aside>
      <div className=" flex min-h-full flex-1 flex-col  px-1 py-5 lg:px-10">
      <h1 className=" text-2xl text-center">ระบบแจ้งซ่อม</h1>
        <div className="my-3">
        <Select
      defaultValue="ทั้งหมด"
      style={{
        width: 220,
      }}
      onChange={changeOptions}
      options={[
        {value: 'ทั้งหมด',label: 'ทั้งหมด',},
        {value: 'รอซ่อม',label: 'รอซ่อม',},
        {value: 'รออะไหล่',label: 'รออะไหล่',},
        {value: 'กำลังดำเนินการ',label: 'กำลังดำเนินการ',},
        {value: 'เสร็จเรียบร้อย',label: 'เสร็จเรียบร้อย',}
      ]}
    />
    </div>
        <table className="min-w-full text-left text-sm border  ">
          <thead className="border-b bg-gray-100 font-medium dark:border-neutral-800 ">
            <tr>
              <th scope="col" className="px-2 py-3 border">
                #
              </th>
              <th scope="col" className="px-2 py-3 border">
                ผู้เเจ้งซ่อม
              </th>
              <th scope="col" className="px-2 py-3  border">
                อุปกรณ์
              </th>
              <th scope="col" className="text-center px-5 py-3 border">
                รายละเอียด
              </th>
              <th scope="col" className="text-center border py-3">
                สถานที่
              </th>
              <th scope="col" className="px-2 py-3 border">
                ติดต่อ
              </th>
              <th scope="col" className="px-2 py-3 border">
                สถานะ
              </th>
              <th scope="col" className="px-2 py-3 border">
                วันที่แจ้งซ่อม
              </th>
              {/* <th scope="col" className="px-2 py-3 border" >ผู้รับแจ้งซ่อม</th> */}
              <th scope="col" className="px-2 py-3 border">
                รายละเอียด
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((item, index) => (
              <tr
                className="border-b transition duration-300 ease-in-out hover:bg-neutral-100"
                key={index}
              >
                <td className="whitespace-nowrap border px-3 py-3 font-medium">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap border px-3 py-3">
                  {item.requireBy.firstname} {item.requireBy.lastname}
                </td>
                <td className="whitespace-nowrap border px-3 py-3">
                  {item.device.devicename}
                </td>
                <td className="whitespace-wrap border px-3 py-3">
                  {item.detailproblem}
                </td>
                <td className="whitespace-nowrap border px-3 py-3">
                  <p>{item.location.locationname}</p>
                  <p>เเผนก: {item.department.departmentname}</p>
                </td>
                <td className="whitespace-nowrap border px-3 py-3">
                  {item.phone}
                </td>
                <td
                  className={`whitespace-nowrap ${colors[index]}  px-3 border py-3`}
                >
                  {item.statusRepair}
                </td>
                <td className="whitespace-nowrap border px-3 py-3">
                  {moment(item.createdAt).format("DD-MMM-YYYY HH:mm")}
                </td>
                {/* <td className="whitespace-nowrap border px-3 py-3">{item.repairBy ? item.repairBy.firstname : '-'   }</td> */}
                <td className="whitespace-nowrap border px-3 py-3">
                  <span  className="w-16 border  text-white p-1 cursor-pointer rounded-md bg-green-500 " onClick={() => showModal(item._id)}>ดูรายละเอียด</span>
                </td>
              </tr>
            ))}
          </tbody>
          <Modal
            title="รายละเอียด"
            width={600}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="submit" onClick={handleOk}>
                Submit
              </Button>,
            ]}
          >
            <p>
              ผู้รับแจ้งซ่อม : {detailRepair.requireBy?.firstname}{" "}
              {detailRepair.requireBy?.lastname}
              <br />
              โทร {detailRepair.phone}
            </p>
            <p>
              วันที่แจ้งซ่อม :{" "}
              {moment(detailRepair.createdAt).format("DD-MMM-YYYY HH:mm")}
            </p>
            <hr />
            <br />
            <p>
              อุปกรณ์ : {detailRepair.device?.devicename} <br />
              รายละเอียดเพิ่มเติม: {detailRepair.detailproblem}
            </p>
            <p>
              หน่วยงาน/สถานที่ : {detailRepair.location?.locationname} แผนก{" "}
              {detailRepair.department?.departmentname}{" "}
            </p>
            <br />
            <hr />
            <p>
              วันที่ดำเนินการ :{" "}
              {moment(detailRepair.updatedAt).format("DD-MMM-YYYY HH:mm")}{" "}
            </p>
            <p>
              ผู้ดำเนินการซ่อม : {detailRepair.repairBy?.firstname}{" "}
              {detailRepair.repairBy?.lastname}{" "}
            </p>
            <p>วิธีเเก้ไข : {detailRepair.detailrepair}</p>
            <p>สถานะ : {detailRepair.statusRepair}</p>
          </Modal>
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
  );
};

export default OrderMember;
