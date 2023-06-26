import React, { useEffect, useState } from "react";
import "../App.css";
import { numberWithCommas } from "../utils/comma";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Fade,
  Modal,
  Toolbar,
  Button,
  Typography,
} from "@mui/material";
import VerifyAccount from "../components/Modal/VerifyAccount";
import Countdown from "../components/Modal/Countdown";

export default function Dashboard() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const accessToken = localStorage.getItem("auth-token");
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState([]);

  const [totalProduct, setTotalProduct] = useState("");
  const [totalCategory, setTotalCategory] = useState("");
  const [totalUser, setTotalUser] = useState("");

  const [totalOrder, setTotalOrder] = useState("");
  const [totalOrderAll, setTotalOrderAll] = useState("");

  const [totalPurchase, setTotalPurchase] = useState("");
  const [totalMoneyPurchasing, setTotalMoneyPurchasing] = useState("");
  const [totalMoneyPurchasingAll, setTotalMoneyPurchasingAll] = useState("");
  const [totalPurchaseAll, setTotalPurchaseAll] = useState("");

  const [totalUnpaid, setTotalUnpaid] = useState("");
  const [totalMoneyUnpaid, setTotalMoneyUnpaid] = useState("");
  const [totalUnpaidAll, setTotalUnpaidAll] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const fetchItem = () => {
    try {
      axios
        .get(`/api/dashboard`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((resp) => {
          if (resp.data.status === 200) {
            setTotalOrder(resp.data.totalOrder);
            setTotalOrderAll(resp.data.totalOrderAll);

            setTotalPurchase(resp.data.totalPurchase);
            setTotalMoneyPurchasing(resp.data.totalMoneyPurchasing);
            setTotalMoneyPurchasingAll(resp.data.totalMoneyPurchasingAll);
            setTotalPurchaseAll(resp.data.totalPurchaseAll);

            setTotalUnpaid(resp.data.totalUnpaid);
            setTotalMoneyUnpaid(resp.data.totalMoneyUnpaid);
            setTotalUnpaidAll(resp.data.totalUnpaidAll);

            setTotalProduct(resp.data.totalProduct);
            setTotalCategory(resp.data.totalCategory);
            setTotalUser(resp.data.totalUser);
            setUser(resp.data.user);
          } else if (resp.data.status === 401) {
            swal({
              title: "Error!",
              text: resp.data.message,
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
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const loading = (
    <>
      <CircularProgress />
    </>
  );
  useEffect(() => {
    fetchItem();
    document.title = "Dashboard";
  }, []);
  return (
    <div className="p-7 pt-4 text-2xl font-semibold flex-1 h-full">
      <h1>Analisis Dashbor</h1>
      <>
        {" "}
        <Countdown seconds={10} />
      </>
      <div className="flex flex-row">
        <div className="card-dashboard flex flex-col h-full w-full py-6 text-center">
          {isLoading ? (
            <div>{loading}</div>
          ) : (
            <>
              <div>
                <i className="flex justify-center items-center fas fa-solid fa-user text-8xl bg-gray-200 p-8"></i>
              </div>
              <div className="text-2xl mt-2 uppercase font-bold">
                {user.name}
              </div>
              <div className="text-xs">{user.email}</div>
              <div className="text-xs bg-slate-200 px-2 py-1 rounded-lg">
                {user.role}
              </div>
              <div>
                {user.is_verified === 0 ? (
                  <div className="text-xs my-1">
                    <Button
                      style={{
                        margin: "5px",
                        color: "black",
                        border: "1px solid",
                        borderRadius: "5px",
                      }}
                      onClick={handleOpen}
                    >
                      Verifikasi Akun!
                    </Button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </>
          )}
        </div>
        {user.role === "ADMIN" ? (
          <div className="flex flex-row flex-wrap justify-start items-center w-3/4 h-fit">
            <div className="card-dashboard">
              <div className="flex flex-col p-2">
                <div className="mt-2">
                  <i className="fas fa-solid fa-truck-fast text-xl mb-1 p-4 w-fit bg-slate-200 rounded-lg"></i>
                </div>
                <div className="w-full text-sm font-normal">
                  Total Transaksi
                  {isLoading ? (
                    <div>{loading}</div>
                  ) : (
                    <div className="w-full font-bold text-xl">
                      {totalOrderAll}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="card-dashboard">
              <div className="flex flex-col p-2">
                <div className="mt-2">
                  <i className="fas fa-solid fa-money-check-dollar text-xl mb-1 p-4 w-fit bg-slate-200 rounded-lg"></i>
                </div>
                <div className="w-full text-sm font-normal">
                  Total Transaksi yang sudah di Bayar
                  {isLoading ? (
                    <div>{loading}</div>
                  ) : (
                    <div className="w-full font-bold text-xl">
                      {totalPurchaseAll}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="card-dashboard">
              <div className="flex flex-col p-2">
                <div className="mt-2">
                  <i className="fas fa-solid fa-cash-register text-xl mb-1 p-4 w-fit bg-slate-200 rounded-lg"></i>
                </div>
                <div className="w-full text-sm font-normal">
                  Total Transaksi yang belum di Bayar
                  {isLoading ? (
                    <div>{loading}</div>
                  ) : (
                    <div className="w-full font-bold text-xl">
                      {totalUnpaidAll}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="card-dashboard">
              <div className="flex flex-col p-2">
                <div className="mt-2">
                  <i className="fas fa-regular fa-boxes-stacked text-xl mb-1 p-4 w-fit bg-slate-200 rounded-lg"></i>
                </div>
                <div className="w-full text-sm font-normal">
                  Total Product
                  {isLoading ? (
                    <div>{loading}</div>
                  ) : (
                    <div className="w-full font-bold text-xl">
                      {totalProduct}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="card-dashboard">
              <div className="flex flex-col p-2">
                <div className="mt-2">
                  <i className="fas fa-solid fa-cubes-stacked text-xl mb-1 p-4 w-fit bg-slate-200 rounded-lg"></i>
                </div>
                <div className="w-full text-sm font-normal">
                  Total Category
                  {isLoading ? (
                    <div>{loading}</div>
                  ) : (
                    <div className="w-full font-bold text-xl">
                      {totalCategory}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="card-dashboard">
              <div className="flex flex-col p-2">
                <div className="mt-2">
                  <i className="fas fa-solid fa-users text-xl mb-1 p-4 w-fit bg-slate-200 rounded-lg"></i>
                </div>
                <div className="w-full text-sm font-normal">
                  Total User
                  {isLoading ? (
                    <div>{loading}</div>
                  ) : (
                    <div className="w-full font-bold text-xl">{totalUser}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="card-dashboard">
              <div className="flex flex-col p-2">
                <div className="mt-2">
                  <i className="fas fa-solid fa-money-bill-1-wave text-xl mb-1 p-4 w-fit bg-slate-200 rounded-lg"></i>
                </div>
                <div className="w-full text-sm font-normal">
                  Penghasilan Bulan Ini
                  {isLoading ? (
                    <div>{loading}</div>
                  ) : (
                    <div className="w-full font-bold text-xl">
                      Rp. {numberWithCommas(totalMoneyPurchasingAll)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-row flex-wrap justify-start items-center w-3/4 h-fit">
            <div className="card-dashboard">
              <div className="flex flex-col p-2">
                <div className="mt-2">
                  <i className="fas fa-solid fa-truck-fast text-xl mb-1 p-4 w-fit bg-slate-200 rounded-lg"></i>
                </div>
                <div className="w-full text-sm font-normal">
                  Total Transaksi
                  {isLoading ? (
                    <div>{loading}</div>
                  ) : (
                    <div className="w-full font-bold text-xl">{totalOrder}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="card-dashboard">
              <div className="flex flex-col p-2">
                <div className="mt-2">
                  <i className="fas fa-solid fa-money-check-dollar text-xl mb-1 p-4 w-fit bg-slate-200 rounded-lg"></i>
                </div>
                <div className="w-full text-sm font-normal">
                  Total Transaksi yang sudah di Bayar
                  {isLoading ? (
                    <div>{loading}</div>
                  ) : (
                    <div className="w-full font-bold text-xl">
                      {totalPurchase}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="card-dashboard">
              <div className="flex flex-col p-2">
                <div className="mt-2">
                  <i className="fas fa-solid fa-cash-register text-xl mb-1 p-4 w-fit bg-slate-200 rounded-lg"></i>
                </div>
                <div className="w-full text-sm font-normal">
                  Total Transaksi yang belum di Bayar
                  {isLoading ? (
                    <div>{loading}</div>
                  ) : (
                    <div className="w-full font-bold text-xl">
                      {totalUnpaid}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="card-dashboard">
              <div className="flex flex-col p-2">
                <div className="mt-2">
                  <i className="fas fa-solid fa-money-bill-1-wave text-xl mb-1 p-4 w-fit bg-slate-200 rounded-lg"></i>
                </div>
                <div className="w-full text-sm font-normal">
                  Pengeluaran Bulan Ini
                  {isLoading ? (
                    <div>{loading}</div>
                  ) : (
                    <div className="w-full font-bold text-xl">
                      Rp. {numberWithCommas(totalMoneyPurchasing)}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="card-dashboard">
              <div className="flex flex-col p-2">
                <div className="mt-2">
                  <i className="fas fa-regular fa-hand-holding-dollar text-xl mb-1 p-4 w-fit bg-slate-200 rounded-lg"></i>
                </div>
                <div className="w-full text-sm font-normal">
                  Transaksi yang belum di Bayar
                  {isLoading ? (
                    <div>{loading}</div>
                  ) : (
                    <div className="w-full font-bold text-xl">
                      Rp. {numberWithCommas(totalMoneyUnpaid)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
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
                <b className="text-xl">Verifikasi Akun</b>
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
            >
              <VerifyAccount
                data={user.email}
                handleClose={handleClose}
                fetchItem={fetchItem}
              />
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
