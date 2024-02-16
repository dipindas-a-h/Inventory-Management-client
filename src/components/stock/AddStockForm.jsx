import { Form, Input } from 'antd'
import React from 'react'
import FormInput from '../Input/FormInput'
import FormTextArea from '../Input/FormTextArea'
import CustomButton from '../Buttons/SaveButton'

function AddStockForm() {
  return (
    <div className='my-3'>

        <Form>
            <div className="row">


                
                <div className="col-lg-12">
                    <div className="row mx-1 form_font"> Stock Name:</div>
                    <Form.Item>
                        <FormInput />
                    </Form.Item>
                </div>
                <div className="col-lg-6">
                    <div className="row mx-1 form_font"> Quantity:</div>
                    <Form.Item>
                        <FormInput type={'Number'} />
                    </Form.Item>
                </div>
                <div className="col-lg-6">
                    <div className="row mx-1 form_font"> Price:</div>
                    <Form.Item>
                        <FormInput type={''} />
                    </Form.Item>
                </div>
                <div className="col-lg-12">
                    <div className="row mx-1 form_font"> Description:</div>
                    <Form.Item>
                        <FormTextArea rows={6} />
                    </Form.Item>
                </div>

                <div className="col-lg-12 m-3">
                    <div className="row d-flex justify-content-center">
                    <CustomButton  className={'cancel_button mx-1'} data={'Cancel'}/>

                        <CustomButton  className={'save_button mx-1'} data={'Save'}/>

                    </div>
                </div>

            </div>
        </Form>
    </div>
  )
}

export default AddStockForm