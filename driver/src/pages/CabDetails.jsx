import React, { useEffect, useState } from "react";
import AddCabs from "./AddCabs";
import "../style/cabDetails.css";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const CabDetails = () => {
  const [data, setData] = useState([]);
  const [state, setState] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getCabData();
  }, []);

  // -------------- get data --------------

  const getCabData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/cabDetails`)
      .then((res) => setData(res.data));
  };
  // console.log(data);
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

  const handleSubmit = (_id) => {
    // console.log("value--->", _id);
    axios
      .put(`${process.env.REACT_APP_API}/cabDetails/${_id}`, {
        ...state,
        cab_status: "InActive",
      })
      .then((res) => {
        setState(res?.data);
        getCabData();
        navigate("/ride");
      })
      .catch((err) => {
        console.log(err);
      });
    setState({ cab_charge: state.cab_charge });
  };

  return (
    <>
      {/* --------------------Cab Details -------------------*/}
      <div className="container">
        <h2 className="title">Add Cabs</h2>
        <AddCabs />
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
                <>
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
                        className="btn View_btnn"
                        data-bs-target="#cabDetails_modal"
                        data-bs-toggle="modal"
                        style={{ backgroundColor: "#000d6b", color: "#979899" }}
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
                </>
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
                <form>
                  <div className="mb-3">
                    <label className="form-label">Cab Charge : &nbsp;</label>
                    {/*<input
                      type="number"
                      className="w-10 "
                      placeholder={state.cab_charge}
                      name="cab_charge"
                      value={data.cab_charge}
                      // onChange={handleData}
                      required
                    />
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
                    </button> */}
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={state.cab_charge}
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        onChange={(e) =>
                          setState({ ...state, cab_charge: e.target.value })
                        }
                      />
                      <button
                        className="btn btn-outline-success"
                        type="submit"
                        onClick={(e) => {
                          e.preventDefault();
                          handleSubmit(state._id);
                        }}
                        id="button-addon2"
                        data-bs-dismiss="modal"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
                {/* <br /> */}
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
                <br />
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
                  type="button"
                  className="btn btn-warning edit_button"
                  data-bs-dismiss="modal"
                  style={{ backgroundColor: "#f9a826", color: "#ffff" }}
                >
                  Close
                </button>
              </div>
              {/* </form> */}
            </div>
          </div>
        </div>
        {/* <!-- Modal --> */}
        {/* --------------------Cab Details -------------------*/}
      </div>
    </>
  );
};

export default CabDetails;
