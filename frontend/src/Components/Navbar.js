import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaChartBar, FaExchangeAlt, FaPiggyBank, FaBook, FaPlus, FaChartLine, FaRobot, FaDownload } from 'react-icons/fa';
import '../CSS/Navbar.css';

const Navbar = () => {
    return (
        <nav className="Navbare">
            <ul>
                <li>
                    <Link to='/home'>
                        <FaHome className="icon" /> Home
                    </Link>
                </li>
                <li>
                    <Link to='/dashboard'>
                        <FaChartBar className="icon" /> Dashboard
                    </Link>
                </li>
                <li>
                    <Link to='/transaction'>
                        <FaExchangeAlt className="icon" /> Transaction
                    </Link>
                </li>
                <li>
                    <Link to='/DepositPage'>
                        <FaPiggyBank className="icon" /> Deposit Page
                    </Link>
                </li>
                <li>
                    <Link to='/learn'>
                        <FaBook className="icon" /> Learn
                    </Link>
                </li>
                <li>
                    <Link to='/create'>
                        <FaPlus className="icon" /> Create
                    </Link>
                </li>
                <li>
                    <Link to='/analytics'>
                        <FaChartLine className="icon" /> Analytics
                    </Link>
                </li>
                <li>
                    <Link to='/AI'>
                        <FaRobot className="icon" /> Personal Assistant
                    </Link>
                </li>
            </ul>
            <div className="download">
                <button>
                    <FaDownload className="icon" /> Download monthly report
                </button>
            </div>
            <div className="dark-mode">
                <label>Dark Mode</label>
                <input type="checkbox" />
            </div>
        </nav>
    );
};

export default Navbar;
