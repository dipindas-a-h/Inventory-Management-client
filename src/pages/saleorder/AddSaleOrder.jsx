import React, { useEffect, useState } from "react";
import { Table, message } from "antd";
// import FormInput from '../Input/FormInput';
// import TableData from '../table/TableData';
// import FormTextArea from '../Input/FormTextArea';
// import DeleteButton from '../Buttons/DeleteButton';
// import Addrow from '../Buttons/Addrow';
// import CustomButton from '../Buttons/SaveButton';
import { useSelector } from "react-redux";
import instance from "../../utils/axios/AxiosInstance";
import { useLocation, useNavigate } from "react-router-dom";
import routePath from "../../Routes/Path";
import FormInput from "../../components/Input/FormInput";
import FormTextArea from "../../components/Input/FormTextArea";
import TableData from "../../components/table/TableData";
import Addrow from "../../components/Buttons/Addrow";
import CustomButton from "../../components/Buttons/SaveButton";
import DeleteButton from "../../components/Buttons/DeleteButton";
import CustomSelect from "../../components/selectBox/SelectBox";

function AddSaleOrder() {
  const userData = useSelector((state) => state?.userDetails?.userData);
  const userId = localStorage.getItem("user");
  const navigate = useNavigate();
  const [products, setProducts] = useState();
  const [tableData, setTableData] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const [getOneData,setGetOneData] = useState()
  const user = localStorage.getItem("user");
  const { state } = useLocation();
  const id = state && state?.id;
  console.log("syate", state);
  let data = {
    sl_no: "",
    stock_id: "",
    quantity: "",
    unit_price: "",
    total: "",
    key: "1",
  };

  useEffect(() => {
    if (tableData?.length === 0) {
      setTableData([data]);
    }
  }, [tableData]);

  const handleAddRow = () => {
    const newData = {
      key: Date.now(), // Use timestamp as the key
      sl_no: "",
      stock_id: "",
      quantity: "",
      unit_price: "",
      total: "",
    };
    setTableData([...tableData, newData]);
  };

  const getAllStock = () => {
    instance
      .get(`/stock/stock`)
      .then((response) => {
        console.log("Response:", response.data);

        if (response?.status === 200) {
          let temp = response?.data?.data?.map((item) => {
            return {
              value: item?._id,
              label: item?.stockName,
            };
          });
          console.log("tempp", temp);
          setProducts(temp);
        }
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  useEffect(() => {
    getAllStock();
  }, []);
  const handleDeleteRow = (index) => {
    const updatedData = [...tableData];
    updatedData.splice(index, 1);
    setTableData(updatedData);
  };

  async function getOneProduct(id) {
    try {
      const response = await instance.get(`/stock/stock/${id}`); // Await response
      return response.data.data; // Return the nested data object
    } catch (error) {
      console.error("Error fetching product:", error);
      throw error; // Re-throw the error to propagate it upwards
    }
  }

  const handleSelectProduct = async (key, field, value) => {
    let data = await getOneProduct(value);
    console.log("data", data);

    const updatedData = tableData.map((item) => {
      if (item.key === key) {
        return {
          ...item,
          [field]: value,
          unit_price: data?.price,
          available_quantity: data?.qty,
        }; // Update the specific field with the new value
      }
      return item;
    });
    let tdata = await Promise.all(updatedData);
    // console.log('upda',tdata);

    setTableData(tdata);
  };

  const handleOnChange = (key, field, value) => {
    // console.log('onChange',value);
    const updatedData = tableData.map((item) => {
      if (item.key === key) {
        let difference = 0;
        let total =
          parseFloat(item?.unit_price ? item?.unit_price : 0) *
          parseFloat(value ? value : 0);
          if(id){
            difference = parseFloat(item?.original_qty) - parseFloat(value)
            
          }
        return { ...item, quantity: value, total: total ,difference:difference }; // Update the specific field with the new value
      }
      return item;
    });
    console.log("updaaa", updatedData);
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
      title: "Product",
      dataIndex: "stock_id",
      key: "stock_id",
      align: "center",
      render: (text, record, index) => (
        <CustomSelect
          options={products}
          value={record?.stock_id}
          onChange={(e) => handleSelectProduct(record?.key, "stock_id", e)}
        />
      ),
    },
    {
      title: "Unit Price",
      dataIndex: "unit_price",
      key: "unit_price",
      align: "center",
      render: (text, record, index) => (
        <FormInput
          disabled={true}
          value={record?.unit_price}
          onChange={(e) =>
            handleOnChange(record?.key, "unit_price", e.target.value)
          }
        />
      ),
    },
    {
      title: "Available Quantity",
      dataIndex: "availlable_quantity",
      key: "availlable_quantity",
      align: "center",
      render: (text, record, index) => (
        <FormInput
          disabled={true}
          value={record?.available_quantity}
          // onChange={(e) => handleOnChange(record?.key, "unit_price", e.target.value)}
        />
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      render: (text, record, index) => (
        <FormInput
          value={record?.quantity}
          onChange={(e) =>
            handleOnChange(record?.key, "quantity", e.target.value)
          }
        />
      ),
    },

    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      align: "center",
      render: (text, record, index) => (
        <FormInput
          disabled={true}
          value={record?.total}
          rows={2}
          onChange={(e) => handleOnChange(record?.key, "total", e.target.value)}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text, record, index) => (
        <DeleteButton onclick={handleDeleteRow} />
      ),
    },
  ];

  const handleSave = async (data) => {
    let tempData =
      data?.length &&
      data?.map((item) => {
        return {
          stock_id: item?.stock_id,
          quantity: Number(item?.quantity),
          unit_price: item?.unit_price,
          total: item?.total,
        };
      });

    let uniqno = Date.now();

    let saleOrderData = {
      user: user,
      saleorder_no: uniqno,
      grand_total: grandTotal,
    };

    console.log("dtemp", {
      saleOrderData: saleOrderData,
      saleOrderDetailsData: tempData,
    });

    await instance
      .post(`/sale/order`, {
        saleOrderData: saleOrderData,
        saleOrderDetailsData: tempData,
      })
      .then((res) => {
        console.log("ress", res);
        if (res.status === 201) {
          message.success("Created Successfully");

          setTimeout(() => {
            navigate(routePath.SALEORDER);
          }, 1000);
        }
      })
      .catch((Err) => {
        message.error(Err.message);
      });
  };


  const handleUpdate = async (data) => {
    let tempData =
      data?.length &&
      data?.map((item) => {
        return {
          stock_id: item?.stock_id,
          quantity: Number(item?.quantity),
          unit_price: item?.unit_price,
          total: item?.total,
          difference:item?.difference,
        };
      });

    let uniqno = Date.now();

    let saleOrderData = {
      user: user,
      saleorder_no: uniqno,
      grand_total: grandTotal,
    };

    console.log("dtemp", {
      saleOrderData: saleOrderData,
      saleOrderDetailsData: tempData,
    });

    await instance
      .patch(`/sale/order/${id}`, {
        saleOrderData: saleOrderData,
        saleOrderDetailsData: tempData,
      })
      .then((res) => {
        console.log("ress", res);
        if (res.status === 200) {
          message.success("updated Successfully");

          setTimeout(() => {
            navigate(routePath.SALEORDER);
          }, 1000);
        }
      })
      .catch((Err) => {
        message.error(Err.message);
      });
  };

  useEffect(() => {
    tableCalculate(tableData);
  }, [tableData]);

  const tableCalculate = (data) => {
    let total = 0;
    data?.length &&
      data?.map((item) => {
        total = total + parseFloat(item?.total ? item?.total : 0);
      });
    setGrandTotal(total);
    console.log("totals", total);
  };

  const getSingleSaleOrder = async (id) => {
    await instance
      .get(`/sale/order/${id}`)
      .then(async(res) => {
        console.log("ddd",res);
        if(res?.status ===200){

          setGetOneData(res?.data)

          setGrandTotal(res?.data?.grand_total)

          const temp = res?.data?.details?.map( async(item)=>{

            let product = await  getOneProduct(item?.stock_id);
            // handleSelectProduct(item?._id, "stock_id", item?.stock_id)
            return {
              _id:item?._id,
              // sl_no: "",
              available_quantity: product?.qty,
              stock_id: item?.stock_id,
              quantity: item?.quantity,
              original_qty:item?.quantity,

              unit_price: item?.unit_price,
              total: item?.total,
              key: item?._id,
              
            }
          })
          console.log('tempp',temp);
          let data = await Promise.all(temp)
          setTableData(data)
        }



      })
      .catch((err) => {
        message.error("Network error: ");
      });
  };

  useEffect(() => {
    if (id) {
      getSingleSaleOrder(id);
    }
  }, [id]);
  return (
    <div className="row">
      <div className="row">
        <div className="col-lg-5 d-flex align-items-center">
          {id ? (
            <span className="heading_font mx-1">Edit Sale Order</span>
          ) : (
            <span className="heading_font mx-1">Add Sale Order</span>
          )}
          {/* <span className="heading_font mx-1">Add Sale Order</span> */}
        </div>

        <div className="row mt-3 mx-3">
          <TableData
            columns={columns}
            data={tableData}
            className={"add_table"}
          />
        </div>

        <div className="row mx-4 mt-3">
          <Addrow onClick={handleAddRow} />
        </div>

        {/* <div className="row mt-2 justify-content-end align-items-center " style={{ fontWeight:700,fontSize:'15px'}}>
             Working Charge : <div className="col-3"><FormInput/></div> 


        </div> */}
        <div
          className="row mt-2 justify-content-end align-items-center "
          style={{ fontWeight: 700, fontSize: "20px", color: "blue" }}
        >
          Grand Total :{" "}
          <div className="col-3">
            <FormInput value={grandTotal} disabled={true} />
          </div>
        </div>

        <div className="row d-flex mt-3 justify-content-center">
          <CustomButton className={"cancel_button mx-1"} data={"Cancel"} />

          <CustomButton
            className={"save_button mx-1"}
            onClick={() => {
              if(id){
                handleUpdate(tableData)
              }else{
                handleSave(tableData);

              }
            }}
            data={"Save"}
          />
        </div>
      </div>
    </div>
  );
}

export default AddSaleOrder;
