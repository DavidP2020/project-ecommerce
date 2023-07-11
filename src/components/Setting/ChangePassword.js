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

export default function ChangePassword({
  data,
  handleClose,
  fetchItem,
  ...props
}) {
  console.log(data);
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmPassword] = useState("");

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      oldPassword: oldPassword,
      password: password,
      password_confirmation: password_confirmation,
    };
    setLoading(true);
    try {
      axios.put(`/api/change-pass/${data}`, formData).then((res) => {
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
        } else if (res.data.status === 402) {
          setError(res.data.message);
          setLoading(false);
        } else if (res.data.status === 403) {
          setError(res.data.validation_errors);
          setLoading(false);
        } else if (res.data.status === 404) {
          alert(res.data.message);
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
              <li>{error.errors} </li>
              <li>{error.oldPassword} </li>
              <li>{error.password}</li>
            </ul>
          </div>
        ) : (
          ""
        )}
        <div className="h-96 overflow-x-scroll">
          <div className="flexInput">
            <TextField
              id="oldPass"
              name="oldPass"
              label="Old Password"
              type="password"
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className="flexInput">
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flexInput">
            <TextField
              id="password_confirmation"
              name="password_confirmation"
              label="Confirm Password"
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
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
