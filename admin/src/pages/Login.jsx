import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Login = () => {
  const [data, setData] = useState({
    type: "admin",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    // console.log("email or password", email, password);
    let result = await fetch(`${process.env.REACT_APP_API}/login`, {
      method: "post",
      body: JSON.stringify({ ...data }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(data);
    result = await result.json();
    // console.log(result);
    if (result.email) {
      localStorage.setItem("admin_login", JSON.stringify(result));
      swal({
        title: "LOGIN SUCCESSFULLY!",
        icon: "success",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 950);
    } else {
      swal({
        title: "Invalid email or password!!",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("admin_login");
    if (auth) {
      navigate("/dashboard");
    }
  });

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
                      Admin Log in
                    </Typography>
                  </Box>
                </Grid>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form1Example13"
                    className="form-control form-control-lg"
                    value={data.email}
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
                  <label
                    className="form-label text-dark"
                    htmlFor="form1Example13"
                  >
                    Email address
                  </label>
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form1Example23"
                    className="form-control form-control-lg"
                    value={data.password}
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                  <label
                    className="form-label text-dark"
                    htmlFor="form1Example23"
                  >
                    Password
                  </label>
                </div>

                {/* <!-- Submit button --> */}
                <button
                  type="button"
                  onClick={handleLogin}
                  className="btn btn-primary btn-lg w-100"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
