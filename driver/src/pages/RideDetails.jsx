import React, { useEffect, useState } from "react";
import "../style/rideDetails.css";
import axios from "axios";

const RideDetails = () => {
  const [data, setData] = useState([]);
  const [state, setState] = useState([]);

  useEffect(() => {
    getCabData();
  }, []);

  // -------------- get data --------------

  const getCabData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/booking`)
      .then((res) => setData(res.data));
  };

  const handleSubmit = (_id) => {
    // console.log("value--->", _id);
    axios
      .put(`${process.env.REACT_APP_API}/booking/${_id}`, {
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

  return (
    <div className="container">
      <div>
        <h2 className="title">Booking Details</h2>
        <table className="scrolldown" style={{ overflowX: "auto" }}>
          <thead style={{ borderBottom: "2px solid #000d6b" }}>
            <tr key={1}>
              {/* <th>C-Name</th>
              <th>Email</th>
              <th>Contact</th> */}
              <th>NO.</th>
              <th>From date</th>
              <th>To date</th>
              <th>rent Days</th>
              <th>Time</th>
              <th>Cab Name</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => {
              const {
                _id,
                full_name,
                email,
                contact,
                from_date,
                to_date,
                rent_days,
                time,
                cab_name,
                cab_rent,
                note,
                status,
              } = item;
              return (
                <>
                  <tr key={index + 1}>
                    <td>{index + 1}</td>
                    <td>{from_date}</td>
                    <td>{to_date}</td>
                    <td>{rent_days}</td>
                    <td>{time}</td>
                    <td>{cab_name}</td>
                    <td>₹{rent_days * cab_rent}</td>
                    <td>
                      <span
                        className={`${
                          status === "Conform" ? "status_g" : "status_r"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td>
                      <button
                        type="submit"
                        className="btn View_btnn"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        style={{ backgroundColor: "#000d6b", color: "#979899" }}
                        onClick={(e) => {
                          setState({
                            ...state,
                            _id,
                            full_name,
                            email,
                            contact,
                            from_date,
                            to_date,
                            rent_days,
                            time,
                            cab_name,
                            cab_rent,
                            note,
                            status,
                          });
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* {/* ---------------details model----------------- */}

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
                Booking ID :&nbsp;
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
                C-Name : <u>{state.full_name}</u>
              </label>
              <br />
              <label>
                Email : <u>{state.email}</u>
              </label>
              <br />
              <label>
                Contact : <u>{state.contact}</u>
              </label>
              <br />
              <label>
                From Date : <u>{state.from_date}</u>
              </label>
              <br />
              <label>
                To Date : <u>{state.to_date}</u>
              </label>
              <br />
              <label>
                Rent Days : <u>{state.rent_days}</u>
              </label>
              <br />
              <label>
                Time : <u>{state.time}</u>
              </label>
              <br />
              <label>
                Cab Name : <u>{state.cab_name}</u>
              </label>
              <br />
              <label>
                Cab Rent : <u>₹{state.cab_rent}</u>
              </label>
              <br />
              <label>
                Note : <u>{state.note}</u>
              </label>
              <br />
              <form>
                <div className="cab_status">
                  <label>
                    Status :
                    <b
                      className={`${
                        state.status === "Conform" ? "status_g" : "status_r"
                      }`}
                    >
                      {state.status}
                    </b>
                  </label>

                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                      checked={state.status === "Conform"}
                      onChange={() => {
                        if (state.status === "Cancelled") {
                          setState({
                            ...state,
                            status: "Conform",
                          });
                          document.getElementsByClassName("status_g");
                        } else {
                          setState({
                            ...state,
                            status: "Cancelled",
                          });
                          document.getElementsByClassName("status_r");
                        }
                        // console.log(state.status);
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
              <br />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                style={{ backgroundColor: "#000d6b" }}
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal --> */}
    </div>
  );
};

export default RideDetails;
