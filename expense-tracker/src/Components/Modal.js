import React from 'react'
import "./modal.css"
function Modal({title}) {
  return (
    <div className="modal" > 
      <p>{title}</p>
    </div>
  )
}

export default Modal