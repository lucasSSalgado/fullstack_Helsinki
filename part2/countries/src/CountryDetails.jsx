import { useEffect, useState } from "react"
import weatherService from "./services/weatherService"
import WeatherData from './WeatherData'

export default function CountryDetails(props) {
    const countryObj = props.country
    const languages = [...Object.values(countryObj.languages)]
    const [weather, setWeather] = useState(null) 

    useEffect(() => {
        weatherService
            .getDataByName(countryObj.capital   )
            .then(resp => setWeather(resp))
            .catch(() => console.log('error'))
    }, [])

    return (
        <div>
            <h1> {countryObj.name.common} </h1>
            <p>capital {countryObj.capital}</p>
            <p>area {countryObj.area}</p>
            <h2>languages:</h2>
            <ul>
            { 
                languages.map(l => <li key={ l }> { l } </li>)
            }
            </ul>
            <img src={countryObj.flags.png} alt={countryObj.flags.alt} />

            <h2>Weather in {countryObj.capital}</h2>
            {
              weather &&
              <WeatherData data={weather} />  
            }
            
        </div>
    )
}