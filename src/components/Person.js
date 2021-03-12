import React from 'react'

const Person = ({person, remove}) => {
    return (
        <p key={person.name}>
        {person.name} {person.number}
        <button 
          key = {person.name}
          onClick = {remove}>delete</button>
      </p>
    )
}

export default Person