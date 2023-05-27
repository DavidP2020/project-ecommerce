import React, { useEffect, useState } from "react";
import { numberWithCommas } from "../utils/comma";
import {
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import TotalPrice from "../components/Transaction/TotalPrice";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState([]);
  const navigate = useNavigate();

  const fetchItem = async () => {
    try {
      let res = await axios.get(`/api/wishlist`);
      console.log(res);
      if (res.data.status === 200) {
        console.log(res.data);
        setWishlist(res.data.wishlist);
        setLoading(false);
      } else if (res.data.status === 404) {
        swal("Warning", res.data.message, "error");
      } else if (res.data.status === 401) {
        swal({
          title: "Error!",
          text: res.data.message,
          icon: "error",
          button: false,
          timer: 2000,
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteWishlist = (e, wishlist_id) => {
    e.preventDefault();
    try {
      axios.delete(`/api/wishlist/${wishlist_id}`).then((res) => {
        if (res.data.status === 200) {
          fetchItem();
          swal({
            title: "Success!",
            text: res.data.message,
            icon: "success",
            button: false,
            timer: 1500,
          });
        } else if (res.data.status === 422) {
          swal({
            title: "Error!",
            text: res.data.error,
            icon: "error",
            button: false,
            timer: 1500,
          });
        }
      });
    } catch (err) {
      alert(err.message);
    }
  };
  const handleSubmit = (e, product_id) => {
    e.preventDefault();
    const data = {
      product_id: product_id,
      product_qty: 1,
    };
    console.log(data);
    try {
      axios.post("/api/cart", data).then((res) => {
        console.log(res.data);

        if (res.data.status === 201) {
          console.log(data);
          swal({
            title: "Success!",
            text: res.data.message,
            icon: "success",
            button: false,
            timer: 1500,
          });
        } else if (res.data.status === 409) {
          swal({
            title: "Warning!",
            text: res.data.message,
            icon: "warning",
            button: false,
            timer: 1500,
          });
        } else if (res.data.status === 404) {
          swal({
            title: "Warning!",
            text: res.data.message,
            icon: "warning",
            button: false,
            timer: 1500,
          });
        } else if (res.data.status === 401) {
          swal({
            title: "Error!",
            text: res.data.message,
            icon: "error",
            button: false,
            timer: 1500,
          });
        }
      });
    } catch (err) {
      alert(err.message);
    }
  };
  useEffect(() => {
    fetchItem();
    document.title = "Wishlist";
  }, []);

  return (
    <div className="p-7 text-2xl font-semibold flex-1 w-screen overflow-scroll">
      <div className="font-normal text-xs leading-10">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        {" > "} <span className="capitalize"> Wishlist</span>
      </div>
      <h2 className="font-bold text-2xl m-6">Wishlist</h2>
      {loading ? (
        <div className="tableLoad">
          <Box sx={{ display: "flex" }}>
            <div className="loading font-normal">
              <CircularProgress />
              <div>Loading Wishlist</div>
            </div>
          </Box>
        </div>
      ) : (
        <>
          {wishlist.length > 0 ? (
            <div className="flex flex-col justify-items-center items-center">
              {wishlist.length !== 0 && (
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: 1000,
                    bgcolor: "background.paper",
                  }}
                >
                  <nav aria-label="secondary mailbox folders">
                    <List sx={{ width: "100%" }}>
                      {wishlist.map((data, i) => {
                        return (
                          <ListItem
                            alignItems="flex-cemter"
                            key={i}
                            className="shadow-xl lg:flex lg:flex-row lg:text-left text-center flex flex-col"
                          >
                            <ListItemAvatar>
                              <img
                                src={`http://localhost:8000/${data.photo}`}
                                alt="photo"
                                width={150}
                                height={150}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              className="m-6"
                              primary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                  >
                                    <div className="flex flex-wrap mb-2">
                                      <div className="left-side w-full md:w-1/2 text-2xl font-bold">
                                        {data.productName}
                                      </div>
                                      <div className="right-side w-full lg:w-1/2 text-right">
                                        <button
                                          className="bg-red-500 p-3 rounded-md text-white hover:opacity-90"
                                          onClick={(e) =>
                                            deleteWishlist(e, data.id)
                                          }
                                        >
                                          <i className="fa-solid fa-trash"></i>
                                        </button>
                                      </div>
                                    </div>
                                  </Typography>
                                </React.Fragment>
                              }
                              secondary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                    className="font-normal"
                                  >
                                    Price: Rp.
                                    {numberWithCommas(data.price)}
                                  </Typography>
                                  <div>
                                    <button className="bg-white p-3 rounded-md text-black border-solid border-black border-2">
                                      <div className="flex flex-row">
                                        <div
                                          style={{
                                            background: `${data.color}`,
                                            width: "20px",
                                            height: "20px",
                                            marginRight: "5px",
                                          }}
                                        ></div>
                                        <div className="font-semibold">
                                          {data.colorName}
                                        </div>
                                        <i className="flex justify-center items-center ml-2 fa-sharp fa-solid fa-caret-down"></i>
                                      </div>
                                    </button>
                                  </div>
                                  <div className="flex lg:flex-row flex-col leading-none p-2 pt-2 justify-start items-center">
                                    <div className="w-full lg:w-1/2 lg:text-left text-center font-bold text-xs my-2">
                                      {data.qty} Item left
                                    </div>
                                    <div className="w-full text-right">
                                      <button
                                        className="bg-primary text-white text-sm font-medium px-14 md:px-4  py-2 rounded-md mx-4"
                                        type="button"
                                        onClick={(e) =>
                                          handleSubmit(e, data.product_id)
                                        }
                                      >
                                        Add to Cart
                                      </button>
                                    </div>
                                  </div>

                                  <hr />
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  </nav>
                </Box>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-96">
              Your Wishlist is Empty
            </div>
          )}
        </>
      )}
    </div>
  );
}
