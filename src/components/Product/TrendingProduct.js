import Bg from "../../assets/Photo2.jpg";
import "../Home/home.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import swal from "sweetalert";
import { numberWithCommas } from "../../utils/comma";

export default function TrendingProduct() {
  const [defaultImage, setDefaultImage] = useState({});
  const itemsPerPage = 9;
  const id = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState([]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
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
        breakpoint: 500,
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

  const fetchItem = async () => {
    try {
      let isMountered = true;
      let res = await axios.get(`/api/trending-product`);

      if (isMountered) {
        if (res.data.status === 200) {
          setProduct(res.data.product);
          setTotal(res.data.total);
        } else if (res.data.status === 404) {
          navigate.push("/category");
          swal("Warning", res.data.message, "error");
        }
      }

      return () => {
        isMountered = false;
      };
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [navigate]);

  return (
    <div className="mx-10 my-24">
      <section className="flex w-full justify-start mb-10">
        <h1 className="text-2xl font-bold uppercase mt-4 lg:mt-0">
          Trending | Best Seller
        </h1>
      </section>
      <div className="flex flex-col gap-2 bg-white ">
        <div className="sliders">
          <Slider {...settings}>
            {product.map((data, i) => {
              return (
                <div key={i}>
                  {data.product_color ? (
                    <div className="carded  my-10">
                      <img
                        src={`http://localhost:8000/${data.photo}`}
                        alt="photo"
                        className="w-full h-96 object-cover"
                      />
                      <div className="p-5 flex-col gap-3">
                        <div className="flex flex-row justify-between items-center">
                          <div className="font-normal text-xs">
                            {data.category.name}
                          </div>
                          <div className="font-normal text-xs">
                            {data.weight} {data.unit}
                          </div>
                        </div>
                        <div className="font-bold text-2xl my-2">
                          {data.name}
                        </div>
                        <div className="font-medium text-xs text-white my-3">
                          <span className="bg-primary px-4 py-1 rounded-xl">
                            {data.brand.name}
                          </span>
                        </div>
                        <div className="font-extrabold text-xl mt-2 text-red-500">
                          Rp. {numberWithCommas(data.product_color.price)}
                        </div>
                        <div className="text-gray-500 font-medium text-xs mt-2">
                          {total} Item left
                        </div>
                        <div className="text-center mt-4">
                          <Link
                            to={`/category/${data.category.slug}/${data.slug}`}
                          >
                            <button
                              className="text-black text-sm font-medium px-4 py-2 rounded-md mx-4 border-solid border-4"
                              type="button"
                            >
                              View More
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}
