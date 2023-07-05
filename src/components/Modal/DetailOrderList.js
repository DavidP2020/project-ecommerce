import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import swal from "sweetalert";
import axios from "axios";
import OrderDetail from "./OrderDetail";
import { useNavigate } from "react-router-dom";

export default function DetailOrderList({
  data,
  handleClose,
  fetchItem,
  fetchData,
  action,
  ...props
}) {
  const accessRole = localStorage.getItem("auth-role");
  const username = localStorage.getItem("auth-name");
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [loadingStatusOrder, setLoadingStatusOrder] = useState(false);
  const [checkOngkir, setCheckOngkir] = useState(false);

  const handlePayment = async (id, ongkir) => {
    const formData = new FormData();
    formData.append("status", "settlement");
    formData.append("acceptBy", username);

    if (ongkir === 0) {
      formData.append("statusOrderan", 1);
    } else {
      formData.append("statusOrderan", 0);
    }
    setLoadingPayment(true);
    try {
      axios.post(`/api/order-status/${id}`, formData).then((res) => {
        if (res.data.status === 200) {
          swal({
            title: "Success!",
            text: res.data.message,
            icon: "success",
            button: false,
            timer: 1500,
          });
          fetchItem();
          if (action === "dashboard") {
            fetchData();
          }
          handleClose();
        } else if (res.data.status === 404) {
          fetchItem();
          swal({
            title: "Error!",
            text: res.data.message,
            icon: "error",
            button: false,
            timer: 1500,
          });
          setLoadingPayment(false);
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
  };

  const handlePaymentOnline = async (id) => {
    try {
      axios
        .post(`/api/paymentCheck/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.status === 200) {
            setLoadingPayment(true);
            <script type="text/javascript">
              var payButton = document.getElementById('pay-button');
              payButton.addEventListener('click', function (){" "}
              {
                // Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
                window.snap.pay(res.data.snapToken, {
                  onSuccess: function (result) {
                    console.log(checkOngkir, "123");
                    const formDataPayment = {
                      name: data.name,
                      phoneNum: data.phoneNum,
                      email: data.email,
                      address: data.address,
                      city: data.city,
                      state: data.state,
                      zip: data.zip,
                      ongkir: data.ongkir,
                      transaction_id: result.transaction_id,
                      order_id: result.order_id,
                      payment_mode: result.payment_type,
                      gross_amount: result.gross_amount,
                      paidBy: username,
                      status: result.transaction_status,
                      statusOrderan: 0,
                    };
                    try {
                      axios
                        .post(`/api/place-order/${id}`, formDataPayment, {
                          headers: {
                            "Content-Type": "multipart/form-data",
                          },
                        })
                        .then((resp) => {
                          if (resp.data.status === 200) {
                            swal({
                              title: "Order Placed Successfull!",
                              text: result.status_message,
                              icon: "success",
                              button: false,
                              timer: 1500,
                            });
                            fetchItem();
                            if (action === "dashboard") {
                              fetchData();
                            }
                            handleClose();
                          } else if (resp.data.status === 401) {
                            swal({
                              title: "Login for Checkout",
                              text: res.data.message,
                              icon: "error",
                              button: false,
                              timer: 1500,
                            });
                            localStorage.clear();
                            navigate("/login");
                            setTimeout(() => {
                              window.location.reload(false);
                            }, 2200);
                          } else if (resp.data.status === 422) {
                            swal({
                              title: "All fields are mandatory!",
                              text: "Please Fill All fields",
                              icon: "error",
                              button: false,
                              timer: 1500,
                            });
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
                      name: data.name,
                      phoneNum: data.phoneNum,
                      email: data.email,
                      address: data.address,
                      city: data.city,
                      state: data.state,
                      zip: data.zip,
                      ongkir: data.ongkir,
                      transaction_id: result.transaction_id,
                      order_id: result.order_id,
                      payment_mode: result.payment_type,
                      payment_code: result.payment_code,
                      gross_amount: result.gross_amount,
                      status: result.transaction_status,
                      statusOrderan: 0,
                    };
                    try {
                      axios
                        .post(`/api/place-order/${id}`, formDataPayment, {
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
                            fetchItem();
                            handleClose();
                          } else if (res.data.status === 401) {
                            swal({
                              title: "Login for Checkout",
                              text: res.data.message,
                              icon: "error",
                              button: false,
                              timer: 1500,
                            });
                            localStorage.clear();
                            navigate("/login");
                            setTimeout(() => {
                              window.location.reload(false);
                            }, 2200);
                          } else if (res.data.status === 422) {
                            swal({
                              title: "All fields are mandatory!",
                              text: "Please Fill All fields",
                              icon: "error",
                              button: false,
                              timer: 1500,
                            });
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
                    const formDataPayment = {
                      name: data.name,
                      phoneNum: data.phoneNum,
                      email: data.email,
                      address: data.address,
                      city: data.city,
                      state: data.state,
                      zip: data.zip,
                      ongkir: data.ongkir,
                      transaction_id: result.transaction_id,
                      order_id: result.order_id,
                      payment_mode: result.payment_type,
                      payment_code: result.payment_code,
                      gross_amount: result.gross_amount,
                      status: result.transaction_status,
                      statusOrderan: 0,
                    };
                    try {
                      axios
                        .post(`/api/place-order/${id}`, formDataPayment, {
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
                            fetchItem();
                            handleClose();
                          } else if (res.data.status === 401) {
                            swal({
                              title: "Login for Checkout",
                              text: res.data.message,
                              icon: "error",
                              button: false,
                              timer: 1500,
                            });
                            localStorage.clear();
                            navigate("/login");
                            setTimeout(() => {
                              window.location.reload(false);
                            }, 2200);
                          } else if (res.data.status === 422) {
                            swal({
                              title: "All fields are mandatory!",
                              text: "Please Fill All fields",
                              icon: "error",
                              button: false,
                              timer: 1500,
                            });
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
                    setLoading(false);
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
        });
    } catch (err) {
      alert(err.message);
    }
  };
  const handleCancelOrder = async (id) => {
    setLoadingCancel(true);
    const formDataPayment = {
      name: data.name,
      phoneNum: data.phoneNum,
      email: data.email,
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.zip,
      ongkir: data.ongkir,
      transaction_id: data.transaction_id,
      order_id: data.order_id,
      payment_mode: data.payment_mode,
      payment_code: data.payment_code,
      gross_amount: data.gross_amount,
      cancelBy: username,
      status: "Cancel",
    };
    try {
      axios
        .post(`/api/cancel-order/${id}`, formDataPayment, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.status === 200) {
            swal({
              title: "Batalkan Pemesanan",
              text: res.data.message,
              icon: "success",
              button: false,
              timer: 2500,
            });
            fetchItem();
            if (action === "dashboard") {
              fetchData();
            }
            handleClose();
          } else if (res.data.status === 401) {
            swal({
              title: "Login for Checkout",
              text: res.data.message,
              icon: "error",
              button: false,
              timer: 1500,
            });
            localStorage.clear();
            navigate("/login");
            setTimeout(() => {
              window.location.reload(false);
            }, 2200);
          } else if (res.data.status === 404) {
            swal({
              title: "Order ID Not Found!",
              text: res.data.message,
              icon: "error",
              button: false,
              timer: 1500,
            });
            setLoadingCancel(false);
          } else if (res.data.status === 403) {
            swal({
              title: res.data.message,
              text: res.data.message,
              icon: "error",
              button: false,
              timer: 1500,
            });
            setLoading(false);
            setLoadingCancel(false);
          }
        });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleFinishOrder = async (id) => {
    setLoadingCancel(true);
    const formDataOrder = new FormData();
    formDataOrder.append("finishBy", username);
    formDataOrder.append("statusOrderan", 1);
    try {
      axios
        .post(`/api/finish-order/${id}`, formDataOrder, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.status === 200) {
            swal({
              title: "Pemesanan Selesai",
              text: res.data.message,
              icon: "success",
              button: false,
              timer: 2500,
            });
            fetchItem();
            if (action === "process") {
              fetchData();
            }
            handleClose();
          } else if (res.data.status === 401) {
            swal({
              title: "Login for Checkout",
              text: res.data.message,
              icon: "error",
              button: false,
              timer: 1500,
            });
            localStorage.clear();
            navigate("/login");
            setTimeout(() => {
              window.location.reload(false);
            }, 2200);
          } else if (res.data.status === 404) {
            swal({
              title: "Order ID Not Found!",
              text: res.data.message,
              icon: "error",
              button: false,
              timer: 1500,
            });
            setLoadingCancel(false);
          } else if (res.data.status === 403) {
            swal({
              title: res.data.message,
              text: res.data.message,
              icon: "error",
              button: false,
              timer: 1500,
            });
            setLoading(false);
            setLoadingCancel(false);
          }
        });
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div>
      <Box
        sx={{
          "& .MuiTextField-root": {
            m: 1,
            width: "36ch",
          },
        }}
        component={"div"}
      >
        <div className="flex justify-center items-center">
          <div className="flex border-2 border-black w-11/12 ">
            <div className="my-6 mx-4 font-bold text-xs w-full">
              <div className="flex justify-between">
                <div>
                  <div className="mb-2">
                    Nama : <span className="uppercase">{data.name}</span>
                  </div>
                  <div className="mb-2">Email : {data.email}</div>
                  <div className="mb-2">No Telepon : {data.phoneNum}</div>
                </div>
                <div>
                  <div className="mb-2">Id Pesanan : {data.order_id}</div>
                  <div className="mb-2">
                    Id Transaksi: {data.transaction_id}
                  </div>
                  <div className="mb-2">Tanggal : {data.created_at}</div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <div>
                  <div>
                    {data.cancelBy && data.status === "Cancel" ? (
                      <div>Di Tolak Oleh : {data.cancelBy}</div>
                    ) : data.paidBy && data.status === "settlement" ? (
                      <div>Di Bayar Oleh : {data.paidBy}</div>
                    ) : data.acceptBy && data.status === "settlement" ? (
                      <div>Di Terima Oleh : {data.acceptBy}</div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    <div className="mt-6 text-sm">Transaction History : </div>
                  </div>
                </div>
                <div>
                  <div>Tipe Pembayaran : {data.payment_mode}</div>
                  <div className="text-right mt-4">
                    {data.status === "settlement" ? (
                      <div>
                        <button className="bg-green-500 text-white p-2 rounded-md">
                          Paid
                        </button>
                      </div>
                    ) : data.status === "pending" ? (
                      <div>
                        <button className="bg-yellow-500 text-white p-2 rounded-md">
                          Pending
                        </button>
                      </div>
                    ) : data.status === "error" ? (
                      <div>
                        <button className="bg-orange-500 text-white p-2 rounded-md">
                          Error
                        </button>
                      </div>
                    ) : data.status === "Cancel" ? (
                      <div>
                        <button className="bg-red-700 text-white p-2 rounded-md">
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div>
                        <button className="bg-red-500 text-white p-2 rounded-md">
                          Unpaid
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <OrderDetail data={data} />
              </div>

              <div className="mt-4">
                <div>Kota : {data.city}</div>
                <div>Negara : {data.state}</div>
                <div>Kode Pos : {data.zip}</div>
                <div>Address : {data.address}</div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          {data.status === "Unpaid" && accessRole === "ADMIN" ? (
            <Button
              variant="contained"
              style={{
                background: "#302C42",
                margin: "5px",
                marginTop: "20px",
                color: "white",
                border: "1px solid",
                borderRadius: "5px",
                ":hover": {
                  background: "#302C42",
                  opacity: 0.8,
                },
              }}
              disabled={loadingPayment}
              onClick={() => handlePayment(data.id, data.ongkir)}
            >
              {loadingPayment && (
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
              Pembayaran
            </Button>
          ) : data.status !== "Cancel" &&
            accessRole === "USER" &&
            data.payment_mode !== "COD" &&
            data.status !== "settlement" ? (
            <Button
              variant="contained"
              style={{
                background: "#302C42",
                margin: "5px",
                marginTop: "20px",
                color: "white",
                border: "1px solid",
                borderRadius: "5px",
                ":hover": {
                  background: "#302C42",
                  opacity: 0.8,
                },
              }}
              disabled={loadingPayment}
              onClick={() => handlePaymentOnline(data.id)}
            >
              {loadingPayment && (
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
              Pembayaran
            </Button>
          ) : (
            ""
          )}
          {data.status !== "settlement" &&
          data.status !== "Cancel" &&
          accessRole === "ADMIN" ? (
            <Button
              variant="contained"
              style={{
                background: "#302C42",
                margin: "5px",
                marginTop: "20px",
                color: "white",
                border: "1px solid",
                borderRadius: "5px",
                ":hover": {
                  background: "#302C42",
                  opacity: 0.8,
                },
              }}
              disabled={loadingCancel}
              onClick={() => handleCancelOrder(data.id)}
            >
              {loadingCancel && (
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
              Batalkan Pemesanan
            </Button>
          ) : data.status !== "settlement" &&
            data.status !== "Cancel" &&
            data.payment_mode !== "COD" &&
            accessRole === "USER" ? (
            <Button
              variant="contained"
              style={{
                background: "#302C42",
                margin: "5px",
                marginTop: "20px",
                color: "white",
                border: "1px solid",
                borderRadius: "5px",
                ":hover": {
                  background: "#302C42",
                  opacity: 0.8,
                },
              }}
              disabled={loadingCancel}
              onClick={() => handleCancelOrder(data.id)}
            >
              {loadingCancel && (
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
              Batalkan Pemesanan
            </Button>
          ) : (
            ""
          )}
          {data.status === "settlement" &&
          data.statusOrderan === 0 &&
          accessRole === "ADMIN" ? (
            <Button
              variant="contained"
              style={{
                background: "#302C42",
                margin: "5px",
                marginTop: "20px",
                color: "white",
                border: "1px solid",
                borderRadius: "5px",
                ":hover": {
                  background: "#302C42",
                  opacity: 0.8,
                },
              }}
              disabled={loadingStatusOrder}
              onClick={() => handleFinishOrder(data.id)}
            >
              {loadingStatusOrder && (
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
              Transaksi Selesai
            </Button>
          ) : (
            ""
          )}
          <Button
            style={{
              margin: "5px",
              marginTop: "20px",
              color: "black",
              border: "1px solid",
              borderRadius: "5px",
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </Box>
    </div>
  );
}
