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
      },
      title: {
        display: true,
      
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
      "Daily Usage"
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