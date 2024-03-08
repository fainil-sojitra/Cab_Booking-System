import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import SingleCard from "../components/reuseable/SingleCard";

import RecommendCarCard from "../components/UI/RecommendCarCard";
import recommendCarsData from "../assets/dummy-data/recommendCars";
import Sidebar from "../components/Sidebar/Sidebar";
import TopNav from "../components/TopNav/TopNav";
import axios from "axios";

const Dashboard = () => {
  const [cabs, setCabs] = useState([]);
  const [booking, setBooking] = useState([]);
  const [registration, setRegistration] = useState([]);

  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/total_cabs`)
      .then((res) => setCabs(res.data));
    axios
      .get(`${process.env.REACT_APP_API}/total_booking`)
      .then((res) => setBooking(res.data));
    axios
      .get(`${process.env.REACT_APP_API}/total_registration`)
      .then((res) => setRegistration(res.data));
  };

  // registration.forEach(function (element) {
  //   if (element.type === "client") {
  // console.log(registration.clients, registration.drivers);
  //   }
  // });

  const carObj = {
    title: "Total Cabs",
    totalNumber: cabs.total_cabs,
    icon: "ri-police-car-line",
  };

  const tripObj = {
    title: "Total Bookings",
    totalNumber: booking.total_booking,
    icon: "ri-steering-2-line",
  };

  const clientObj = {
    title: "Total Clients",
    totalNumber: registration.clients,
    icon: "ri-user-line",
  };

  const distanceObj = {
    title: "Total Drivers",
    totalNumber: registration.drivers,
    icon: "ri-user-line",
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <div className="main__layout">
        <TopNav />
        <div className="dashboard">
          <div className="dashboard__wrapper">
            <div className="dashboard__cards">
              <SingleCard item={carObj} />
              <SingleCard item={tripObj} />
              <SingleCard item={clientObj} />
              <SingleCard item={distanceObj} />
            </div>

            <div className="recommend__cars-wrapper">
              {recommendCarsData.map((item) => (
                <RecommendCarCard item={item} key={item.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
