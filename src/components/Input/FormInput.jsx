import { Input } from 'antd'
import React from 'react'

function FormInput({onChange,type}) {
  return (
    <div className='form_input'>
        <Input type={type} onChange={onChange} />
    </div>
  )
}

export default FormInput