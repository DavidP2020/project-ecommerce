import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
export default function Logout({ handleClose, ...props }) {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("auth-token");
  const [loading, setLoading] = useState(false);
  const logOut = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // axios.get("/sanctum/csrf-cookie").then((response) => {
      axios
        .post("/api/logout", {
          headers: {
            Authorization: accessToken,
          },
        })
        .then((resp) => {
          console.log(resp.data);
          if (resp.data.status === 200) {
            alert(resp.data.message);
            handleClose();
            navigate("/");
            localStorage.clear();
            window.location.reload(false);
          } else {
            swal({
              title: "Error!",
              text: "Unauthorized",
              icon: "error",
              button: false,
              timer: 1500,
            });
            setLoading(false);
            handleClose();
            localStorage.clear();
            window.location.reload(false);
          }
        });
      // });
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
        <div className="mb-6">Are you sure want Logout ? </div>
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
          <Button
            sx={{
              background: "red",
              ":hover": {
                background: "red",
                opacity: 0.8,
              },
            }}
            variant="contained"
            disabled={loading}
            onClick={logOut}
          >
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
            Logout
          </Button>
        </div>
      </Box>
    </div>
  );
}
