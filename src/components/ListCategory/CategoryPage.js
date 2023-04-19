import Bg from "../../assets/Photo2.jpg";
import "../Home/home.css";
import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function CategoryPage() {
  const [listPost, setlistPost] = useState([]);
  const [loading, setLoading] = useState([]);
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

  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <>
      <section className="flex w-full bg-white justify-center my-10">
        <h1 className="text-2xl font-bold uppercase mt-4 lg:mt-0">
          Shop By Categories
        </h1>
      </section>
      <div className="flex-col">
        <div className="flex sm:flex-row flex-wrap flex-col justify-center justify-items-center items-center gap-2 border">
          {listPost
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((data, i) => {
              return (
                <div key={i}>
                  <div className="card mt-4 ">
                    <div className="relative">
                      <img
                        src={`http://localhost:8000/${data.photo}`}
                        alt="photo"
                        width={350}
                        height={350}
                        className="h-72 object-cover"
                      />
                      <div className="h-72 w-full bg-black colorCenter"></div>
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
        </div>
      </div>
    </>
  );
}
