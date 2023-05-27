import React from "react";
import Bg from "../../assets/Photo1.jpg";
import Bg1 from "../../assets/Photo3.jpg";
import "./home.css";
import { Link } from "react-router-dom";

export default function Promotion() {
  return (
    <div className="my-20">
      <section className="flex flex-col md:flex-row w-full text-center">
        <div className="flex flex-col justify-center px-8 md:w-1/2 xl:w-3/5 ">
          <div className="md:block relative bg-white rounded-lg">
            <a
              href="http://www.freepik.com"
              className="textCenter font-bold text-xs top-1/2"
            >
              Designed by macrovector / Freepik
            </a>
            <img className="object-cover rounded-lg" src={Bg} alt="" />
          </div>

          <div className="bg-white rounded-lg py-6 px-10">
            <h1 className="text-4xl font-semibold leading-normal">
              There are various kinds of good quality building tools
            </h1>
            <div className="mt-6">
              <Link to="/shop-now" className="hover:underline">
                <button className="bg-black rounded-md text-white px-12 py-2 mt-4 hover:opacity-70">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center px-8 md:w-1/2 xl:w-3/5">
          <div className="md:block relative bg-white rounded-lg">
            <a
              href="http://www.freepik.com"
              className="textCenter font-bold text-xs top-1/2"
            >
              Designed by macrovector / Freepik
            </a>
            <img className="object-cover rounded-lg" src={Bg1} alt="" />
          </div>

          <div className="bg-white rounded-lg pb-6 px-10">
            <h1 className="text-4xl font-semibold leading-normal">
              There are various kinds of brands that we have
            </h1>
            <div className="mt-6">
              <Link to="/brands" className="hover:underline">
                <button className="bg-black rounded-md text-white px-12 py-2 mt-4 hover:opacity-70">
                  View Brand
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
