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
import "../../../../App.css";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteProduct from "../../CRUD/DeleteProduct";
import EditProduct from "../../CRUD/EditProduct";
import { Link, useParams } from "react-router-dom";
import { numberWithCommas } from "../../../../utils/comma";
import CreateDetailProduct from "./CreateDetailProduct";
import EditDetailProduct from "./EditDetailProduct";

const DetailProductSetting = () => {
  const columns = [
    {
      id: "no",
      label: "No",
      minWidth: 170,
      align: "center",
    },
    {
      id: "name",
      label: "Product Name",
      minWidth: 200,
      align: "center",
    },
    {
      id: "color",
      label: "Color Name",
      minWidth: 200,
      align: "center",
    },

    {
      id: "original_price",
      label: "Original Price",
      minWidth: 200,
      align: "center",
    },
    {
      id: "price",
      label: "Price",
      minWidth: 200,
      align: "center",
    },
    {
      id: "qty",
      label: "Quantity",
      minWidth: 200,
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

  const paramsId = useParams();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [color, setColor] = useState();
  const [listDetail, setlistDetail] = useState([]);
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
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchItem = async () => {
    await axios.get(`/api/detail-products/${paramsId.id}`).then((resp) => {
      if (resp.data.status === 200) {
        setlistDetail(resp.data.getDetail);
      }
      setLoading(false);
    });

    axios.get("/api/all-color").then((resp) => {
      if (resp.data.status === 200) {
        setColor(resp.data.color);
      }
    });
  };
  const filterData = (e) => {
    if (e.target.value != "") {
      setValue(e.target.value);
      const filteredRows = listDetail.filter((rowsPerPage) => {
        return rowsPerPage.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setSearched(filteredRows);
    } else {
      setValue(e.target.value);
      setlistDetail([...listDetail]);
    }
  };
  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <div className="p-4">
      <div className="font-normal text-xs leading-10">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        {" > "}
        <Link to={`/product`} className="hover:underline">
          <span className="capitalize">Product</span>
        </Link>
        {" > "} <span className="capitalize">Detail Product</span>
      </div>
      <h2 className="font-bold text-2xl m-6">List Detail Product</h2>
      <div className="text-right mb-10 mr-10">
        <button
          className="bg-black text-white text-lg font-medium px-4 py-2 rounded-md"
          onClick={() => handleOpenCreate()}
        >
          Create Detail Product
        </button>
      </div>
      {isLoading ? (
        <div className="tableLoad">
          <Box sx={{ display: "flex" }}>
            <div className="loading font-normal">
              <CircularProgress />
              <div>Loading Detail Product</div>
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
                      .map((detailData, i) => (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={detailData.id}
                        >
                          <TableCell align="center">{i + 1}</TableCell>
                          <TableCell align="center">
                            {detailData.name}
                          </TableCell>
                          <TableCell align="center">
                            {detailData.colorName}
                          </TableCell>
                          <TableCell align="center">
                            Rp. {numberWithCommas(detailData.original_price)}
                          </TableCell>
                          <TableCell align="center">
                            Rp. {numberWithCommas(detailData.price)}
                          </TableCell>
                          <TableCell align="center">
                            {detailData.qty} Pcs
                          </TableCell>
                          <TableCell align="center">
                            {detailData.status === 1 ? (
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
                              <ButtonGroup
                                variant="text"
                                aria-label="text button group"
                              >
                                <Stack spacing={1} direction="row">
                                  <button
                                    variant="contained"
                                    className="bg-green-600 px-6 py-2 text-white rounded-sm"
                                    onClick={() => handleOpenEdit(detailData)}
                                  >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                  </button>
                                </Stack>
                              </ButtonGroup>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))
                  : listDetail
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((detailData, i) => (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={detailData.id}
                        >
                          <TableCell align="center">{i + 1}</TableCell>
                          <TableCell align="center">
                            {detailData.name}
                          </TableCell>
                          <TableCell align="center">
                            {detailData.colorName}
                          </TableCell>
                          <TableCell align="center">
                            Rp. {numberWithCommas(detailData.original_price)}
                          </TableCell>
                          <TableCell align="center">
                            Rp. {numberWithCommas(detailData.price)}
                          </TableCell>
                          <TableCell align="center">
                            {detailData.qty} Pcs
                          </TableCell>
                          <TableCell align="center">
                            {detailData.status === 1 ? (
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
                              <ButtonGroup
                                variant="text"
                                aria-label="text button group"
                              >
                                <Stack spacing={1} direction="row">
                                  <button
                                    variant="contained"
                                    className="bg-green-600 px-6 py-2 text-white rounded-sm"
                                    onClick={() => handleOpenEdit(detailData)}
                                  >
                                    <i className="fa-solid fa-pen-to-square"></i>
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
            count={listDetail.length}
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
                <b className="text-xl">Create Detail Product</b>
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
              <CreateDetailProduct
                data={paramsId.id}
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
                <b className="text-xl">Edit Detail Product</b>
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
              <EditDetailProduct
                data={id}
                handleClose={handleCloseEdit}
                fetchItem={fetchItem}
              />
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default DetailProductSetting;
