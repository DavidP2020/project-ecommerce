import React from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Logout({ handleClose, ...props }) {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("auth-token");
  const logOut = (e) => {
    e.preventDefault();
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
            style={{ background: "red" }}
            variant="contained"
            onClick={logOut}
          >
            Logout
          </Button>
        </div>
      </Box>
    </div>
  );
}
