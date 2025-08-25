import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-hero">
      <div className="home-overlay"></div>
      <div className="home-content">
        <h1>
          Welcome to <span>MedStore</span>
        </h1>
        <p>
          Your smart solution to manage medicines, track inventory, and stay
          organized.
        </p>
        <Link to="/add-medicine" className="cta-btn">
          + Add Medicine
        </Link> <br /> <br />
        <Link to="/sell-medicine" className="cta-btn">
          💊 Sell Medicine
        </Link>
      </div>
      <div className="shape shape1"></div>
      <div className="shape shape2"></div>
      <div className="shape shape3"></div>
    </div>
  );
}

export default Home;
