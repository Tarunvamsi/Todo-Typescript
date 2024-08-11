import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface TodosDoughnutChartProps {
  pendingCount: number;
  completedCount: number;
}

const TodosDoughnutChart: React.FC<TodosDoughnutChartProps> = ({
  pendingCount,
  completedCount,
}) => {
  const data = {
    labels: ["Pending", "Completed"],
    datasets: [
      {
        data: [pendingCount, completedCount],
        backgroundColor: ["#f87171", "#34d399"],
        hoverBackgroundColor: ["#ef4444", "#10b981"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          color: "#ffffff",
        },
      },
      tooltip: {
        titleColor: "#ffffff", 
        bodyColor: "#ffffff",
      },
    },
  };

  return (
    <div className="w-32 h-32">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default TodosDoughnutChart;
