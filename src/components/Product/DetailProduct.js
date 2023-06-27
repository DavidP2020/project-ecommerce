import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { numberWithCommas } from "../../utils/comma";
import "./Detail.css";
import { pink } from "@mui/material/colors";
export default function DetailProduct() {
  return (
    <div className=" pt-4 text-2xl font-semibold flex-1 h-full">
      <section className="section-container relative">{Post()}</section>
    </div>
  );
}

function Post() {
  const id = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  const [price, setPrice] = useState(0);
  const [color, setColor] = useState("-");
  const [total, setTotal] = useState(0);
  const [itemQty, setitemQty] = useState(0);
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState([]);
  const [wish, setWish] = useState(true);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingWish, setLoadingWish] = useState(false);
  const [qty, setQty] = useState(1);
  const [cartProduct, setcartProduct] = useState(null);
  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = async (event, newAlignment) => {
    setAlignment(newAlignment);
    await axios.get(`/api/detailProduct/${newAlignment}`).then((res) => {
      setPrice(res.data.getDetail[0].price);
      setColor(res.data.getDetail[0].colorName);
      setitemQty(res.data.getDetail[0].qty);
      setcartProduct(newAlignment);
    });
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const handleDecrement = () => {
    if (qty > 1) {
      setQty((prevCount) => prevCount - 1);
    }
  };

  const handleIncrement = () => {
    if (qty < itemQty) setQty((prevCount) => prevCount + 1);
  };

  const fetchItem = async () => {
    try {
      let isMountered = true;
      let res = await axios.get(`/api/fetchProduct/${id.slug}/${id.product}`);

      if (isMountered) {
        if (res.data.status === 200) {
          setProduct(res.data.product[0]);
          setDetail(res.data.detailProduct);
          setTotal(res.data.total);
          setLoading(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoadingAdd(true);
    const data = {
      product_id: cartProduct,
      product_qty: qty,
    };
    try {
      axios.post("/api/cart", data).then((res) => {
        if (res.data.status === 201) {
          swal({
            title: "Success!",
            text: res.data.message,
            icon: "success",
            button: false,
            timer: 1500,
          });
          setLoadingAdd(false);
        } else if (res.data.status === 409) {
          swal({
            title: "Warning!",
            text: res.data.message,
            icon: "warning",
            button: false,
            timer: 1500,
          });
          setLoadingAdd(false);
        } else if (res.data.status === 404) {
          swal({
            title: "Warning!",
            text: res.data.message,
            icon: "warning",
            button: false,
            timer: 1500,
          });
          setLoadingAdd(false);
        } else if (res.data.status === 401) {
          swal({
            title: "Error!",
            text: res.data.message,
            icon: "error",
            button: false,
            timer: 1500,
          });
          setLoadingAdd(false);
        }
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleWish = (e) => {
    e.preventDefault();
    setLoadingWish(true);
    const data = {
      product_id: cartProduct,
    };
    console.log(data);
    try {
      axios.post("/api/wishlist", data).then((res) => {
        if (res.data.status === 201) {
          swal({
            title: "Success!",
            text: res.data.message,
            icon: "success",
            button: false,
            timer: 1500,
          });
          setLoadingWish(false);
        } else if (res.data.status === 200) {
          swal({
            title: "Success!",
            text: res.data.message,
            icon: "info",
            button: false,
            timer: 1500,
          });
          setLoadingWish(false);
        } else if (res.data.status === 404) {
          swal({
            title: "Warning!",
            text: res.data.message,
            icon: "warning",
            button: false,
            timer: 1500,
          });
          setLoadingWish(false);
        } else if (res.data.status === 401) {
          swal({
            title: "Error!",
            text: res.data.message,
            icon: "error",
            button: false,
            timer: 2000,
          });
          localStorage.clear();
          navigate("/login");
          setTimeout(() => {
            window.location.reload(false);
          }, 2200);
          setLoadingWish(false);
        }
      });
    } catch (err) {
      alert(err.message);
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
              <div>Loading Detail Product</div>
            </div>
          </Box>
        </div>
      ) : (
        <div className="py-4 md:px-20 px-2 ">
          <div className="font-normal text-xs leading-10">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            {" > "}{" "}
            <Link to={`/category/${id.slug}`} className="hover:underline">
              <span className="capitalize">{id.slug}</span>
            </Link>
            {" > "} <span className="capitalize">{id.product}</span>
          </div>
          <div className="py-2">
            <div className="flex flex-col flex-wrap mb-10 lg:flex-row">
              <div className="left-side w-full lg:w-2/5">
                <div className="flex">
                  <div className="flex-row">
                    <img
                      src={`http://localhost:8000/${product.photo}`}
                      alt=""
                      width={1000}
                      className="h-96 p-2 object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="right-side w-full lg:w-3/5 p-6">
                {/* Name */}
                <div className="text-right">
                  {total < 1 ? (
                    <button className="text-sm bg-red-600 px-8 py-4 rounded-md font-normal text-white">
                      Out Of Stock
                    </button>
                  ) : (
                    <button className="text-sm bg-green-700 px-8 py-4 rounded-md font-normal text-white">
                      In Stock
                    </button>
                  )}
                </div>

                <div className="text-2xl p-2 mb-4 font-medium">
                  {product.name}
                </div>
                {detail.map((data, i) => {
                  return (
                    <ToggleButtonGroup
                      key={i}
                      value={alignment}
                      exclusive
                      onChange={handleAlignment}
                      aria-label="text alignment"
                      className="border-solid border-2 border-black m-2"
                    >
                      <ToggleButton value={data._id} aria-label="left aligned">
                        <div
                          style={{
                            background: `${data.color}`,
                            width: "40px",
                            height: "40px",
                          }}
                        ></div>
                        <div className="font-bold ml-2">{data.colorName}</div>
                      </ToggleButton>
                    </ToggleButtonGroup>
                  );
                })}

                {/* Price List */}
                <div className="text-lg text-gray-700 leading-6 p-2">
                  Price : <span>Rp. {numberWithCommas(price)}</span>
                </div>
                <div className="flex items-center gap-2 p-2">
                  <span className="badge text-sm">Quantity : {itemQty}</span>
                </div>

                {/* Amount */}
                <div className="flex leading-none p-2 pt-2 justify-center items-center">
                  <div className="md:w-1/5 text-lg">Amount</div>
                  <div className="w-4/5 flex space-x-6 justify-center items-center text-center">
                    <div className="increment-input flex space-x-3 overflow-hidden">
                      <span>
                        <button
                          className="bg-white mr-2 p-2 font-normal rounded-md border-solid border-2 border-black"
                          onClick={handleDecrement}
                        >
                          <i className="font-extrabold fa-solid fa-minus"></i>
                        </button>

                        <input
                          type="text"
                          id="qty"
                          nama="qty"
                          value={qty}
                          readOnly
                          placeholder="1"
                          className="w-1/5 focus:outline-none active:outline-none text-center text-md font-normal"
                        />
                        <button
                          className="bg-white m-2 p-2 font-normal rounded-md border-solid border-2 border-black"
                          onClick={handleIncrement}
                        >
                          <i className="font-extrabold fa-solid fa-plus"></i>
                        </button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Description */}
              <div className="md:px-0 px-4">
                <div className="py-2">
                  <span className="text-2xl text-gray-700 leading-6 p-2 font-bold">
                    Product Specification
                  </span>
                  <p className="text-sm text-gray-700 leading-6 p-2 font-bold">
                    Brand :{" "}
                    <span className="font-normal"> {[product.brandName]}</span>
                    <p className="mt-1">
                      Category :{" "}
                      <span className="font-normal">
                        {[product.categoryName]}
                      </span>
                    </p>
                    <p className="mt-1">
                      Color : <span className="font-normal">{[color]}</span>
                    </p>
                    <p className="mt-1">
                      Weight :{" "}
                      <span className="font-normal">
                        {[product.weight]} {[product.unit]}
                      </span>
                    </p>
                  </p>
                </div>
                <div className="py-4">
                  <span className="text-2xl text-gray-700 leading-6 p-2 font-bold">
                    Product Description
                  </span>
                  <p className="text-lg text-gray-700 p-2 font-normal ">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="scrollups bg-white py-4 flex justify-end lg:justify-between items-center md:px-16">
        <div className="md:flex md:flex-row md:w-1/2 md:justify-start md:items-center lg:flex-row flex-col justify-center items-center hidden ">
          <img
            src={`http://localhost:8000/${product.photo}`}
            alt=""
            width={150}
            height={150}
            className="mx-4 object-cover px-4"
          />
          <div className="text-lg font-medium">{product.name}</div>
        </div>

        <div className="flex m-2 mt-5 justify-between items-center">
          <div className="flex flex-col">
            <div className="font-semibold text-xs w-40">Total Price :</div>
            <div className="font-bold text-red-500 text-lg">
              Rp. {numberWithCommas(price * qty)}
            </div>
          </div>

          {price ? (
            <Button
              variant="contained"
              sx={{
                background: "#302C42",
                ":hover": {
                  background: "#302C42",
                  opacity: 0.8,
                },
              }}
              type="button"
              disabled={loadingAdd}
              onClick={handleSubmit}
            >
              {loadingAdd && (
                <CircularProgress
                  color="inherit"
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
              Add to Cart
            </Button>
          ) : (
            <Button variant="contained" type="button" disabled>
              Add to Cart
            </Button>
          )}
          <Checkbox
            {...label}
            icon={<FavoriteBorder />}
            checkedIcon={wish ? <Favorite /> : <FavoriteBorder />}
            disabled={loadingWish}
            onClick={handleWish}
            sx={{
              color: pink[800],
              "&.Mui-checked": {
                color: pink[600],
              },
            }}
          />
        </div>
      </div>
    </>
  );
}
