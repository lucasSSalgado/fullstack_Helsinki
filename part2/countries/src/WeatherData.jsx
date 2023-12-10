export default function WeatherData(props) {

    let temp = Object.values(props.data.main)[0] - 273.15
    let wind = Object.values(props.data.wind)[0]
    let weatherCode = Object.values(props.data.weather)[0].icon
    let iconUrl = `https://openweathermap.org/img/wn/${weatherCode}@2x.png`
    

    return (
        <div>
            <p>temperature {temp.toFixed(2)} Celsius</p>
            <img src={iconUrl} alt="weather icon" />
            <p>wind {wind.toFixed(2)} m/s</p>
        </div>
    )
}