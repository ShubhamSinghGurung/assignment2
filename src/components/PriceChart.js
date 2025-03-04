import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the chart components (mandatory in Chart.js v3+)
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PriceChart = ({ predictedPrice, actualPrices }) => {
  const data = {
    labels: ["Property 1", "Property 2", "Property 3", "Property 4", "Current Property"],
    datasets: [
      {
        label: "Actual Prices",
        data: [...actualPrices, null],  // add null for the current property, as it's not part of actual dataset
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.3,
      },
      {
        label: "Predicted Price",
        data: [null, null, null, null, predictedPrice],  // only show predicted price at current property
        fill: false,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Predicted vs Actual Prices",
      },
    },
  };

  return (
    <div className="mt-4">
      <h5 className="text-center">Price Comparison Chart</h5>
      <Line data={data} options={options} />
    </div>
  );
};

export default PriceChart;
