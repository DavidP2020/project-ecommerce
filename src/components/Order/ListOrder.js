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
import { Link, useNavigate } from "react-router-dom";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import swal from "sweetalert";
import DetailOrderList from "../Modal/DetailOrderList";
const ListOrder = () => {
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
      label: "phoneNum",
      minWidth: 150,
      align: "center",
    },
    {
      id: "status",
      label: "Status",
      minWidth: 170,
      align: "center",
    },
    {
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "center",
    },
  ];
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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [listOrder, setListOrder] = useState([]);
  const [value, setValue] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const [searched, setSearched] = useState();
  const userId = localStorage.getItem("auth-id");
  const navigate = useNavigate();

  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };
  //function untuk tutup  pop up
  const handleClose = () => setOpen(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const fetchItem = () => {
    try {
      axios.get(`/api/admin-order/${userId}`).then((resp) => {
        if (resp.data.status === 200) {
          setListOrder(resp.data.order);
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

  const filterData = (e) => {
    if (e.target.value !== "") {
      setValue(e.target.value);
      const filteredRows = listOrder.filter((rowsPerPage) => {
        return rowsPerPage.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setSearched(filteredRows);
    } else {
      setValue(e.target.value);
      setListOrder([...listOrder]);
    }
  };
  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <div>
      <div className="font-normal text-xs leading-10">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        {" > "} <span className="capitalize"> Order</span>
      </div>
      <h2 className="font-bold text-2xl m-6">List Order</h2>

      {isLoading ? (
        <div className="tableLoad">
          <Box sx={{ display: "flex" }}>
            <div className="loading font-normal">
              <CircularProgress />
              <div>Loading Order</div>
            </div>
          </Box>
        </div>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TextField
            label="Search"
            variant="outlined"
            type="text"
            placeholder="Search Name...."
            value={value}
            style={{ margin: "3rem 2rem 2rem 1rem", width: "50%" }}
            onChange={(e) => filterData(e)}
          />

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
                {value.length > 0
                  ? searched
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
                              <div>
                                <button className="bg-green-500 text-white p-2 rounded-md">
                                  Paid
                                </button>
                              </div>
                            ) : userData.status === "pending" ? (
                              <div>
                                <button className="bg-yellow-500 text-white p-2 rounded-md">
                                  Pending
                                </button>
                              </div>
                            ) : userData.status === "error" ? (
                              <div>
                                <button className="bg-orange-500 text-white p-2 rounded-md">
                                  Error
                                </button>
                              </div>
                            ) : userData.status === "Cancel" ? (
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
                          </TableCell>{" "}
                          <TableCell align="center">
                            <Box
                              component={"div"}
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                "& > *": {
                                  m: 1,
                                },
                              }}
                            >
                              <ButtonGroup
                                variant="text"
                                aria-label="text button group"
                              >
                                <Stack spacing={1} direction="row">
                                  <button
                                    variant="contained"
                                    className="bg-primary px-6 py-2 text-white rounded-sm"
                                    onClick={() => handleOpen(userData)}
                                  >
                                    <WysiwygIcon />
                                  </button>
                                </Stack>
                              </ButtonGroup>
                            </Box>
                            <Modal
                              aria-labelledby="transition-modal-title"
                              aria-describedby="transition-modal-description"
                              open={open}
                              onClose={handleClose}
                              closeAfterTransition
                              className="overflow-scroll h-11/12"
                            >
                              <Fade in={open}>
                                <Box
                                  sx={style}
                                  style={{ background: "white" }}
                                  component={"div"}
                                >
                                  <Toolbar style={{ marginLeft: "-1rem" }}>
                                    <Typography
                                      component="div"
                                      sx={{ flexGrow: 2 }}
                                    >
                                      <b className="text-xl">Detail Order</b>
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
                                        <div className="mb-6 whitespace-pre-line">
                                          {userData.email}
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                          <Button
                                            style={{
                                              margin: "5px",
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
                                  </Typography>
                                </Box>
                              </Fade>
                            </Modal>
                          </TableCell>
                        </TableRow>
                      ))
                  : listOrder &&
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
                              <div>
                                <button className="bg-green-500 text-white p-2 rounded-md">
                                  Paid
                                </button>
                              </div>
                            ) : userData.status === "pending" ? (
                              <div>
                                <button className="bg-yellow-500 text-white p-2 rounded-md">
                                  Pending
                                </button>
                              </div>
                            ) : userData.status === "error" ? (
                              <div>
                                <button className="bg-orange-500 text-white p-2 rounded-md">
                                  Error
                                </button>
                              </div>
                            ) : userData.status === "Cancel" ? (
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
                            >
                              <ButtonGroup
                                variant="text"
                                aria-label="text button group"
                              >
                                <Stack spacing={1} direction="row">
                                  <button
                                    variant="contained"
                                    className="bg-primary px-6 py-2 text-white rounded-sm"
                                    onClick={() => handleOpen(userData)}
                                  >
                                    <WysiwygIcon />
                                  </button>
                                </Stack>
                              </ButtonGroup>
                            </Box>{" "}
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
                <b className="text-xl">Detail Order</b>
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
              <DetailOrderList
                data={id}
                handleClose={handleClose}
                fetchItem={fetchItem}
              />
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ListOrder;
