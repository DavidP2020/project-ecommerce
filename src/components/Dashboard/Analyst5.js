import React from "react";
import { CircularProgress } from "@mui/material";
import { Line, Pie } from "react-chartjs-2";
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

export default function Analyst5({ data, ...props }) {
  const dataGraphic = {
    labels: data.map((item) =>
      item.status === "settlement"
        ? "Paid"
        : item.status === "Unpaid"
        ? "Unpaid"
        : item.status === "pending"
        ? "Pending"
        : item.status === "error"
        ? "Error"
        : "Other"
    ),
    datasets: [
      {
        label: "Status Pembelian Tahun Ini",
        data: data.map((item) => item.count),
        backgroundColor: [
          "#FF851B",
          "#2ECC40",
          "#FF4136",
          "#0074D9",
          "#B10DC9",
          "#7FDBFF",
          "#FFDC00",
          "#001f3f",
          "#39CCCC",
          "#01FF70",
          "#85144b",
          "#F012BE",
          "#3D9970",
          "#111111",
          "#AAAAAA",
        ],
      },
    ],
  };

  const options = {};
  const loading = (
    <>
      <CircularProgress />
    </>
  );
  return (
    <div>
      <Pie data={dataGraphic} options={options}></Pie>
    </div>
  );
}
