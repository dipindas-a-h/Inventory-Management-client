import React from 'react'

function CustomButton({data,onClick,className,disable}) {
  return (
    <>
        <button disabled={disable} className={className} onClick={onClick}>{data}</button>
    </>
  )
}

export default CustomButton