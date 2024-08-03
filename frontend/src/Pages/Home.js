import Navbar from "../Components/Navbar";
import "../CSS/Home.css";
import myImage from "../Media/ori_3740563_rftrnckni7dn4mw3ir8nyi2cp7c30c0nvrp0ugsa_finance-flat-design-vector-illustration-removebg-preview.jpg";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="section-text">
        <div className="text">
          <h1>Learn Financial Literacy</h1>
          <p>
            Start learning to take control of your money with our online
            courses. Join our community to improve your financial skills.
          </p>
        </div>
        <img src={myImage} alt="" />
      </div>
    </div>
  );
};

export default Home;
