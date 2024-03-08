import { Logout } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const LogOut = () => {
  const navigate = useNavigate();

  let userEmail = JSON.parse(localStorage.getItem("client_login"));

  const logOut = () => {
    swal({
      title: userEmail.email,
      text: "Logout, this profile!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary account has been login out!", {
          icon: "success",
        });
        localStorage.clear();
        navigate("/login");
      } else {
        swal("Your imaginary account is safe!");
      }
    });
  };

  return (
    <span onClick={logOut}>
      Logout &nbsp;
      <Logout />
    </span>
  );
};

export default LogOut;
