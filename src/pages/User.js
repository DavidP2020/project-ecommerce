import {
  CircularProgress,
  Fade,
  Modal,
  Paper,
  Popover,
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

import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Profile from "../components/Home/Profile/Profile";
import Status from "../components/Modal/Status";
import ResetPasswword from "../components/Modal/ResetPassword";
import Detail from "../components/Modal/Detail";

const User = () => {
  const columns = [
    {
      id: "no",
      label: "No",
      minWidth: 170,
      align: "center",
    },
    {
      id: "id",
      label: "ID",
      minWidth: 170,
      align: "center",
    },
    {
      id: "name",
      label: "Name",
      minWidth: 100,
      align: "center",
    },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
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
    width: 400,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [listUser, setlistUser] = useState([]);
  const [id, setId] = useState();
  const [openPassword, setOpenPassword] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const [searched, setSearched] = useState();
  const [value, setValue] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [openDesc, setOpenDesc] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const openPop = Boolean(anchorEl);
  const idPop = openPop ? "simple-popover" : undefined;

  const handleClickPop = (event, id) => {
    event.preventDefault();
    setId(id);
    setAnchorEl(event.currentTarget);
  };
  const handleClosePop = () => {
    setAnchorEl(null);
  };
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenStatus = () => {
    setOpenStatus(true);
  };

  const handleCloseStatus = () => setOpenStatus(false);

  const handleOpenPassword = () => {
    setOpenPassword(true);
  };

  const handleClosePassword = () => setOpenPassword(false);

  const handleOpenDesc = () => {
    setOpenDesc(true);
  };

  const handleCloseDesc = () => setOpenDesc(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const fetchItem = () => {
    try {
      axios.get("/api/users").then((resp) => {
        if (resp.data.status === 200) {
          setlistUser(resp.data.category);
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
      const filteredRows = listUser.filter((rowsPerPage) => {
        return rowsPerPage.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setSearched(filteredRows);
    } else {
      setValue(e.target.value);
      setlistUser([...listUser]);
    }
  };
  useEffect(() => {
    fetchItem();
    document.title = "User";
  }, []);
  return (
    <div className="p-7 text-2xl font-semibold flex-1 w-screen overflow-scroll">
      <div className="font-normal text-xs leading-10">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        {" > "} <span className="capitalize"> Manage User</span>
      </div>
      <h2 className="font-bold text-2xl m-6">Manage User</h2>
      {isLoading ? (
        <div className="tableLoad">
          <Box sx={{ display: "flex" }}>
            <div className="loading font-normal">
              <CircularProgress />
              <div>Loading User Data</div>
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
                          <TableCell align="center">{userData.id}</TableCell>
                          <TableCell align="center">{userData.name}</TableCell>
                          <TableCell align="center">{userData.email}</TableCell>
                          <TableCell align="center">
                            {userData.status === 1 ? (
                              <div>
                                <button className="bg-green-500 text-white p-2 rounded-md">
                                  Active
                                </button>
                              </div>
                            ) : (
                              <div>
                                <button className="bg-red-500 text-white p-2 rounded-md">
                                  In Active
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
                              <button
                                className="btnElipsis"
                                onClick={(e) => handleClickPop(e, userData)}
                              >
                                <i
                                  className="icon-elip fa fa-ellipsis-h"
                                  aria-hidden="true"
                                ></i>
                              </button>
                              <Popover
                                id={idPop}
                                open={openPop}
                                className="-ml-4"
                                anchorEl={anchorEl}
                                onClose={handleClosePop}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "right",
                                }}
                              >
                                <Typography
                                  className="w-full"
                                  component={"div"}
                                >
                                  <div className="popOver">
                                    <button
                                      variant="contained"
                                      className="px-6 py-2 rounded-sm"
                                      onClick={handleOpenEdit}
                                    >
                                      Sunting
                                    </button>
                                  </div>
                                  <div className="popOver">
                                    <button
                                      variant="contained"
                                      className="px-6 py-2 rounded-sm"
                                      onClick={handleOpenStatus}
                                    >
                                      Pengaturan Status
                                    </button>
                                  </div>
                                  <div className="popOver">
                                    <button
                                      variant="contained"
                                      className="px-6 py-2 rounded-sm"
                                      onClick={handleOpenPassword}
                                    >
                                      Pengaturan Ulang Password
                                    </button>
                                  </div>
                                  <div className="popOver">
                                    <button
                                      variant="contained"
                                      className="px-6 py-2 rounded-sm"
                                      onClick={handleOpenDesc}
                                    >
                                      Detil Akun
                                    </button>
                                  </div>
                                </Typography>
                              </Popover>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                  : listUser
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
                          <TableCell align="center">{userData.id}</TableCell>
                          <TableCell align="center">{userData.name}</TableCell>
                          <TableCell align="center">{userData.email}</TableCell>
                          <TableCell align="center">
                            {userData.status === 1 ? (
                              <div>
                                <button className="bg-green-500 text-white p-2 rounded-md">
                                  Active
                                </button>
                              </div>
                            ) : (
                              <div>
                                <button className="bg-red-500 text-white p-2 rounded-md">
                                  In Active
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
                              <button
                                className="btnElipsis"
                                onClick={(e) => handleClickPop(e, userData)}
                              >
                                <i
                                  className="icon-elip fa fa-ellipsis-h"
                                  aria-hidden="true"
                                ></i>
                              </button>
                              <Popover
                                id={idPop}
                                open={openPop}
                                className="-ml-4"
                                anchorEl={anchorEl}
                                onClose={handleClosePop}
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "right",
                                }}
                              >
                                <Typography
                                  className="w-full"
                                  component={"div"}
                                >
                                  <div className="popOver">
                                    <button
                                      variant="contained"
                                      className="px-6 py-2 rounded-sm"
                                      onClick={handleOpenEdit}
                                    >
                                      Sunting
                                    </button>
                                  </div>
                                  <div className="popOver">
                                    <button
                                      variant="contained"
                                      className="px-6 py-2 rounded-sm"
                                      onClick={handleOpenStatus}
                                    >
                                      Pengaturan Status
                                    </button>
                                  </div>
                                  <div className="popOver">
                                    <button
                                      variant="contained"
                                      className="px-6 py-2 rounded-sm"
                                      onClick={handleOpenPassword}
                                    >
                                      Pengaturan Ulang Password
                                    </button>
                                  </div>
                                  <div className="popOver">
                                    <button
                                      variant="contained"
                                      className="px-6 py-2 rounded-sm"
                                      onClick={handleOpenDesc}
                                    >
                                      Detil Akun
                                    </button>
                                  </div>
                                </Typography>
                              </Popover>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={listUser.length}
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
        open={openEdit}
        onClose={handleCloseEdit}
        closeAfterTransition
        className="overflow-scroll h-11/12"
      >
        <Fade in={openEdit}>
          <Box sx={style} style={{ background: "white" }} component={"div"}>
            <Toolbar style={{ marginLeft: "-1rem" }}>
              <Typography component="div" sx={{ flexGrow: 2 }}>
                <b className="text-xl">Edit Category</b>
              </Typography>
              <i
                className="icon fa fa-times"
                aria-hidden="true"
                onClick={handleCloseEdit}
              ></i>
            </Toolbar>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
              component={"div"}
            >
              <Profile
                data={id}
                handleClose={handleCloseEdit}
                fetchItem={fetchItem}
                ctr="admin"
              />
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openStatus}
        onClose={handleCloseStatus}
        closeAfterTransition
        className="overflow-scroll h-11/12"
      >
        <Fade in={openStatus}>
          <Box sx={style} style={{ background: "white" }} component={"div"}>
            <Toolbar style={{ marginLeft: "-1rem" }}>
              <Typography component="div" sx={{ flexGrow: 2 }}>
                <b className="text-xl">Delete Category</b>
              </Typography>
              <i
                className="icon fa fa-times"
                aria-hidden="true"
                onClick={handleCloseStatus}
              ></i>
            </Toolbar>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
              component={"div"}
            >
              <Status
                data={id}
                handleClose={handleCloseStatus}
                fetchItem={fetchItem}
              />
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openPassword}
        onClose={handleClosePassword}
        closeAfterTransition
        className="overflow-scroll h-11/12"
      >
        <Fade in={openPassword}>
          <Box sx={style} style={{ background: "white" }} component={"div"}>
            <Toolbar style={{ marginLeft: "-1rem" }}>
              <Typography component="div" sx={{ flexGrow: 2 }}>
                <b className="text-xl">Reset Password</b>
              </Typography>
              <i
                className="icon fa fa-times"
                aria-hidden="true"
                onClick={handleClosePassword}
              ></i>
            </Toolbar>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
              component={"div"}
            >
              <ResetPasswword
                data={id}
                handleClose={handleClosePassword}
                fetchItem={fetchItem}
              />
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openDesc}
        onClose={handleCloseDesc}
        closeAfterTransition
        className="overflow-scroll h-11/12"
      >
        <Fade in={openDesc}>
          <Box sx={style} style={{ background: "white" }} component={"div"}>
            <Toolbar style={{ marginLeft: "-1rem" }}>
              <Typography component="div" sx={{ flexGrow: 2 }}>
                <b className="text-xl">Detil Akun</b>
              </Typography>
              <i
                className="icon fa fa-times"
                aria-hidden="true"
                onClick={handleCloseDesc}
              ></i>
            </Toolbar>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
              component={"div"}
            >
              <Detail data={id} handleClose={handleCloseDesc} />
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default User;
