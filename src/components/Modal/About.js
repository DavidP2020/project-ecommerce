import React from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

export default function About({ handleClose, ...props }) {
  return (
    <div>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "36ch" },
        }}
        component={"div"}
      >
        <div className="mb-6 text-center font-bold">
          {" "}
          <i
            className="mr-4 m-2 fas fa-sharp fa-regular fa-circle-info"
            aria-hidden="true"
          ></i>
          Versi 1.0
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
            Close
          </Button>
        </div>
      </Box>
    </div>
  );
}
