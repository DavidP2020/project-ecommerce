import React, { useEffect, useState } from "react";
import { numberWithCommas } from "../utils/comma";
import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import TotalPrice from "../components/Transaction/TotalPrice";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState([]);
  const [loadingCart, setLoadingCart] = useState(false);
  const [itemQty, setitemQty] = useState(0);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();

  const handleDecrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              product_qty: item.product_qty - (item.product_qty > 1 ? 1 : 0),
            }
          : item
      )
    );
    updateCart(cart_id, "dec");
  };

  const handleIncrement = (cart_id) => {
    setCart((cart) =>
      cart.map((item) =>
        cart_id === item.id
          ? {
              ...item,
              product_qty:
                item.product_qty + (item.product_qty < item.qty ? 1 : 0),
            }
          : item
      )
    );
    updateCart(cart_id, "inc");
  };
  const fetchItem = async () => {
    try {
      let res = await axios.get(`/api/cart`);
      if (res.data.status === 200) {
        console.log(res.data);
        setCart(res.data.cart);
        setQty(res.data.cart.product_qty);
        setLoading(false);
      } else if (res.data.status === 404) {
        swal("Warning", res.data.message, "error");
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
      }
    } catch (error) {
      console.log(error);
    }
  };
  function updateCart(cart_id, scope) {
    try {
      axios.put(`/api/cart-updateQuantity/${cart_id}/${scope}`).then((res) => {
        console.log(res.data);

        if (res.data.status === 200) {
          fetchItem();
          swal({
            title: "Success!",
            text: res.data.message,
            icon: "success",
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
  }

  const deleteCart = (e, cart_id) => {
    e.preventDefault();
    setLoadingCart(true);
    try {
      axios.delete(`/api/cart/${cart_id}`).then((res) => {
        if (res.data.status === 200) {
          fetchItem();
          swal({
            title: "Success!",
            text: res.data.message,
            icon: "success",
            button: false,
            timer: 1500,
          });
        } else if (res.data.status === 422) {
          swal({
            title: "Error!",
            text: res.data.error,
            icon: "error",
            button: false,
            timer: 1500,
          });
          setLoadingCart(false);
        }
      });
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchItem();
    document.title = "Cart";
  }, []);

  return (
    <div className="p-7 text-2xl font-semibold flex-1 w-screen overflow-scroll">
      <div className="font-normal text-xs leading-10">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        {" > "} <span className="capitalize"> Cart</span>
      </div>
      <h2 className="font-bold text-2xl m-6">Cart</h2>
      {loading ? (
        <div className="tableLoad">
          <Box sx={{ display: "flex" }}>
            <div className="loading font-normal">
              <CircularProgress />
              <div>Loading Cart</div>
            </div>
          </Box>
        </div>
      ) : (
        <>
          {cart.length > 0 ? (
            <div className="flex flex-col justify-items-center items-center">
              {cart.length !== 0 && (
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: 1000,
                    bgcolor: "background.paper",
                  }}
                >
                  <nav aria-label="secondary mailbox folders">
                    <List sx={{ width: "100%" }}>
                      {cart.map((data, i) => {
                        return (
                          <ListItem
                            alignItems="flex-cemter"
                            key={i}
                            className="shadow-xl lg:flex lg:flex-row lg:text-left text-center flex flex-col"
                          >
                            <ListItemAvatar>
                              <img
                                src={`http://localhost:8000/${data.photo}`}
                                alt="photo"
                                width={150}
                                height={150}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              className="m-6"
                              primary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    <div className="flex flex-wrap mb-2">
                                      <div className="left-side w-full md:w-1/2 text-2xl font-bold">
                                        {data.productName} ({data.weight}{" "}
                                        {data.unit})
                                      </div>
                                      <div className="right-side w-1/2 text-right font-bold mt-1 text-lg md:block hidden">
                                        Rp.
                                        {numberWithCommas(
                                          data.price * data.product_qty
                                        )}
                                      </div>
                                    </div>
                                  </Typography>
                                </React.Fragment>
                              }
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                    className="font-normal"
                                  >
                                    Price: Rp.
                                    {numberWithCommas(data.price)}
                                  </Typography>
                                  <div>
                                    <button className="bg-white p-3 rounded-md text-black border-solid border-black border-2">
                                      <div className="flex flex-row">
                                        <div
                                          style={{
                                            background: `${data.color}`,
                                            width: "20px",
                                            height: "20px",
                                            marginRight: "5px",
                                          }}
                                        ></div>
                                        <div className="font-semibold">
                                          {data.colorName}
                                        </div>
                                        {/* <i className="flex justify-center items-center ml-2 fa-sharp fa-solid fa-caret-down"></i> */}
                                      </div>
                                    </button>
                                  </div>
                                  <div className="flex leading-none p-2 pt-2 justify-start items-center">
                                    <div className="flex justify-start items-center">
                                      <div className="increment-input flex flex-col overflow-hidden">
                                        <span>
                                          <button
                                            className="bg-white mr-2 p-2 font-normal rounded-md border-solid border-2 border-black"
                                            onClick={() =>
                                              handleDecrement(data.id)
                                            }
                                          >
                                            <i className="font-extrabold fa-solid fa-minus"></i>
                                          </button>
                                          <input
                                            type="text"
                                            id="qty"
                                            nama="qty"
                                            value={data.product_qty}
                                            readOnly
                                            className="w-1/5 focus:outline-none active:outline-none text-center text-md font-normal text-black"
                                          />
                                          <button
                                            className="bg-white m-2 p-2 font-normal rounded-md border-solid border-2 border-black"
                                            onClick={() =>
                                              handleIncrement(data.id)
                                            }
                                          >
                                            <i className="font-extrabold fa-solid fa-plus"></i>
                                          </button>
                                        </span>
                                        <div className="font-bold text-xs">
                                          {data.qty} Item left
                                        </div>
                                      </div>
                                    </div>
                                    <div className="w-full text-right">
                                      <Button
                                        variant="contained"
                                        sx={{
                                          background: "red",
                                          color: "white",
                                          py: 2,
                                          borderRadius: 2,
                                          ":hover": {
                                            color: "black",
                                            background: "red",
                                            opacity: 0.8,
                                          },
                                        }}
                                        disabled={loadingCart}
                                        onClick={(e) => deleteCart(e, data.id)}
                                      >
                                        {loadingCart && (
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
                                        <i className="fa-solid fa-trash"></i>
                                      </Button>
                                    </div>
                                  </div>

                                  <hr />
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  </nav>
                  <TotalPrice total={cart} ongkir={0} action={"checkout"} />
                </Box>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-96">
              Your Shopping Cart is Empty
            </div>
          )}
        </>
      )}
    </div>
  );
}
