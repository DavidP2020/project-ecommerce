import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import swal from "sweetalert";

export default function CreateCategory({ handleClose, fetchItem, ...props }) {
  const [state, setState] = useState({
    name: "",
    slug: "",
    description: "",
    status: "1",
  });
  const [error, setError] = useState();
  const [picture, setPicture] = useState([]);
  const [loading, setLoading] = useState(false);

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
  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", picture.image);
    formData.append("name", state.name);
    formData.append("slug", state.slug);
    formData.append("description", state.description);
    formData.append("status", state.status);
    setLoading(true);
    try {
      axios
        .post("/api/category", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
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
              helperText="Please enter your Name"
              id="name"
              name="name"
              label="Name"
              value={state.name}
              type="text"
              onChange={handleInputChange}
            />
          </div>
          <div className="flexInput">
            <TextField
              helperText="Please enter your Slug for Seo Website / URL"
              id="slug"
              name="slug"
              label="Slug"
              value={state.slug}
              type="text"
              onChange={handleInputChange}
            />
          </div>
          <div className="flexInput">
            <textarea
              className="h-28 w-full appearance-none block border border-slate-600 rounded-lg py-4 px-3 focus:outline-none"
              placeholder="Description"
              id="description"
              name="description"
              value={state.description}
              onChange={handleInputChange}
            ></textarea>
            <div className="text-right mx-4 text-xs font-semibold">
              {state.description.length <= 255 ? (
                <>
                  {state.description.length}
                  <span> / 255</span>
                </>
              ) : (
                <div className="text-red-600">
                  {state.description.length}{" "}
                  <span className="text-black"> / 255</span>
                </div>
              )}
            </div>
          </div>
          <div className="flexInput">
            <TextField
              id="photo"
              name="photo"
              helperText="Please input your image"
              type="file"
              onChange={handleImage}
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
