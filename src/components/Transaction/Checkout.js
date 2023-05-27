import {
  Box,
  CircularProgress,
  Fade,
  List,
  ListItem,
  ListItemText,
  Modal,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { numberWithCommas } from "../../utils/comma";
import TotalPrice from "./TotalPrice";
import axios from "axios";
import swal from "sweetalert";
import { useEffect } from "react";
import ReactDOM from "react-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState([]);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const PayPalButton = window.paypal.Buttons.driver("react", {
    React,
    ReactDOM,
  });
  const [state, setState] = useState({
    name: "",
    phoneNum: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const fetchItem = async () => {
    try {
      let res = await axios.get(`/api/cart`);
      if (res.data.status === 200) {
        setCart(res.data.cart);
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
        Navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const createOrder = (data) => {
    // Order is created on the server and the order id is returned
    return fetch("/my-server/create-paypal-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product skus and quantities
      body: JSON.stringify({
        cart: [
          {
            sku: "YOUR_PRODUCT_STOCK_KEEPING_UNIT",
            quantity: "YOUR_PRODUCT_QUANTITY",
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };
  const onApprove = (data) => {
    // Order is captured on the server and the response is returned to the browser
    return fetch("/my-server/capture-paypal-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    }).then((response) => response.json());
  };
  const handleInput = async (e, payment) => {
    e.preventDefault();

    const formData = {
      name: state.name,
      phoneNum: state.phoneNum,
      email: state.email,
      address: state.address,
      city: state.city,
      state: state.state,
      zip: state.zip,
      payment_mode: payment,
      payment_id: "",
    };
    setLoading(false);
    console.log(payment);
    switch (payment) {
      case "COD":
        try {
          axios
            .post("/api/place-order", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res.data.status === 200) {
                swal({
                  title: "Order Placed Successfull!",
                  text: res.data.message,
                  icon: "success",
                  button: false,
                  timer: 1500,
                });
                setError("");
                fetchItem();
                navigate("/cart");
              } else if (res.data.status === 401) {
                swal({
                  title: "Login for Checkout",
                  text: res.data.validati,
                  icon: "error",
                  button: false,
                  timer: 1500,
                });

                setLoading(false);
              } else if (res.data.status === 422) {
                swal({
                  title: "All fields are mandatory!",
                  text: "Please Fill All fields",
                  icon: "error",
                  button: false,
                  timer: 1500,
                });
                setError(res.data.validation_errors);
                setLoading(false);
              }
            });
        } catch (err) {
          alert(err.message);
        }
        break;
      case "Paypal":
        try {
          axios
            .post("/api/validate-order", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res.data.status === 200) {
                handleOpen();
                setError("");
              } else if (res.data.status === 401) {
                swal({
                  title: "Login for Checkout",
                  text: res.data.validati,
                  icon: "error",
                  button: false,
                  timer: 1500,
                });

                setLoading(false);
              } else if (res.data.status === 422) {
                swal({
                  title: "All fields are mandatory!",
                  text: "Please Fill All fields",
                  icon: "error",
                  button: false,
                  timer: 1500,
                });
                setError(res.data.validation_errors);
                setLoading(false);
              }
            });
        } catch (err) {
          alert(err.message);
        }
        break;
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
  useEffect(() => {
    fetchItem();
    document.title = "Checkout";
  }, []);
  return (
    <>
      <div className="p-7 text-2xl font-semibold flex-1">
        <div className="font-normal text-xs leading-10">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          {" > "}
          <Link to="/cart" className="hover:underline">
            Cart
          </Link>
          {" > "}
          <span className="capitalize"> Checkout`</span>
        </div>
        <>
          {cart.length > 0 ? (
            <div className="flex flex-row justify-between items-center">
              <div className="w-2/5">
                Information
                {error ? (
                  <div className="text-left bg-red-500 w-full text-white p-4 mt-2 mb-4 max-h-28 overflow-scroll text-xs">
                    <ul>
                      <li>{error.name}</li>
                      <li>{error.phoneNum}</li>
                      <li>{error.email}</li>
                      <li>{error.address}</li>
                      <li>{error.city}</li>
                      <li>{error.state}</li>
                      <li>{error.zip}</li>
                    </ul>
                  </div>
                ) : (
                  ""
                )}
                <div className="flexInput">
                  <TextField
                    helperText="Please enter your Name"
                    id="name"
                    name="name"
                    label="Name"
                    value={state.name}
                    type="text"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-row">
                  <div className="flexInput">
                    <TextField
                      helperText="Please enter your Phone Number"
                      id="phoneNum"
                      name="phoneNum"
                      label="Phone Number"
                      value={state.phoneNum}
                      type="text"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flexInput ml-4">
                    <TextField
                      helperText="Please enter your Email"
                      id="email"
                      name="email"
                      label="Email"
                      value={state.email}
                      type="text"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="flexInput">
                  <textarea
                    className="h-28 w-full appearance-none block border border-slate-600 rounded-lg py-4 px-3 focus:outline-none text-sm font-medium"
                    placeholder="Address"
                    id="address"
                    name="address"
                    value={state.address}
                    onChange={handleInputChange}
                  ></textarea>
                  <div className="text-right mx-4 text-xs font-semibold">
                    {state.address.length <= 5000 ? (
                      <>
                        {state.address.length}
                        <span> / 5000</span>
                      </>
                    ) : (
                      <div className="text-red-600">
                        {state.address.length}{" "}
                        <span className="text-black"> / 5000</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="flexInput">
                    <TextField
                      helperText="Please enter your City"
                      id="city"
                      name="city"
                      label="City"
                      value={state.city}
                      type="text"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flexInput ml-4">
                    <TextField
                      helperText="Please enter your State"
                      id="state"
                      name="state"
                      label="State"
                      value={state.state}
                      type="text"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="flexInput ml-4">
                    <TextField
                      helperText="Please enter your Zip Code"
                      id="zip"
                      name="zip"
                      label="Zip Code"
                      value={state.zip}
                      type="text"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="w-1/2">
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
                  <div>
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
                                              {data.productName}
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
                                          </div>
                                        </div>
                                        <div>
                                          <div className="flex flex-row">
                                            <div className="font-semibold">
                                              Qty : {data.product_qty}
                                            </div>
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
                        <TotalPrice
                          total={cart}
                          action={"order"}
                          handleInput={handleInput}
                        />
                      </Box>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="tableLoad">
              <Box sx={{ display: "flex" }}>
                <div className="loading font-normal">
                  <CircularProgress />
                  <div>Loading Checkout Item</div>
                </div>
              </Box>
            </div>
          )}
        </>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        className="overflow-scroll h-11/12"
      >
        <Fade in={open}>
          <Box sx={style} style={{ background: "white" }} component={"div"}>
            <Toolbar style={{ marginLeft: "-1rem" }}>
              <Typography component="div" sx={{ flexGrow: 2 }}>
                <b className="text-xl">Online Payment</b>
              </Typography>
              <i
                className="icon fa fa-times"
                aria-hidden="true"
                onClick={handleClose}
              ></i>
            </Toolbar>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
              component={"div"}
              className="text-center"
            >
              <PayPalButton
                createOrder={(data) => createOrder(data)}
                onApprove={(data) => onApprove(data)}
              />
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
