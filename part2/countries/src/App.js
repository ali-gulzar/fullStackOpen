import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryData = ({country}) => {

  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    image: "",
    windSpeed: 0,
    windDirection: ""
  })

  const api_key = process.env.REACT_APP_API_KEY


  useEffect(() => {

    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.name}`)
      .then(response => {


        const currentData = response.data.current
        setWeatherData({
          temperature: currentData.temperature,
          image: currentData.weather_icons[0],
          windSpeed: currentData.wind_speed,
          windDirection: currentData.wind_dir
        })
      })
  },[])

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Capital {country.capital}</p>
      <p>Population {country.population}</p>

      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} height={200} width={300}/>

      <h2>Weather in {country.capital}</h2>
      <p><b>temperature: </b>{weatherData.temperature} Celcius</p>
      <img src={weatherData.image}/>
      <p><b>wind: </b>{weatherData.windSpeed} mph direction {weatherData.windDirection}</p>
    </div>
  )
}

function App() {

  const [value, setValue] = useState("")
  const [all, setAll] = useState([])

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all")
    .then(response => {
      setAll(response.data)
    })
  },[])

  let filteredData = all.filter(country => country.name.toLowerCase().includes(value.toLowerCase()))

  const handleClick = (country) => {
    filteredData = [country]
    setValue(country.name)
  }

  const conditionalRender = () => {
    if (filteredData.length > 10) {
      return <p>Too many matches, specify another filter</p>
    } else if (filteredData.length === 1) {
      return <CountryData country={filteredData[0]}/>
    } else {
      return (
        <div>
          {filteredData.map((country) => {
            return (
              <div key={country.name}>
                <p>{country.name}</p>
                <button onClick={() => handleClick(country)}>show</button>
              </div>
            )
          })}
        </div>
      )
    }
  }

  return (
    <>
      <div>
        find countries <input value={value} onChange={(event) => setValue(event.target.value)}/>
      </div>
      <div>
        {value.length > 0 ? conditionalRender() : <p></p>}
      </div>
    </>
  );
}

export default App;
