import React from 'react'

function CustomButton({data,onClick,className}) {
  return (
    <>
        <button className={className} onClick={onClick}>{data}</button>
    </>
  )
}

export default CustomButton