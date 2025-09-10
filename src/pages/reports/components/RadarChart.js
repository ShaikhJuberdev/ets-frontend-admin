import React from "react"
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js"
import { Radar } from "react-chartjs-2"

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

const RadarChart = () => {
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
      r: {
        angleLines: {
          color: "#ccc", // radial grid line color (optional tweak)
        },
        grid: {
          color: "#ddd", // circular grid line color (optional tweak)
        },
        pointLabels: {
          color: "black", // Axis labels (Returning Users, Active Users, etc.)
        },
        ticks: {
          color: "black", // Numbers (50, 60, 70, etc.)
        },
      },
    },
  }

  const data = {
    labels: [
      "Returning Users",
      "Active Users",
      "Downloads",
      "Retention",
      "Engagement",
      "Daily Usage",
    ],
    datasets: [
      {
        label: "Total User",
        data: [70, 60, 85, 90, 45, 50],
        backgroundColor: "rgba(2, 164, 153, 0.2)",
        borderColor: "#02a499",
        pointBackgroundColor: "#02a499",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#02a499",
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="chart-container">
      <h5 className="chart-title">Total Users</h5>
      <Radar options={options} data={data} height={300} />
    </div>
  )
}

export default RadarChart
