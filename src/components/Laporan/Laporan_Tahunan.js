import {
  Button,
  ButtonGroup,
  CircularProgress,
  Fade,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import "../../App.css";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import swal from "sweetalert";
import DetailOrderList from "../Modal/DetailOrderList";
import { numberWithCommas } from "../../utils/comma";
import jsPDF from "jspdf";
const Laporan_Tahunan = () => {
  const columns = [
    {
      id: "no",
      label: "No",
      minWidth: 170,
      align: "center",
    },
    {
      id: "order",
      label: "Order Id",
      minWidth: 170,
      align: "center",
    },
    {
      id: "Transaction",
      label: "Transaction Id",
      minWidth: 170,
      align: "center",
    },
    {
      id: "name",
      label: "Name",
      minWidth: 200,
      align: "center",
    },
    {
      id: "email",
      label: "Email",
      minWidth: 150,
      align: "center",
    },
    {
      id: "phoneNum",
      label: "Phone Number",
      minWidth: 150,
      align: "center",
    },
    {
      id: "status",
      label: "Status Pembayaran",
      minWidth: 170,
      align: "center",
    },
    {
      id: "statusOrder",
      label: "Status Orderan",
      minWidth: 170,
      align: "center",
    },
  ];

  const id = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [listOrder, setListOrder] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [totalOrderAll, setTotalOrderAll] = useState("");
  const [totalMoneyPurchasingAll, setTotalMoneyPurchasingAll] = useState("");
  const [totalPurchaseAll, setTotalPurchaseAll] = useState("");
  const [totalUnpaidAll, setTotalUnpaidAll] = useState("");
  const [totalCancelAll, setTotalCancelAll] = useState("");
  const [totalProcessAll, setTotalProcessAll] = useState("");
  const [totalDoneAll, setTotalDoneAll] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchItem = () => {
    try {
      axios.get(`/api/laporan-tahunan/${id.year}`).then((resp) => {
        if (resp.data.status === 200) {
          setListOrder(resp.data.laporanTahunan);
          setTotalOrderAll(resp.data.totalOrderAll);
          setTotalMoneyPurchasingAll(resp.data.totalMoneyPurchasingAll);
          setTotalPurchaseAll(resp.data.totalPurchaseAll);
          setTotalUnpaidAll(resp.data.totalUnpaidAll);
          setTotalCancelAll(resp.data.totalCancelAll);
          setTotalProcessAll(resp.data.totalProcessAll);
          setTotalDoneAll(resp.data.totalDoneAll);
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
  const generatePDF = () => {
    setRowsPerPage(listOrder.length);
    let doc = new jsPDF({
      orientation: "p",
      unit: "pt",
      format: "a1",
      putOnlyUsedFonts: true,
    });
    doc.html(document.querySelector("#pdf"), {
      callback: function (pdf) {
        pdf.save("Laporan_Tahunan.pdf");
      },
    });
  };

  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <>
      <div className="text-right m-4">
        <Button
          style={{
            margin: "5px",
            color: "black",
            border: "1px solid",
            borderRadius: "5px",
          }}
          onClick={generatePDF}
        >
          Generate PDF
        </Button>
      </div>
      <div id="pdf">
        <div className="font-normal text-xs leading-10">
          <h1 className="font-bold text-3xl mb-10 text-center">
            Laporan Penjualan Tahun {id.year}
          </h1>
          <div class="laporan flex flex-col md:flex-row justify-center items-center font-semibold ml-10 mb-8 text-sm">
            <div class="laporan_transaksi w-full">
              <div>Total Transaksi : {totalOrderAll}</div>
            </div>
            <div class="laporan_transaksi w-full">
              <div>Total Transaksi yang Sudah DiBayar : {totalPurchaseAll}</div>
              <div>Total Transaksi yang Belum DiBayar : {totalUnpaidAll}</div>
              <div>Total Transaksi yang Dibatalkan : {totalCancelAll}</div>
            </div>
            <div class="laporan_transaksi w-full">
              <div>
                Total Transaksi yang Sudah Diselesaikan : {totalDoneAll}
              </div>
              <div>Total Transaksi yang Masih Diproses : {totalProcessAll}</div>
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="tableLoad">
            <Box sx={{ display: "flex" }}>
              <div className="loading font-normal">
                <CircularProgress />
                <div>Loading Laporan</div>
              </div>
            </Box>
          </div>
        ) : (
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ minHeight: 440 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listOrder &&
                    listOrder
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((userData, i) => (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={userData.id}
                        >
                          <TableCell align="center">{i + 1}</TableCell>
                          <TableCell align="center">
                            {userData.order_id}
                          </TableCell>
                          <TableCell align="center">
                            {userData.transaction_id}
                          </TableCell>
                          <TableCell align="center">{userData.name}</TableCell>
                          <TableCell align="center">{userData.email}</TableCell>
                          <TableCell align="center">
                            {userData.phoneNum}
                          </TableCell>
                          <TableCell align="center">
                            {userData.status === "settlement" ? (
                              <div className="text-green-500 font-extrabold">
                                Paid
                              </div>
                            ) : userData.status === "pending" ? (
                              <div className="text-yellow-500 font-extrabold">
                                Pending
                              </div>
                            ) : userData.status === "error" ? (
                              <div className="text-orange-500 font-extrabold">
                                Error
                              </div>
                            ) : userData.status === "Cancel" ? (
                              <div className="text-red-900 font-extrabold">
                                Cancel
                              </div>
                            ) : (
                              <div className="text-red-500 font-extrabold">
                                Unpaid
                              </div>
                            )}
                          </TableCell>
                          <TableCell align="center">
                            {userData.statusOrderan === 1 ? (
                              <div className="text-green-500 font-extrabold">
                                Done
                              </div>
                            ) : (
                              <div className="text-red-500 font-extrabold">
                                Processed
                              </div>
                            )}
                          </TableCell>
                          <TableCell align="center">
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                "& > *": {
                                  m: 1,
                                },
                              }}
                            ></Box>
                          </TableCell>
                        </TableRow>
                      ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={listOrder.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        )}
        <div class="keuntungan m-10 font-semibold flex flex-row">
          <div>Penghasilan Tahun Ini : </div>
          <div className="ml-4 font-extrabold">
            Rp. {numberWithCommas(totalMoneyPurchasingAll)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Laporan_Tahunan;
