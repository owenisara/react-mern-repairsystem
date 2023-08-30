import React, { useEffect, useState } from "react";
import Sidebar from "../../layout/Sidebar";
import { listDepartment } from "../../function/department";
import { EditUser } from "../../function/user";
import { ReadUser } from "../../function/user";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const UpdateUser = () => {
  let initialdata = {
    _id: "",
    firstname: "",
    lastname: "",
    department: {},
  };
  const [editdata, setEditData] = useState(initialdata);
  const [department, setDepartmant] = useState([]);
  const [departmentId, setDepartmantId] = useState({});
  const user = useSelector((state) => state.user);
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  useEffect(() => {
    loadData();
    gatDate();
  }, []);
  const loadData = () => {
    listDepartment()
      .then((res) => {
        setDepartmant(res.data);
      })
      .catch((err) => console.log(err));
  };
  const gatDate = () => {
    ReadUser(user.user.token, id)
      .then((res) => {
        setEditData({ ...res.data, department: res.data.department._id });
        setDepartmantId(res.data.department);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    console.log("change");
    setEditData({ ...editdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    EditUser(user.user.token, id, editdata)
      .then((res) => {
        console.log(res.data);
        Swal.fire(
          {
            icon: "success",
            title: "Update success",
            showConfirmButton: false,
            timer: 1500,
          },
          navigate("/admin/manage-user")
        );
      })
      .catch((err) => console.log(err));
  };

  console.log("ed", editdata.department);
  console.log("departmentId", departmentId._id);

  return (
    <div className=" flex">
      <Sidebar />
      <div className="flex min-h-full flex-1 flex-col  px-1 py-10 lg:px-5">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Edit Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  First name
                </label>
              </div>
              <div className="mt-2">
                <input
                  name="firstname"
                  value={editdata.firstname}
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
                  name="lastname"
                  value={editdata.lastname}
                  type="text"
                  required
                  onChange={handleChange}
                  className="register-input"
                />
              </div>
              <div></div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Select Department
              </label>
              <select
                name="department"
                required
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              >
                <option value={departmentId && departmentId._id}>
                  {" "}
                  {departmentId && departmentId.departmentname}
                </option>
                {department.length > 0 &&
                  department.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.departmentname}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
