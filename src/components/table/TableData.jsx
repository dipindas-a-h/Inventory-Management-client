import { Table } from 'antd'
import React from 'react'

function TableData({columns,data}) {
  return (
    <div className='list_table'>

        <Table
        columns={columns}
        data = {data}
        />
    </div>
  )
}

export default TableData