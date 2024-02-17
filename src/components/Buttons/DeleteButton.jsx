import React from 'react'
import { RiDeleteBin5Fill } from "react-icons/ri";

function DeleteButton({onclick}) {
  return (
    <div>
        <RiDeleteBin5Fill onClick={onclick} className='delete_icon'/>
    </div>
  )
}

export default DeleteButton