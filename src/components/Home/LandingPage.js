import React from "react";
import Bg from "../../assets/Photo2.jpg";
import "./home.css";
// import Scrollup from "./Scrollup";
export default function () {
  return (
    <>
      <section className="flex flex-col md:flex-row w-full bg-white">
        <div className="flex flex-col justify-center px-12 md:w-1/2 xl:w-3/5 ">
          <h1 className="text-4xl font-semibold leading-snug mt-4 lg:mt-0">
            Find the perfect building items
          </h1>
          <h1 className="text-4xl font-semibold leading-normal">
            For your home
          </h1>
          <p className="font-normal mt-2">
            We provide a wide range of high quality building materials at
            competitive prices. From cement to paint, from tile to ceramics, we
            have everything you need to make your dream home come true.
          </p>
          <p className="mt-4 font-bold text-sm">
            We built this application to make it easier for you to find or buy
            building materials. Let's Shop Now !{" "}
          </p>
          <div className="mt-6">
            <button className="bg-black rounded-md text-white px-12 py-2 mt-4 hover:opacity-70">
              Shop Now
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/2 xl:w-2/5 min-h-[400px] flex justify-center ">
          <div className=" hidden md:block relative">
            <a
              href="http://www.freepik.com"
              className="textCenter font-bold text-xs top-1/2"
            >
              Designed by macrovector / Freepik
            </a>
            <img className="object-cover" src={Bg} alt="" />
          </div>
        </div>
      </section>
      {/* <Scrollup /> */}
    </>
  );
}
