import {
  AppBar,
  Box,
  Button,
  MenuItem,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import swal from "sweetalert";

export default function EditProduct({
  data,
  handleClose,
  fetchItem,
  ...props
}) {
  const [error, setError] = useState();
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState([]);
  const [brand, setBrand] = useState([]);
  const [picture, setPicture] = useState([]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] });
  };

  const [state, setState] = useState({
    category_id: data.category_id,
    name: data.name,
    slug: data.slug,
    description: data.description,
    price: data.price,
    original_price: data.original_price,
    qty: data.qty,
    brand_id: data.brand_id,
    status: data.status,
  });

  const handleTabs = (e, val) => {
    setValue(val);
  };
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("photo", picture.image);
    formData.append("category_id", state.category_id);
    formData.append("brand_id", state.brand_id);
    formData.append("name", state.name);
    formData.append("slug", state.slug);
    formData.append("description", state.description);
    formData.append("status", state.status);

    try {
      axios
        .post(`/api/products/${data.id}`, formData, {
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
          } else if (res.data.status === 422) {
            setError(res.data.validation_errors);
          }
        });
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    axios.get("/api/all-category").then((resp) => {
      if (resp.data.status === 200) {
        setCategory(resp.data.category);
      }
    });
    axios.get("/api/all-brand").then((resp) => {
      if (resp.data.status === 200) {
        setBrand(resp.data.brand);
      }
    });
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
              <li>{error.category_id}</li>
              <li>{error.photo}</li>
            </ul>
          </div>
        ) : (
          ""
        )}
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleTabs}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            className="bg-white"
          >
            <Tab label="Product"></Tab>
            <Tab label="Other Details"></Tab>
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <div className="h-96 overflow-x-scroll">
            <div className="flexInput">
              <TextField
                select
                label="Category Name"
                helperText="Please select your category"
                name="category_id"
                variant="outlined"
                value={state.category_id}
                onChange={handleInputChange}
              >
                {category &&
                  category.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
              </TextField>
            </div>
            <div className="flexInput">
              <TextField
                helperText="Please enter your Product name"
                id="name"
                name="name"
                label="Product name"
                type="text"
                value={state.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="flexInput">
              <TextField
                select
                label="Brand"
                helperText="Please select your brand"
                name="brand_id"
                variant="outlined"
                value={state.brand_id}
                onChange={handleInputChange}
              >
                {brand &&
                  brand.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
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
              onClick={() => setValue(1)}
            >
              Next
            </Button>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="h-96 overflow-x-scroll">
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
              <TextField
                id="photo"
                name="photo"
                helperText="Please input your image"
                type="file"
                onChange={handleImage}
              />
              <img
                src={`http://localhost:8000/${data.photo}`}
                width="200px"
                alt="photo"
              />
            </div>
            <div className="flexInput">
              <TextField
                helperText="Please enter your Description"
                id="description"
                name="description"
                label="Description"
                value={state.description}
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
