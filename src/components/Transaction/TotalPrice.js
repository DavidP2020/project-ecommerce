import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { numberWithCommas } from "../../utils/comma";
import { ButtonGroup, Stack } from "@mui/material";

const TotalPrice = ({ total, action, handleInput, ...props }) => {
  const navigate = useNavigate();

  const totalBayar = total.reduce(function (result, item) {
    return result + item.product_qty * item.price;
  }, 0);

  const totalDetail = total.reduce(function (result, item) {
    return result + item.qty * item.price;
  }, 0);

  return (
    <>
      <div className="flex flex-col justify-end items-end text-lg">
        {action === "orderDetail" ? (
          <h4>Total Price : Rp. {numberWithCommas(totalDetail)}</h4>
        ) : (
          <h4>Total Price : Rp. {numberWithCommas(totalBayar)}</h4>
        )}
        {action === "order" ? (
          <div className="text-center mt-2">
            <ButtonGroup variant="text" aria-label="text button group">
              <Stack spacing={1} direction="row">
                <button
                  variant="contained"
                  className="bg-black px-10 py-2 mt text-white rounded-sm text-xs hover:opacity-70"
                  onClick={(e) => handleInput(e, "COD", totalBayar)}
                >
                  Order Now
                </button>
                <button
                  variant="contained"
                  className="bg-black px-10 py-2 mt text-white rounded-sm text-xs hover:opacity-70"
                  onClick={(e) => handleInput(e, "Online", totalBayar)}
                >
                  Online Payment
                </button>
              </Stack>
            </ButtonGroup>
          </div>
        ) : action === "orderDetail" ? (
          ""
        ) : (
          <div className="text-center">
            <Link to="/checkout" className="hover:underline">
              <button className="bg-black rounded-md text-white px-12 py-2 mt-2 text-xs hover:opacity-70">
                Check Out
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default TotalPrice;
