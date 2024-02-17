import TextArea from 'antd/es/input/TextArea'
import React from 'react'

function FormTextArea({onChange,rows,value}) {
  return (
    <div>
        <TextArea onChange={onChange} value={value} rows={rows}/>
    </div>
  )
}

export default FormTextArea