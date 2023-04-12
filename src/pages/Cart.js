import React, { useEffect, useState } from "react";
import { numberWithCommas } from "../utils/comma";
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import swal from "sweetalert";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState([]);
  const [itemQty, setitemQty] = useState(0);
  const [qty, setQty] = useState(1);
  const handleDecrement = () => {
    if (qty > 1) {
      setQty((prevCount) => prevCount - 1);
    }
  };

  const handleIncrement = () => {
    if (qty < itemQty) setQty((prevCount) => prevCount + 1);
  };
  const fetchItem = async () => {
    try {
      let res = await axios.get(`/api/cart`);
      console.log(res);
      if (res.data.status === 200) {
        console.log(res.data);
        setCart(res.data.cart);
        setQty(res.data.cart.product_qty);
        setLoading(false);
      } else if (res.data.status === 404) {
        swal("Warning", res.data.message, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchItem();
    document.title = "Cart";
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div className="p-7 text-2xl font-semibold flex-1 h-screen overflow-scroll">
      <h2 className="font-bold text-2xl m-6">Cart</h2>
      {loading ? (
        <div className="screen bg-blue">
          <Box sx={{ display: "flex" }}>
            <div className="loading">
              <CircularProgress />
              <div className="font-thin">Loading Cart</div>
            </div>
          </Box>
        </div>
      ) : (
        <div className="flex flex-col justify-items-center items-center">
          {cart.length !== 0 && (
            <Box
              sx={{
                width: "100%",
                maxWidth: 1000,
                bgcolor: "background.paper",
              }}
            >
              <nav aria-label="secondary mailbox folders">
                <List sx={{ width: "100%" }}>
                  {cart.map((data, i) => {
                    return (
                      <ListItem alignItems="flex-start" key={i}>
                        <ListItemAvatar>
                          <img
                            src={`http://localhost:8000/${data.photo}`}
                            alt="photo"
                            width={300}
                            height={300}
                            className="h-56"
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
                                  <div className="left-side w-1/2 text-2xl font-bold">
                                    {data.productName}
                                  </div>
                                  <div className="right-side w-1/2 text-right font-bold mt-1 text-lg">
                                    Rp.
                                    {numberWithCommas(
                                      data.price * data.product_qty
                                    )}
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
                              >
                                Price: Rp.
                                {numberWithCommas(data.price)}
                              </Typography>
                              <div>
                                Quantity :{" "}
                                <span>
                                  <button onClick={handleDecrement}>-</button>
                                  <input
                                    type="text"
                                    id="qty"
                                    nama="qty"
                                    value={data.product_qty}
                                    readOnly
                                    placeholder="1"
                                    className="border-solid w-1/2 focus:outline-none active:outline-none text-center text-md"
                                  />
                                  <button onClick={handleIncrement}>+</button>
                                </span>
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
              {/* <TotalPrice total={cart} /> */}
            </Box>
          )}
        </div>
      )}
    </div>
  );
}
