import React from "react";
import "../styles/bookings.css";
import Sidebar from "../components/Sidebar/Sidebar";
import TopNav from "../components/TopNav/TopNav";
import PaymentDetails from "./PaymentDetails";
import BookingDetails from "./BookingDetails";

const Bookings = () => {
  return (
    <>
      <div className="layout">
        <Sidebar />
        <div className="main__layout">
          <TopNav />
          <div className="main_div">
            <BookingDetails />
            <PaymentDetails />
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookings;
