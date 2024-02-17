import { Input } from 'antd'
import React from 'react'

function FormInput({onChange,type,value}) {
  return (
    <div className='form_input'>
        <Input value={value} type={type} onChange={onChange} />
    </div>
  )
}

export default FormInput