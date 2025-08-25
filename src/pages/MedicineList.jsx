import React, { useEffect, useState } from "react";
import "./MedicineList.css";
import medicine2 from "../assets/medicine2.jpg";

export default function MedicineList() {
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8095/medicines/get-medicines")
      .then((response) => response.json())
      .then((data) => setMedicines(data))
      .catch((error) => console.error("Error fetching medicines:", error));
  }, []);

  return (
    <div className="medicine-container">
      <h2>🩺 Available Medicines</h2>
      <div className="medicine-grid">
        {medicines.length > 0 ? (
          medicines.map((med, index) => (
            <div className="medicine-card" key={med.id || index}>
              <img
                src={medicine2} // Replace with real image path if available
                alt={med.medicineName}
                className="medicine-img"
              />
              <div className="medicine-info">
                <h3>{med.medicineName}</h3>
                <p><strong>Price:</strong> ₹{med.price}</p>
                <p><strong>Quantity:</strong> {med.quantity}</p>
                
              </div>
              <button className="buy-button">Add to Cart</button>
            </div>
          ))
        ) : (
          <p className="no-data">No medicines available</p>
        )}
      </div>
    </div>
  );
}
