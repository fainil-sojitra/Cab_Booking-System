import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/car-item.css";

const CarItem = (props) => {
  const {
    _id,
    cab_image,
    cab_name,
    cab_model,
    cab_charge,
    cab_speed,
    cab_transmissions,
  } = props.item;

  return (
    <Col lg="4" md="4" sm="6" className="mb-5" key={_id}>
      <div className="car__item">
        <div className="car__img">
          <img
            src={`${process.env.REACT_APP_API}/${cab_image}`}
            alt="cab_img"
            className="w-100"
          />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{cab_name}</h4>
          <h6 className="rent__price text-center mt-">
            ₹{cab_charge}.00 <span>/ Day</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-car-line"></i> {cab_model}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-settings-2-line"></i> {cab_transmissions}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-timer-flash-line"></i> {cab_speed}
            </span>
          </div>

          <button className=" w-100 car__item-btn car__btn-details">
            <Link to={`/cars/${_id}`}>Book Now</Link>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default CarItem;
