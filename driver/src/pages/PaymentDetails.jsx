import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/paymentDetails.css";

const PaymentDetails = () => {
  const [data, setData] = useState([]);
  const [state, setState] = useState([]);

  useEffect(() => {
    getCabData();
  }, []);

  // -------------- get data --------------

  const getCabData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/payment`)
      .then((res) => setData(res.data));
  };
  return (
    <>
      <div className="container">
        <h2 className="title">Cab Details</h2>
        <table className="scrolldown">
          <thead style={{ borderBottom: "2px solid #000d6b" }}>
            <tr className="tr">
              <th style={{ paddingLeft: "90px", marginRight: "0px" }}>NO.</th>
              <th style={{ paddingLeft: "60px", marginRight: "0px" }}>
                Booking ID
              </th>
              <th style={{ paddingLeft: "90px", marginRight: "0px" }}>
                Order ID
              </th>
              <th style={{ paddingLeft: "80px", marginRight: "0px" }}>
                Total Amount
              </th>
              <th style={{ paddingLeft: "85px", marginRight: "0px" }}>
                Payment Status
              </th>
              <th style={{ paddingLeft: "80px", marginRight: "0px" }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody className="body">
            {data.map((item, index) => {
              const { _id, booking_id, id, amount, currency, payment_status } =
                item;
              return (
                <tr key={index} className="tr">
                  <td>{index + 1}</td>
                  <td>{booking_id}</td>
                  <td>{id}</td>
                  <td>₹{amount / 100}</td>
                  <td>
                    <span
                      className={`${
                        payment_status === "Success" ? "status_g" : "status_r"
                      }`}
                    >
                      {payment_status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="submit"
                      className="btn View_btnn"
                      data-bs-toggle="modal"
                      data-bs-target="#paymentDetails"
                      style={{
                        backgroundColor: "#000d6b",
                        color: "#979899",
                      }}
                      onClick={(e) => {
                        setState({
                          ...state,
                          _id,
                          booking_id,
                          id,
                          amount,
                          currency,
                          payment_status,
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
          id="paymentDetails"
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
                  Booking ID : <u>{state.booking_id}</u>
                </label>
                <br />
                <label>
                  Order ID : <u>{state.id}</u>
                </label>
                <br />
                <label>
                  Total Amount : <u>{state.amount / 100}</u>
                </label>
                <br />
                <label>
                  Currency : <u>{state.currency}</u>
                </label>
                <br />
                <label>
                  Status :&nbsp;&nbsp;
                  <b
                    className={`${
                      state.payment_status === "Success"
                        ? "status_g"
                        : "status_r"
                    }`}
                  >
                    {state.payment_status}
                  </b>
                </label>
                <br />
              </div>
              <div className="modal-footer">
                {/* <button
                type="submit"
                // onClick={() => deleteCab(state._id)}
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Delete
              </button> */}
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
      </div>
    </>
  );
};

export default PaymentDetails;
