import React from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddMedicine from "./pages/AddMedicine";
import SellMedicine from "./pages/SellMedicine";
import MedicineList from "./pages/MedicineList";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./pages/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/about-page" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/home" element={<Home />} /> */} 
        {/* <Route path="/add-medicine" element={<AddMedicine />} /> */}
        {/* <Route path="/sell-medicine" element={<SellMedicine />} /> */}
        {/* <Route path="/medicines" element={<MedicineList />} /> */}
        <Route path="*" element={<NotFound />} />

        <Route
          path="/medicines"
          element={
            <ProtectedRoute>
              <MedicineList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-medicine"
          element={
            <ProtectedRoute>
              <AddMedicine />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sell-medicine"
          element={
            <ProtectedRoute>
              <SellMedicine />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
