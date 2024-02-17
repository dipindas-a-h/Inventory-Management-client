import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import FormInput from '../Input/FormInput';
import TableData from '../table/TableData';
import FormTextArea from '../Input/FormTextArea';
import DeleteButton from '../Buttons/DeleteButton';
import Addrow from '../Buttons/Addrow';
import CustomButton from '../Buttons/SaveButton';

function AddMultipleStocks() {

  const [tableData,setTableData] = useState([])
  let data = {
    "sl_no": "",
    "stock_name": "",
    "quantity": "",
    "price": "",
    "description": "",
    'key':'1',
  };

  useEffect (()=>{

    if(tableData?.length ===0){
      setTableData([data])
    }
  },[tableData])

  const handleAddRow = () => {
    const newData = {
      key: Date.now(), // Use timestamp as the key
      sl_no: "",
      stock_name: "",
      quantity: "",
      price: "",
      description: "",
    };
    setTableData([...tableData, newData]);
  };
  
  const handleDeleteRow = (index) => {
    const updatedData = [...tableData];
    updatedData.splice(index, 1);
    setTableData(updatedData);
  };

  const handleOnChange = (key, field, value) => {
    const updatedData = tableData.map(item => {
      if (item.key === key) {
        return { ...item, [field]: value }; // Update the specific field with the new value
      }
      return item;
    });
    setTableData(updatedData);
  };
  



  const columns = [
    {
      title: "Sl No.",
      dataIndex: "sl_no",
      key: "sl_no",
      align: "center",
      render: (text, record, index) => <>{index + 1}</>,
    },
    {
      title: "Stock Name",
      dataIndex: "stock_name",
      key: "stock_name",
      align: "center",
      render: (text, record, index) => <FormInput value={record?.stock_name} onChange={(e)=> handleOnChange(record?.key,'stock_name',e.target.value)} />,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      render: (text, record, index) => <FormInput value={record?.quantity}onChange={(e)=> handleOnChange(record?.key,'quantity',e.target.value)} />,

    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (text, record, index) => <FormInput value={record?.price} onChange={(e)=> handleOnChange(record?.key,'price',e.target.value)} />,

    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
      render: (text, record, index) => <FormTextArea value={record?.description} rows={2} onChange={(e)=> handleOnChange(record?.key,'description',e.target.value)}/>,

    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text, record, index) => <DeleteButton onclick={handleDeleteRow}/>,

    },
  ];

  return (
    <div className='row'>
      <div className="row">
        <div className="col-lg-5 d-flex align-items-center">
          <span className="heading_font mx-1">Stocks</span>
        </div>
        <div className="row mt-3 mx-3">
          <TableData columns={columns} data={tableData} className={'add_table'}/>
        </div>
        <div className="row mx-4 mt-3"><Addrow onClick={handleAddRow}/></div>


        <div className="row d-flex mt-3 justify-content-center">
                    <CustomButton  className={'cancel_button mx-1'} data={'Cancel'}/>

                        <CustomButton  className={'save_button mx-1'} data={'Save'}/>

                    </div>
      </div>
    </div>
  );
}

export default AddMultipleStocks;
