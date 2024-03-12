import React from 'react'

function Logo({width='100px'}) {
  return (
    <div className="max-w-full mx-auto">
    <img
      className="rounded-lg shadow-md"
      src="https://img.freepik.com/free-vector/messaging-fun-concept-illustration_114360-1563.jpg?t=st=1710249031~exp=1710252631~hmac=b065783b9a546272d8f73257436789930845f38d5773a017f69fb025231a6653&w=740"
      alt="Messaging Fun Concept"
      style={{ width: width, height: 'auto' }}
    />
  </div>
  )
}

export default Logo