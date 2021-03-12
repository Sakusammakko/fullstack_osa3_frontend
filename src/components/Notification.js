import React from 'react'

const notificationStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}
const errorNotificationStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
}

const Notification = ({ message, messageType }) => {
    console.log('messageType: ', messageType)
    if (message === null) {
      return null
    }

  
    return (
      <div style={messageType ? errorNotificationStyle : notificationStyle}>
        {message}
      </div>
    )

  }

  export default Notification