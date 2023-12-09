import { useEffect, useState } from 'react'
import Persons from './Persons'
import PersonForm from './PersonForm'
import Filter from './Filter'
import phoneService from './services/phoneService'
import SuccessMsg from './SuccessMsg'
import ErrorMsg from './ErrorMsg'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    phoneService
      .getAll()
      .then(resp => setPersons(resp))
      .catch(() => alert('error getting data from server'))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()   
    let isPresent = verifyPresence(newName, persons)
    if (isPresent) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const actualPerson = persons.find(p => p.name === newName)
        const personId = actualPerson.id
        const newList = persons.filter(p => p.id !== personId)
        const updatePerson = {
          name: newName,
          number: newNumber,
          id: personId,
        }

        phoneService.updateNumber(personId, updatePerson)
        .then(() => setPersons([...newList, updatePerson]))
        .catch(() => alert('Update the user was not possible'))
        .finally(() => {
          setSuccessMsg(`Update ${newName}`)
          setTimeout(() => {
            setSuccessMsg('')
          }, 4000)
        })

        setNewName('')
        setNewNumber('')
        return
      } 
      return     
    }    

    const newPerson = {
      name: newName,
      number: newNumber,
    }
    phoneService
      .savePhone(newPerson)
      .then(resp => setPersons([...persons, resp]))
      .catch(() => alert('was not possible to save the new contact'))
      .finally(() => {
        setSuccessMsg(`Added ${newName}`)
        setTimeout(() => {
          setSuccessMsg('')
        }, 3000)
      })

    setNewName('')
    setNewNumber('')
  }
  const verifyPresence = (name, array) => {
    let exists = array.find((p) => p.name === name)
    if (exists == undefined) {
      return false
    }
    return true
  }  
  const handleDelete = (id, name) => {
    if (!window.confirm(`Delete ${name} ?`)) {
      return
    }    
    phoneService.deleteById(id)
    .then(() => setPersons(persons.filter(p => p.id !== id)))
    .catch(() => {
      setErrorMsg(`Information of ${name} has already been removed from server`)
      setTimeout(() => {
        setErrorMsg('')
      }, 4000)
    })
  }
  const personsSearch = 
  search ? 
  persons.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())) 
  : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessMsg msg={successMsg}/>
      <ErrorMsg msg={errorMsg}/>
      <Filter search={search} setSearch={setSearch} />      

      <h3>add a new</h3>
      <PersonForm 
        handleSubmit={handleSubmit} 
        newName={newName} setNewName={setNewName} 
        newNumber={newNumber} setNewNumber={setNewNumber}
      />

      <h3>Numbers</h3>
      <Persons array={personsSearch} deleteById={handleDelete}/>
    </div>
  )
}

export default App