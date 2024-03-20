import { Input } from 'antd'
import React from 'react'

function FormInput({onChange,type,value,disabled}) {
  return (
    <div className='form_input'>
        <Input value={value} type={type} onChange={onChange} disabled={disabled} />
    </div>
  )
}

export default FormInput