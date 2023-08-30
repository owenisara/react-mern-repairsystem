import React, { useEffect, useState } from "react";
import {
  listRepair,
  updateRepair,
  updateStatus,
  readRepair,
} from "../../function/repair";
import { Modal, Select, Button } from "antd";
import Sidebar from "../../layout/Sidebar";
import moment from "moment";
import { useSelector } from "react-redux";


const OrderTechnician = () => {
  const [orderRepair, setOrderRepair] = useState([]);
  const[filterOrder,setFilterOrder]=useState([])
  const [technicianId, settechnicianId] = useState({});
  const [detailRepair, setDetailRepair] = useState({});
  const [repairStatus, setRepairStatus] = useState({
    statusRepair: "",
    detailrepair: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderid, setOrderId] = useState("");
  const user = useSelector((state) => state.user);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = filterOrder.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filterOrder.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  let colors = [];
  const showModal = (id) => {
    readRepair(user.user.token, id)
      .then((res) => {
        setDetailRepair(res.data);
        setRepairStatus({
          ...repairStatus,
          statusRepair: res.data.statusRepair,
          detailrepair: res.data.detailrepair,
        });
      })
      .catch((err) => {
        console.log();
      });
    setIsModalOpen(true);
    setOrderId(id);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setDetailRepair({});
    setRepairStatus({ ...repairStatus, statusRepair: "", detailrepair: "" });
  };
  useEffect(() => {
    loaddata();
    // eslint-disable-next-line
  }, []);
  const loaddata = () => {
    listRepair()
      .then((res) => {
        setOrderRepair(res.data);
        settechnicianId({ repairBy: user.user.id });
        setFilterOrder(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOk = () => {
    updateStatus(user.user.id, repairStatus, orderid)
      .then((res) => {
        console.log(res.data);
        loaddata();
        setIsModalOpen(false);
        setDetailRepair({});
      })
      .catch((err) => {
        console.log(err);
      });
    
  };

  const isConfirm = (id) => {
    console.log(id);
    updateRepair(user.user.token, technicianId, id)
      .then((res) => {
        console.log(res.data);
        loaddata();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setRepairStatus({ ...repairStatus, statusRepair: value });
  };
  const handleDetail = (e) => {
    setRepairStatus({ ...repairStatus, detailrepair: e.target.value });
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
  console.log("record",records );
  console.log('filter',filterOrder)
  return (
    <div className=" flex">
      <aside>
        <Sidebar />
      </aside>
      <div className=" flex min-h-full flex-1 flex-col  px-1 py-7 lg:px-10">
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
          <thead className="border-b  bg-gray-100 font-medium dark:border-neutral-800 ">
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
              <th scope="col" className="px-2 py-3 border">
                ผู้รับแจ้งซ่อม
              </th>
              <th scope="col" className="px-2 py-3 border">
                ดำเนินการ
              </th>
            </tr>
          </thead>
          <tbody>
            {records.map((item, index) => (
              <tr
                className="border-b transition duration-300 ease-in-out hover:bg-neutral-300"
                key={index}
              >
                <td className="whitespace-nowrap border px-3 py-3 font-medium">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap border px-3 py-3 font-medium">
                  {item.requireBy.firstname} {item.requireBy.lastname}
                </td>
                <td className="whitespace-nowrap border px-3 py-3 font-medium">
                  {item.device.devicename}
                </td>
                <td className="whitespace-wrap w-52  border px-3 py-3 font-medium">
                  {item.detailproblem}
                </td>
                <td className="whitespace-nowrap px-3 border py-3 font-medium">
                  <p>{item.location.locationname}</p>
                  <p>เเผนก: {item.department.departmentname} </p>{" "}
                </td>
                <td className="whitespace-nowrap px-3 border py-3 font-medium">
                  {item.phone}
                </td>
                <td
                  className={`whitespace-nowrap ${colors[index]}  px-3 border py-3`}
                >
                  {item.statusRepair}
                </td>
                <td className="whitespace-nowrap px-3 border py-3">
                  {moment(item.createdAt).format("DD/MMM/YYYY HH:mm")}
                </td>
                <td className="whitespace-nowrap text-center border py-3">
                  {item.repairBy ? item.repairBy.firstname : "-"}
                </td>
                <td className="whitespace-nowrap px-3 border py-3">
                  <button
                    onClick={() => isConfirm(item._id)}
                    className="w-16 border  text-white px-2 cursor-pointer rounded-md bg-blue-700 "
                  >
                    รับงาน
                  </button>
                  <button
                    onClick={() => showModal(item._id)}
                    className="w-16 border  text-white px-2 cursor-pointer rounded-md bg-green-500 "
                  >
                    อัปเดต
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <Modal
            title="อัปเดตสถานะ"
            open={isModalOpen}
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
            <hr />
            <h1 className="mt-4">อัปเดต </h1>
            <Select
              style={{
                width: 320,
              }}
              value={
                repairStatus.statusRepair ? repairStatus.statusRepair : "รอซ่อม"
              }
              onChange={handleChange}
              required
              options={[
                { value: "รอซ่อม" },
                { value: "รออะไหล่" },
                { value: "กำลังดำเนินการ" },
                { value: "เสร็จเรียบร้อย" },
              ]}
            />
            <div className="mt-2">
              <p className="mb-1">วิธีเเก้ไข</p>
              <textarea
                name="detailrepair"
                type="text"
                rows="4"
                value={repairStatus?.detailrepair}
                required
                onChange={handleDetail}
                className="register-input"
              />
            </div>
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
              className={`p-1 px-2 border  cursor-pointer ${
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
export default OrderTechnician;
