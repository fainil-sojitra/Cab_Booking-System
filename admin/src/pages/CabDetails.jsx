import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/cabDetails.css";
import swal from "sweetalert";

const CabDetails = () => {
  const [data, setData] = useState([]);
  const [state, setState] = useState([]);

  useEffect(() => {
    getCabData();
  }, []);

  // ------------ get data ------------

  const getCabData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/cabDetails`)
      .then((res) => setData(res.data));
  };
  // console.log(data);

  // ------------ put data ------------

  const handleSubmit = (_id) => {
    // event.preventDefault();
    console.log("value--->", _id);
    axios
      .put(`${process.env.REACT_APP_API}/cabDetails/${_id}`, {
        ...state,
      })
      .then((res) => {
        setState(res?.data);
        getCabData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // -------------- delete data --------------

  const deleteCab = async (_id) => {
    swal({
      title: "ID :" + _id,
      text: "Delete, Cab Data??",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary data has been deleted !!", {
          icon: "success",
        });
        let result = await fetch(
          `${process.env.REACT_APP_API}/cabDetails/${_id}`,
          {
            method: "delete",
          }
        );
        result = await result.json();
        if (result) {
          getCabData();
        }
      } else {
        swal("Driver imaginary data is safe!");
      }
    });
  };

  return (
    <>
      {/* --------------------Cab Details -------------------*/}

      <h2 className="title">Cab Details</h2>
      <table className="scrolldown">
        <thead style={{ borderBottom: "2px solid #000d6b" }}>
          <tr>
            <th style={{ paddingRight: "0px", marginRight: "0px" }}>Id</th>
            <th style={{ paddingRight: "0px", marginRight: "0px" }}>
              Cab Name
            </th>
            <th style={{ paddingRight: "0px", marginRight: "0px" }}>
              Cab Model
            </th>
            <th>Cab Seat</th>
            <th>Cab Charge</th>
            <th>Cab Images</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            const {
              _id,
              cab_name,
              cab_model,
              cab_seat,
              cab_charge,
              cab_image,
              cab_status,
              cab_brand,
              cab_rating,
              cab_speed,
              cab_gps,
              cab_transmissions,
              cab_description,
            } = item;
            return (
              <tr key={index}>
                <td>
                  <b>{index + 1}</b>
                </td>
                <td>{cab_name}</td>
                <td>{cab_model}</td>
                <td>{cab_seat}</td>
                <td>₹{cab_charge}</td>
                <td>
                  <img
                    src={`${process.env.REACT_APP_API}/${cab_image}`}
                    alt="cab_img"
                    className="w-50"
                  />
                </td>
                <td>
                  <span
                    className={`${
                      cab_status === "Active" ? "status_g" : "status_r"
                    }`}
                  >
                    {cab_status}
                  </span>
                </td>
                <td>
                  <button
                    type="submit"
                    className="btn View_btn"
                    data-bs-target="#cabDetails_modal"
                    data-bs-toggle="modal"
                    // style={{ backgroundColor: "#000d6b", color: "#979899" }}
                    onClick={(e) => {
                      setState({
                        ...state,
                        _id,
                        cab_name,
                        cab_model,
                        cab_seat,
                        cab_charge,
                        cab_status,
                        cab_brand,
                        cab_rating,
                        cab_speed,
                        cab_gps,
                        cab_transmissions,
                        cab_description,
                      });
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="cabDetails_modal"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
                Cab ID :&nbsp;
                <b>
                  <u>{state._id}</u>
                </b>
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label>
                Cab Name : <u>{state.cab_name}</u>
              </label>
              <br />
              <label>
                Cab Model : <u>{state.cab_model}</u>
              </label>
              <br />
              <label>
                Cab Seat : <u>{state.cab_seat}</u>
              </label>
              <br />
              <label>
                Cab Charge : <u>{state.cab_charge}</u>
              </label>
              <br />
              <label>
                Cab Brand : <u>{state.cab_brand}</u>
              </label>
              <br />
              <label>
                Cab Rating : <u>{state.cab_rating}</u>
              </label>
              <br />
              <label>
                Cab Speed : <u>{state.cab_speed}</u>
              </label>
              <br />
              <label>
                Cab GPS : <u>{state.cab_gps}</u>
              </label>
              <br />
              <label>
                Cab Transmissions : <u>{state.cab_transmissions}</u>
              </label>
              <form>
                <div className="cab_status">
                  <label>
                    Cab Status :
                    <b
                      className={`${
                        state.cab_status === "Active" ? "status_g" : "status_r"
                      }`}
                    >
                      {state.cab_status}
                    </b>
                  </label>

                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      checked={state.cab_status === "Active"}
                      // value={state.cab_status}
                      onClick={() => {
                        if (state.cab_status === "InActive") {
                          setState({
                            ...state,
                            cab_status: "Active",
                          });
                          document.getElementsByClassName("status_g");
                          // document.style.backgroundColor = "green";
                        } else {
                          setState({
                            ...state,
                            cab_status: "InActive",
                          });
                          document.getElementsByClassName("status_r");
                        }
                        console.log(state.cab_status);
                        // setState({ ...state, cab_status: e.target.value });
                      }}
                    />
                  </div>
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit(state._id);
                    }}
                    className="btn btn-outline-success"
                    data-bs-dismiss="modal"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                onClick={() => deleteCab(state._id)}
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Delete
              </button>
              <button
                className="btn btn-warning edit_button"
                data-bs-dismiss="modal"
                style={{ backgroundColor: "#f9a826", color: "#ffff" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
      {/* --------------------Cab Details -------------------*/}
    </>
  );
};

export default CabDetails;
