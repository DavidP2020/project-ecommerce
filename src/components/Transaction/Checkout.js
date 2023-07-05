import {
  Box,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { numberWithCommas } from "../../utils/comma";
import TotalPrice from "./TotalPrice";
import axios from "axios";
import swal from "sweetalert";
import { useEffect } from "react";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const username = localStorage.getItem("auth-name");
  const accessEmail = localStorage.getItem("auth-email");
  const accessRole = localStorage.getItem("auth-role");

  const [loadingPayment, setLoadingPayment] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  // const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [status, setStatus] = useState("");
  const [statusOrderan, setStatusOrderan] = useState("");
  const [ongkos, setOngkos] = useState("");
  const [ongkir, setOngkir] = useState(0);
  const setCityData = [
    {
      value: "Tanjung Pinang",
      label: "Tanjung Pinang",
    },
    {
      value: "Kijang",
      label: "Kijang",
    },
    {
      value: "Kawal",
      label: "Kawal",
    },
    {
      value: "Uban",
      label: "Uban",
    },
  ];

  const fetchData = () => {
    try {
      axios.get(`/api/profile/${accessEmail}`).then((resp) => {
        if (resp.data.status === 200) {
          if (accessRole === "USER") {
            setName(resp.data.user.name);
            setPhoneNum(resp.data.user.phoneNum);
            setEmail(resp.data.user.email);
            setAddress(resp.data.user.address);
            // setState(resp.data.user.state);
            setCity(resp.data.user.city);
            setZip(resp.data.user.zip);
            setStatus("Unpaid");
            setStatusOrderan(0);
          } else if (accessRole === "ADMIN") {
            setStatus("settlement");
            setStatusOrderan(1);
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
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
  const handleChange = (event) => {
    if (city) {
      setOngkos(event.target.checked);
      if (city === "Tanjung Pinang") {
        setOngkir(25000);
      } else if (city === "Kijang") {
        setOngkir(40000);
      } else if (city === "Kawal") {
        setOngkir(50000);
      } else {
        setOngkir(100000);
      }

      if (ongkos === true) {
        setOngkir(0);
      }
    } else {
      swal({
        title: "Error!",
        text: "Isi Kota Terlebih dahulu",
        icon: "error",
        button: false,
        timer: 2000,
      });
    }
  };
  const handleChangeCity = (event) => {
    setCity(event.target.value);
    setOngkos(false);
    setOngkir(0);
  };

  const handleInput = async (e, payment, total) => {
    e.preventDefault();
    const formData = {
      name: name,
      phoneNum: phoneNum,
      email: email,
      address: address,
      city: city,
      zip: zip,
      payment_mode: payment,
      gross_amount: total,
      payment_id: "",
      ongkir: ongkir,
      statusOrderan: ongkir === 0 ? statusOrderan : 0,
      status: status,
    };

    switch (payment) {
      case "COD":
        setLoadingOrder(true);
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
                navigate("/order");
              } else if (res.data.status === 401) {
                swal({
                  title: "Login for Checkout",
                  text: res.data.message,
                  icon: "error",
                  button: false,
                  timer: 1500,
                });
                setLoadingOrder(false);
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
                setLoadingOrder(false);
                setLoading(false);
              } else if (res.data.status === 403) {
                swal({
                  title: res.data.message,
                  text: res.data.message,
                  icon: "error",
                  button: false,
                  timer: 1500,
                });
                setLoadingOrder(false);
                setLoading(false);
              }
            });
        } catch (err) {
          alert(err.message);
        }
        break;
      case "Online":
        setLoadingPayment(true);
        try {
          axios
            .post("/api/payment", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((res) => {
              if (res.data.status === 200) {
                <script type="text/javascript">
                  var payButton = document.getElementById('pay-button');
                  payButton.addEventListener('click', function (){" "}
                  {
                    // Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
                    window.snap.pay(res.data.snapToken, {
                      onSuccess: function (result) {
                        /* You may add your own implementation here */
                        console.log(result);
                        const formDataPayment = {
                          name: name,
                          phoneNum: phoneNum,
                          email: email,
                          address: address,
                          city: city,
                          ongkir: ongkir,
                          statusOrderan: 0,
                          zip: zip,
                          transaction_id: result.transaction_id,
                          order_id: result.order_id,
                          payment_mode: result.payment_type,
                          gross_amount: result.gross_amount,
                          paidBy: username,
                          status: result.transaction_status,
                        };
                        try {
                          axios
                            .post("/api/place-order", formDataPayment, {
                              headers: {
                                "Content-Type": "multipart/form-data",
                              },
                            })
                            .then((res) => {
                              if (res.data.status === 200) {
                                swal({
                                  title: "Order Placed Successfull!",
                                  text: result.status_message,
                                  icon: "success",
                                  button: false,
                                  timer: 1500,
                                });
                                setError("");
                                navigate("/order");
                                fetchItem();
                              } else if (res.data.status === 401) {
                                swal({
                                  title: "Login for Checkout",
                                  text: res.data.message,
                                  icon: "error",
                                  button: false,
                                  timer: 1500,
                                });
                                setLoading(false);
                                setLoadingPayment(false);
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
                                setLoadingPayment(false);
                              } else if (res.data.status === 403) {
                                swal({
                                  title: res.data.message,
                                  text: res.data.message,
                                  icon: "error",
                                  button: false,
                                  timer: 1500,
                                });
                                setLoading(false);
                                setLoadingPayment(false);
                              }
                            });
                        } catch (err) {
                          alert(err.message);
                        }
                      },
                      onPending: function (result) {
                        /* You may add your own implementation here */
                        const formDataPayment = {
                          name: name,
                          phoneNum: phoneNum,
                          email: email,
                          address: address,
                          city: city,
                          zip: zip,
                          ongkir: ongkir,
                          transaction_id: result.transaction_id,
                          order_id: result.order_id,
                          payment_mode: result.payment_type,
                          gross_amount: result.gross_amount,
                          status: result.transaction_status,
                          statusOrderan: 0,
                        };
                        try {
                          axios
                            .post("/api/place-order", formDataPayment, {
                              headers: {
                                "Content-Type": "multipart/form-data",
                              },
                            })
                            .then((res) => {
                              if (res.data.status === 200) {
                                swal({
                                  title: "Menunggu Pembayaran",
                                  text: result.status_message,
                                  icon: "error",
                                  button: false,
                                  timer: 2500,
                                });
                                setError("");
                                navigate("/order");
                                fetchItem();
                              } else if (res.data.status === 401) {
                                swal({
                                  title: "Login for Checkout",
                                  text: res.data.message,
                                  icon: "error",
                                  button: false,
                                  timer: 1500,
                                });
                                setLoading(false);
                                setLoadingPayment(false);
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
                                setLoadingPayment(false);
                              } else if (res.data.status === 403) {
                                swal({
                                  title: res.data.message,
                                  text: res.data.message,
                                  icon: "error",
                                  button: false,
                                  timer: 1500,
                                });
                                setLoading(false);
                                setLoadingPayment(false);
                              }
                            });
                        } catch (err) {
                          alert(err.message);
                        }
                      },
                      onError: function (result) {
                        /* You may add your own implementation here */
                        const formDataPayment = {
                          name: name,
                          phoneNum: phoneNum,
                          email: email,
                          address: address,
                          city: city,
                          zip: zip,
                          ongkir: ongkir,
                          transaction_id: result.transaction_id,
                          order_id: result.order_id,
                          payment_mode: result.payment_type,
                          gross_amount: result.gross_amount,
                          status: result.transaction_status,
                          statusOrderan: 0,
                        };
                        try {
                          axios
                            .post("/api/place-order", formDataPayment, {
                              headers: {
                                "Content-Type": "multipart/form-data",
                              },
                            })
                            .then((res) => {
                              if (res.data.status === 200) {
                                swal({
                                  title: "Pembayaran Gagal",
                                  text: result.status_message,
                                  icon: "error",
                                  button: false,
                                  timer: 2500,
                                });
                                setError("");
                                navigate("/order");
                                fetchItem();
                              } else if (res.data.status === 401) {
                                swal({
                                  title: "Login for Checkout",
                                  text: res.data.message,
                                  icon: "error",
                                  button: false,
                                  timer: 1500,
                                });
                                setLoading(false);
                                setLoadingPayment(false);
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
                                setLoadingPayment(false);
                              } else if (res.data.status === 403) {
                                swal({
                                  title: res.data.message,
                                  text: res.data.message,
                                  icon: "error",
                                  button: false,
                                  timer: 1500,
                                });
                                setLoading(false);
                                setLoadingPayment(false);
                              }
                            });
                        } catch (err) {
                          alert(err.message);
                        }
                      },
                      onClose: function () {
                        /* You may add your own implementation here */
                        setLoadingPayment(false);
                        swal({
                          title:
                            "Kamu Menutup Popup Tanpa Menuelesaikan Pembayaran",
                          text: "You closed the popup without finishing the payment",
                          icon: "error",
                          button: false,
                          timer: 2500,
                        });
                      },
                    })
                  }
                  );
                </script>;
                setError("");
              } else if (res.data.status === 401) {
                swal({
                  title: "Login for Checkout",
                  text: res.data.message,
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
              } else if (res.data.status === 403) {
                swal({
                  title: res.data.message,
                  text: res.data.message,
                  icon: "error",
                  button: false,
                  timer: 1500,
                });
                setLoading(false);
              }
            });
        } catch (err) {
          alert(err.message);
        }
        break;
    }
  };
  useEffect(() => {
    fetchItem();
    fetchData();
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
                    label="Nama"
                    value={name}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-row">
                  <div className="flexInput">
                    <TextField
                      helperText="Please enter your Phone Number"
                      id="phoneNum"
                      name="phoneNum"
                      label="Nomor Telepon"
                      value={phoneNum}
                      type="text"
                      onChange={(e) => setPhoneNum(e.target.value)}
                    />
                  </div>
                  <div className="flexInput ml-4">
                    <TextField
                      helperText="Please enter your Email"
                      id="email"
                      name="email"
                      label="Email"
                      value={email}
                      disabled={accessRole === "ADMIN" ? false : true}
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div classNam e="flexInput">
                  <textarea
                    className="h-28 w-full appearance-none block border border-slate-600 rounded-lg py-4 px-3 focus:outline-none text-sm font-medium"
                    placeholder="Alamat"
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
                  <div className="text-right mx-4 text-xs font-semibold">
                    {address.length <= 5000 ? (
                      <>
                        {address.length}
                        <span> / 5000</span>
                      </>
                    ) : (
                      <div className="text-red-600">
                        {address.length}{" "}
                        <span className="text-black"> / 5000</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="flexInput">
                    <TextField
                      select
                      helperText="Please enter your City"
                      id="city"
                      name="city"
                      label="Kota"
                      value={city}
                      variant="outlined"
                      onChange={handleChangeCity}
                    >
                      {setCityData.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  {/* <div className="flexInput ml-4">
                    <TextField
                      helperText="Please enter your State"
                      id="state"
                      name="state"
                      label="State"
                      value={state}
                      type="text"
                      onChange={(e) => setState(e.target.value)}
                    />
                  </div> */}
                  <div className="flexInput ml-4">
                    <TextField
                      helperText="Please enter your Zip Code"
                      id="zip"
                      name="zip"
                      label="Kode Pos"
                      value={zip}
                      type="text"
                      onChange={(e) => setZip(e.target.value)}
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
                          <FormControlLabel
                            label="Ongkos Kirim"
                            control={
                              <Checkbox
                                checked={ongkos}
                                onChange={handleChange}
                              />
                            }
                          />
                        </nav>
                        <TotalPrice
                          total={cart}
                          ongkir={ongkir}
                          action={"order"}
                          loadingPayment={loadingPayment}
                          loadingOrder={loadingOrder}
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
    </>
  );
}
