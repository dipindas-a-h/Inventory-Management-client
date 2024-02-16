import { Modal } from 'antd'
import React from 'react'

function AddModals({openModal, closeModal,content,footer,title,width}) {
  return (
    <div>
        <Modal width={width} footer={footer} open={openModal} onCancel={closeModal} title={title}>
            {content}

        </Modal>
    </div>
  )
}

export default AddModals