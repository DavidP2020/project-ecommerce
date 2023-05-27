import Bg from "../../assets/Photo2.jpg";
import "../Home/home.css";
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategoryPage() {
  const [listPost, setlistPost] = useState([]);
  const [loading, setLoading] = useState([]);
  const [defaultImage, setDefaultImage] = useState({});
  const itemsPerPage = 9;
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };
  const [noOfPages, setPages] = useState();

  const fetchItem = async () => {
    try {
      let isMountered = true;
      let res = await axios.get("/api/all-category");

      if (isMountered) {
        if (res.data.status === 200) {
          setlistPost(res.data.category);
          setLoading(false);
          setPages(Math.ceil(res.data.category.length / itemsPerPage));
        }
      }

      return () => {
        isMountered = false;
      };
    } catch (error) {
      console.log(error);
    }
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const handleErrorImage = (data) => {
    setDefaultImage((prev) => ({
      ...prev,
      [data.target.alt]: data.target.alt,
      linkDefault: Bg,
    }));
  };
  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <div className="mx-10 my-16 bg-white pt-6">
      <section className="flex w-full justify-center mb-10">
        <h1 className="text-2xl font-bold uppercase mt-4 lg:mt-0">
          Shop By Categories
        </h1>
      </section>
      <div className="flex flex-col gap-2 text-center ">
        <div className="slider w-full">
          <Slider {...settings}>
            {listPost.map((data, i) => {
              return (
                <div key={i}>
                  <div className="carded">
                    <div className="relative">
                      <img
                        src={`http://localhost:8000/${data.photo}`}
                        alt="photo"
                        width={350}
                        height={350}
                        className="w-full h-96 object-cover"
                      />
                      <div className="h-96 w-full bg-black colorCenter"></div>
                      <Link to={`/category/${data.slug}`}>
                        <button className="textCenter bg-black rounded-md text-white px-16 py-2 -mt-4 hover:opacity-70 w-3/4 border-solid border-white border-2">
                          {data.name}
                        </button>
                      </Link>
                      <div className="p-5 flex-col gap-3">
                        <h2 className="product-title text-center font-medium">
                          {data.name}
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}
