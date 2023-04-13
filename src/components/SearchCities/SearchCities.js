import React, { useState } from 'react';
import WeatherCard from '../WeatherCard/WeatherCard';
import './styles.css';

//Please create an env file in the root directory and save the api keys 
//(keys available in the doc with my assumptions)
const API_KEY = process.env.REACT_APP_API_KEY;
const RAPID_API_KEY = process.env.REACT_APP_RAPID_API_KEY;

function SearchCities() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [addedCities, setAddedCities] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${searchTerm}&limit=10`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            RAPID_API_KEY,
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
        },
      }
    );

    const data = await response.json();
    setCities(data.data);

    // If there is only one option, select it immediately
    if (data.data.length === 1) {
      handleSelectCity(`${data.data[0].latitude}, ${data.data[0].longitude}`);
    }

  }

  const handleSelectCity = async (city) => {
    try {

      //Ensure a correct option is selected
      if (!city) {
        console.error('Invalid city value:', city);
        alert("Invalid Option")
        return;
      }

      //Ensure the Latitude and Longitude Coodinates are split correctly
      const splitValues = city.split(',');
      if (splitValues.length !== 2) {
        console.error('Invalid city value:', city);
        return;
      }

      //Remove any whitespace before and after the split coordinates
      const [latitude, longitude] = splitValues.map(value => value.trim());

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );
      const data = await response.json();

      // Check if city is already in the list
      const cityKey = `${data.name}-${data.sys.country}`;
      if (addedCities.includes(cityKey)) {
        alert(`City "${data.name}, ${data.sys.country}" is already added.`);
        return;
      }

      setAddedCities([...addedCities, cityKey]);
      setSelectedCities([...selectedCities, data]);
    } catch (error) {
      console.error(error);
    }


  }

  return (
    <>
      <h1>Weather App</h1>
      <input
        type="text"
        value={searchTerm}
        placeholder='Search for a city'
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <button className='searchButton' onClick={handleSearch}> {'>'} </button>
      {cities.length > 0 && (
        <select
          onChange={(event) => handleSelectCity(event.target.value)}
        >
          <option value=""> -- select an option -- </option>
          {cities.map((city) => (

            <option key={city.id} value={`${city.latitude},${city.longitude}`}>
              {city.name}, {city.region}, {city.country}
            </option>
          ))}
        </select>
      )}
      <WeatherCard selectedCities={selectedCities} setAddedCities={setAddedCities} setSelectedCities={setSelectedCities} addedCities={addedCities} />
    </>
  );
}

export default SearchCities;

