import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (countryName) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {

    if (countryName === "") return;

    const getCountryInfo = async (countryName) => {
      try {
        const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
        const data = response.data
  
        const countryInfo = {
            name: data.name.common,
            capital: data.capital,
            population: data.population,
            flag:data.flags.svg,
            found: true
        }
  
        setCountry(countryInfo)
      } catch {
        const countryInfo = {
          found: false
        }

        setCountry(countryInfo)
      }

    }

    getCountryInfo(countryName)

  }, [countryName])

  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flag} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App