import React from "react";
import { Button } from "@mui/material";
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
  const handleDelete = async (e) => {
    e.preventDefault();
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
          fetchItem();
          handleClose();
          swal({
            title: "Error!",
            text: res.data.error,
            icon: "error",
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
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Box>
    </div>
  );
}
