import React from 'react'
import { FcAddRow } from "react-icons/fc";

function Addrow({onClick}) {
  return (
    <div>
        <FcAddRow fontSize={35} onClick={onClick}/>
    </div>
  )
}

export default Addrow