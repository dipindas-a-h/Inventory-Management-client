import { Modal } from 'antd'
import React from 'react'
import CustomButton from '../../Buttons/SaveButton'

function DeleteModal({onCancel,onDelete,open}) {
  return (
    <div>

        <Modal open={open} onCancel={onCancel} footer={false} >
            <h3 style={{ color:'red', fontSize:'25'}}>Are you sure delete this Stock?</h3>

            <div className="row d-flex mt-3 justify-content-center">
                    <CustomButton onClick={onDelete}  className={'cancel_button mx-1'} data={'Delete'} />

                        <CustomButton onClick={onCancel}  className={'save_button mx-1'} data={'Cancel'}/>

                    </div>

        </Modal>
    </div>
  )
}

export default DeleteModal