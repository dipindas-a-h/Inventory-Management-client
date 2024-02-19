import React, { useEffect, useState } from "react";
import AddButton from "../../components/Buttons/AddButton";
import TableData from "../../components/table/TableData";
import AddModals from "../../components/Modals/AddModals";
import AddStockForm from "../../components/stock/AddStockForm";
import AddMultipleStocks from "../../components/stock/AddMultipleStocks";
import AddMultipleBtn from "../../components/Buttons/AddMultipleBtn";
import { useNavigate } from "react-router-dom";
import routePath from "../../Routes/Path";
import instance from "../../utils/axios/AxiosInstance";
import Search from "antd/es/input/Search";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { message } from "antd";
import DeleteModal from "../../components/Modals/deleteModal/DeleteModal";

// import instance from "../../utils/axios/AxiosInstance";

function AddStock() {
  const navigate = useNavigate();

  const [addModal, setAddModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal,setEditModal] = useState(false);
  const [currentid, setCurrentId] = useState();
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
        <div className="">
          <FaEdit
            className="mx-1"
            fontSize={20}
            color="green"
            onClick={() => {       

              
              setCurrentId(record?.id);
              setEditModal(true);
            }}
          />
          <MdDeleteForever
            className="mx-1"
            color="red"
            fontSize={25}
            onClick={() => {
              setCurrentId(record?.id);
              setDeleteModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  // import instance from './axiosInstance'; // Assuming 'axiosInstance' is the file where you exported the Axios instance

  const getAllStocks = async () => {
    try {
      const response = await instance.get("/stock/stock", {
        params: {
          stockName: searchData,
          price: "",
        },
      });
      if (response.status === 200) {
        // let temp = res?.data?.
        console.log("res", response?.data);
        let temp = response?.data?.data?.map((item) => {
          return {
            // sl_no: item.sl_no,
            id: item?._id,
            stock_name: item?.stockName,
            quantity: item.qty,
            price: item.price,
            description: item.desc,
          };
        });

        console.log("array", temp);
        setTableData(temp);
      }

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
      // message.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    await instance
      .delete(`/stock/stock/${id}`)
      .then((res) => {
        console.log("ddres", res);
        if (res?.status === 200) {
          setDeleteModal(false);
          message.success(res?.data?.message);
          getAllStocks();
        }
      })
      .catch((error) => {
        message.error(error?.message);
      });
  };

  useEffect(() => {
    getAllStocks();
  }, [addModal]);
  // Call the function to fetch all stocks
  // getAllStocks();

  const handleDataFormChild = (data) => {
    console.log('dy',data);
    setAddModal(false);
    setEditModal(false);
  };
  useEffect(() => {
    getAllStocks();
  }, [searchData]);
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
            <AddMultipleBtn
              onClick={() => {
                navigate(routePath?.ADDSTOCKS);
              }}
            />
          </div>
          <div className="col-lg-7">
            <div className="row d-flex justify-content-end">
              <div className="col-lg-4">
                <Search
                  onChange={(e) => {
                    setSearchData(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="row mt-3 mx-3">
            <TableData
              className={"list_table"}
              columns={columns}
              data={tableData}
            />
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
            <AddStockForm sendModalValue={handleDataFormChild} />
          </>
        }
      />
        <AddModals
        title={"Edit Stock"}
        footer={null}
        openModal={editModal}
        closeModal={() => {
          setEditModal(false);
        }}
        content={
          <>
            <AddStockForm sendModalValue={handleDataFormChild} idForm={currentid} />
          </>
        }
      />
      <DeleteModal
        open={deleteModal}
        onCancel={() => setDeleteModal(false)}
        onDelete={() => {
          handleDelete(currentid);
        }}
      />
    </>
  );
}

export default AddStock;
