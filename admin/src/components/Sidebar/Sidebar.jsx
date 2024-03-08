import React from "react";
import { NavLink } from "react-router-dom";
import navLinks from "../../assets/dummy-data/navLinks";
import "./sidebar.css";
import DirectionsCarTwoToneIcon from "@mui/icons-material/DirectionsCarTwoTone";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Sidebar = () => {
  const navigate = useNavigate();

  let admin = JSON.parse(localStorage.getItem("admin_login"));

  const logOut = () => {
    swal({
      title: admin.email,
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
    <div className="sidebar">
      <div className="sidebar__top">
        <h5>
          <span>
            <DirectionsCarTwoToneIcon
              fontSize="large"
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
          </span>
          CAB BOOKING
        </h5>
      </div>

      <div className="sidebar__content">
        <div className="menu">
          <ul className="nav__list">
            {navLinks.map((item, index) => (
              <li className="nav__item" key={index}>
                <NavLink
                  to={item.path}
                  className={(navClass) =>
                    navClass.isActive ? "nav__active nav__link" : "nav__link"
                  }
                >
                  <i className={item.icon}></i>

                  {item.display}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar__bottom">
          <span onClick={logOut}>
            <i className="ri-logout-circle-r-line"></i> Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
