import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCountries(filtered);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchQuery, countries]);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="container">
      {/* <div className="search-input"> */}
        <input
          type="text"
          placeholder="Search countries..."
          value={searchQuery}
          onChange={handleInputChange}
          
        />
      {/* </div> */}
      <div className="main">
        {filteredCountries.map((country) => (
          <div className="countryCard" key={country.name.common}>
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.common}`}
              style={{ width: "100px", height: "100px" }}
            />
            <p>{country.name.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
