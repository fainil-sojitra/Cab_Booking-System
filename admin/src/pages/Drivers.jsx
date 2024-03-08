import React from "react";
import TopNav from "../components/TopNav/TopNav";
import Sidebar from "../components/Sidebar/Sidebar";
import "../styles/drivers.css";
import DriverDtails from "./DriverDtails";
import CabDetails from "./CabDetails";

const Drivers = () => {
  return (
    <>
      <div className="layout">
        <Sidebar />
        <div className="main__layout">
          <TopNav />
          <div className="main_div">
            <DriverDtails />
            <CabDetails />
          </div>
        </div>
      </div>
    </>
  );
};

export default Drivers;
