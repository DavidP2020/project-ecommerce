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
import UnpaidOrder from "../components/Modal/UnpaidOrder";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import ProcessOrder from "../components/Modal/ProcessOrder";
import Analyst1 from "../components/Dashboard/Analyst1";
import Analyst2 from "../components/Dashboard/Analyst2";
import Analyst3 from "../components/Dashboard/Analyst3";
import Analyst4 from "../components/Dashboard/Analyst4";
import Analyst5 from "../components/Dashboard/Analyst5";
import Analyst6 from "../components/Dashboard/Analyst6";

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

  const [totalCancel, setTotalCancel] = useState("");
  const [totalCancelAll, setTotalCancelAll] = useState("");

  const [totalProcess, setTotalProcess] = useState("");
  const [totalProcessAll, setTotalProcessAll] = useState("");

  const [totalDone, setTotalDone] = useState("");
  const [totalDoneAll, setTotalDoneAll] = useState("");

  const [analyst1Label, setAnalyst1Label] = useState([]);
  const [analyst1Total, setAnalyst1Total] = useState([]);
  const [analyst1Count, setAnalyst1Count] = useState([]);

  const [analyst3Label, setAnalyst3Label] = useState([]);
  const [analyst3Total, setAnalyst3Total] = useState([]);
  const [analyst3Count, setAnalyst3Count] = useState([]);

  const [analyst4Label, setAnalyst4Label] = useState([]);
  const [analyst4Total, setAnalyst4Total] = useState([]);
  const [analyst4Count, setAnalyst4Count] = useState([]);

  const [analyst5, setAnalyst5] = useState([]);
  const [analyst6, setAnalyst6] = useState([]);

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

            setTotalCancel(resp.data.totalCancel);
            setTotalCancelAll(resp.data.totalCancelAll);

            setTotalProcess(resp.data.totalProcess);
            setTotalProcessAll(resp.data.totalProcessAll);

            setTotalDone(resp.data.totalDone);
            setTotalDoneAll(resp.data.totalDoneAll);

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

  const fetchDashboard = () => {
    try {
      axios
        .get(`/api/dashboard-analyst`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((resp) => {
          if (resp.data.status === 200) {
            setAnalyst1Label(resp.data.labels);
            setAnalyst1Total(resp.data.dataset[0].total);
            setAnalyst1Count(resp.data.dataset[1].count);
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

  const fetchDashboardCancel = () => {
    try {
      axios
        .get(`/api/dashboard-analyst-cancel`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((resp) => {
          if (resp.data.status === 200) {
            setAnalyst4Label(resp.data.labels);
            setAnalyst4Total(resp.data.dataset[0].total);
            setAnalyst4Count(resp.data.dataset[1].count);
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

  const fetchDashboardDone = () => {
    try {
      axios
        .get(`/api/dashboard-analyst-done`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((resp) => {
          if (resp.data.status === 200) {
            setAnalyst3Label(resp.data.labels);
            setAnalyst3Total(resp.data.dataset[0].total);
            setAnalyst3Count(resp.data.dataset[1].count);
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

  const fetchDashboardStatus = () => {
    try {
      axios
        .get(`/api/dashboard-analyst-status`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((resp) => {
          if (resp.data.status === 200) {
            setAnalyst5(resp.data.datas);
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

  const fetchDashboardStatusOrderan = () => {
    try {
      axios
        .get(`/api/dashboard-analyst-statusOrderan`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((resp) => {
          if (resp.data.status === 200) {
            setAnalyst6(resp.data.dataOrder);
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
    fetchDashboard();
    fetchDashboardCancel();
    fetchDashboardDone();
    fetchDashboardStatus();
    fetchDashboardStatusOrderan();
    document.title = "Dashboard";
  }, []);
  return (
    <div className="p-7 pt-4 text-2xl font-semibold flex-1 h-full">
      <h1>Analisis Dashbor</h1>
      {/* <>
        <Countdown seconds={10} />
      </> */}
      <div className="flex flex-row">
        <div className="flex flex-col">
          <div className="card-dashboard w-full flex flex-col py-6 text-center">
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
          <div className="card-dashboard">
            <div className="flex flex-col p-2">
              <div className="mt-2">
                <i className="fas fa-solid fa-money-bill-1-wave text-xl mb-1 p-4 w-fit bg-slate-200 rounded-lg"></i>
              </div>
              <div className="w-full text-sm font-normal">
                {user.role === "ADMIN" ? (
                  <> Penghasilan Bulan Ini </>
                ) : (
                  <> Pengeluaran Bulan Ini </>
                )}

                {isLoading ? (
                  <div>{loading}</div>
                ) : (
                  <div className="w-full font-bold text-xl">
                    {user.role === "ADMIN" ? (
                      <>Rp. {numberWithCommas(totalMoneyPurchasingAll)}</>
                    ) : (
                      <>Rp. {numberWithCommas(totalMoneyPurchasing)}</>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
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
                  <div className="text-xl mb-1 p-4 w-fit bg-slate-200 rounded-lg">
                    <RemoveShoppingCartIcon />
                  </div>
                </div>
                <div className="w-full text-sm font-normal">
                  Total Transaksi yang di Batalkan
                  {isLoading ? (
                    <div>{loading}</div>
                  ) : (
                    <div className="w-full font-bold text-xl">
                      {totalCancelAll}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="card-dashboard">
              <div className="flex flex-col p-2">
                <div className="mt-2">
                  <div className="text-xl mb-1 p-4 w-fit bg-slate-200 rounded-lg">
                    <EventAvailableIcon />
                  </div>
                </div>
                <div className="w-full text-sm font-normal">
                  Total Transaksi yang Sudah Selesai
                  {isLoading ? (
                    <div>{loading}</div>
                  ) : (
                    <div className="w-full font-bold text-xl">
                      {totalDoneAll}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="card-dashboard">
              <div className="flex flex-col p-2">
                <div className="mt-2">
                  <div className="text-xl mb-1 p-4 w-fit bg-slate-200 rounded-lg">
                    <EventRepeatIcon />
                  </div>
                </div>
                <div className="w-full text-sm font-normal">
                  Total Transaksi yang sedang Di Proses
                  {isLoading ? (
                    <div>{loading}</div>
                  ) : (
                    <div className="w-full font-bold text-xl">
                      {totalProcessAll}
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
                  <div className="text-xl mb-1 p-4 w-fit bg-slate-200 rounded-lg">
                    <RemoveShoppingCartIcon />
                  </div>
                </div>
                <div className="w-full text-sm font-normal">
                  Total Transaksi yang di Batalkan
                  {isLoading ? (
                    <div>{loading}</div>
                  ) : (
                    <div className="w-full font-bold text-xl">
                      {totalCancel}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="card-dashboard">
              <div className="flex flex-col p-2">
                <div className="mt-2">
                  <div className="text-xl mb-1 p-4 w-fit bg-slate-200 rounded-lg">
                    <EventAvailableIcon />
                  </div>
                </div>
                <div className="w-full text-sm font-normal">
                  Total Transaksi yang Sudah Selesai
                  {isLoading ? (
                    <div>{loading}</div>
                  ) : (
                    <div className="w-full font-bold text-xl">{totalDone}</div>
                  )}
                </div>
              </div>
            </div>
            <div className="card-dashboard">
              <div className="flex flex-col p-2">
                <div className="mt-2">
                  <div className="text-xl mb-1 p-4 w-fit bg-slate-200 rounded-lg">
                    <EventRepeatIcon />
                  </div>
                </div>
                <div className="w-full text-sm font-normal">
                  Total Transaksi yang sedang Di Proses
                  {isLoading ? (
                    <div>{loading}</div>
                  ) : (
                    <div className="w-full font-bold text-xl">
                      {totalProcess}
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
      <div className="flex xl:flex-row lg:flex-col md:flex-col sm:flex-col justify-center items-center mt-16 mb-8">
        <div className="w-full lg:w-1/2 ml-4 mt-8 h-full">
          <h1>Total Orderan Dalam Setahun</h1>
          <Analyst1 labelData={analyst1Label} count={analyst1Count} />
        </div>
        <div className="w-full lg:w-1/2 ml-4 mt-8 h-full">
          <h1>Total Penghasilan Dalam Setahun</h1>
          <Analyst2 labelData={analyst1Label} total={analyst1Total} />
        </div>
      </div>

      <div className="flex xl:flex-row lg:flex-col md:flex-col sm:flex-col justify-center items-center mt-16 mb-8">
        <div className="w-full lg:w-1/2 ml-4 mt-8 h-full">
          <h1>Total Orderan diselesaikan Dalam Setahun</h1>
          <Analyst3 labelData={analyst3Label} count={analyst3Count} />
        </div>
        <div className="w-full lg:w-1/2 ml-4 mt-8 h-full">
          <h1>Total Orderan Dicancel Dalam Setahun</h1>
          <Analyst4 labelData={analyst4Label} count={analyst4Count} />
        </div>
      </div>

      <div className="flex xl:flex-row lg:flex-col md:flex-col sm:flex-col justify-center items-center mt-16 mb-8">
        <div className="w-full lg:w-1/2 ml-4 mt-8">
          <h1>Status Pemesanan Dalam Setahun</h1>
          <Analyst5 data={analyst5} />
        </div>
        <div className="w-full lg:w-1/2 ml-4 mt-8">
          <h1>Status Orderan Pemesanan Dalam Setahun</h1>
          <Analyst6 data={analyst6} />
        </div>
      </div>

      <div className="flex xl:flex-row lg:flex-col md:flex-col sm:flex-col justify-center items-center mt-16 mb-8">
        <div className="xl:w-1/2 lg:w-full md::w-full sm:w-full ">
          <UnpaidOrder fetchData={fetchItem} action={"dashboard"} />
        </div>
        <div className="xl:w-1/2 lg:w-full md::w-full sm:w-full ml-4">
          <ProcessOrder fetchData={fetchItem} action={"process"} />
        </div>
      </div>
    </div>
  );
}
