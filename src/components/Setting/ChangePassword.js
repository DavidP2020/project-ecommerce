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
  const [state, setState] = useState({
    oldPass: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (state.oldPass === "") {
      setError("Password Lama Harus Diisi");
    } else if (state.password === "") {
      setError("Password Harus Diisi");
    } else if (state.confirm === "") {
      setError("Konfrimasi Password Harus Diisi");
    } else if (state.password.length < 8 || state.oldPass.length < 8) {
      setError("Minimal 8 Karakter");
    } else {
      formData.append("oldPass", state.oldPass);
      if (state.password === state.confirm) {
        formData.append("password", state.password);
        setLoading(true);
        try {
          axios
            .post(`/api/change-pass/${data}`, formData, {
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
              } else if (res.data.status === 403) {
                setError(res.data.validation_errors);
                setLoading(false);
              } else if (res.data.status === 404) {
                setError(res.data.validation_errors);
                setLoading(false);
              }
            });
        } catch (err) {
          alert(err.message);
        }
      } else {
        setError("Password Tidak Sama");
      }
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
              <li>{error}</li>
              <li>{error.password}</li>
              <li>{error.oldPass}</li>
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
              value={state.oldPass}
              type="password"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flexInput">
            <TextField
              id="password"
              name="password"
              label="Password"
              value={state.password}
              type="password"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flexInput">
            <TextField
              id="confirm"
              name="confirm"
              label="Confirm Password"
              value={state.confirm}
              type="password"
              onChange={handleInputChange}
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
