import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { numberWithCommas } from "../../utils/comma";
import { Button, ButtonGroup, CircularProgress, Stack } from "@mui/material";

const TotalPrice = ({
  total,
  action,
  ongkir,
  handleInput,
  loadingOrder,
  loadingPayment,
  ...props
}) => {
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

  const totalPembayar = total.reduce(function (result, item) {
    return result + item.qty * item.price + ongkir;
  }, 0);
  return (
    <>
      <div className="flex flex-col justify-end items-end text-lg">
        {action === "orderDetail" ? (
          <>
            {ongkir !== 0 ? (
              <>
                <h4 className="text-xs mr-2">
                  Ongkos Kirim : Rp. {numberWithCommas(ongkir)}
                </h4>
                <h4 className="text-sm m-1 mr-2">
                  Harga : Rp. {numberWithCommas(totalDetail)}
                </h4>
              </>
            ) : (
              ""
            )}
            <h4>Total Price : Rp. {numberWithCommas(totalPembayar)}</h4>
          </>
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
                <Button
                  variant="contained"
                  sx={{
                    background: "#302C42",
                    ":hover": {
                      background: "#302C42",
                      opacity: 0.8,
                    },
                  }}
                  disabled={loadingOrder}
                  className="bg-black px-10 py-2 mt text-white rounded-sm text-xs hover:opacity-70"
                  onClick={(e) => handleInput(e, "COD", totalBayar)}
                >
                  {loadingOrder && (
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
                  Order Now
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    background: "#302C42",
                    ":hover": {
                      background: "#302C42",
                      opacity: 0.8,
                    },
                  }}
                  className="bg-black px-10 py-2 mt text-white rounded-sm text-xs hover:opacity-70"
                  disabled={loadingPayment}
                  onClick={(e) => handleInput(e, "Online", totalBayar)}
                >
                  {loadingPayment && (
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
                  Online Payment
                </Button>
              </Stack>
            </ButtonGroup>
          </div>
        ) : action === "orderDetail" ? (
          ""
        ) : (
          <div className="text-center">
            <Link to="/checkout" className="hover:underline">
              <Button
                variant="contained"
                sx={{
                  background: "#302C42",
                  ":hover": {
                    background: "#302C42",
                    opacity: 0.8,
                  },
                }}
              >
                Check Out
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default TotalPrice;
