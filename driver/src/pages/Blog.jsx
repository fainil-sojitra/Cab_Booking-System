import React from "react";
import { Container, Row } from "reactstrap";
import CommonSection from "../components/UI/CommonSection";
import BlogList from "../components/UI/BlogList";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Blog = () => {
  return (
    <>
      <Header />
      <CommonSection title="Blogs" />
      <section>
        <Container>
          <Row>
            <BlogList />
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default Blog;
