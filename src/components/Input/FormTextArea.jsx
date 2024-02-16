import TextArea from 'antd/es/input/TextArea'
import React from 'react'

function FormTextArea({onChange,rows}) {
  return (
    <div>
        <TextArea onChange={onChange} rows={rows}/>
    </div>
  )
}

export default FormTextArea