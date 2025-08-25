import React, { useState, useEffect } from "react";
import "./SellMedicine.css";

function SellMedicine() {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [medicineList, setMedicineList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Fetch medicines on mount
  useEffect(() => {
    fetch("http://localhost:8095/medicines/get-medicines")
      .then((res) => res.json())
      .then((data) => setMedicines(data))
      .catch((err) => console.error(err));
  }, []);

  // Auto-fill price/total
  useEffect(() => {
    const med = medicines.find((m) => m.medicineName === selectedMedicine);
    if (med) {
      setPrice(med.price);
      setTotal(med.price * quantity);
    }
  }, [selectedMedicine, quantity, medicines]);

  const handleAddMedicine = () => {
    if (!selectedMedicine || quantity < 1) return;

    const med = medicines.find((m) => m.medicineName === selectedMedicine);
    if (!med) return;

    if (quantity > med.quantity) {
      alert("⚠️ Quantity exceeds available stock.");
      return;
    }

    const newEntry = {
      medicineName: selectedMedicine,
      price: med.price,
      quantity,
      total: med.price * quantity,
    };

    if (editIndex !== null) {
      const updatedList = [...medicineList];
      updatedList[editIndex] = newEntry;
      setMedicineList(updatedList);
      setEditIndex(null);
    } else {
      if (medicineList.length >= 10) {
        alert("⚠️ Cannot add more than 10 medicines.");
        return;
      }
      setMedicineList([...medicineList, newEntry]);
    }

    // Reset
    setSelectedMedicine("");
    setQuantity(1);
    setPrice(0);
    setTotal(0);
  };

  const handleEdit = (index) => {
    const item = medicineList[index];
    setSelectedMedicine(item.medicineName);
    setQuantity(item.quantity);
    setPrice(item.price);
    setTotal(item.total);
    setEditIndex(index);
  };

  const handleSubmitSale = async () => {
    if (medicineList.length === 0) {
      alert("⚠️ No medicines added to the sale.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8095/medicines/sell", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: medicineList }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const pdfURL = window.URL.createObjectURL(blob);
        window.open(pdfURL); // Open PDF in new tab

        alert("✅ Sale completed. PDF generated.");
        setMedicineList([]);
      } else {
        alert("❌ Failed to submit sale.");
      }
    } catch (error) {
      console.error("🚨 Error during sale submission:", error);
      alert("🚨 Something went wrong while submitting the sale.");
    }
  };

  const calculateGrandTotal = () => {
    return medicineList.reduce((sum, item) => sum + item.total, 0).toFixed(2);
  };

  return (
    <div className="sell-wrapper">
      <h2>💊 Sell Medicine</h2>

      <div className="sell-form">
        <select
          value={selectedMedicine}
          onChange={(e) => setSelectedMedicine(e.target.value)}
          required
        >
          <option value="">-- Select Medicine --</option>
          {medicines.map((med) => (
            <option key={med.id} value={med.medicineName}>
              {med.medicineName}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder="Quantity"
          required
        />

        <input
          type="number"
          value={price}
          readOnly
          placeholder="Price per item"
        />
        <input type="number" value={total} readOnly placeholder="Total" />

        <button type="button" onClick={handleAddMedicine}>
          {editIndex !== null ? "✏️ Update" : "➕ Add"}
        </button>
      </div>

      <div className="sell-list">
        <h3>🧾 Sale Items</h3>
        <table>
          <thead>
            <tr>
              <th>Medicine</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicineList.map((item, index) => (
              <tr key={index}>
                <td>{item.medicineName}</td>
                <td>{item.quantity}</td>
                <td>₹{item.price}</td>
                <td>₹{item.total}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>✏️ EDIT</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {medicineList.length > 0 && (
          <div className="total-amount">
            <strong>Grand Total: ₹{calculateGrandTotal()}</strong>
          </div>
        )}
      </div>

      <button className="submit-sale-btn" onClick={handleSubmitSale}>
        🧾 Submit Sale
      </button>
    </div>
  );
}

export default SellMedicine;
