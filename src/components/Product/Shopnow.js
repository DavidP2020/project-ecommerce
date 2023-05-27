import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, CircularProgress, Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import { numberWithCommas } from "../../utils/comma";

export default function Shopnow() {
  return (
    <div className="p-7 pt-4 text-2xl font-semibold flex-1">
      <section className="section-container">{Post()}</section>
    </div>
  );
}

function Post() {
  const [listPost, setlistPost] = useState([]);
  const [loading, setLoading] = useState([]);
  const itemsPerPage = 9;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState([]);

  const handleChange = (event, value) => {
    setPage(value);
  };
  const [noOfPages, setPages] = useState();

  const fetchItem = async () => {
    try {
      let isMountered = true;
      let res = await axios.get("/api/all-product");

      if (isMountered) {
        if (res.data.status === 200) {
          setlistPost(res.data.product);
          setTotal(res.data.total);
          setLoading(false);
          setPages(Math.ceil(res.data.product.length / itemsPerPage));
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
      {loading ? (
        <div className="tableLoad">
          <Box sx={{ display: "flex" }}>
            <div className="loading font-normal">
              <CircularProgress />
              <div>Loading Items</div>
            </div>
          </Box>
        </div>
      ) : (
        <>
          <div className="font-normal text-xs leading-10">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            {" > "} <span className="capitalize">Shop Now</span>
          </div>
          <h1 className="title-text text-black uppercase font-extrabold text-3xl">
            Shop Now
          </h1>
          <div className="flex lg:flex-row flex-wrap flex-col m-12 justify-center justify-items-center items-center gap-10 border">
            {listPost
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((data, i) => {
                return (
                  <div key={i}>
                    {data.product_color ? (
                      <div className="card">
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
                              {data.weight} Kg
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
          </div>
          <Box
            component="span"
            className="flex items-center justify-center text-center"
          >
            <Pagination
              count={noOfPages}
              page={page}
              onChange={handleChange}
              defaultPage={1}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        </>
      )}
    </>
  );
}
