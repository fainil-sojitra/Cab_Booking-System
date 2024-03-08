import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import HeroSlider from "../components/UI/HeroSlider";

const Home = () => {
  return (
    <>
      <Header />
      {/* ============= hero section =========== */}
      <section className="p-0 hero__slider-section">
        <HeroSlider />
      </section>
      <Footer />
    </>
  );
};

export default Home;
