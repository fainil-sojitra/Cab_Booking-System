import React, { useEffect, useState } from "react";
import "../../styles/booking-form.css";
import { Form, FormGroup } from "reactstrap";
import PaymentMethod from "./PaymentMethod";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const BookingForm = (props) => {
  const navigate = useNavigate();

  let userDetails = JSON.parse(localStorage.getItem("client_login"));
  const [payment, setPayment] = useState({
    booking_id: "",
    amount: "",
    currency: "",
    id: "",
    payment_status: "Failed",
  });
  const [bookingData, setBookingData] = useState({
    full_name: userDetails.first_name,
    email: userDetails.email,
    contact: userDetails.contact,
    from_date: "",
    to_date: "",
    rent_days: "",
    time: "",
    cab_name: props.cabsData.cab_name,
    cab_rent: props.cabsData.cab_charge,
    note: "",
    status: "Cancelled",
  });

  useEffect(() => {
    const dt1 = new Date(bookingData.from_date);
    const dt2 = new Date(bookingData.to_date);
    if (bookingData.from_date && bookingData.to_date) {
      setBookingData({
        ...bookingData,
        rent_days: Math.floor(
          (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
            Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
            (1000 * 60 * 60 * 24)
        ),
      });
    }
  }, [bookingData.from_date, bookingData.to_date]);

  const submitHandler = async () => {
    axios
      .post(`${process.env.REACT_APP_API}/booking`, {
        ...bookingData,
      })
      .then((res) => {
        setBookingData(res?.data);
        // console.log(res.data._id);
        payment.booking_id = res.data._id;
        console.log(">>>>>>-", payment);
      })
      .catch((error) => {
        console.log("There was an error!", error);
      });
    setBookingData({
      from_date: "",
      to_date: "",
      rent_days: "",
      time: "",
      note: "",
    });

    // axios.get(`${process.env.REACT_APP_API}/cabdetails/${_id}`).then((res) => {
    //   setPayment(res.data);
    //   // console.log("-->>", res.data);
    // });
    setTimeout(() => {
      console.log(">>>>>>->>>>>>", payment);

      const handleOpenRazorpay = (data) => {
        const options = {
          key_id: process.env.RAZORPAY_API_KEY,
          amount: data.amount,
          currency: data.currency,
          order_id: data.id,
          name: "Cab Booking System",
          description: "description",
          handler: function (response) {
            console.log(response, "79");
            axios
              .post(`${process.env.REACT_APP_API}/verify`, {
                response: response,
              })
              .then((res) => {
                console.log(res, "82");
                console.log(response);
                if (response) {
                  axios
                    .put(
                      `${process.env.REACT_APP_API}/payment/${payment.booking_id}`,
                      {
                        ...payment,
                      }
                    )
                    .then((res) => {
                      setPayment(res?.data);
                      console.log(res.data);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              })
              .catch((error) => {
                console.log("There was an error!", error);
              });
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      };

      const amount = bookingData.rent_days * bookingData.cab_rent;

      // const cab_id = props.cabsData._id;
      // console.log("total-amount --> ", amount);

      // console.log("./././././", payment);

      axios
        .post(`${process.env.REACT_APP_API}/orders`, {
          ...payment,
          amount: amount,
        })
        .then((res) => {
          // console.log(payment, "-- > 108");
          handleOpenRazorpay(res.data.data);
          // console.log("63-63", props.cabsData._id);
        })
        .catch((error) => {
          console.log("err -- >", error);
          console.log("There was an error!", error);
        });
      swal({
        title: "BOOKING SUCCESSFULLY!",
        icon: "success",
      });
      navigate("/cars");
    }, 700);
  };
  return (
    <Form>
      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          type="date"
          placeholder="From Date"
          className="from_date"
          name="from_date"
          value={bookingData.from_date}
          onChange={(e) =>
            setBookingData({
              ...bookingData,
              from_date: e.target.value,
            })
          }
          required
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          type="date"
          placeholder="To Date"
          className="to_date"
          name="to_date"
          value={bookingData.to_date}
          onChange={(e) =>
            setBookingData({
              ...bookingData,
              to_date: e.target.value,
            })
          }
          required
        />
      </FormGroup>

      <FormGroup className="booking__form d-inline-block me-4 mb-4">
        <input
          type="number"
          placeholder="Enter Total Rent days"
          name="rent_days"
          value={bookingData.rent_days}
          onChange={(e) =>
            setBookingData({
              ...bookingData,
              rent_days: e.target.value,
            })
          }
          // required
        />
      </FormGroup>
      <FormGroup className="booking__form d-inline-block ms-1 mb-4">
        <input
          type="time"
          placeholder="Pick up time"
          className="time__picker"
          name="time"
          value={bookingData.time}
          onChange={(e) =>
            setBookingData({
              ...bookingData,
              time: e.target.value,
            })
          }
          required
        />
      </FormGroup>

      <FormGroup>
        <textarea
          rows={5}
          type="textarea"
          className="textarea"
          placeholder="Write"
          name="note"
          value={bookingData.note}
          onChange={(e) =>
            setBookingData({
              ...bookingData,
              note: e.target.value,
            })
          }
          required
        />
      </FormGroup>
      <h5 className="mb-4 fw-bold ">Payment Information</h5>
      <FormGroup>
        <PaymentMethod Submit={submitHandler} />
      </FormGroup>
    </Form>
  );
};

export default BookingForm;
