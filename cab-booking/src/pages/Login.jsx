import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [data, setData] = useState({
    type: "client",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    // Validation before login
    if (validateForm()) {
      // Perform login action
      let result = await fetch(`${process.env.REACT_APP_API}/login`, {
        method: "post",
        body: JSON.stringify({ ...data }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();
      if (result.email) {
        localStorage.setItem("client_login", JSON.stringify(result));
        swal({
          title: "LOGIN SUCCESSFULLY!",
          icon: "success",
        });
        setTimeout(() => {
          navigate("/home");
        }, 950);
      } else {
        swal({
          title: "Invalid email or password!!",
          icon: "error",
        });
      }
    }
  };

  const validateField = (fieldName, value) => {
    let error = "";

    switch (fieldName) {
      case "email":
        error = !value.trim()
          ? "Email is required"
          : !/^\S+@\S+\.\S+$/.test(value)
          ? "Email address is invalid"
          : "";
        break;
      case "password":
        error = !value.trim() ? "Password is required" : "";
        break;
      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let valid = true;
    for (const [key, value] of Object.entries(data)) {
      const error = validateField(key, value);
      if (error) {
        setErrors({ ...errors, [key]: error });
        valid = false;
      }
    }
    return valid;
  };

  useEffect(() => {
    const auth = localStorage.getItem("client_login");
    if (auth) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phoneimage"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form>
                <Grid item xs={12} sm={8} md={5} elevation={6}>
                  <Box
                    sx={{
                      my: 8,
                      mx: 4,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Log in
                    </Typography>
                  </Box>
                </Grid>
                <TextField
                  fullWidth
                  label="Email address"
                  id="email"
                  className="mb-4"
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  variant="standard"
                  required
                />
                <TextField
                  fullWidth
                  label="Password"
                  id="password"
                  className="mb-4"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  variant="standard"
                  required
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="button"
                  onClick={handleLogin}
                  fullWidth
                  sx={{ mt: 3 }}
                >
                  Sign in
                </Button>

                <div className="divider d-flex align-items-center my-4">
                  <span className="fw-bold">
                    <NavLink to={"/register"} variant="body2">
                      {"Don't have an account? Register an account"}
                    </NavLink>
                  </span>
                </div>
                <span>
                  <a
                    href="http://localhost:3001/login"
                    className="btn btn-outline-primary w-100"
                  >
                    Login as Driver
                  </a>
                </span>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
