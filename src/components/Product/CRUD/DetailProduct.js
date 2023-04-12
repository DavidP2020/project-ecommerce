import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import { numberWithCommas } from "../../../utils/comma";
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
    id: "weight",
    label: "Weight",
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
];

export default function DetailProduct({ data, handleClose, ...props }) {
  const [error, setError] = useState();
  const [color, setColor] = useState();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [listDetail, setlistDetail] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const [value, setValue] = useState(0);
  const handleTabs = (e, val) => {
    setValue(val);
  };

  const [state, setState] = useState({
    color_id: "",
    weight: "",
    qty: "",
    original_price: "",
    price: "",
    status: "1",
  });

  const setStatus = [
    {
      value: "0",
      label: "In-Active",
    },
    {
      value: "1",
      label: "Active",
    },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("color_id", state.color_id);
    formData.append("weight", state.weight);
    formData.append("qty", state.qty);
    formData.append("original_price", state.original_price);
    formData.append("price", state.price);
    formData.append("status", state.status);

    try {
      axios
        .post(`/api/detail-products/${data.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          if (res.data.status === 200) {
            swal({
              title: "Success!",
              text: res.data.message,
              icon: "success",
              button: false,
              timer: 1500,
            });
            setError("");
            fetchItem();
            setState({
              color_id: "",
              weight: "",
              qty: "",
              original_price: "",
              price: "",
              status: "1",
            });
            setValue(0);
          } else if (res.data.status === 403) {
            setError(res.data.validation_errors);
          }
        });
    } catch (err) {
      alert(err.message);
    }
  };

  const fetchItem = async () => {
    await axios.get(`/api/detail-products/${data.id}`).then((resp) => {
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

  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <div>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleTabs}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            className="bg-white"
          >
            <Tab label="Data Detail Product"></Tab>
            <Tab label="Add Detail Product"></Tab>
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <div className="h-96 overflow-x-scroll">
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
                      {listDetail
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
                              {detailData.weight} Kg
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
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="h-96 overflow-x-scroll">
            <div className="flexInput">
              <TextField
                select
                label="Color"
                helperText="Please select your Color"
                name="color_id"
                variant="outlined"
                value={state.color_id}
                onChange={handleInputChange}
              >
                {color &&
                  color.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
              </TextField>
            </div>
            <div className="flexInput">
              <TextField
                helperText="Please enter your Weight"
                id="weight"
                name="weight"
                label="Weight"
                value={state.weight}
                type="text"
                onChange={handleInputChange}
              />
            </div>
            <div className="flexInput">
              <TextField
                helperText="Please enter your Quantity"
                id="qty"
                name="qty"
                label="Quantity"
                value={state.qty}
                type="text"
                onChange={handleInputChange}
              />
            </div>
            <div className="flexInput">
              <TextField
                helperText="Please enter your Price"
                id="price"
                name="price"
                label="Price"
                value={state.price}
                type="text"
                onChange={handleInputChange}
              />
            </div>
            <div className="flexInput">
              <TextField
                helperText="Please enter your Original Price"
                id="original_price"
                name="original_price"
                label="Original Price"
                value={state.original_price}
                type="text"
                onChange={handleInputChange}
              />
            </div>

            <div className="flexInput">
              <TextField
                select
                label="Status"
                helperText="Please select your Status"
                name="status"
                value={state.status}
                variant="outlined"
                onChange={handleInputChange}
              >
                {setStatus.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>
          <br />
          <div style={{ textAlign: "right" }}>
            <Button
              style={{
                margin: "5px",
                color: "black",
                border: "1px solid",
                borderRadius: "5px",
              }}
              onClick={() => setValue(0)}
            >
              Back
            </Button>
            <Button
              style={{ background: "green" }}
              variant="contained"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </TabPanel>
      </Box>
    </div>
  );
}

function TabPanel(props) {
  const { children, value, index } = props;
  return <>{value === index && <div>{children}</div>}</>;
}
