import React, { useEffect, useState } from "react";
import Sidebar from "../../layout/Sidebar";
import { listDepartment } from "../../function/department";
import { listDevice } from "../../function/device";
import { listLocation } from "../../function/location";
import { createRepair } from "../../function/repair";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const FormRepair = () => {
  const [repair, setRepair] = useState({});
  const [device, setDevice] = useState([]);
  const [department, setDepartment] = useState([]);
  const [location, setLocation] = useState([]);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    createRepair(user.user.token, repair)
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          icon: "success",
          title: "Create Success",
        });
        navigate("/member/orderrepair");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);
  const loadData = () => {
    listDevice(user.user.token)
      .then((res) => {
        setDevice(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    listDepartment(user.user.token)
      .then((res) => {
        setDepartment(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    listLocation(user.user.token)
      .then((res) => {
        setLocation(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    setRepair({ ...repair, requireBy: user.user.id });
  };
  const handleChange = (e) => {
    setRepair({ ...repair, [e.target.name]: e.target.value });
  };
  console.log(repair);
  console.log(user);
  console.log(department);
  console.log(location);
  return (
    <div className=" flex">
      <Sidebar />
      <div className="flex min-h-full flex-1 flex-col  px-1 py-5 lg:px-5">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-1 text-center text-2xl font-bold leading-2 tracking-tight text-gray-900">
            Form Repair
          </h2>
        </div>

        <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-sm font-medium leading-2 text-gray-900">
                ผู้เเจ้งซ่อม
              </label>
              <div className="mt-1">
                <span disabled className="register-input">
                  {user.user.firstname}&nbsp;&nbsp;{user.user.lastname}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                เบอร์ติดต่อ
              </label>
              <div className="mt-1">
                <input
                  name="phone"
                  type="text"
                  required
                  onChange={handleChange}
                  className="register-input"
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                สถานที่
              </label>
              <select
                name="location"
                required
                defaultValue={"DEFAULT"}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">Choose here</option>
                {location.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.locationname}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                แผนก
              </label>
              <select
                name="department"
                required
                defaultValue={"DEFAULT"}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">Choose here</option>
                {department.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.departmentname}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                อุปกรณ์
              </label>
              <select
                name="device"
                required
                defaultValue={"DEFAULT"}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">Choose here</option>
                {device.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.devicename}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-2 text-gray-900">
                    รายละเอียด
                  </label>
                </div>
                <div className="mt-1">
                  <textarea
                    name="detailproblem"
                    type="text"
                    rows="4"
                    required
                    onChange={handleChange}
                    className="register-input"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-2 flex w-full justify-center rounded-md bg-indigo-600
           px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm
            hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2
             focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default FormRepair;
