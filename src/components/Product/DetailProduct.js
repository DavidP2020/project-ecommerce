import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  CircularProgress,
  Pagination,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { numberWithCommas } from "../../utils/comma";

export default function DetailProduct() {
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
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [itemQty, setitemQty] = useState(0);
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState([]);
  const [qty, setQty] = useState(1);
  const [cartProduct, setcartProduct] = useState(null);
  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = async (event, newAlignment) => {
    setAlignment(newAlignment);
    console.log(newAlignment);
    await axios.get(`/api/detailProduct/${newAlignment}`).then((res) => {
      setPrice(res.data.getDetail[0].price);
      setitemQty(res.data.getDetail[0].qty);
      setcartProduct(newAlignment);
    });
  };

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
          console.log("asd", res.data.detailProduct);
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
    const data = {
      product_id: cartProduct,
      product_qty: qty,
    };
    console.log(data);
    try {
      axios.post("/api/cart", data).then((res) => {
        console.log(res.data);

        if (res.data.status === 201) {
          console.log(data);
          swal({
            title: "Success!",
            text: res.data.message,
            icon: "success",
            button: false,
            timer: 1500,
          });
        } else if (res.data.status === 409) {
          swal({
            title: "Warning!",
            text: res.data.message,
            icon: "warning",
            button: false,
            timer: 1500,
          });
        } else if (res.data.status === 404) {
          swal({
            title: "Warning!",
            text: res.data.message,
            icon: "warning",
            button: false,
            timer: 1500,
          });
        } else if (res.data.status === 401) {
          swal({
            title: "Error!",
            text: res.data.message,
            icon: "error",
            button: false,
            timer: 1500,
          });
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
        <div className="screen">
          <Box sx={{ display: "flex" }} component={"div"}>
            <div className="loading">
              <CircularProgress />
              <div className="font-thin">Loading Product Detail</div>
            </div>
          </Box>
        </div>
      ) : (
        <>
          <h1 className="title-text text-black">
            Category / {id.slug} / {id.product}
          </h1>
          <div className="py-3">
            <div className="flex flex-wrap mb-10 ">
              <div className="left-side w-2/5">
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
              <div className="right-side w-3/5 p-6">
                {/* Name */}
                <div className="text-right">
                  {total < 1 ? (
                    <button className="text-sm bg-red-600 p-2 pl-4 pr-4 rounded-md font-normal text-white">
                      Out Of Stock
                    </button>
                  ) : (
                    <button className="text-sm bg-green-700 p-2 pl-4 pr-4 rounded-md font-normal text-white">
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
                    >
                      <ToggleButton value={data._id} aria-label="left aligned">
                        <div
                          style={{
                            background: `${data.color}`,
                            width: "40px",
                            height: "40px",
                            margin: "10px",
                          }}
                        ></div>
                        <div>{data.colorName}</div>
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
                {/* Description */}
                <div>
                  <p className="text-sm text-gray-700 leading-6 p-2 font-bold">
                    Brand :
                    <span className="font-normal"> {[product.brandName]}</span>
                    <p>
                      Category :
                      <span className="font-normal">
                        {" "}
                        {[product.categoryName]}
                      </span>
                    </p>
                  </p>
                </div>
                {/* Description */}
                <div>
                  <span className="text-sm text-gray-700 leading-6 p-2 font-bold">
                    Description
                  </span>
                  <p className="text-sm text-gray-700 pl-2 font-normal">
                    {product.description}
                  </p>
                </div>

                {/* Amount */}
                <div className="flex leading-none p-2 pt-6">
                  <div className="w-1/5 text-lg">Amount</div>
                  <div className="w-4/5 flex space-x-6 justify-center">
                    <div className="increment-input flex space-x-3 bg-gray-100 rounded-full overflow-hidden">
                      <span>
                        <button onClick={handleDecrement}>-</button>
                        <input
                          type="text"
                          id="qty"
                          nama="qty"
                          value={qty}
                          readOnly
                          placeholder="1"
                          className="border-solid w-1/2 focus:outline-none active:outline-none text-center text-md"
                        />
                        <button onClick={handleIncrement}>+</button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="fixed-bottom text-right font-bold pt-4 pb-8 ">
              <div className="pt-10">
                <button
                  className="buttonCart"
                  type="button"
                  //   onClick={() => addToCart(product)}
                >
                  Add to Wish
                </button>
                {price ? (
                  <button
                    className="buttonCart bg-blue-600 text-white"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Add to Cart
                  </button>
                ) : (
                  <button
                    className="buttonCart bg-gray-300"
                    type="button"
                    disabled
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
