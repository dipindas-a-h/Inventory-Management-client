import React from "react";
import Card from "../../components/card/Card";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import routePath from "../../Routes/Path";
import instance from "../../utils/axios/AxiosInstance";
import { useForm } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../Redux/sort/AuthState";

function Login() {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const [loginForm] = useForm()


  const handleLogin = async(data)=>{
   await instance.post(`/user/login`,data)
   .then((res)=>{
    if(res.status===200){

      dispatch(loginSuccess(res?.data?.data))
      message.success(res?.data?.message)
      localStorage.setItem('token',res.data.data?.password)
      localStorage.setItem('user',res?.data?.data?._id)
      navigate(routePath.HOME)
    }

   })
   .catch((error)=>{
    console.log(error);
    message.error(error?.response?.data?.message)
   })




  }

  return (
    <div>
      <div
        className="row d-flex justify-content-center"
        style={{ height: "99vh", width: "100%", backgroundColor: "#101219" }}
      >
        <div className="col-lg-4"></div>
        <Card
          width={"400px"}
          height={"400px"}
          // color={"rgb(97,51,208)"}
          className
          content={
            <>
            <div className="row">
              <Form form={loginForm} onFinish={handleLogin}>
                <div className="row">
                <div className="row "> <h1 className="d-flex justify-content-center">LOGO</h1></div>

                  <div className="col-lg-12 d-block justify-content-center mx-4">
                    <div className="login-fonts">Email</div>
                    <Form.Item name={'email'}>
                      <Input className="" style={{ width: "300px", height: "45px" }} />
                    </Form.Item>
                  </div>
                  <div className="col-lg-12 d-block justify-content-center mx-4">
                    <div className="login-fonts">Password</div>
                    <Form.Item name={'password'}>
                      <Input.Password style={{ width: "300px", height: "45px" }} />
                    </Form.Item>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-center">
                  <Button type="submit"  className="login_button" style={{ width:'40%' ,height:'40px'}} onClick={()=>{loginForm.submit()}}>Submit</Button>
                  </div>
                </div>
              </Form>
              </div>
            </>
          }
        />
      </div>
    </div>
  );
}

export default Login;
