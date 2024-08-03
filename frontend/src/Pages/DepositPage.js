import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import "../CSS/DepositPage.css";
import { FaTrash } from 'react-icons/fa'; // Importing a trash icon from react-icons

const DepositPage = () => {
  const [financeData, setFinanceData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDeposit, setSelectedDeposit] = useState(null);

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

  const handleCardClick = (deposit) => {
    setSelectedDeposit(deposit);
  };

  const handleCloseModal = () => {
    setSelectedDeposit(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedDeposit({ ...selectedDeposit, [name]: value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/finances/${selectedDeposit._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedDeposit),
      });
      if (!res.ok) {
        throw new Error("Network response failed");
      }
      const updatedDeposit = await res.json();
      setFinanceData((prevData) =>
        prevData.map((item) =>
          item._id === updatedDeposit._id ? updatedDeposit : item
        )
      );
      handleCloseModal();
    } catch (error) {
      console.error("Failed to update data :( :", error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/finances/${selectedDeposit._id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Network response failed");
      }
      setFinanceData((prevData) =>
        prevData.filter((item) => item._id !== selectedDeposit._id)
      );
      handleCloseModal();
    } catch (error) {
      console.error("Failed to delete data :( :", error);
    }
  };

  const filteredFinanceData = financeData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="deposit-page">
      <Navbar />
      <h1 className="title">Deposit Page</h1>
      <input
        type="text"
        className="search-bar"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="deposit-container">
        {filteredFinanceData.length > 0 &&
          filteredFinanceData
            .filter((item) => item.type === "Deposit")
            .map((item, index) => (
              <div className="deposit-card" key={index} onClick={() => handleCardClick(item)}>
                <div className="details">
                  <h3>{item.name}</h3>
                  <p className="date">{new Date(item.date).toLocaleDateString()}</p>
                </div>
                <p className={`amount ${item.amount > 0 ? 'positive' : 'negative'}`}>
                  {item.amount > 0 ? `+${item.amount}` : item.amount}
                </p>
              </div>
            ))}
      </div>
      {selectedDeposit && (
        <div className="modal">
          <div className="modal-content">
            <FaTrash className="delete-icon" onClick={handleDelete} />
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2 className="edit-diposit">Edit Deposit</h2>

            <form>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={selectedDeposit.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Amount:
                <input
                  type="number"
                  name="amount"
                  value={selectedDeposit.amount}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Deposit Amount:
                <input
                  type="number"
                  name="depositeAmount"
                  value={selectedDeposit.depositeAmount}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Date:
                <input
                  type="date"
                  name="date"
                  value={new Date(selectedDeposit.date).toISOString().substr(0, 10)}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Category:
                <select
                  name="category"
                  value={selectedDeposit.category}
                  onChange={handleInputChange}
                >
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Health">Health</option>
                  <option value="Education">Education</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Investment">Investment</option>
                  <option value="Salary">Salary</option>
                  <option value="Gift">Gift</option>
                  <option value="Bonus">Bonus</option>
                  <option value="Other">Other</option>
                </select>
              </label>
              <label>
                Description:
                <textarea
                  name="description"
                  value={selectedDeposit.description}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Status:
                <select
                  name="status"
                  value={selectedDeposit.status}
                  onChange={handleInputChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Failed">Failed</option>
                </select>
              </label>
              <label>
                Type:
                <select
                  name="type"
                  value={selectedDeposit.type}
                  onChange={handleInputChange}
                >
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                  <option value="Deposit">Deposit</option>
                </select>
              </label>
              <label>
                Tags:
                <input
                  type="text"
                  name="tags"
                  value={selectedDeposit.tags.join(", ")}
                  onChange={(e) => handleInputChange({ target: { name: "tags", value: e.target.value.split(", ") } })}
                />
              </label>
              <button type="button" onClick={handleSave}>Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepositPage;
