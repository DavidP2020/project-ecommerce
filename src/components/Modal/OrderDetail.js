import React, { useEffect, useState } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import swal from "sweetalert";
import axios from "axios";
import TotalPrice from "../Transaction/TotalPrice";
import { numberWithCommas } from "../../utils/comma";
import { useNavigate } from "react-router-dom";

export default function ({ data, ...props }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState([]);
  const navigate = useNavigate();
  const fetchItem = async () => {
    try {
      let res = await axios.get(`/api/detail-order/${data.id}`);
      if (res.data.status === 200) {
        setCart(res.data.orderDetail);
        console.log(res.data.orderDetail);
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
  useEffect(() => {
    fetchItem();
  }, []);
  return (
    <div className="w-full">
      <nav>
        <List sx={{ width: "100%" }}>
          {cart.map((data, i) => {
            return (
              <ListItem
                alignItems="flex-cemter"
                key={i}
                className="shadow-xl lg:flex lg:flex-row lg:text-left text-center flex flex-col"
              >
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
                          <div className="left-side w-full md:w-1/2 text-md font-bold">
                            {data.productName} ({data.weight} {data.unit})
                          </div>
                          <div className="right-side w-1/2 text-right font-bold mt-1 text-xs md:block hidden">
                            Rp.
                            {numberWithCommas(data.price * data.qty)}
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
                        <div className="flex flex-row">
                          <div
                            style={{
                              background: `${data.color}`,
                              width: "20px",
                              height: "20px",
                              marginRight: "5px",
                            }}
                          ></div>
                          <div className="font-semibold">{data.colorName}</div>
                        </div>
                      </div>
                      <div>
                        <div className="flex flex-row">
                          <div className="font-semibold">Qty : {data.qty}</div>
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
      <TotalPrice total={cart} action={"orderDetail"} />
    </div>
  );
}
