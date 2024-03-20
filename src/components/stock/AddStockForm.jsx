import { Form, Input, message } from "antd";
import React, { useEffect, useState } from "react";
import FormInput from "../Input/FormInput";
import FormTextArea from "../Input/FormTextArea";
import CustomButton from "../Buttons/SaveButton";
import { useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";
import instance from "../../utils/axios/AxiosInstance";

function AddStockForm({ sendModalValue, idForm }) {
  const [stockForm] = useForm();
  const userData = useSelector((state) => state?.userDetails?.userData);
  const [btnDisable, setBtnDisable] = useState(false);
  console.log("uuu", userData);
  const userId = localStorage.getItem("user");

  const handleSave = async (data) => {
    data.stockName = data.stockName;
    data.user = userId;
    data.qty = Number(data.qty);
    data.price = Number(data.price);
    await instance
      .post(`/stock/addstocksingle`, data)
      .then((res) => {
        console.log("ress", res);
        if (res.status === 201) {
          setBtnDisable(false);
          message.success(res?.data?.message);
          sendModalValue(false);

          setTimeout(() => {
            navigate(routePath.STOCK);
          }, 1000);
        }
      })
      .catch((Err) => {
        message.error(Err.message);
        setBtnDisable(false);
      });
  };

  const getOneStock = async (id) => {
    await instance
      .get(`/stock/stock/${id}`)

      .then((res) => {
        if (res?.status === 200) {
          console.log("ress", res);
          stockForm.setFieldsValue({
            stockName: res?.data?.data?.stockName,
            qty: res?.data?.data?.qty,
            price: res?.data?.data?.price,
            desc: res?.data?.data?.desc,
          });
        }
      })
      .catch((err) => {
        message.error("Cannot get Product");
      });
  };

  useEffect(()=>{
if(idForm){
    getOneStock(idForm)
}
  },[idForm])


  const handleEdit = async  (data)=>{
    data.stockName = data.stockName;
    data.user = userId;
    data.qty = Number(data.qty);
    data.price = Number(data.price);
await instance.patch(`/stock/stock/${idForm}`, data)
.then((res)=>{
    if(res.status===200){
      message.success(res?.data?.message)
      sendModalValue(false);
      setBtnDisable(false)

    //   navigate(routePath.STOCK)
    //   sendModalValue(false)
    }
  
})
.catch((err)=>{
    message.error(err?.response?.data?.message)
    setBtnDisable(false)
    
})
  }
  return (
    <div className="my-3">
      <Form
        form={stockForm}
        onFinish={(data) => {
            if(idForm){
                handleEdit(data)
            }else{
                handleSave(data);

            }
          console.log("ll", data);
        }}
      >
        <div className="row">
          <div className="col-lg-12">
            <div className="row mx-1 form_font"> Stock Name:</div>
            <Form.Item name={"stockName"}>
              <FormInput />
            </Form.Item>
          </div>
          <div className="col-lg-6">
            <div className="row mx-1 form_font"> Quantity:</div>
            <Form.Item name={"qty"}>
              <FormInput type={"Number"} />
            </Form.Item>
          </div>
          <div className="col-lg-6">
            <div className="row mx-1 form_font"> Price:</div>
            <Form.Item name={"price"}>
              <FormInput type={""} />
            </Form.Item>
          </div>
          <div className="col-lg-12">
            <div className="row mx-1 form_font"> Description:</div>
            <Form.Item name={"desc"}>
              <FormTextArea rows={6} />
            </Form.Item>
          </div>

          <div className="col-lg-12 m-3">
            <div className="row d-flex justify-content-center">
              <CustomButton className={"cancel_button mx-1"} data={"Cancel"} />

              <CustomButton
                className={"save_button mx-1"}
                type="submit"
                disable={btnDisable}
                onClick={() => {
                  setBtnDisable(true);
                  stockForm.submit();
                }}
                data={"Save"}
              />
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default AddStockForm;
