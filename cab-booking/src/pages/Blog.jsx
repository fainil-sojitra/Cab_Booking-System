import React from "react";
import { Container, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import BlogList from "../components/UI/BlogList";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Blog = () => {
  return (
    <>
      <Header />
      <Helmet title="Blogs">
        <CommonSection title="Blogs" />
        <section>
          <Container>
            <Row>
              <BlogList />
            </Row>
          </Container>
        </section>
      </Helmet>
      <Footer />
    </>
  );
};

export default Blog;
