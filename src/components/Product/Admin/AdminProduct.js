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
import "../../../App.css";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteProduct from "../CRUD/DeleteProduct";
import EditProduct from "../CRUD/EditProduct";
import CreateProduct from "../CRUD/CreateProduct";
import DetailProduct from "../CRUD/DetailProduct";

const AdminProduct = () => {
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
      id: "image",
      label: "Photo",
      minWidth: 200,
      align: "center",
    },
    {
      id: "category_id",
      label: "Category Name",
      minWidth: 200,
      align: "center",
    },
    {
      id: "name",
      label: "Product Name",
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

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [listUser, setlistUser] = useState([]);
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
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

  const handleOpenDetail = (id) => {
    setId(id);
    setOpenDetail(true);
  };

  const handleCloseDetail = () => setOpenDetail(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchItem = () => {
    try {
      axios.get("/api/products").then((resp) => {
        if (resp.data.status === 200) {
          setlistUser(resp.data.product);
          console.log(resp.data.product);
        }
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <div>
      <h2 className="font-bold text-2xl m-6">List Product</h2>
      <div className="text-right mb-10 mr-10">
        <Button
          variant="contained"
          className="bg-blue-600"
          onClick={() => handleOpenCreate()}
        >
          Create Product
        </Button>

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
                  <b className="text-xl">Create Product</b>
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
                <CreateProduct
                  data={id}
                  handleClose={handleCloseCreate}
                  fetchItem={fetchItem}
                />
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
      {isLoading ? (
        <div className="tableLoad">
          <Box sx={{ display: "flex" }}>
            <div className="loading">
              <CircularProgress />
              <div>Loading</div>
            </div>
          </Box>
        </div>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          {/* <TextField
          label="Search"
          variant="outlined"
          type="text"
          placeholder="Search Name...."
          value={value}
          style={{ margin: "3rem 2rem 2rem 1rem", width: "50%" }}
          onChange={(e) => filterData(e)}
        /> */}

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
                {listUser
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                        <img
                          src={`http://localhost:8000/${userData.photo}`}
                          width="100%"
                          alt="photo"
                        />
                      </TableCell>
                      <TableCell align="center">
                        {userData.category.name}
                      </TableCell>
                      <TableCell align="center">{userData.name}</TableCell>
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
                          <ButtonGroup
                            variant="text"
                            aria-label="text button group"
                          >
                            <Stack spacing={1} direction="row">
                              <button
                                variant="contained"
                                className="bg-gray-500 pl-6 pr-6 pt-2 pb-2 text-white rounded-sm"
                                onClick={() => handleOpenDetail(userData)}
                              >
                                Detail
                              </button>
                              <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                open={openDetail}
                                onClose={handleCloseDetail}
                                closeAfterTransition
                                className="overflow-scroll h-11/12"
                              >
                                <Fade in={openDetail}>
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
                                        <b className="text-xl">
                                          Detail Product
                                        </b>
                                      </Typography>
                                      <i
                                        className="icon fa fa-times"
                                        aria-hidden="true"
                                        onClick={handleCloseDetail}
                                      ></i>
                                    </Toolbar>
                                    <Typography
                                      id="transition-modal-description"
                                      sx={{ mt: 2 }}
                                      component={"div"}
                                    >
                                      <DetailProduct
                                        data={id}
                                        handleClose={handleCloseDetail}
                                      />
                                    </Typography>
                                  </Box>
                                </Fade>
                              </Modal>
                              <button
                                variant="contained"
                                className="bg-green-600 pl-6 pr-6 pt-2 pb-2 text-white rounded-sm"
                                onClick={() => handleOpenEdit(userData)}
                              >
                                EDIT
                              </button>

                              <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                open={openEdit}
                                onClose={handleCloseEdit}
                                closeAfterTransition
                                className="overflow-scroll h-11/12"
                              >
                                <Fade in={openEdit}>
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
                                        <b className="text-xl">Edit Product</b>
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
                                      <EditProduct
                                        data={id}
                                        handleClose={handleCloseEdit}
                                        fetchItem={fetchItem}
                                      />
                                    </Typography>
                                  </Box>
                                </Fade>
                              </Modal>
                              <button
                                variant="contained"
                                className="bg-red-600 pl-6 pr-6 pt-2 pb-2 text-white rounded-sm"
                                onClick={() => handleOpenDelete(userData)}
                              >
                                DELETE
                              </button>
                              <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                open={openDelete}
                                onClose={handleCloseDelete}
                                closeAfterTransition
                                className="overflow-scroll h-11/12"
                              >
                                <Fade in={openDelete}>
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
                                        <b className="text-xl">
                                          Delete Product
                                        </b>
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
                                      <DeleteProduct
                                        data={id}
                                        handleClose={handleCloseDelete}
                                        fetchItem={fetchItem}
                                      />
                                    </Typography>
                                  </Box>
                                </Fade>
                              </Modal>
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
            count={listUser.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      )}
    </div>
  );
};

export default AdminProduct;
