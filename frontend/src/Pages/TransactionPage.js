import { useEffect, useState } from "react";
import TransactionCard from "../Components/Transaction";
import image from "../Media/1571098.png";
import "../CSS/TransactionPage.css";
import Navbar from "../Components/Navbar";

const TransactionPage = () => {
  const [financeData, setFinanceData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isActive, setIsActive] = useState(true); // Assuming the page is active by default

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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSave = async (id, name, amount, status) => {
    try {
      const response = await fetch(`http://localhost:4000/api/finances/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          amount,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedTransaction = await response.json();

      setFinanceData((prevData) =>
        prevData.map((transaction) =>
          transaction._id === id ? updatedTransaction : transaction
        )
      );
    } catch (error) {
      console.error('There was a problem with the PATCH request:', error);
    }
  };

  const filteredFinanceData = financeData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`Transaction-Page ${isActive ? "active" : ""}`}>
      <input
        type="text"
        className="search-bar"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <Navbar />
      <div className="transaction-list">
        {filteredFinanceData.map((transaction) => {
          const formattedDate = new Date(transaction.date).toLocaleDateString();
          console.log(transaction._id); // Log the transaction id

          return (
            <TransactionCard
              key={transaction._id}
              image={image}
              name={transaction.name}
              amount={transaction.amount}
              date={formattedDate}
              status={transaction.status}
              id={transaction._id}
              onSave={handleSave}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TransactionPage;
