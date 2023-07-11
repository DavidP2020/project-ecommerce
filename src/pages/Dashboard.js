import React, { useState } from "react";
import "../App.css";
import { CircularProgress, TextField, MenuItem } from "@mui/material";
import DashboardData from "../components/Dashboard/DashboardData";

export default function Dashboard() {
  const [date, setDate] = useState(new Date().getFullYear());
  const setYear = [];
  for (let i = 0; i < 10; i++) {
    setYear.push(new Date().getFullYear() - i);
  }
  const handleInputChange = (e) => {
    setDate(e.target.value);
    console.log(e.target.value);
  };
  return (
    <div className="p-7 pt-4 text-2xl font-semibold flex-1 h-full">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1>Analisis Dashbor</h1>
        </div>
        <div className="flexInput">
          <TextField
            select
            label="Year"
            name="date"
            value={date}
            variant="outlined"
            onChange={handleInputChange}
          >
            {setYear.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>
      </div>
      <DashboardData date={date} />
    </div>
  );
}
