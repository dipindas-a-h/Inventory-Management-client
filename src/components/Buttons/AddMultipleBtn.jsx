import React from 'react'
import { MdFormatListBulletedAdd } from "react-icons/md";

function AddMultipleBtn({onClick}) {
  return (
    <div>

        <MdFormatListBulletedAdd className='add_icon mx-2' onClick={onClick}/>
    </div>
  )
}

export default AddMultipleBtn