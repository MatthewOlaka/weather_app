import React from 'react'
import './styles.css'

const WeatherCard = (props) => {
    const {selectedCities, addedCities,setAddedCities, setSelectedCities} = props
 

    const handleDeleteCity = (city) => {
        const cityKey = `${city.name}-${city.sys.country}`;  

        //Remove from the addCities and selectedCities arrays
        setAddedCities(addedCities.filter(key => key !== cityKey));
        setSelectedCities(selectedCities.filter(selected => selected !== city));
      }

  return (
    <>
    {selectedCities.length > 0 &&
        selectedCities.map((city) => (
          <div className='card' key={city.id}>
            <h1 className='temp'>{Math.trunc(city.main.temp-273.15)}°C</h1>
            <h1 className='city'>{city.name}</h1>
            <p className='desc'>{city.weather[0].description}</p>
            <img className='icon'src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`} alt="weather icon"></img>
            <button className='delete' onClick={() => handleDeleteCity(city)}>Delete</button>
          </div>
        ))}
    </>
  )
}

export default WeatherCard