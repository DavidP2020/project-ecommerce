import React from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import swal from "sweetalert";
import axios from "axios";

export default function Description({ data, handleClose, ...props }) {
  return (
    <div>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "36ch" },
        }}
        component={"div"}
      >
        <div className="mb-6 whitespace-pre-line">{data.description}</div>
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
        </div>
      </Box>
    </div>
  );
}
