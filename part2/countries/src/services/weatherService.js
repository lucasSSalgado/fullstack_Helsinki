import axios from 'axios'

const getDataByName = (city) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${import.meta.env.VITE_WEATHER_API}`

    const request = axios.get(url)
    return request.then(resp => resp.data)
}   

export default { getDataByName }