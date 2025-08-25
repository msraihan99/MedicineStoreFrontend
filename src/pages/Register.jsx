import React, { useState } from "react";
import "./Register.css";
import "./RegisterModal.css"; // Add this for modal styling
import { useNavigate } from "react-router-dom";

export default function Register() {
  
  const [form, setForm] = useState({
    username: "",
    email: "",
    mobileNo: "",
    password: "",
  });

  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8095/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        const result = await response.json();
        setModalMessage(`✅ Registered Successfully!\nWelcome ${result.username}`);
        setForm({ username: "", email: "", mobileNo: "", password: "" });

         navigate("/login");
         
      } else {
        const error = await response.json();
        setModalMessage(`❌ Registration failed: ${error.message || "Email already exists!"}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setModalMessage("❌ An error occurred while registering. Please try again later.");
    }

    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="register-page">
      <div className="register-glass">
        <h2 className="register-title">Create Your Account</h2>
        <p className="register-subtitle">
          Join MedStore and manage your medicines efficiently.
        </p>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="floating-label">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              placeholder=" "
              autoComplete="off"
            />
            <label>Name</label>
          </div>
          <div className="floating-label">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder=" "
              autoComplete="off"
            />
            <label>Email</label>
          </div>
          <div className="floating-label">
            <input
              type="text"
              name="mobileNo"
              value={form.mobileNo}
              onChange={handleChange}
              required
              placeholder=" "
              autoComplete="off"
            />
            <label>Mobile Number</label>
          </div>
          <div className="floating-label">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder=" "
              autoComplete="off"
            />
            <label>Password</label>
          </div>
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <p>{modalMessage}</p>
            <button onClick={closeModal} className="modal-close-btn">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}
