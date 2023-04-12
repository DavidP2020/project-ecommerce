import {
  Button,
  Fade,
  Modal,
  Paper,
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
import React, { useEffect, useState } from "react";

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
      id: "gender",
      label: "Gender",
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
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [searched, setSearched] = useState();
  const [value, setValue] = useState("");

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
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    document.title = "User";
  }, []);
  return (
    <div>
      <div>{/* <Header></Header> */}</div>
      <h2 className="font-bold text-2xl m-6">List User</h2>
      <div className="text-right mb-10 mr-10">
        <Button
          variant="contained"
          className="bg-blue-600"
          onClick={() => handleOpenCreate()}
        >
          Create User
        </Button>

        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleCloseCreate}
          closeAfterTransition
        >
          <Fade in={open}>
            <Box sx={style} style={{ background: "white" }} component={"div"}>
              <Toolbar style={{ marginLeft: "-1rem" }}>
                <Typography component="div" sx={{ flexGrow: 2 }}>
                  <b className="text-xl">Create User</b>
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
                {/* <CreateUser
                  data={id}
                  handleClose={handleCloseCreate}
                  fetchItem={fetchItem}
                /> */}
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
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
        <TableContainer sx={{ maxHeight: 540 }}>
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
            <TableBody></TableBody>
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
    </div>
  );
};

export default User;
