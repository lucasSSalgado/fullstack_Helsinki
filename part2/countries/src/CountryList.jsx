import { useState } from 'react'
import CountryDetails from './CountryDetails'

export default function CountryList(props) {  
    const countryList = props.list
    const [countryData, setCountryData] = useState(null)

    if (countryList.length === 1 && countryData === null) {
        setCountryData(countryList[0])
    }

    const handleClick = (c) => {       
        setCountryData(c)
    }

    return (
       <div>
        {
            countryData ?   
            <CountryDetails country={ countryData } /> : 
            countryList.map(c => (
                <li key={c.name.common}>
                    {c.name.common} 
                    <button onClick={() => handleClick(c)}>show</button>
                </li>                
            ))
        }       
       </div>
    )
}