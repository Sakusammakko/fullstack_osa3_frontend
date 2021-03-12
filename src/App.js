import React, { useState, useEffect } from 'react'
import PersonForm from './components/personForm'
import Filter from './components/filter'
import Person from './components/Person'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

let messageType = false

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)

  

  useEffect(() => {
    console.log('')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        
      })
  }, [])
  console.log('persons: ', persons)


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
    
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.map(person => person.name).indexOf(newName) === -1) {
      console.log('adding new: ', personObject)
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added ${personObject.name}`)
        })
        .catch(error => {
          console.log(`error: `, error.response.data.error)
          messageType = true
          setMessage(
            `Person validation failed: ${error.response.data.error}`
          )
        })
    }  else { 
        if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
          personService
          .update(persons.find(person => person.name === newName).id, personObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== response.id ? person : personObject))
            setMessage(`${personObject.name}s number changed succesfully`)
          })
          .catch(error => {
            messageType = true
            console.log('true or false? ', messageType)
            setMessage(
              `Information of ${personObject.name} has already been removed from server`
            )
            setPersons(persons.filter(person => person.name !== newName))
          })
        }
    }
  
    setTimeout(() => {
      setMessage(null)
      messageType = false
    }, 5000)
    setNewName('')
    setNewNumber('') 
 }

  const deletePerson = (id) => {

    if (window.confirm(`Are you sure you want to delete ${persons.find(person => person.id === id).name}?`)) {
            personService
            .remove(id)
            .then(removedId => {
            setPersons(persons.filter(person => person.id !== id))
            setMessage(`Deleted ${persons.find(person => person.id === id).name}`)
            setTimeout(() => {
              setMessage(null)
            }, 2000)
          })
      }    
  }

  const personsToShow = 
      persons.filter(person => person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1) 

  return (
    <div>
      <h1>Phonebook</h1>
        <Notification message={message} messageType = {messageType}/>
        <Filter text = 'filter shown with' filter = {filter} handler = {handleFilterChange} />
             
      <h2>add a new</h2>

      <PersonForm newName = {newName} newNumber = {newNumber} 
        handleNameChange = {handleNameChange} handleNumberChange = {handleNumberChange} 
        addPerson = {addPerson}/>

      <h2>Numbers</h2>

      {personsToShow.map(person => 
        <Person key = {person.name} person = {person} remove = {() => deletePerson(person.id)}  />
      )}
      
    </div>
  )

}

export default App
