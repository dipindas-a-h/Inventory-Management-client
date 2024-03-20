import React, { useEffect, useState } from "react";
import AddButton from "../../components/Buttons/AddButton";
import TableData from "../../components/table/TableData";

import AddMultipleBtn from "../../components/Buttons/AddMultipleBtn";
import { useNavigate } from "react-router-dom";
import routePath from "../../Routes/Path";
import instance from "../../utils/axios/AxiosInstance";
import Search from "antd/es/input/Search";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { message } from "antd";
import DeleteModal from "../../components/Modals/deleteModal/DeleteModal";
import dayjs from "dayjs";

// import instance from "../../utils/axios/AxiosInstance";

function SaleOrder() {
  const navigate = useNavigate();

  const [addModal, setAddModal] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
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
      title: "SO No.",
      dataIndex: "so_no",
      key: "so_no",
      align: "center",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (text, record, index) => <>
      {dayjs(text).format('DD-MM-YYYY')}
      </>,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      align: "center",
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    //   align: "center",
    // },
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
              navigate(routePath.EDITSALEORDER,{state:{id:record?.id}})

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

  const getAllSaleOrder = async () => {
    try {
      const response = await instance.get("/sale/order");
      if (response.status === 200) {
        // let temp = res?.data?.
        console.log("res", response?.data);
        let temp = response?.data?.map((item) => {
          return {
            // sl_no: item.sl_no,
            id: item?._id,
            so_no: item?.saleorder_no,
            date: item.created_date,
            total: item.grand_total,
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
          getAllSaleOrder();
        }
      })
      .catch((error) => {
        message.error(error?.message);
      });
  };

  useEffect(() => {
    getAllSaleOrder();
  }, [addModal]);
  // Call the function to fetch all stocks
  // getAllSaleOrder();

  const handleDataFormChild = (data) => {
    console.log("dy", data);
    setAddModal(false);
    setEditModal(false);
  };
  useEffect(() => {
    getAllSaleOrder();
  }, [searchData]);
  return (
    <>
      <div className="row">
        <div className="row">
          <div className="col-lg-5 d-flex align-items-center">
            {" "}
            <span className="heading_font mx-1">SaleOrder</span>{" "}
            <AddButton
              onClick={() => {
                navigate(routePath.ADDSALEORDER)
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

export default SaleOrder;
