import React, { useState, useEffect } from "react";
import Card from "../Components/Card";
import Navbar from "../Components/Navbar";
import "../CSS/Learning.css";
import Modal from "../Components/learnModal"; // Correctly import the Modal component
import image from "../Media/1.png";

const Learning = () => {
  const [data, setData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null); // State for the selected card
  const [searchQuery, setSearchQuery] = useState(""); // State for the search query

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchData = async (endpoint) => {
          const response = await fetch(`http://localhost:5000/${endpoint}`);
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            console.log(`Fetched data from endpoint ${endpoint}:`, data);
            if (Array.isArray(data)) {
              return data;
            } else if (data && typeof data === 'object') {
              return [data]; // Convert the single object to an array
            } else {
              console.error("Error: Data is neither an array nor an object");
              return [];
            }
          } else {
            console.error("Error: Response is not JSON");
            return [];
          }
        };

        const data0 = await fetchData(0);
        const data1 = await fetchData(1);
        const data2 = await fetchData(2);
        const data3 = await fetchData(3);
        const data4 = await fetchData(4);
        const data5 = await fetchData(5);
        const data6 = await fetchData(6);
        const data7 = await fetchData(7);
        const data8 = await fetchData(8);
        const data9 = await fetchData(9);
        const data10 = await fetchData(10);
        const data11 = await fetchData(11);
        setData([...data0, ...data1, ...data2, ...data3, ...data4, ...data5, ...data6, ...data7, ...data8, ...data9, ...data10, ...data11]); // Combine data from both endpoints
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getData();
  }, []); // Add dependency array to avoid infinite loop

  const handleCardClick = (item) => {
    setSelectedCard(item); // Set the selected card data
  };

  const handleCloseModal = () => {
    setSelectedCard(null); // Close the modal
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update the search query state
  };

  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  ); // Filter data based on the search query

  return (
    <div className="learning">
      <input 
        type="text" 
        className="search-bar" 
        placeholder="Search..." 
        value={searchQuery} 
        onChange={handleSearchChange} // Handle search input change
      />
      <Navbar />
      <div className="home-learning">
        <div className="home-card">
          {Array.isArray(filteredData) && filteredData.map((item, index) => (
            <Card
              key={index}
              image={image} // Ensure the item contains an image
              title={item.name} // Ensure the item contains a title
              description={item.description} // Ensure item.description is a string
              link={item.link} // Ensure item.link is a string
              onClick={() => handleCardClick(item)} // Handle card click
            />
          ))}
        </div>
      </div>
      {selectedCard && (
        <Modal
          isOpen={!!selectedCard} // Pass whether the modal is open
          content={
            <div>
              <h2>{selectedCard.name}</h2>
              <p>{selectedCard.description}</p>
              <a href={selectedCard.link} target="_blank" rel="noopener noreferrer">Learn more</a>
            </div>
          }
          onClose={handleCloseModal} // Pass the close handler
        />
      )}
    </div>
  );
};

export default Learning;