import React from 'react'
import TableData from '../table/TableData'
import AddButton from '../Buttons/AddButton';

function AddMultipleStocks() {

    const columns = [
        {
          title: "Sl No.",
          dataIndex: "sl_no",
          key: "sl_no",
          align: "center",
        },
        {
          title: "Stock Name",
          dataIndex: "stock_name",
          key: "stock_name",
          align: "center",
        },
        {
          title: "Quantity",
          dataIndex: "quantity",
          key: "quantity",
          align: "center",
        },
        {
          title: "Price",
          dataIndex: "price",
          key: "price",
          align: "center",
        },
        {
          title: "Description",
          dataIndex: "description",
          key: "description",
          align: "center",
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
          align: "center",
    
          render: (text, record) => (
            <AddButton
            //   onClick={() => navigate(routePath.ADD_STOCK + "/" + record.sl_no)}
            />
          ),
        },
      ];
  return (
    <div className='row'>
           <div className="row">
          <div className="col-lg-5 d-flex align-items-center">
            {" "}
            <span className="heading_font mx-1">Stocks</span>{" "}
            
          </div>

          <div className="row mt-3 mx-3">
            <TableData columns={columns} />
          </div>
        </div>
    </div>
  )
}

export default AddMultipleStocks