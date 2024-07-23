import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const LineChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    console.log("Chart data:", data); // Log the chart data to the console

    chartInstance.current = new Chart(chartRef.current, {
      type: "line",
      data: {
        labels: data.map((entry) => entry.date),
        datasets: [
          {
            label: "Price",
            data: data.map((entry) => entry.price),
            borderColor: "rgba(8, 3, 5, 1)",
            backgroundColor: "rgba(8, 3, 5, 0.5)",
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          x: {
            display: true,
          },
          y: {
            display: true,
          },
        },
      },
    });

    return () => {
      chartInstance.current.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default LineChart;
