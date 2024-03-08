import React, { useState } from "react";
import "../style/addCabs.css";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const AddCabs = () => {
  const navigate = useNavigate();

  let [data, setData] = useState({
    cab_name: "",
    cab_model: "",
    cab_seat: "",
    cab_charge: "",
    cab_image: "",
    cab_status: "InActive",

    cab_brand: "",
    cab_rating: "",
    cab_speed: "",
    cab_gps: "GPS Navigation",
    cab_transmissions: "",
    cab_description: "",
  });

  const imageUpload = (event) => {
    // console.log(event.target.files[0]);
    setData({ ...data, cab_image: event.target.files[0] });
  };

  const handleData = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    // console.log(data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("cab_image", data.cab_image);
    formData.append("cab_name", data.cab_name);
    formData.append("cab_model", data.cab_model);
    formData.append("cab_seat", data.cab_seat);
    formData.append("cab_charge", data.cab_charge);
    formData.append("cab_status", data.cab_status);

    formData.append("cab_brand", data.cab_brand);
    formData.append("cab_rating", data.cab_rating);
    formData.append("cab_speed", data.cab_speed);
    formData.append("cab_gps", data.cab_gps);
    formData.append("cab_transmissions", data.cab_transmissions);
    formData.append("cab_description", data.cab_description);

    axios
      .post(`${process.env.REACT_APP_API}/cabDetails`, formData)
      .then((res) => {
        setData(res?.data);
        console.log("Apply Cab reqest is sending successfully...");
        if (res?.data) {
          swal({
            title: "APPLY CAB REQEST IS SENDING SUCCESSFULLY!",
            icon: "success",
          });
          setData({
            cab_name: "",
            cab_model: "",
            cab_seat: "",
            cab_charge: "",
            cab_image: "",
            cab_status: "InActive",
            cab_brand: "",
            cab_rating: "",
            cab_speed: "",
            cab_gps: "GPS Navigation",
            cab_transmissions: "",
            cab_description: "",
          });
          navigate("/ride");
        }
      })
      .catch((er) => console.log(er));
    // console.log("data", data);
  };

  return (
    <>
      <div>
        {/* -------------- add button ---------------- */}
        <button
          type="button"
          className="btn btn-warning add_btn"
          data-bs-target="#add-model"
          data-bs-toggle="modal"
        >
          <i className="ri-add-circle-fill" />
          Add Cab
        </button>
        {/* -------------- add button ---------------- */}

        {/* -------------- modal --------------------- */}

        <div
          className="modal fade"
          id="add-model"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  <i className="ri-taxi-line" />
                  Add Cab
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body add">
                <form onSubmit={handleSubmit}>
                  <div className="main_div">
                    {/* left div start */}
                    <div className="left_div">
                      <div className="mb-3">
                        <label className="form-label">Cab Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Cab Name"
                          name="cab_name"
                          value={data.cab_name}
                          onChange={handleData}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Cab Model</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Cab Model"
                          name="cab_model"
                          value={data.cab_model}
                          onChange={handleData}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Cab Seat</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Cab Seat"
                          name="cab_seat"
                          value={data.cab_seat}
                          onChange={handleData}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Cab Charge</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter Cab Charge per Day"
                          name="cab_charge"
                          value={data.cab_charge}
                          onChange={handleData}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Cab Image</label>
                        <input
                          type="file"
                          className="form-control"
                          placeholder="Enter cab image"
                          name="cab_image"
                          accept="image/png, image/jpeg"
                          onChange={imageUpload}
                          required
                        />
                      </div>
                    </div>
                    {/* left div end  */}
                    <div className="vl"></div>
                    {/* right div start */}
                    <div className="right_div">
                      <div className="mb-3">
                        <label className="form-label">Cab Brand</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Cab Brand"
                          name="cab_brand"
                          value={data.cab_brand}
                          onChange={handleData}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Cab Rating</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter Cab Rating"
                          name="cab_rating"
                          value={data.cab_rating}
                          onChange={handleData}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Cab Speed</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Cab Speed"
                          name="cab_speed"
                          value={data.cab_speed}
                          onChange={handleData}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Cab Transmissions</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Cab Transmissions"
                          name="cab_transmissions"
                          value={data.cab_transmissions}
                          onChange={handleData}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Cab Description</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Cab Description"
                          name="cab_description"
                          value={data.cab_description}
                          onChange={handleData}
                          required
                        />
                      </div>
                    </div>
                    {/* right div end */}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-warning"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-success"
                      data-bs-dismiss="modal"
                    >
                      Save changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* -------------- modal --------------------- */}
      </div>
    </>
  );
};

export default AddCabs;
