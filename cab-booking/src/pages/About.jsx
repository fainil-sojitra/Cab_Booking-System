import React from "react";

import CommonSection from "../components/UI/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import AboutSection from "../components/UI/AboutSection";
import { Container, Row, Col } from "reactstrap";
import BecomeDriverSection from "../components/UI/BecomeDriverSection";

import driveImg from "../assets/all-images/drive.jpg";
import OurMembers from "../components/UI/OurMembers";
import "../styles/about.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const About = () => {
  return (
    <>
      <Header />
      <Helmet title="About">
        <CommonSection title="About Us" />
        <AboutSection aboutclassName="aboutPage" />

        <section className="about__page-section">
          <Container>
            <Row>
              <Col lg="6" md="6" sm="12">
                <div className="about__page-img">
                  <img src={driveImg} alt="" className="w-100 rounded-3" />
                </div>
              </Col>

              <Col lg="6" md="6" sm="12">
                <div className="about__page-content">
                  <h2 className="section__title">
                    We Are Committed To Provide Safe Ride Solutions with Drivers
                  </h2>

                  <p className="section__description">
                    At Safe Ride Solutions, safety is not just a promise; it's
                    our commitment to you. We understand the importance of
                    providing reliable transportation solutions with trusted
                    drivers who prioritize your safety above all else.
                  </p>

                  <p className="section__description">
                    Your comfort and well-being matter to us. That's why our
                    fleet of vehicles is meticulously maintained and sanitized,
                    providing you with a clean and hygienic environment for
                    every ride.
                    <br />
                    From adherence to traffic regulations to safe driving
                    practices, we prioritize your safety at every step of the
                    journey. You can trust us to get you to your destination
                    safely and on time.
                  </p>

                  <div className=" d-flex align-items-center gap-3 mt-4">
                    <span className="fs-4">
                      <i className="ri-phone-line"></i>
                    </span>

                    <div>
                      <h6 className="section__subtitle">Need Any Help?</h6>
                      <h4>+91 26123 27997</h4>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <BecomeDriverSection />

        <section>
          <Container>
            <Row>
              <Col lg="12" className="mb-5 text-center">
                <h6 className="section__subtitle">Experts</h6>
                <h2 className="section__title">Our Members</h2>
              </Col>
              <OurMembers />
            </Row>
          </Container>
        </section>
      </Helmet>
      <Footer />
    </>
  );
};

export default About;
