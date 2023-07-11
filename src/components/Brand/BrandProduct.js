import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, CircularProgress, Pagination } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { numberWithCommas } from "../../utils/comma";

export default function BrandProduct() {
  return (
    <div className="p-7 pt-4 text-2xl font-semibold flex-1a">
      <section className="section-container">{Post()}</section>
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
      let res = await axios.get(`/api/fetchBrand/${id.name}`);

      if (isMountered) {
        if (res.data.status === 200) {
          setProduct(res.data.product);
          console.log(res.data);
          setLoading(false);
          setPages(Math.ceil(res.data.product.length / itemsPerPage));
        } else if (res.data.status === 404) {
          navigate.push("/brands");
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
        <div className="tableLoad">
          <Box sx={{ display: "flex" }}>
            <div className="loading font-normal">
              <CircularProgress />
              <div>Loading Brand Product</div>
            </div>
          </Box>
        </div>
      ) : (
        <div>
          <div className="font-normal text-xs leading-10">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            {" > "} <span className="capitalize">{id.name}</span>
          </div>
          <h1 className="title-text text-black uppercase font-extrabold text-3xl">
            {id.name}
          </h1>
          {product.length !== 0 ? (
            <div className="flex-col">
              <div className="flex sm:flex-row flex-wrap flex-col justify-center justify-items-center items-center gap-2 border">
                {product
                  .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                  .map((data, i) => {
                    return (
                      <div key={i}>
                        {data.product_color ? (
                          <Link
                            to={`/category/${data.category.slug}/${data.slug}`}
                          >
                            <div className="card mt-10">
                              <img
                                src={`http://localhost:8000/${data.photo}`}
                                alt="photo"
                                className="h-72 object-cover"
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
                                  Rp.{" "}
                                  {numberWithCommas(data.product_color.price)}
                                </div>
                              </div>
                            </div>
                          </Link>
                        ) : (
                          ""
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-screen">
              No Data Found
            </div>
          )}
        </div>
      )}
    </>
  );
}
