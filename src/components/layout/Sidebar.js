import React, { useState } from "react";
import {
  BsArrowLeftShort,
  BsTools,
  BsFillHouseDoorFill,
  BsArrowBarLeft,
  BsFillFileEarmarkArrowUpFill,
  BsPersonGear,
  BsPersonPlus,
  BsBuildingFillGear,
  BsListTask,
  BsGearWideConnected,
  BsFillGrid1X2Fill,
  BsDisplay,
  BsFillGeoAltFill,
  BsPersonCircle,
} from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/UserSlice";
import { useNavigate, Link } from "react-router-dom";
const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <div
      className={`bg-zinc-900  h-screen  p-5 pt-8   ${
        open ? "w-72" : "w-24"
      } duration-300  relative`}
    >
      {/* <BsArrowLeftShort className={`bg-white text-zinc-950 
    rounded-full text-3xl absolute -right-3 cursor-pointer 
    ${!open && "rotate-180 "}  border border-zinc-900  `} 
    onClick={()=>setOpen(!open)} /> */}

      <div className="inline-flex">
        <BsTools
          className={`text-orange-500 text-4xl cursor-pointer float-left mr-2`}
        />
        <h1
          className={`text-white origin-left font-medium
        text-2xl ${!open && "hidden"} duration-300 `}
        >
          Repair System
        </h1>
      </div>

      <div className="inline-flex px-3 pt-4 ">
        <BsPersonCircle
          className={`text-white text-3xl  cursor-pointer float-left mr-2`}
        />
        <h1
          className={`text-white origin-left font-medium
        text-1xl ${!open && "hidden"} duration-300 `}
        >
          <span>
            {user.user.firstname} {user.user.lastname}{" "}
          </span>{" "}
        </h1>
      </div>
      <ul className="pt-3 ">
        {user?.user?.role === "admin" && (
          <div>
            <Link to={"/admin/index"} className="menu-button">
              <span className="text-2xl block float-left ">
                <BsFillGrid1X2Fill />
              </span>
              <span
                className={`text-base font-medium flex-1 origin-left ${
                  !open && "hidden"
                }`}
              >
                แดรชบอร์ด
              </span>
            </Link>
            <Link to={"/admin/create-user"} className="menu-button">
              <span className="text-2xl block float-left pl-1 ">
                {" "}
                <BsPersonPlus />
              </span>
              <span
                className={`flex text-base font-medium flex-1  ${
                  !open && "hidden"
                }`}
              >
                เพิ่มผู้ใช้
              </span>
            </Link>
            <Link to={"/admin/manage-user"} className="menu-button">
              <span className="text-2xl block float-left ">
                <BsPersonGear />
              </span>
              <span
                className={`flex text-base font-medium flex-1  ${
                  !open && "hidden"
                }`}
              >
                จัดการผู้ใช้
              </span>
            </Link>
            <Link to={"/admin/department"} className="menu-button">
              <span className="text-2xl block float-left">
                <BsBuildingFillGear />
              </span>
              <span
                className={`flex text-base font-medium flex-1  ${
                  !open && "hidden"
                }`}
              >
                {" "}
                จัดการเเผนก{" "}
              </span>
            </Link>
            <Link to={"/admin/devices"} className="menu-button">
              <span className="text-2xl block float-left">
                <BsDisplay />
              </span>
              <span
                className={`flex text-base font-medium flex-1  ${
                  !open && "hidden"
                }`}
              >
                {" "}
                จัดการอุปกรณ์{" "}
              </span>
            </Link>
            <Link to={"/admin/location"} className="menu-button">
              <span className="text-2xl block float-left">
                <BsFillGeoAltFill />
              </span>
              <span
                className={`flex text-base font-medium flex-1  ${
                  !open && "hidden"
                }`}
              >
                {" "}
                จัดการสถานที่{" "}
              </span>
            </Link>
          </div>
        )}
        {user?.user?.role === "member" && (
          <div>
            {/* <Link to={"/member/index"} className="menu-button ">
              <span className="text-2xl block float-left">
                <BsFillHouseDoorFill />
              </span>
              <span
                className={`text-base font-medium flex-1 duration-500 ${
                  !open && "hidden"
                }`}
              >
                Home
              </span>
            </Link> */}
            <Link to={"/member/formrepair"} className="menu-button ">
              <span className="text-2xl block float-left">
                <BsFillFileEarmarkArrowUpFill />
              </span>
              <span
                className={`text-base font-medium flex-1 duration-500 ${
                  !open && "hidden"
                }`}
              >
                Request
              </span>
            </Link>
            <Link to={"/member/orderrepair"} className="menu-button ">
              <span className="text-2xl block float-left">
                <BsListTask />
              </span>
              <span
                className={`text-base font-medium flex-1 duration-500 ${
                  !open && "hidden"
                }`}
              >
                Status
              </span>
            </Link>
          </div>
        )}
        {user?.user?.role === "technician" && (
          <div>
            <Link to={"/technician/index"} className="menu-button ">
              <span className="text-2xl block float-left">
                <BsFillHouseDoorFill />
              </span>
              <span
                className={`text-base font-medium flex-1 duration-500 ${
                  !open && "hidden"
                }`}
              >
                Home
              </span>
            </Link>
            <Link to={"/technician/orderrepair"} className="menu-button ">
              <span className="text-2xl block float-left">
                <BsGearWideConnected />
              </span>
              <span
                className={`text-base font-medium flex-1 duration-500 ${
                  !open && "hidden"
                }`}
              >
                งานเเจ้งซ่อม
              </span>
            </Link>
          </div>
        )}
        <li className="menu-button ">
          <span>
            <BsArrowBarLeft className="text-2xl block float-left" />
          </span>
          <span
            onClick={handleLogout}
            className={`text-base font-medium flex-1 duration-500 ${
              !open && "hidden"
            }`}
          >
            Logout
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
