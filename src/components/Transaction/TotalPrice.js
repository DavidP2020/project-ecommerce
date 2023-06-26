import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { numberWithCommas } from "../../utils/comma";
import { ButtonGroup, Stack } from "@mui/material";

const TotalPrice = ({ total, action, ongkir, handleInput, ...props }) => {
  const navigate = useNavigate();

  const totalHarga = total.reduce(function (result, item) {
    return result + item.product_qty * item.price;
  }, 0);

  const totalBayar = total.reduce(function (result, item) {
    return result + item.product_qty * item.price + ongkir;
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
          <>
            {ongkir !== 0 ? (
              <>
                <h4 className="text-xs mr-2">
                  Ongkos Kirim : Rp. {numberWithCommas(ongkir)}
                </h4>
                <h4 className="text-sm m-1 mr-2">
                  Harga : Rp. {numberWithCommas(totalHarga)}
                </h4>
              </>
            ) : (
              ""
            )}
            <h3 className="text-xl m-2">
              Total Price : Rp. {numberWithCommas(totalBayar)}
            </h3>
          </>
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
