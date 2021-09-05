import React, { Component } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";

import { AdminLogin } from "../../api/admin";
import { setAuthToken } from "../../utils/token";

const formStyle = {
  width: "600px",
  height: "600px",
};

@withRouter
export default class index extends Component {
  Login = async (values) => {
    const res = await AdminLogin(values);
    if (res.code === 10000) {
      message.success("登录成功");
      setAuthToken(res.data);
      this.props.history.push("/admin/home");
    }
  };

  render() {
    return (
      <div className="w-100 h-100 center-y">
        <Form
          style={formStyle}
          className="flex-y jc-center"
          initialValues={{ remember: true }}
          onFinish={this.Login}
        >
          <Form.Item
            name="userName"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="密码"
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
          </Form.Item>
        </Form>
      </div>
    );
  }
}
