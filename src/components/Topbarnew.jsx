import "../App.css"; // Correct relative path
import { useState } from "react";

function Topbarnew() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchTerm);
    // Add logic here to handle search functionality
  };

  return (
    <header className="topbarnew">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo-image" />
        <h2 className="logo">Faculty Of Computing</h2>
      </div>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </header>
  );
}

export default Topbarnew;
