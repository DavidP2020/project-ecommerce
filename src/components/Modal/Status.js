import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import swal from "sweetalert";
import axios from "axios";

export default function Status({
  data,
  handleClose,
  fetchItem,
  todo,
  ...props
}) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(data.status === 0 ? 1 : 0);

  const handleStatus = async (e) => {
    e.preventDefault();

    const formData = {
      status: status,
    };
    setLoading(true);
    try {
      axios.put(`/api/user-status/${data.id}`, formData).then((res) => {
        if (res.data.status === 200) {
          fetchItem();
          handleClose();
          swal({
            title: "Success!",
            text: res.data.message,
            icon: "success",
            button: false,
            timer: 1500,
          });
        } else if (res.data.status === 404) {
          fetchItem();
          handleClose();
          swal({
            title: "Error!",
            text: res.data.message,
            icon: "error",
            button: false,
            timer: 1500,
          });
          setLoading(false);
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
        <div className="mb-6">
          Apakah Kamu Yakin Ingin Merubah Status User Tersebut ?
        </div>
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
          <Button variant="contained" disabled={loading} onClick={handleStatus}>
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
