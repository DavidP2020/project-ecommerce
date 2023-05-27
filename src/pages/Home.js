import React, { useEffect } from "react";
import LandingPage from "../components/Home/LandingPage";
import CategoryPage from "../components/ListCategory/CategoryPage";
import TrendingProduct from "../components/Product/TrendingProduct";
import Promotion from "../components/Home/Promotion";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    document.title = "Home";
    AOS.init({
      offset: 200,
      duration: 500,
      easing: "ease-in-sine",
      delay: 100,
    });
  }, []);
  return (
    <div className="w-full h-full ">
      <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
        <LandingPage />
      </div>
      <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
        <CategoryPage />
      </div>

      <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
        <Promotion />
      </div>
      <div data-aos="fade-up" data-aos-anchor-placement="bottom-bottom">
        <TrendingProduct />
      </div>
    </div>
  );
}
