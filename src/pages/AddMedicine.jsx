import React, { useState } from "react";
import "./AddMedicine.css";
import medicalBg from "../assets/medicine1.jpg"; // Importing image

function AddMedicine() {
  const [form, setForm] = useState({
    medicineName: "",
    price: "",
    quantity: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8095/medicines/add-medicine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("✅ Medicine added successfully!");
        // ✅ Corrected reset
        setForm({ medicineName: "", price: "", quantity: "", description: "" });
      } else {
        alert("❌ Failed to add medicine.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("🚨 Something went wrong!");
    }
  };

  return (
    <div
      className="addmedicine-wrapper"
      style={{ backgroundImage: `url(${medicalBg})` }}
    >
      <div className="addmedicine-container">
        <h2 className="heading">➕ Add New Medicine</h2>
        <form onSubmit={handleSubmit} className="addmedicine-form">
          <div className="input-group">
            <input
              type="text"
              name="medicineName"
              value={form.medicineName}
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder=" "
            />
            <label>Medicine Name</label>
          </div>

          <div className="input-group">
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder=" "
            />
            <label>Price</label>
          </div>

          <div className="input-group">
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              required
              autoComplete="off"
              placeholder=" "
            />
            <label>Quantity</label>
          </div>

          <div className="input-group">
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              placeholder=" "
              rows="3"
            />
            <label>Description</label>
          </div>

          <button type="submit" className="submit-btn">
            Add Medicine
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMedicine;
