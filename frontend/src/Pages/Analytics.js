import React from "react";
import Navbar from "../Components/Navbar";
import { Line, PolarArea } from "react-chartjs-2";
import { useEffect, useState } from "react";
import "../CSS/Analytics.css";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale
);

const Analytics = () => {
  const [financeData, setFinanceData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/finances");
        if (!res.ok) {
          throw new Error("Network response failed");
        }
        const data = await res.json();
        setFinanceData(data);
      } catch (error) {
        console.error("Failed to fetch data :( :", error);
      }
    };

    fetchData();
  }, []);

  const DepositOverAYear = Array(12).fill(0);
  financeData
    .filter((finance) => finance.type === "Deposit")
    .forEach((finance) => {
      const month = new Date(finance.date).getMonth();
      DepositOverAYear[month] += finance.depositeAmount;
    });

  const incomeOverAYear = Array(12).fill(0);
  financeData
    .filter((finance) => finance.type === "Income")
    .forEach((finance) => {
      const month = new Date(finance.date).getMonth();
      incomeOverAYear[month] += finance.amount;
    });

  const expenseOverAYear = Array(12).fill(0);
  financeData
    .filter((finance) => finance.type === "Expense")
    .forEach((finance) => {
      const month = new Date(finance.date).getMonth();
      expenseOverAYear[month] += finance.amount;
    });

  const InvestementOverAYear = Array(12).fill(0);
  financeData
    .filter((finance) => finance.category === "Investment")
    .forEach((finance) => {
      const month = new Date(finance.date).getMonth();
      InvestementOverAYear[month] += finance.amount;
    });

  const currentMonth = new Date().getMonth();
  const daysInMonth = new Date(
    new Date().getFullYear(),
    currentMonth + 1,
    0
  ).getDate();
  const pendingPaymentsOverMonth = Array(daysInMonth).fill(0);
  const failedPaymentsOverMonth = Array(daysInMonth).fill(0);
  const completedPaymentsOverMonth = Array(daysInMonth).fill(0);

  financeData.forEach((finance) => {
    const date = new Date(finance.date);
    if (date.getMonth() === currentMonth) {
      const day = date.getDate() - 1;
      if (finance.status === "Pending") {
        pendingPaymentsOverMonth[day]++;
      } else if (finance.status === "Failed") {
        failedPaymentsOverMonth[day]++;
      } else if (finance.status === "Completed") {
        completedPaymentsOverMonth[day]++;
      }
    }
  });

  return (
    <div className="Analytics">
      <Navbar />
      <h2>Analytics</h2>
      <div className="chart-section">
        <div className="chart-card">
          <Line
            data={{
              labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              datasets: [
                {
                  label: "Income",
                  data: Object.values(incomeOverAYear),
                  fill: false,
                  backgroundColor: "rgb(75, 192, 192)",
                  borderColor: "rgba(75, 192, 192, 0.2)",
                },
                {
                  label: "Expense",
                  data: Object.values(expenseOverAYear),
                  fill: false,
                  backgroundColor: "rgb(255, 99, 132)",
                  borderColor: "rgba(255, 99, 132, 0.2)",
                },
                {
                  label: "Deposit",
                  data: Object.values(DepositOverAYear),
                  fill: false,
                  backgroundColor: "rgb(255, 205, 86)",
                  borderColor: "rgba(255, 205, 86, 0.2)",
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Monthly Financial Overview",
                },
              },
            }}
          />
        </div>
        <div className="chart-card">
          <Line
            data={{
              labels: [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              datasets: [
                {
                  label: "Investment",
                  data: Object.values(InvestementOverAYear),
                  fill: false,
                  backgroundColor: "rgb(75, 192, 192)",
                  borderColor: "rgba(75, 192, 192, 0.2)",
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Investment Over the Year",
                },
              },
            }}
          />
        </div>
        <div className="chart-card">
          <Line
            data={{
              labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
              datasets: [
                {
                  label: "Pending Payments",
                  data: Object.values(pendingPaymentsOverMonth),
                  fill: false,
                  backgroundColor: "rgb(153, 102, 255)",
                  borderColor: "rgba(153, 102, 255, 0.2)",
                },
                {
                  label: "Failed Payments",
                  data: Object.values(failedPaymentsOverMonth),
                  fill: false,
                  backgroundColor: "rgb(255, 99, 132)",
                  borderColor: "rgba(255, 99, 132, 0.2)",
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Failed and Pending Payments Over the Month",
                },
              },
            }}
          />
          <Line
            data={{
              labels: Array.from({ length: daysInMonth }, (_, i) => i + 1),
              datasets: [
                {
                  label: "Completed Payments",
                  data: Object.values(completedPaymentsOverMonth),
                  fill: false,
                  backgroundColor: "rgb(75, 192, 192)",
                  borderColor: "rgba(75, 192, 192, 0.2)",
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Completed Payments Over the Month",
                },
              },
            }}
          />
        </div>
        <div className="chart-card">
          <PolarArea
            data={{
              labels: ["Income", "Expense", "Deposit"],
              datasets: [
                {
                  label: "Finance Data",
                  data: [
                    incomeOverAYear.reduce((a, b) => a + b, 0),
                    expenseOverAYear.reduce((a, b) => a + b, 0),
                    DepositOverAYear.reduce((a, b) => a + b, 0),
                  ],
                  backgroundColor: [
                    "rgb(75, 192, 192)",
                    "rgb(255, 99, 132)",
                    "rgb(255, 205, 86)",
                  ],
                },
              ],
            }}
            options={{
              plugins: {
                title: {
                  display: true,
                  text: "Finance Data Overview",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
