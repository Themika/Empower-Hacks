import moneyBag from "../Media/1571098.png";
import "../CSS/Deposit.css";
import { useEffect, useRef } from "react";

const Deposit = ({ value1, value2 }) => {
  const progressBarRef = useRef(null);

  function updateProgressBar(progressBar, value) {
    value = Math.round(value);
    if (progressBar) {
      progressBar.querySelector(".progress-fill").style.width = `${value}%`;
      progressBar.querySelector(".progress-text").textContent = `${value}%`;
    }
  }

  useEffect(() => {
    const percentage = (value1 / value2) * 100;
    updateProgressBar(progressBarRef.current, percentage);
  }, [value1, value2]);

  return (
    <div className="deposit">
      <div className="background-circle">
        <img src={moneyBag} className="image-money-bag" alt="Money Bag" />
      </div>
      <div className="right-text">
        <h3>Deposit</h3>
        <div className="value-container">
          <div className="value-1">${value1}</div>
          <div className="value-2"> / ${value2}</div>
        </div>
        <div className="progress-bar" ref={progressBarRef}>
          <div className="progress-fill"></div>
          <div className="progress-text">0%</div>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
