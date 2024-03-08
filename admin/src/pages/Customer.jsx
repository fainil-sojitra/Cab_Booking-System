import React, { useEffect, useState } from "react";
import TopNav from "../components/TopNav/TopNav";
import Sidebar from "../components/Sidebar/Sidebar";
import "../styles/customer.css";
import axios from "axios";
import swal from "sweetalert";

const Customer = () => {
  const [data, setData] = useState([]);
  const [state, setState] = useState([]);
  // -------------------- get data --------------------
  const getData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/registration`)
      .then((res) => setData(res.data));
  };

  // ---------------------- delete data --------------------

  const deletePost = async (_id) => {
    swal({
      title: "ID :" + _id,
      text: "Delete, Client Data??",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary data has been deleted !!", {
          icon: "success",
        });
        let result = await fetch(`${process.env.REACT_APP_API}/delete/${_id}`, {
          method: "delete",
        });
        result = await result.json();
        if (result) {
          getData();
        }
      } else {
        swal("Client imaginary data is safe!");
      }
    });
  };

  // data.forEach(function (element) {
  //   if (element.type === "client") {
  //     console.log(element);
  //   }
  // });

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="layout">
        <Sidebar />
        <div className="main__layout">
          <TopNav />
          <div className="main_div">
            <h2 className="title">Customers Registration</h2>
            <table className="scrolldown01">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Type</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => {
                  const {
                    _id,
                    type,
                    first_name,
                    last_name,
                    email,
                    contact,
                    password,
                  } = item;
                  if (item.type === "client") {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{type}</td>
                        <td>{first_name}</td>
                        <td>{last_name}</td>
                        <td>{email}</td>
                        <td>{"+91 " + contact}</td>
                        <td>{password}</td>
                        <td>
                          <button
                            type="button"
                            className="btn View_btn"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            onClick={(e) => {
                              setState({
                                ...state,
                                _id,
                                type,
                                first_name,
                                last_name,
                                email,
                                contact,
                                password,
                              });
                            }}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>

            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                      Customer ID :&nbsp;
                      <u>
                        <b>{state._id}</b>
                      </u>
                    </h1>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <label>User Type : {state.type}</label>
                    <br />
                    <label>First Name : {state.first_name}</label>
                    <br />
                    <label>Last Name : {state.last_name}</label>
                    <br />
                    <label>Email : {state.email}</label>
                    <br />
                    <label>Contact : {state.contact}</label>
                    <br />
                    <label>Password : {state.password}</label>
                    <br />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-warning"
                      style={{ backgroundColor: "#f9a826", color: "white" }}
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      onClick={() => deletePost(state._id)}
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <!-- Modal --> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Customer;
