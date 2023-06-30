import React from "react";
import { CircularProgress } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

export default function Analyst2({ labelData, total, ...props }) {
  const dataGraphic = {
    labels: labelData,
    datasets: [
      {
        label: "Total Penghasilan",
        data: total,
        backgroundColor: "transparent",
        borderColor: "#F26C6D",
        fill: true,
        pointBorderColor: "red",
        pointBorderWidth: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "right" },
      title: { display: true, text: "Total Penghasilan" },
    },
  };
  const loading = (
    <>
      <CircularProgress />
    </>
  );
  return (
    <div>
      <Line data={dataGraphic} options={options}></Line>
    </div>
  );
}
