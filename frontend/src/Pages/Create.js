import Navbar from "../Components/Navbar";
import "../CSS/CreatePage.css";
import { useState } from "react";
const CreatePage = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food"); // Fixed typo
  const [status, setStatus] = useState("Pending"); // Fixed typo
  const [type, setType] = useState("Income");
  const [tags, setTags] = useState([]);
  const [depositAmount, setDepositAmount] = useState(0); // Fixed typo
  const [isPending, setIsPending] = useState(false); // Fixed typo

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate fields
    if (!name || !date || !status || !category) {
      alert("Please fill all required fields.");
      return;
    }

    const transaction = {
      name,
      amount: type === "Deposit" ? depositAmount : amount,
      date,
      description,
      category,
      status, // Ensure this is being included
      type,
      tags,
      depositAmount: type === "Deposit" ? depositAmount : undefined,
    };
    setIsPending(true);
    fetch("http://localhost:4000/api/finances/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    })
      .then((res) => {
        if (res.ok) {
          alert("Created successfully");
          setIsPending(false);
        } else {
          return res.json().then((error) => {
            throw new Error(error.message);
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setIsPending(false);
      });
  };

  return (
    <div className="create-page-main">
      <Navbar />
      <div className="fill-form">
        <form onSubmit={handleSubmit}>
          <label>Enter the title</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Enter the type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option>Income</option>
            <option>Expense</option>
            <option>Deposit</option>
          </select>
          {type === "Deposit" && (
            <>
              <label>Enter the deposit amount</label>
              <input
                type="number"
                placeholder="Deposit Amount"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
              />
            </>
          )}

          {type !== "Deposit" && (
            <>
              <label>Enter the amount</label>
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </>
          )}

          <label>Enter the date</label>
          <input
            type="date"
            placeholder="Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>Enter category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Food</option>
            <option>Transport</option>
            <option>Utilities</option>
            <option>Entertainment</option>
            <option>Health</option>
            <option>Education</option>
            <option>Shopping</option>
            <option>Investment</option>
            <option>Salary</option>
            <option>Gift</option>
            <option>Bonus</option>
            <option>Other</option>
          </select>

          <label>Enter the description</label>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Enter the status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>Pending</option>
            <option>Completed</option>
            <option>Failed</option>
          </select>

          <label>Enter tags (comma separated)</label>
          <input
            type="text"
            placeholder="Tags"
            value={tags.join(", ")} // Convert tags array to comma-separated string
            onChange={(e) => setTags(e.target.value.split(",").map((tag) => tag.trim()))}
          />

          {!isPending && <button>Create</button>}
          {isPending && <button disabled>Creating...</button>}
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
