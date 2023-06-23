import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import swal from "sweetalert";
import axios from "axios";

export default function VerifyAccount({
  data,
  handleClose,
  fetchItem,
  ...props
}) {
  const [loading, setLoading] = useState(false);
  const accessToken = localStorage.getItem("auth-token");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      axios
        .get(`/api/send-verify-mail/${data}`, {
          headers: {
            Authorization: accessToken,
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
              timer: 3000,
            });
            fetchItem();
            handleClose();
          } else if (res.data.status === 401) {
            swal({
              title: "Success!",
              text: res.data.message,
              icon: "error",
              button: false,
              timer: 3000,
            });
            setLoading(false);
            fetchItem();
            handleClose();
          }
        });
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <div>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "36ch" },
        }}
        component={"div"}
      >
        <div className="mb-6">Konfirmasi Melakukan Verfikasi Akun ?</div>
        <div style={{ textAlign: "right" }}>
          <Button
            style={{
              margin: "5px",
              color: "black",
              border: "1px solid",
              borderRadius: "5px",
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
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
