import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, CircularProgress, Pagination } from "@mui/material";
import { Link } from "react-router-dom";

export default function ListCategory() {
  return (
    <div>
      <section className="section-container md:py-20">
        <h1 className="title-text text-black">Category Page</h1>

        <div className="flex flex-col flex-wrap justify-center justify-items-center items-center">
          {Post()}
        </div>
      </section>
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
      {loading ? (
        <div className="tableLoad">
          <Box sx={{ display: "flex" }}>
            <div className="loading font-normal">
              <CircularProgress />
              <div>Loading Category</div>
            </div>
          </Box>
        </div>
      ) : (
        <>
          <div className="flex lg:flex-row flex-wrap flex-col m-12 justify-center justify-items-center items-center gap-10 border">
            {/* Mapping Data Product yang didapatkan dari fetchItem */}
            {listPost
              .slice((page - 1) * itemsPerPage, page * itemsPerPage)
              .map((data, i) => {
                return (
                  <div key={i}>
                    <Link to={`/category/${data.slug}`}>
                      <div className="card">
                        <img
                          src={`http://localhost:8000/${data.photo}`}
                          alt="photo"
                          width={350}
                          height={350}
                          className="h-56"
                        />
                        <div className="p-5 flex-col gap-3">
                          <h2 className="product-title text-center">
                            {data.name}
                          </h2>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
          <Box component="span">
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
