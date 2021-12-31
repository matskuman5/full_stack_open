import React, {useState, useEffect} from 'react';
import axios from 'axios'

const Country = ({countryToPrint}) => {

    const [weatherInCapital, setWeatherInCapital] = useState({
        main: {
            temp: 'null'
        },
        wind: {
            deg: 'null',
            speed: 'null'
        },
        weather: [{
            description: 'null'
        }]
    })

    let lang = []
    for (const key in countryToPrint.languages) {
        lang.push(countryToPrint.languages[key])
    }
    console.log(lang)

    const api_key = process.env.REACT_APP_API_KEY
    

    useEffect(() => {
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${countryToPrint.capital}&appid=${api_key}`)
          .then(response => {
            setWeatherInCapital(response.data)
          })
    }, [])

    console.log(weatherInCapital)

    return (
        <div>
            <h2>{countryToPrint.name.common}</h2>
            <p>capital: {countryToPrint.capital}</p>
            <p>region: {countryToPrint.region}</p>
            <h3>languages: </h3>
            <ul>
                {lang.map(l =>
                    <li key={l}>{l}</li>)}
            </ul>
            <img src={countryToPrint.flags.png}></img>
            <h3>weather in {countryToPrint.capital}</h3>
            <p>status: {weatherInCapital.weather[0].description}</p>
            <p>temp: {Math.round(weatherInCapital.main.temp - 272.15)} degrees Celsius</p>
            <p>wind: {weatherInCapital.wind.speed} m/s in direction {weatherInCapital.wind.deg} degrees</p>
        </div>
    )

}

export default Country