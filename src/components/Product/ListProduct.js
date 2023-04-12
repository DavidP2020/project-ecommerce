import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, CircularProgress, Pagination } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

export default function ListProduct() {
  return (
    <div className="p-7 pt-4 text-2xl font-semibold flex-1 h-screen w-screen overflow-scroll">
      <section className="section-container md:py-20">{Post()}</section>
    </div>
  );
}

function Post() {
  const id = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState([]);
  const itemsPerPage = 9;
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
  };
  const [noOfPages, setPages] = useState();

  const fetchItem = async () => {
    try {
      console.log(id);
      let isMountered = true;
      let res = await axios.get(`/api/fetchProduct/${id.slug}`);

      if (isMountered) {
        if (res.data.status === 200) {
          setProduct(res.data.product);
          setLoading(false);
          setPages(Math.ceil(res.data.product.length / itemsPerPage));
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
    <>
      {loading ? (
        <div className="screen bg-blue">
          <Box sx={{ display: "flex" }}>
            <div className="loading">
              <CircularProgress />
              <div className="font-thin">Loading Product</div>
            </div>
          </Box>
        </div>
      ) : (
        <>
          <h1 className="title-text text-black">Category / {id.slug}</h1>
          <div className="flex flex-col flex-wrap justify-center justify-items-center items-center">
            <div className="flex lg:flex-row flex-wrap flex-col m-12 justify-center justify-items-center items-center gap-10 border">
              {product
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((data, i) => {
                  return (
                    <div key={i}>
                      <Link to={`/category/${data.slugName}/${data.slug}`}>
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
          </div>
        </>
      )}
    </>
  );
}
