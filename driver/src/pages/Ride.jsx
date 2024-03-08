import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import CommonSection from "../components/UI/CommonSection";
import "../style/ride.css";
import RideDetails from "./RideDetails";
import CabDetails from "./CabDetails";
import PaymentDetails from "./PaymentDetails";

const Ride = () => {
  return (
    <>
      <Header />
      <CommonSection title="Ride" />
      <CabDetails />
      <RideDetails />
      <PaymentDetails />
      <Footer />
    </>
  );
};

export default Ride;
