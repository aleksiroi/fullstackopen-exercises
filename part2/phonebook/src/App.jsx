import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Notification = ({ message, type }) => {
  console.log('Notification Props:', { message, type });
  if (!message) {
    return null;
  }

  const notificationStyle = type === 'success' ? 'success' : 'error';

  return (
    <div className={notificationStyle}>
      {message}
    </div>
  );
};

const Filter = (props) => {
  const { filter, handleBookFilter } = props

  return (
    <div> filter shown with
        <input 
          value={filter}
          onChange={handleBookFilter} 
        />
      </div>
  )
}

const PersonForm = (props) => {
  const { addPerson, newName, handlePersonAddition, newNumber, handleNumberAddition } = props

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input 
          value={newName}
          onChange={handlePersonAddition} 
        />
      </div>
      <div>
        number: <input 
          value={newNumber}
          onChange={handleNumberAddition} 
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = (props) => { 
  const { person, deletePerson } = props

  return (
    <div>
      {person.name} {person.number}
      <button onClick={deletePerson}>delete</button>
    </div>
  )
}

const Phonebook = (props) => { 
  const { persons, filter, deletePerson } = props

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      {filteredPersons.map(person => 
        <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id)} />
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const showNotification = (message, type = 'success') => {
    setSuccessMessage({ message, type })
    setTimeout(() => {  
      setSuccessMessage(null)
    }, 5000)
  }
      

  const updateNumber = (id, newObject) => {
    personService
      .update(id, newObject)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      })
  }


  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some(person => person.name === newName)) {
      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (result) {
        const person = persons.find(person => person.name === newName)
        const updateObject = {
          ...person,
          number: newNumber
        }
        updateNumber(person.id, updateObject)
        showNotification(`Updated ${newName}`);
        setNewName('')
        setNewNumber('')
        return
      } else {
        setNewName('')
        setNewNumber('')
        return
      }
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        showNotification(`Added ${newName}`);
        setNewName('')
        setNewNumber('')
      })
    
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    const result = window.confirm(`Delete ${person.name}?`)

    if (result) {
      personService
        .del(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          showNotification(`Information of ${person.name} has already been removed from server`, 'error')
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }
  
  const handlePersonAddition = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberAddition = (event) => {
    setNewNumber(event.target.value)
  }

  const handleBookFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage?.message} type={successMessage?.type} />


      <Filter filter={filter} handleBookFilter={handleBookFilter} />

      <h2>Add a new</h2>

      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        handlePersonAddition={handlePersonAddition}
        newNumber={newNumber}
        handleNumberAddition={handleNumberAddition}
      />

      <h2>Numbers</h2>

      <Phonebook 
        persons={persons} 
        filter={filter} 
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App