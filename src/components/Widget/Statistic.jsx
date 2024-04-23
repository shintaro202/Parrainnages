import React from "react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import "./widget.css";

Chart.register();

function Statistic({ ...props }) {
  const data = {
    labels: ["01-07 Jan", "08-14 Jan", "15-21 Jan", "22-28 Jan", "29-04 Feb", "05-11 Feb", "12-18 Feb"],
    datasets: [
      {
        label: "2024",
        data: ["89", "121", "144", "150", "170", "181", "190"],
      },
      {
        label: "Target",
        data: ["100", "120", "150", "170", "190"],
        type: "line",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
  };
  return (
    <div className={`widgetCard p-3 md:py-4 md:px-6 ${props.className}`}>
      <h1 className="text-medium font-semibold pb-4">Nombres de parrainnages</h1>
      <div className="">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default Statistic;
