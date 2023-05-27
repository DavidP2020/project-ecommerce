import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, CircularProgress, Pagination } from "@mui/material";
import { Link } from "react-router-dom";

export default function BrandPage() {
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

  const handleChange = (event, value) => {
    setPage(value);
  };
  const [noOfPages, setPages] = useState();

  const fetchItem = async () => {
    try {
      let isMountered = true;
      let res = await axios.get("/api/all-brand");

      if (isMountered) {
        if (res.data.status === 200) {
          setlistPost(res.data.brand);
          setLoading(false);
          setPages(Math.ceil(res.data.brand.length / itemsPerPage));
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
              <div>Loading Brand</div>
            </div>
          </Box>
        </div>
      ) : (
        <>
          <div className="font-normal text-xs leading-10">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            {" > "} <span className="capitalize">Brand</span>
          </div>
          <h1 className="title-text text-black uppercase font-extrabold text-3xl">
            Brand
          </h1>
          <div className="flex lg:flex-row flex-wrap flex-col m-12 justify-center justify-items-center items-center gap-10 border">
            {listPost
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((data, i) => {
                return (
                  <div key={i}>
                    <div className="card">
                      <div className="relative">
                        <img
                          src={`http://localhost:8000/${data.photo}`}
                          alt="photo"
                          width={350}
                          height={350}
                          className="w-full h-96 object-cover"
                        />
                        <div className="h-96 w-full bg-black colorCenter"></div>
                        <Link to={`/brands/${data.name}`}>
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
