import React from "react";
import Card from "../../components/card/Card";
import { Button, Form, Input } from "antd";

function Signup() {
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
              <Form>
                <div className="row">
                <div className="row "> <h1 className="d-flex justify-content-center">LOGO</h1></div>

                <div className="row "> <h3 className="d-flex justify-content-center">Register</h3></div>

                  <div className="col-lg-12 d-block justify-content-center mx-4">
                    <div className="login-fonts">Email</div>
                    <Form.Item>
                      <Input className="" style={{ width: "300px", height: "45px" }} />
                    </Form.Item>
                  </div>
                  <div className="col-lg-12 d-block justify-content-center mx-4">
                    <div className="login-fonts">Password</div>
                    <Form.Item>
                      <Input.Password style={{ width: "300px", height: "45px" }} />
                    </Form.Item>
                  </div>
                  <div className="col-lg-12 d-flex justify-content-center">
                  <Button  className="login_button" style={{ width:'40%' ,height:'40px'}}>Submit</Button>
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

export default Signup;
