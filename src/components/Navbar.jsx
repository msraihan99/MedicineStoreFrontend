import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPills, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaInfoCircle, FaThList } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-logo" onClick={() => navigate("/")}>
        <FaPills className="logo-icon" />
        <span>MedStore</span>
      </div>
      <ul className="nav-links">
        {user ? (
          <>
            <li><Link to="/dashboard"><FaThList /> Dashboard</Link></li>
            <li><Link to="/add-medicine"><FaPills /> Add Medicine</Link></li>
            <li><Link to="/medicines"><FaPills /> Medicines</Link></li>
            <li><Link to="/sell-medicine"><FaPills /> Sell</Link></li>
            <li><button onClick={handleLogout}><FaSignOutAlt /> Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login"><FaSignInAlt /> Login</Link></li>
            <li><Link to="/register"><FaUserPlus /> Register</Link></li>
            <li><Link to="/about-page"><FaInfoCircle /> About</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
