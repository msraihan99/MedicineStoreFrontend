import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-section">
      <div className="about-content">
        <h1>About <span>MedStore</span></h1>
        <p>
          <strong>MedStore</strong> is an advanced and intuitive medicine store
          management system designed to make your inventory management
          effortless. Whether you need to track stock, manage medicines, or
          keep track of sales, MedStore is here to simplify your workflow.
        </p>
        <p>
          Built with <b>React</b> and <b>Spring Boot</b>, it ensures fast
          performance, seamless API integration, and a smooth user experience.
        </p>
        <p>
          With MedStore, say goodbye to manual work and hello to automation!
        </p>
      </div>
      <div className="about-image">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png"
          alt="About MedStore"
        />
      </div>
    </div>
  );
}

export default About;
