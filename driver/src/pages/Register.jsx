import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    type: "driver",
    first_name: "",
    last_name: "",
    email: "",
    contact: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("driver_login");
    if (auth) {
      navigate("/home");
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API}/registration`, {
        ...data,
      })
      .then((res) => {
        setData(res?.data);
        console.log(data);
      })
      .catch((error) => {
        console.log("There was an error!", error);
      });
    swal({
      title: "REGISTRATION SUCCESSFULLY!",
      icon: "success",
    });
    setTimeout(() => {
      navigate("/login");
    }, 850);
  };

  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Driver Registration
                      </p>

                      <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              name="first_name"
                              value={data.first_name}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  first_name: e.target.value,
                                })
                              }
                              required
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1c"
                            >
                              Your First Name
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="form3Example1c"
                              className="form-control"
                              name="last_name"
                              value={data.last_name}
                              onChange={(e) =>
                                setData({ ...data, last_name: e.target.value })
                              }
                              required
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1c"
                            >
                              Your Last Name
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              name="email"
                              value={data.email}
                              onChange={(e) =>
                                setData({ ...data, email: e.target.value })
                              }
                              required
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Your Email
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="number"
                              id="form3Example4c"
                              className="form-control"
                              min="0"
                              // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                              name="contact"
                              value={("+91", data.contact)}
                              onChange={(e) =>
                                setData({ ...data, contact: e.target.value })
                              }
                              required
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Contact Number
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              id="form3Example4cd"
                              className="form-control"
                              name="password"
                              value={data.password}
                              onChange={(e) =>
                                setData({ ...data, password: e.target.value })
                              }
                              required
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4cd"
                            >
                              your password
                            </label>
                          </div>
                        </div>

                        <div className="w-100">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg w-100"
                          >
                            Register
                          </button>
                        </div>
                        <br />
                        <span className="fw-bold">
                          <NavLink to={"/login"} variant="body2">
                            {"Already have an account? Log in"}
                          </NavLink>
                        </span>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample_image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
