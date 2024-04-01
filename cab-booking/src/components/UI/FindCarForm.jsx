import React, { useState } from "react";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const FindCarForm = () => {
  const [find, setFind] = useState({
    cab_name: "",
  });
  const [data, setData] = useState();

  const handleChange = (e) => {
    const capitalizedValue =
      e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setFind({
      ...find,
      cab_name: capitalizedValue,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/cabDetails`
      );
      setData(response.data);
      console.log("response.data-->.", response.data);

      console.log("-->", find);
      console.log("data-->.", data);
      let found = false;
      if (response.data) {
        response.data.forEach((element) => {
          if (element.cab_name === find.cab_name) {
            found = true;
            navigate(`/cars/${element._id}`);
          }
        });
        if (!found) {
          swal({
            title: "Invalid Cab Name (uppercase first character required)!!",
            icon: "error",
          });
        }
      } else {
        swal({
          title: "Invalid email or password!!",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Form className="form">
      <h2>Search Car Name</h2>
      <div className=" d-flex align-items-center justify-content-between mt-4">
        <FormGroup className="form__group">
          <input
            type="search"
            className="w-5"
            placeholder="Search Car Name"
            name="cab_name"
            value={find.cab_name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup className="form__group_btn">
          <button
            type="submit"
            className="btn find__car-btn"
            onClick={handleSubmit}
          >
            Find Car
          </button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
