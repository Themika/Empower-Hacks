import "../CSS/Dashboard.css";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import Deposit from "../Components/Deposit";
import TransactionCard from "../Components/Transaction";
import image from "../Media/1571098.png";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [financeData, setFinanceData] = useState([]);
  const [currentChart, setCurrentChart] = useState(0); // State to manage the current chart
  const lastYearBalance = 200;
  const lastYearIncome = 500;

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

  const customCanvasBackgroundColor = {
    id: "customCanvasBackgroundColor",
    beforeDraw: (chart) => {
      const ctx = chart.canvas.getContext("2d");
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.fillRect(0, 0, chart.width, chart.height);
      ctx.restore();
    },
  };

  const getMonthName = (date) => {
    const monthNames = [
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
    ];
    return monthNames[date.getMonth()];
  };

  const aggregateByMonth = (type) => {
    return financeData
      .filter((data) => data.type === type)
      .reduce((acc, data) => {
        const date = new Date(data.date);
        const month = getMonthName(date);
        acc[month] = (acc[month] || 0) + data.amount;
        return acc;
      }, {});
  };

  const incomeByMonth = aggregateByMonth("Income");
  const expensesByMonth = aggregateByMonth("Expense");

  const allMonths = new Set([
    ...Object.keys(incomeByMonth),
    ...Object.keys(expensesByMonth),
  ]);

  const labels = [...allMonths].sort((a, b) => {
    const monthA = new Date(Date.parse(a + " 1, 2012")).getMonth();
    const monthB = new Date(Date.parse(b + " 1, 2012")).getMonth();
    return monthA - monthB;
  });

  const currentBalance = financeData.reduce((balance, data) => {
    return data.type === "Income"
      ? balance + data.amount
      : balance - data.amount;
  }, 0);

  const currentIncome = financeData
    .filter((data) => data.type === "Income")
    .reduce((income, data) => income + data.amount, 0);

  const percentageChangeBalance =
    ((currentBalance - lastYearBalance) / lastYearBalance) * 100;
  const isIncreaseBalance = percentageChangeBalance > 0;
  const percentageChangeBalanceFormatted = percentageChangeBalance.toFixed(2);

  const percentageChangeIncome =
    ((currentIncome - lastYearIncome) / lastYearIncome) * 100;
  const isIncreaseIncome = percentageChangeIncome > 0;
  const percentageChangeIncomeFormatted = percentageChangeIncome.toFixed(2);

  const incomeData = labels.map((label) => incomeByMonth[label] || 0);
  const expensesData = labels.map((label) => expensesByMonth[label] || 0);

  const expenseCategories = financeData
    .filter((data) => data.type === "Expense")
    .reduce((acc, data) => {
      acc[data.category] = (acc[data.category] || 0) + data.amount;
      return acc;
    }, {});

  const incomeCategories = financeData
    .filter((data) => data.type === "Income")
    .reduce((acc, data) => {
      acc[data.category] = (acc[data.category] || 0) + data.amount;
      return acc;
    }, {});

  const expenseData = {
    labels: Object.keys(expenseCategories),
    datasets: [
      {
        label: "Categories",
        data: Object.values(expenseCategories),
        backgroundColor: [
          "rgba(1, 5, 138, 1)",
          "rgba(154, 0, 123, 1)",
          "rgba(221, 0, 95, 1)",
          "rgba(255, 106, 71, 1)",
          "rgba(255, 180, 67, 1)",
        ],
        borderColor: [
          "rgba(1, 5, 138, 1)",
          "rgba(154, 0, 123, 1)",
          "rgba(221, 0, 95, 1)",
          "rgba(255, 106, 71, 1)",
          "rgba(255, 180, 67, 1)",
        ],
        borderRadius: 5,
      },
    ],
  };

  const incomeDataPie = {
    labels: Object.keys(incomeCategories),
    datasets: [
      {
        label: "Categories",
        data: Object.values(incomeCategories),
        backgroundColor: [
          "rgba(26, 168, 233, 1)",
          "rgba(0, 194, 234, 1)",
          "rgba(0, 216, 213, 1)",
          "rgba(68, 233, 177, 1)",
          "rgba(75, 148, 227, 1)",
        ],
        borderColor: [
          "rgba(26, 168, 233, 1)",
          "rgba(0, 194, 234, 1)",
          "rgba(0, 216, 213, 1)",
          "rgba(68, 233, 177, 1)",
          "rgba(75, 148, 227, 1)",
        ],
        borderRadius: 5,
      },
    ],
  };

  const onClickPieChart = () => {
    setCurrentChart((prevChart) => (prevChart + 1) % 2); // Toggle between 0 and 1
  };

  return (
    <div className="dashboard">
      <Navbar />
      <header className="learn-section">
        <div className="learn-section-1">
          <h1 className="balance">Balance</h1>
          <div className="balance-amount">
            <p className="balance-amount-text">
              {"$"}
              {currentBalance.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
            <div className="balance-amount-change">
              <span style={{ color: isIncreaseBalance ? "green" : "red" }}>
                {isIncreaseBalance ? "▲" : "▼"}{" "}
                {percentageChangeBalanceFormatted}%
              </span>
            </div>
          </div>
          <p className="balance-comparison">
            Compared to ($
            {lastYearBalance.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            last year)
          </p>
        </div>
        <div className="learn-section-2">
          <h1 className="income">Income</h1>
          <div className="income-amount">
            <p className="income-text">
              {"$"}
              {currentIncome.toLocaleString(undefined, {})}
            </p>
            <div className="income-amount-change">
              <span style={{ color: isIncreaseIncome ? "green" : "red" }}>
                {isIncreaseIncome ? "▲" : "▼"} {percentageChangeIncomeFormatted}
                %
              </span>
            </div>
          </div>
          <p className="income-comparison">
            Compared to ($
            {lastYearIncome.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            last year)
          </p>
        </div>
      </header>
      <main className="chart-layer">
        <div className="charts">
          <div className="linechart">
            <div className="chart">
              <Bar
                data={{
                  labels: labels,
                  datasets: [
                    {
                      label: "Income",
                      data: incomeData,
                      backgroundColor: "rgba(27,169,233,255)",
                      borderColor: "rgba(27,169,233, 0.5)",
                      borderWidth: 1,
                    },
                    {
                      label: "Expenses",
                      data: expensesData,
                      backgroundColor: "rgba(0,4,138,255)",
                      borderColor: "rgba(0,4,138, .5)",
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Income and Expenses",
                      color: "grey",
                      font: {
                        size: 20,
                      },
                    },
                    legend: {
                      position: "bottom",
                    },
                  },
                  scales: {
                    y: {
                      ticks: {
                        color: "grey",
                      },
                    },
                  },
                }}
                plugins={[customCanvasBackgroundColor]}
              />
            </div>
            <div className="header-container">
              <h2 className="savings">Savings</h2>
              <Link to="/DepositPage" className="read-more">
                <div className="Read-More">Read More</div>
              </Link>
            </div>
            <div className="tabs">
              {financeData.length > 0 &&
                financeData
                  .filter((item) => item.type === "Deposit")
                  .slice(0, 2)
                  .map((item, index) => (
                    <Deposit
                      key={index}
                      value1={item.amount}
                      value2={item.depositeAmount}
                    />
                  ))}
            </div>
          </div>
          <div className="piechart" onClick={onClickPieChart}>
            <Doughnut
              data={currentChart === 0 ? expenseData : incomeDataPie}
              options={{
                plugins: {
                  title: {
                    display: true,
                    text:
                      currentChart === 0
                        ? "Expenses by Category"
                        : "Income by Category",
                    color: "grey",
                    font: {
                      size: 20,
                    },
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              }}
            />
            <div className="Portfolio">
              <div className="learn-section-3">
                <div className="tabel">
                  <div className="transaction-header">
                    <h3 className="transaction">Transactions</h3>
                    <Link to="/transaction" className="read-more">
                      <h3>Read more</h3>
                    </Link>
                  </div>
                  <div className="transaction-grid">
                    {financeData.length > 0 &&
                      financeData
                        .slice(0, 6)
                        .filter((item) => item.status === "Pending")
                        .map((data, index) => (
                          <TransactionCard
                            key={index}
                            image={image}
                            name={data.name}
                            amount={data.amount}
                            date={new Date(data.date).toLocaleDateString()}
                            status={data.status}
                          />
                        ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
