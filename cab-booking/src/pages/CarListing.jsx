import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import axios from "axios";

const CarListing = () => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Select");

  useEffect(() => {
    getCabData();
    window.scrollTo(0, 1);
  }, []);

  const getCabData = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/cabDetails`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSelect = async (e) => {
    setSelectedOption(e.target.value);
    if (e.target.value === "lowToHigh") {
      await lowTohigh();
    } else if (e.target.value === "highToLow") {
      highToLow();
    } else {
      getCabData();
    }
  };

  const lowTohigh = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/low_to_high`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error sorting data:", error);
    }
  };

  const highToLow = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/high_to_low`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error sorting data:", error);
    }
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
                <div className="d-flex align-items-center gap-3 mb-5">
                  <span className="d-flex align-items-center gap-2">
                    <i className="ri-sort-asc"></i> Sort By
                  </span>
                  <select value={selectedOption} onChange={handleSelect}>
                    <option value="Reset">Reset</option>
                    <option value="lowToHigh">Low to High</option>
                    <option value="highToLow">High to Low</option>
                    {/* Add other sorting options if needed */}
                  </select>
                </div>
              </Col>
              {data.map((item, index) => {
                if (item.cab_status === "Active") {
                  return <CarItem item={item} key={index} />;
                }
                return null; // Ensure to return null if no CarItem should be rendered
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
