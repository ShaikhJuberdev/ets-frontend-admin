import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const LineChart = () => {
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
    scales: {
      y: {
        beginAtZero: true,
        max: 400,
        title: {
          display: true,
          text: "Message Count",
        },
      },
    },
  }

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Messages Sent",
        data: [260, 200, 280, 350, 320, 300, 360],
        borderColor: "#01b9d1",
        backgroundColor: "rgba(60, 76, 207, 0.1)",
        tension: 0,
      },
      {
        label: "Messages Opened",
        data: [120, 100, 140, 180, 160, 150, 170],
        borderColor:"#ffb750",
        backgroundColor: "rgba(255, 107, 53, 0.1)",
        tension: 0,
      },
    ],
  }

  return (
    <div className="chart-container">
      <h5 className="chart-title">Broadcast message performance</h5>
      <Line options={options} data={data} height={300} />
    </div>
  )
}

export default LineChart