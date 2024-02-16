import React from 'react'
import { MdAddCircle } from "react-icons/md";

function AddButton({onClick}) {
  return (
    <div>

        <MdAddCircle className='add_icon' onClick={onClick}/>
    </div>
  )
}

export default AddButton