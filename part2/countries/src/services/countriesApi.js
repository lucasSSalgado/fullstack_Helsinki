import axios from 'axios'

const urlAll = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const urlcountry = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getAll = () => {
    const request = axios.get(urlAll)
    return request.then(resp => resp.data)
}

export default { getAll }