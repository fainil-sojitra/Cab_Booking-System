import React, { useEffect, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const [data, setData] = useState({
    type: "client",
    first_name: "",
    last_name: "",
    email: "",
    contact: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("client_login");
    if (auth) {
      navigate("/home");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    // Validate the field as the user types
    validateField(e.target.name, e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
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
        title: "REGISTRATION SUCCESSFUL!",
        icon: "success",
      });
      setTimeout(() => {
        navigate("/login");
      }, 650);
    }
  };

  const validateField = (fieldName, value) => {
    let error = "";

    switch (fieldName) {
      case "first_name":
        error =
          value.trim() && /^[a-zA-Z]+$/.test(value)
            ? ""
            : "First Name should contain only alphabetic characters";
        break;
      case "last_name":
        error =
          value.trim() && /^[a-zA-Z]+$/.test(value)
            ? ""
            : "Last Name should contain only alphabetic characters";
        break;
      case "email":
        error = value.trim()
          ? /^\S+@\S+\.\S+$/.test(value)
            ? ""
            : "Email address is invalid"
          : "Email is required";
        break;
      case "contact":
        error = value.trim()
          ? /^\d{10}$/.test(value)
            ? ""
            : "Contact number is invalid"
          : "Contact number is required";
        break;
      case "password":
        error = validatePassword(value);
        break;
      default:
        break;
    }

    setErrors({ ...errors, [fieldName]: error });
  };

  const validateForm = () => {
    for (const [key, value] of Object.entries(data)) {
      validateField(key, value);
    }

    return Object.values(errors).every((error) => error === "");
  };

  const validatePassword = (value) => {
    if (!value.trim()) {
      return "Password is required";
    } else if (value.length < 8) {
      return "Password should be at least 8 characters long";
    } else if (!/[A-Z]/.test(value)) {
      return "Password should contain at least one uppercase letter";
    } else if (!/[a-z]/.test(value)) {
      return "Password should contain at least one lowercase letter";
    } else if (!/\d/.test(value)) {
      return "Password should contain at least one digit";
    } else if (!/[^a-zA-Z0-9]/.test(value)) {
      return "Password should contain at least one special character";
    } else {
      return "";
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form onSubmit={handleSubmit} className="mx-1 mx-md-4">
                        <TextField
                          fullWidth
                          label="Your First Name"
                          id="first_name"
                          className="mb-4"
                          name="first_name"
                          value={data.first_name}
                          onChange={handleChange}
                          error={!!errors.first_name}
                          helperText={errors.first_name}
                          variant="standard"
                          required
                        />

                        <TextField
                          fullWidth
                          label="Your Last Name"
                          id="last_name"
                          className="mb-4"
                          name="last_name"
                          value={data.last_name}
                          onChange={handleChange}
                          error={!!errors.last_name}
                          helperText={errors.last_name}
                          variant="standard"
                          required
                        />

                        <TextField
                          fullWidth
                          label="Your Email"
                          id="email"
                          className="mb-4"
                          name="email"
                          type="email"
                          value={data.email}
                          onChange={handleChange}
                          error={!!errors.email}
                          helperText={errors.email}
                          variant="standard"
                          required
                        />

                        <TextField
                          fullWidth
                          label="Contact Number"
                          id="contact"
                          className="mb-4"
                          name="contact"
                          type="number"
                          value={data.contact}
                          onChange={handleChange}
                          error={!!errors.contact}
                          helperText={errors.contact}
                          variant="standard"
                          required
                        />

                        <TextField
                          fullWidth
                          label="Your Password"
                          id="password"
                          className="mb-4"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={data.password}
                          onChange={handleChange}
                          error={!!errors.password}
                          helperText={errors.password}
                          variant="standard"
                          required
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handleTogglePasswordVisibility}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />

                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          fullWidth
                          sx={{ mt: 3 }}
                        >
                          Register
                        </Button>

                        <br />
                        <span className="fw-bold">
                          <NavLink to={"/login"} variant="body2">
                            Already have an account? Log in
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
