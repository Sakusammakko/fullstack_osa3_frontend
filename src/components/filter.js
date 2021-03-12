import React from 'react'

const Filter = ({text, filter, handler}) => {
  return (
  <div>{text}<input value = {filter} onChange = {handler}/></div>
  )
}

export default Filter