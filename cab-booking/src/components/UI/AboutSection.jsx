import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about-section.css";
import aboutImg from "../../assets/all-images/cars-img/bmw-offer.png";

const AboutSection = ({ aboutClass }) => {
  return (
    <section
      className="about__section"
      style={
        aboutClass === "aboutPage"
          ? { marginTop: "0px" }
          : { marginTop: "280px" }
      }
    >
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="about__section-content">
              <h4 className="section__subtitle">About Us</h4>
              <h2 className="section__title">Welcome to cab booking service</h2>
              <p className="section__description">
                Thank you for choosing our cab booking service! We're dedicated
                to providing you with convenient, reliable, and safe
                transportation solutions for all your travel needs. Whether
                you're commuting to work, heading to the airport, or exploring a
                new city, we've got you covered. Our user-friendly platform
                makes it easy to book rides, choose from a variety of vehicles,
                and enjoy a seamless journey from start to finish. With a focus
                on customer satisfaction, safety, and affordability, we strive
                to exceed your expectations with every ride. Experience the
                convenience and comfort of our cab booking service today!
              </p>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Wide Range of
                  Vehicles
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> 24/7 Availability
                </p>
              </div>

              <div className="about__section-item d-flex align-items-center">
                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Transparent
                  Pricing
                </p>

                <p className="section__description d-flex align-items-center gap-2">
                  <i className="ri-checkbox-circle-line"></i> Convenience at
                  Your Fingertips
                </p>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6">
            <div className="about__img">
              <img src={aboutImg} alt="img" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AboutSection;
