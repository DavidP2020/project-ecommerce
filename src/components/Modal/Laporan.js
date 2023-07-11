import React, { useState } from "react";
import { Button, CircularProgress, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

export default function Laporan({ handleClose, ...props }) {
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(date);
    navigate(`/laporan-tahunan/${date}`);
  };
  const setYear = [];
  for (let i = 0; i < 10; i++) {
    setYear.push(new Date().getFullYear() - i);
  }

  return (
    <div>
      {/*  */}
      <Box
        sx={{
          "& .MuiTextField-root": { m: 1, width: "36ch" },
        }}
        component={"div"}
      >
        <div className="mb-6">Pilih Tahun Untuk Melihat Laporan</div>

        <div>
          <TextField
            select
            label="Year"
            helperText="Please select your Status"
            name="date"
            //   value={state.status}
            variant="outlined"
            onChange={(e) => setDate(e.target.value)}
          >
            {setYear.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
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
          <Button variant="contained" onClick={handleSubmit} disabled={!date}>
            Submit
          </Button>
        </div>
      </Box>
    </div>
  );
}
