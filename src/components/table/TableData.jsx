import React from 'react';
import { Table } from 'antd';

function TableData({ columns, data, className }) {
  return (
    <div className={className}>
      <Table pagination={false} columns={columns} dataSource={data} />

    </div>
  );
}

export default TableData;
