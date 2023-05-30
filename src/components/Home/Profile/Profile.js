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

export default function Profile({
  data,
  handleClose,
  fetchItem,
  ctr,
  ...props
}) {
  const [state, setState] = useState({
    name: data.name,
    gender: data.gender,
    phoneNum: data.phoneNum,
    place_of_birth: data.place_of_birth,
    date_of_birth: data.date_of_birth,
    address: data.address,
    state: data.state,
    city: data.city,
    zip: data.zip,
    status: data.status,
  });
  const [error, setError] = useState();
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
  const setGender = [
    {
      value: "female",
      label: "Female",
    },
    {
      value: "male",
      label: "Male",
    },
  ];
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", state.name);
    formData.append("gender", state.gender);
    formData.append("phoneNum", state.phoneNum);
    formData.append("place_of_birth", state.place_of_birth);
    formData.append("date_of_birth", state.date_of_birth);
    formData.append("address", state.address);
    formData.append("state", state.state);
    formData.append("city", state.city);
    formData.append("zip", state.zip);
    formData.append("status", state.status);
    setLoading(true);
    try {
      axios
        .post(`/api/profile/${data.id}`, formData, {
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

            if (ctr === "user") {
              localStorage.setItem("auth-name", state.name);
            }
            handleClose();
          } else if (res.data.status === 403) {
            setError(res.data.message);
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
          "& > :not(style)": { m: 2, width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        {error ? (
          <div className="text-left bg-red-500 w-full text-white p-4 mt-2 mb-4 max-h-28 overflow-scroll">
            <li>{error.name}</li>
            <li>{error.gender}</li>
            <li>{error.photo}</li>
            <li>{error.phoneNum}</li>
            <li>{error.date_of_birth}</li>
            <li>{error.place_of_birth}</li>
            <li>{error.address}</li>
            <li>{error.state}</li>
            <li>{error.city}</li>
            <li>{error.zip}</li>
          </div>
        ) : (
          ""
        )}
        <div className="h-96 overflow-x-scroll ">
          <div className="mr-4">
            <div className="flexInput">
              <TextField
                helperText="Please enter your Name"
                id="name"
                name="name"
                value={state.name}
                label="Name"
                type="text"
                onChange={handleInputChange}
              />
            </div>
            <div className="flexInput">
              <TextField
                select
                label="Gender"
                helperText="Please select your Gender"
                name="gender"
                value={state.gender}
                variant="outlined"
                onChange={handleInputChange}
              >
                {setGender.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="flexInput">
              <TextField
                helperText="Please enter your Phone Number"
                id="phoneNum"
                name="phoneNum"
                label="Phone Number"
                value={state.phoneNum}
                type="text"
                onChange={handleInputChange}
              />
            </div>
            <div className="flexInput">
              <TextField
                helperText="Please enter your Place of Birth"
                id="place_of_birth"
                name="place_of_birth"
                label="Place of Birth"
                value={state.place_of_birth}
                type="text"
                onChange={handleInputChange}
              />
            </div>
            <div className="flexInput">
              <TextField
                helperText="Please enter your Date of Birth"
                id="date_of_birth"
                name="date_of_birth"
                label="Date of Birth"
                value={state.date_of_birth}
                type="date"
                onChange={handleInputChange}
              />
            </div>
            <div className="flexInput">
              <textarea
                className="h-28 w-full appearance-none block border border-slate-600 rounded-lg py-4 px-3 focus:outline-none"
                placeholder="Description"
                id="address"
                name="address"
                value={state.address}
                onChange={handleInputChange}
              ></textarea>
              <div className="text-right mx-4 text-xs font-semibold">
                {state.address.length <= 255 ? (
                  <>
                    {state.address.length}
                    <span> / 255</span>
                  </>
                ) : (
                  <div className="text-red-600">
                    {state.address.length}{" "}
                    <span className="text-black"> / 255</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flexInput">
              <TextField
                helperText="Please enter your State"
                id="state"
                name="state"
                label="State"
                value={state.state}
                type="text"
                onChange={handleInputChange}
              />
            </div>
            <div className="flexInput">
              <TextField
                helperText="Please enter your City"
                id="city"
                name="city"
                label="City"
                value={state.city}
                type="text"
                onChange={handleInputChange}
              />
            </div>
            <div className="flexInput">
              <TextField
                helperText="Please enter your Zip"
                id="zip"
                name="zip"
                label="Zip"
                value={state.zip}
                type="text"
                onChange={handleInputChange}
              />
            </div>
            {/* <div className="flexInput">
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
          </div> */}
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
