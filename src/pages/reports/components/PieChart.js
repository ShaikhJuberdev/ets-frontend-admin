import React, { useState } from "react"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js"
import { Pie } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

const PieChart = () => {
  const [selectedMonth, setSelectedMonth] = useState("Jan")

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        
      },
    },
  }

  const data = {
    labels: ["High priority Alerts", "Total Alerts", "Warning Alerts"],
    datasets: [
      {
        data: [40, 35, 25],
        backgroundColor: [
          "#66b267",
          "#b4eff7 ", 
          "#e5e5e5",
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  }

  const months = ["Jan", "Feb", "March"]

  return (
    <div className="chart-container">
      <h5 className="chart-title">Alerts</h5>
      <div className="month-filters">
        {months.map((month) => (
          <button
            key={month}
            className={`month-filter ${selectedMonth === month ? 'active' : ''}`}
            onClick={() => setSelectedMonth(month)}
          >
            {month}
          </button>
        ))}
      </div>
      <div className="pie-chart-wrapper">
        <h6 className="pie-title">Warning Alerts</h6>
        <Pie options={options} data={data} height={300} />
        <h6 className="pie-subtitle">High priority Alerts</h6>
      </div>
    </div>
  )
}

export default PieChart