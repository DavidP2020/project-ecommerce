import React from "react";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

export default function Detail({ data, handleClose, ...props }) {
  return (
    <div>
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "36ch" },
        }}
        component={"div"}
      >
        <div className="mb-6 whitespace-pre-line">
          <div>- Nama : {data.name}</div>
          <div>- Email : {data.email}</div>
          <div>- No Handphone : {data.name}</div>
          <div>- Jenis Kelamin : {data.gender}</div>
          <div>
            - Tempat Tanggal Lahir : {data.place_of_birth}, {data.date_of_birth}
          </div>
          <div>- Alamat : {data.address}</div>
          <div>- Kota : {data.city}</div>
          <div>- Negara : {data.state}</div>
          <div>- Kode Pos : {data.zip}</div>
          <div>- Role : {data.role}</div>
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
        </div>
      </Box>
    </div>
  );
}
