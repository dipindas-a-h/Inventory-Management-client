import React, { useState } from "react";
import AddButton from "../../components/Buttons/AddButton";
import TableData from "../../components/table/TableData";
import AddModals from "../../components/Modals/AddModals";
import AddStockForm from "../../components/stock/AddStockForm";
import AddMultipleStocks from "../../components/stock/AddMultipleStocks";
import AddMultipleBtn from "../../components/Buttons/AddMultipleBtn";
import { useNavigate } from "react-router-dom";
import routePath from "../../Routes/Path";

function AddStock() {
    const navigate = useNavigate()

  const [chooseModal, setChooseModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [multipleStocks, setMultipleStocks] = useState(false);
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
          onClick={() => navigate(routePath.ADD_STOCK + "/" + record.sl_no)}
        />
      ),
    },
  ];
  return (
    <>
      <div className="row">
        <div className="row">
          <div className="col-lg-5 d-flex align-items-center">
            {" "}
            <span className="heading_font mx-1">Stocks</span>{" "}
            <AddButton
              onClick={() => {
                setAddModal(true);
              }}
            />
            <AddMultipleBtn onClick={() => {navigate(routePath?.ADDSTOCKS)}} />
          </div>

          <div className="row mt-3 mx-3">
            <TableData className={'list_table'} columns={columns} />
          </div>
        </div>
      </div>
      <AddModals
        title={"Add Stock"}
        footer={null}
        openModal={addModal}
        closeModal={() => {
          setAddModal(false);
        }}
        content={
          <>
            <AddStockForm />
          </>
        }
      />
    </>
  );
}

export default AddStock;
