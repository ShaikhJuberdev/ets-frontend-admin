import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BarChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "black", // Legend text color
        },
      },
      title: {
        display: true,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "black", // X-axis label color
        },
      },
      y: {
        ticks: {
          color: "black", // Y-axis label color
        },
      },
    },
  }

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    datasets: [
      {
        label: "iOS (Apple)",
        backgroundColor: "#e5e5e5",
        borderColor: "#e5e5e5",
        borderWidth: 1,
        data: [2, 3, 2, 4, 3, 2, 3, 2, 3],
      },
      {
        label: "Android",
        backgroundColor: "#66b267",
        borderColor: "#66b267",
        borderWidth: 1,
        data: [6, 7, 8, 7, 2, 9, 8, 7, 3],
      },
    ],
  }

  return (
    <div className="chart-container">
      <h5 className="chart-title">Monthly App Downloads by Platform</h5>
      <Bar options={options} data={data} height={300} />
    </div>
  )
}

export default BarChart
