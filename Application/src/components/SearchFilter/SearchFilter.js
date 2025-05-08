import React, { useState } from "react";
import axios from "axios";
import "./SearchFilter.css";

const SearchFilter = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a search term.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/search_donors", {
        params: { query: searchQuery },
      });

      if (response.data.success && response.data.donors) {
        setError(null);
        onSearch && onSearch(response.data.donors); // Pass donors to Home
      } else {
        setError("No donors found.");
        onSearch && onSearch([]); // Return empty to Home
      }
    } catch (err) {
      console.error("❌ Error fetching donors:", err);
      setError("Failed to fetch donors. Please try again.");
      onSearch && onSearch([]); // Handle errors gracefully
    }
  };

  return (
    <div className="search-filter">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by name, blood type, or location"
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">Search</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default SearchFilter;
