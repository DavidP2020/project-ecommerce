import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

export default function CreateDetailProduct({
  handleClose,
  fetchItem,
  data,
  ...props
}) {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    color_id: "",
    qty: "",
    original_price: "",
    price: "",
    status: "1",
  });
  const [color, setColor] = useState();
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

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("color_id", state.color_id);
    formData.append("qty", state.qty);
    formData.append("original_price", state.original_price);
    formData.append("price", state.price);
    formData.append("status", state.status);
    setLoading(true);

    try {
      axios
        .post(`/api/detail-products/${data}`, formData, {
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
            handleClose();
            fetchItem();
            setState({
              color_id: "",
              weight: "",
              qty: "",
              original_price: "",
              price: "",
              status: "1",
            });
          } else if (res.data.status === 403) {
            setError(res.data.validation_errors);
            setLoading(false);
          }
        });
    } catch (err) {
      alert(err.message);
    }
  };

  const fetchColor = async () => {
    axios.get("/api/all-color").then((resp) => {
      if (resp.data.status === 200) {
        setColor(resp.data.color);
      }
    });
  };
  useEffect(() => {
    fetchColor();
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
        {error ? (
          <div className="text-left bg-red-500 w-full text-white p-4 mt-2 mb-4 max-h-28 overflow-scroll">
            <ul>
              <li>{error.name}</li>
              <li>{error.slug}</li>
              <li>{error.photo}</li>
            </ul>
          </div>
        ) : (
          ""
        )}
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
          <Button variant="contained" disabled={loading} onClick={handleSubmit}>
            {loading && (
              <CircularProgress
                color="inherit"
                size={24}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
            Submit
          </Button>
        </div>
      </Box>
    </div>
  );
}
