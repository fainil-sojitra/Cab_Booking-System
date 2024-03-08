import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
// import carData from "../assets/data/carData";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import axios from "axios";

const CarListing = () => {
  const [data, setData] = useState([]);
  // console.log("call");
  useEffect(() => {
    getCabData();
    window.scrollTo(0, 1);
  }, []);

  // -------------- get data --------------

  const getCabData = async () => {
    await axios.get(`${process.env.REACT_APP_API}/cabDetails`).then((res) => {
      setData(res.data);
    });
  };

  return (
    <>
      <Header />
      <Helmet title="Cars">
        <CommonSection title="Car Listing" />

        <section>
          <Container>
            <Row>
              <Col lg="12">
                <div className=" d-flex align-items-center gap-3 mb-5">
                  <span className=" d-flex align-items-center gap-2">
                    <i className="ri-sort-asc"></i> Sort By
                  </span>

                  <select>
                    <option>Select</option>
                    <option value="low">Low to High</option>
                    <option value="high">High to Low</option>
                  </select>
                </div>
              </Col>

              {data.map((item, index) => {
                if (item.cab_status === "Active") {
                  return <CarItem item={item} key={index} />;
                }
              })}
            </Row>
          </Container>
        </section>
      </Helmet>
      <Footer />
    </>
  );
};

export default CarListing;
