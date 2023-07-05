import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import swal from "sweetalert";
import axios from "axios";

export default function DeleteCategory({
  data,
  handleClose,
  fetchItem,
  todo,
  ...props
}) {
  const [loading, setLoading] = useState(false);
  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      axios.delete(`/api/category/${data.id}`).then((res) => {
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
        } else if (res.data.status === 422) {
          swal({
            title: "Error!",
            text: res.data.error,
            icon: "error",
            button: false,
            timer: 1500,
          });
          setLoading(false);
          fetchItem();
          handleClose();
        } else if (res.data.status === 404) {
          swal({
            title: "Error!",
            text: res.data.message,
            icon: "error",
            button: false,
            timer: 1500,
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
        <div className="mb-6">
          Are you sure want to delete this data ? your action can't be reverted
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
          <Button
            style={{ background: "red" }}
            variant="contained"
            disabled={loading}
            onClick={handleDelete}
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
            Delete
          </Button>
        </div>
      </Box>
    </div>
  );
}
