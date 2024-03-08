import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Bookings from "../pages/Bookings";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Customer from "../pages/Customer";
import Drivers from "../pages/Drivers";
import NotFound from "../pages/NotFound";
import PrivateComponent from "../components/Private/PrivateComponent";

const Router = () => {
  return (
    <Routes>
      <Route element={<PrivateComponent />}>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/driver" element={<Drivers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
