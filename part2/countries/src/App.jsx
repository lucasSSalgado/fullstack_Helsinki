import { useEffect, useState } from "react"
import countriesApi from "./services/countriesApi"
import CountryList from "./CountryList"

function App() {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  let searchListCountries = []

  useEffect(() => {
    countriesApi.getAll()
    .then(resp => setCountries(resp))
    .catch(err => console.log(err))
  }, [])  

  searchListCountries = countries.filter(c => c.name.common.toLowerCase().includes(search))

  return (
    <div>
      find countries <input type="text" value={search} onChange={e => setSearch(e.target.value)}/>
      {
        searchListCountries.length >= 10 ?
          <p>Too many matchers, specify another filter</p> :
          <CountryList list={ searchListCountries } />
      }      
    </div>
  )
}

export default App
