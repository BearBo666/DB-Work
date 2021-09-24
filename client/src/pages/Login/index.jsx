import React, { Component } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";

import { UserLogin, UserRegister } from "../../api/user";
import Wave from "../../componentes/wave";
import { setToken } from "../../utils/token";

const title = {
  fontWeight: "bolder",
  fontSize: "25px",
  color: "rgb(41, 135, 255)",
};

const wave = {
  bottom: "0px",
};

@withRouter
export default class index extends Component {
  Login = async (values) => {
    const res = await UserLogin(values);
    if (res.code === 10000) {
      message.success("登录成功");
      this.props.history.push("/home");
      setToken(res.data);
    }
  };

  Register = async () => {
    const res = await UserRegister(this.form.getFieldsValue());
    if (res.code === 10000) {
      message.success("注册成功");
    }
  };

  render() {
    return (
      <div className="w-100 h-100 rela center-y">
        <div className="my-30" style={title}>
          登录
        </div>
        <Form
          ref={(form) => (this.form = form)}
          className="w-80"
          initialValues={{ remember: true }}
          onFinish={this.Login}
        >
          <Form.Item
            name="userName"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input
              className="br-10"
              prefix={<UserOutlined />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input
              className="br-10"
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="ml-5">Remember Me</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
            <Button className="mx-10" type="primary" onClick={this.Register}>
              注册
            </Button>
          </Form.Item>
        </Form>
        <Wave style={wave}></Wave>
      </div>
    );
  }
}
