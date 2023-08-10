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
import { Link } from "react-router-dom";
import DeleteOngkir from "./CRUD/DeleteOngrkir";
import EditOngkir from "./CRUD/EditOngkir";
import CreateOngkir from "./CRUD/CreateOngkir";
import { numberWithCommas } from "../../utils/comma";

const ListOngkir = () => {
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
      id: "location",
      label: "Location Name",
      minWidth: 200,
      align: "center",
    },
    {
      id: "fee",
      label: "Fee",
      minWidth: 200,
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
  const [listOngkir, setlistOngkir] = useState([]);
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [searched, setSearched] = useState();
  const [value, setValue] = useState("");
  const [isLoading, setLoading] = useState(true);

  const handleOpenCreate = () => {
    setOpen(true);
  };
  //function untuk tutup  pop up
  const handleCloseCreate = () => setOpen(false);

  const handleOpenEdit = (id) => {
    setId(id);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);

  const handleOpenDelete = (id) => {
    setId(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => setOpenDelete(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const fetchItem = () => {
    try {
      axios.get("/api/ongkir").then((resp) => {
        if (resp.data.status === 200) {
          setlistOngkir(resp.data.ongkir);
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
      const filteredRows = listOngkir.filter((rowsPerPage) => {
        return rowsPerPage.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setSearched(filteredRows);
    } else {
      setValue(e.target.value);
      setlistOngkir([...listOngkir]);
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
        {" > "} <span className="capitalize"> Ongkos Kirim</span>
      </div>
      <h2 className="font-bold text-2xl m-6">List Ongkir</h2>
      <div className="text-right mb-10 mr-10">
        <button
          className="bg-black text-white text-lg font-semibold px-4 py-2 rounded-md"
          onClick={() => handleOpenCreate()}
        >
          Create Ongkir
        </button>
      </div>
      {isLoading ? (
        <div className="tableLoad">
          <Box sx={{ display: "flex" }}>
            <div className="loading font-normal">
              <CircularProgress />
              <div>Loading Ongkir</div>
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
                          <TableCell align="center">
                            {userData.location}
                          </TableCell>
                          <TableCell align="center">
                            {" "}
                            Rp. {numberWithCommas(userData.fee)}
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
                                    className="bg-green-600 px-6 py-2 text-white rounded-sm"
                                    onClick={() => handleOpenEdit(userData)}
                                  >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                  </button>

                                  <button
                                    variant="contained"
                                    className="bg-red-600 px-6 py-2 text-white rounded-sm"
                                    onClick={() => handleOpenDelete(userData)}
                                  >
                                    <i className="fa-solid fa-trash"></i>
                                  </button>
                                </Stack>
                              </ButtonGroup>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                  : listOngkir
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
                          <TableCell align="center">
                            {userData.location}
                          </TableCell>
                          <TableCell align="center">
                            Rp. {numberWithCommas(userData.fee)}
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
                                    className="bg-green-600 px-6 py-2 text-white rounded-sm"
                                    onClick={() => handleOpenEdit(userData)}
                                  >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                  </button>

                                  <button
                                    variant="contained"
                                    className="bg-red-600 px-6 py-2 text-white rounded-sm"
                                    onClick={() => handleOpenDelete(userData)}
                                  >
                                    <i className="fa-solid fa-trash"></i>
                                  </button>
                                </Stack>
                              </ButtonGroup>
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
            count={listOngkir.length}
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
        onClose={handleCloseCreate}
        closeAfterTransition
        className="overflow-scroll h-11/12"
      >
        <Fade in={open}>
          <Box sx={style} style={{ background: "white" }} component={"div"}>
            <Toolbar style={{ marginLeft: "-1rem" }}>
              <Typography component="div" sx={{ flexGrow: 2 }}>
                <b className="text-xl">Create Ongkir</b>
              </Typography>
              <i
                className="icon fa fa-times"
                aria-hidden="true"
                onClick={handleCloseCreate}
              ></i>
            </Toolbar>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
              component={"div"}
            >
              {/* Isi Pop Up */}
              <CreateOngkir
                data={id}
                handleClose={handleCloseCreate}
                fetchItem={fetchItem}
              />
            </Typography>
          </Box>
        </Fade>
      </Modal>
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
                <b className="text-xl">Edit Ongkir</b>
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
              <EditOngkir
                data={id}
                handleClose={handleCloseEdit}
                fetchItem={fetchItem}
              />
            </Typography>
          </Box>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openDelete}
        onClose={handleCloseDelete}
        closeAfterTransition
        className="overflow-scroll h-11/12"
      >
        <Fade in={openDelete}>
          <Box sx={style} style={{ background: "white" }} component={"div"}>
            <Toolbar style={{ marginLeft: "-1rem" }}>
              <Typography component="div" sx={{ flexGrow: 2 }}>
                <b className="text-xl">Delete Ongkir</b>
              </Typography>
              <i
                className="icon fa fa-times"
                aria-hidden="true"
                onClick={handleCloseDelete}
              ></i>
            </Toolbar>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
              component={"div"}
            >
              <DeleteOngkir
                data={id}
                handleClose={handleCloseDelete}
                fetchItem={fetchItem}
              />
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ListOngkir;
