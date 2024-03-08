import React, { useEffect, useState } from "react";

// import carData from "../assets/data/carData";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { useParams } from "react-router-dom";
import BookingForm from "../components/UI/BookingForm";
// import PaymentMethod from "../components/UI/PaymentMethod";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import axios from "axios";

const CarDetails = () => {
  const [data, setData] = useState([]);

  const { slug } = useParams();

  useEffect(() => {
    getCabData();
    window.scrollTo(0, 0);
  }, []);

  // -------------- get data --------------

  const getCabData = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/cabdetails/${slug}`)
      .then((res) => {
        setData(res.data);
        // console.log("-->>", res.data);
      });
  };

  return (
    <>
      <Header />
      <Helmet title={data.cab_name}>
        <section key={data._id}>
          <Container>
            <Row>
              <Col lg="6">
                <img
                  src={`${process.env.REACT_APP_API}/${data.cab_image}`}
                  alt="cab_img"
                  className="w-100"
                />
              </Col>

              <Col lg="6">
                <div className="car__info">
                  <h2 className="section__title">{data.cab_name}</h2>

                  <div className=" d-flex align-items-center gap-5 mb-4 mt-3">
                    <h6 className="rent__price fw-bold fs-4">
                      ₹{data.cab_charge}.00 / Day
                    </h6>

                    <span className=" d-flex align-items-center gap-2">
                      <span style={{ color: "#f9a826" }}>
                        <i className="ri-star-s-fill"></i>
                        <i className="ri-star-s-fill"></i>
                        <i className="ri-star-s-fill"></i>
                        <i className="ri-star-s-fill"></i>
                        <i className="ri-star-s-fill"></i>
                      </span>
                      ({data.cab_rating} ratings)
                    </span>
                  </div>

                  <p className="section__description">{data.cab_description}</p>

                  <div
                    className=" d-flex align-items-center mt-3"
                    style={{ columnGap: "4rem" }}
                  >
                    <span className=" d-flex align-items-center gap-1 section__description">
                      <i
                        className="ri-roadster-line"
                        style={{ color: "#f9a826" }}
                      ></i>
                      {data.cab_model}
                    </span>

                    <span className=" d-flex align-items-center gap-1 section__description">
                      <i
                        className="ri-settings-2-line"
                        style={{ color: "#f9a826" }}
                      ></i>
                      {data.cab_transmissions}
                    </span>

                    <span className=" d-flex align-items-center gap-1 section__description">
                      <i
                        className="ri-timer-flash-line"
                        style={{ color: "#f9a826" }}
                      ></i>
                      {data.cab_speed}
                    </span>
                  </div>

                  <div
                    className=" d-flex align-items-center mt-3"
                    style={{ columnGap: "2.8rem" }}
                  >
                    <span className=" d-flex align-items-center gap-1 section__description">
                      <i
                        className="ri-map-pin-line"
                        style={{ color: "#f9a826" }}
                      ></i>
                      {data.cab_gps}
                    </span>

                    <span className=" d-flex align-items-center gap-1 section__description">
                      <i
                        className="ri-wheelchair-line"
                        style={{ color: "#f9a826" }}
                      ></i>
                      {data.cab_seat}
                    </span>

                    <span className=" d-flex align-items-center gap-1 section__description">
                      <i
                        className="ri-building-2-line"
                        style={{ color: "#f9a826" }}
                      ></i>
                      {data.cab_brand}
                    </span>
                  </div>
                </div>
              </Col>

              <Col lg="7" className="mt-5">
                <div className="booking-info mt-5">
                  <h5 className="mb-4 fw-bold ">Booking Information</h5>
                  <BookingForm
                    cabsData={data}
                    // price={data.cab_charge}
                    // name={data.cab_name}
                    // img={data.cab_image}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
      <Footer />
    </>
  );
};

export default CarDetails;
