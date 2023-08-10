import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";

export default function CreateOngkir({ handleClose, fetchItem, ...props }) {
  const [state, setState] = useState({
    location: "",
    fee: "",
  });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state.location);
    const formData = new FormData();
    formData.append("location", state.location);
    formData.append("fee", state.fee);
    setLoading(true);
    try {
      axios.post("/api/ongkir", formData).then((res) => {
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
          handleClose();
        } else if (res.data.status === 403) {
          setError(res.data.validation_errors);
          setLoading(false);
        }
      });
    } catch (err) {
      alert(err.message);
    }
  };
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
              <li>{error.location}</li>
              <li>{error.fee}</li>
            </ul>
          </div>
        ) : (
          ""
        )}
        <div className="h-96 overflow-x-scroll">
          <div className="flexInput">
            <TextField
              helperText="Please enter your Location Name"
              id="location"
              name="location"
              label="Location Name"
              value={state.location}
              type="text"
              onChange={handleInputChange}
            />
          </div>
          <div className="flexInput">
            <TextField
              helperText="Please enter your Fee"
              id="fee"
              name="fee"
              label="Fee"
              value={state.fee}
              type="text"
              onChange={handleInputChange}
            />
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
