import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./DonorRegister.css";

// States and cities mapping (as you have provided)
const statesAndCities = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati", "Kurnool", "Rajahmundry", "Kakinada", "Anantapur", "Eluru"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang", "Ziro", "Bomdila", "Daporijo", "Along", "Tezu", "Roing"],
  "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Tezpur", "Nagaon", "Tinsukia", "Bongaigaon", "Dhubri", "Goalpara"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Bihar Sharif", "Arrah", "Begusarai", "Katihar"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Durg", "Rajnandgaon", "Jagdalpur", "Ambikapur", "Raigarh", "Dhamtari"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda", "Bicholim", "Canacona", "Curchorem", "Sanquelim", "Valpoi"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Junagadh", "Anand", "Navsari"],
  "Haryana": ["Chandigarh", "Faridabad", "Gurgaon", "Panipat", "Ambala", "Yamunanagar", "Rohtak", "Hisar", "Karnal", "Sonipat"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Mandi", "Solan", "Bilaspur", "Chamba", "Hamirpur", "Kullu", "Nahan"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", "Giridih", "Ramgarh", "Medininagar", "Chakradharpur"],
  "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Gulbarga", "Davanagere", "Shimoga", "Tumkur", "Bijapur"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad", "Alappuzha", "Kottayam", "Kannur", "Malappuram"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Satna", "Rewa", "Raisen", "Chhindwara"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Amravati", "Kolhapur", "Akola", "Jalgaon"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Hoshiarpur", "Pathankot", "Moga", "Sangrur"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Ajmer", "Bikaner", "Alwar", "Bharatpur", "Sikar", "Pali"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Erode", "Tirunelveli", "Vellore", "Thoothukudi", "Dindigul"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam", "Khammam", "Mahbubnagar", "Nalgonda", "Adilabad", "Siddipet"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut", "Allahabad", "Ghaziabad", "Bareilly", "Aligarh", "Moradabad"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Malda", "Kharagpur", "Bardhaman", "Baharampur", "Cooch Behar"]
};

const DonorRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const verifiedEmail = location.state?.verifiedEmail || "";

  useEffect(() => {
    if (!verifiedEmail) {
      navigate("/email-otp/verify");
    }
  }, [verifiedEmail, navigate]);

  const [formData, setFormData] = useState({
    name: "", // ✅ New
    email: verifiedEmail,
    age: "",
    weight: "",
    bloodType: "", // ✅ New
    contact: "",
    gender: "",
    lastDonationDate: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/register/donor", formData);
      alert("✅ Donor Registered Successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      alert("❌ Failed to register. Please check your info.");
    }
  };

  return (
    <form className="donor-form" onSubmit={handleSubmit}>
      <h2>Donor Registration</h2>

      <label>Full Name:</label>
      <input
        type="text"
        name="name"
        required
        value={formData.name}
        onChange={handleChange}
      />

      <label>Email:</label>
      <input type="email" name="email" value={formData.email} readOnly />

      <label>Age:</label>
      <input
        type="number"
        name="age"
        min="18"
        max="60"
        required
        value={formData.age}
        onChange={handleChange}
      />

      <label>Weight (kg):</label>
      <input
        type="number"
        name="weight"
        min="45"
        required
        value={formData.weight}
        onChange={handleChange}
      />

      <label>Blood Type:</label>
      <select name="bloodType" value={formData.bloodType} onChange={handleChange} required>
        <option value="">Select Blood Group</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
      </select>

      <label>Contact Number:</label>
      <input
        type="tel"
        name="contact"
        pattern="\d{10}"
        required
        placeholder="10-digit number"
        value={formData.contact}
        onChange={handleChange}
      />

      <label>Gender:</label>
      <select name="gender" value={formData.gender} onChange={handleChange} required>
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <label>Last Donation Date (optional):</label>
      <input
        type="date"
        name="lastDonationDate"
        value={formData.lastDonationDate}
        onChange={handleChange}
      />

      <label>Address:</label>
      <input
        type="text"
        name="address"
        required
        value={formData.address}
        onChange={handleChange}
      />

      <label>State:</label>
      <select name="state" value={formData.state} onChange={handleChange} required>
        <option value="">Select State</option>
        {Object.keys(statesAndCities).map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      <label>City:</label>
      <select name="city" value={formData.city} onChange={handleChange} required>
        <option value="">Select City</option>
        {formData.state &&
          statesAndCities[formData.state].map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
      </select>

      <label>Pincode:</label>
      <input
        type="text"
        name="pincode"
        pattern="\d{6}"
        required
        placeholder="6-digit Pincode"
        value={formData.pincode}
        onChange={handleChange}
      />

      <button type="submit">Register</button>
    </form>
  );
};

export default DonorRegister;