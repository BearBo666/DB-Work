import React, { PureComponent } from "react";

import "./index.scss";
import api from "../../api/index";
import LoginImg from "../../assets/img/login.png";
import LoginBg from "../../assets/img/login_bg.svg";
import { saveStudentInfo } from "../../store/actions/student";

import { Form, Input, Menu, Button, message } from "antd";
import { connect } from "react-redux";

class Login extends PureComponent {
  state = {
    account: "",
    studentNum: "201913137151",
    teacherNum: "201913137080",
    password: "123456",

    current: "teacher",
  };

  chooseRole = ({ key }) => {
    this.setState({ current: key });
  };

  //输入账号
  inputAccount = (e) => {
    const { current } = this.state;
    const {
      target: { value },
    } = e;
    if (current === "teacher") {
      this.setState({ teacherNum: value });
    } else if (current === "student") {
      this.setState({ studentNum: value });
    } else {
      this.setState({ account: value });
    }
  };

  //输入密码
  inputPassword = (e) => {
    const {
      target: { value },
    } = e;
    this.setState({ password: value });
  };

  //登录
  login = async () => {
    let res;
    const { current, teacherNum, password, studentNum, account } = this.state;
    //不同身份登录
    if (current === "teacher") {
      res = await api.teacherLogin({ teacherNum, password });
    } else if (current === "student") {
      res = await api.studentLogin({ studentNum, password });
    } else {
      res = await api.adminLogin({ account, password });
    }
    //成功
    if (res) {
      window.localStorage.setItem("token", res.data.token);
      this.props.history.push("/" + current);
    }
  };

  render() {
    const { current } = this.state;

    return (
      <div
        id="login"
        className="w-100 h-100 center"
        style={{ backgroundImage: `url(${LoginBg})` }}
      >
        {/* 表单容器 */}
        <div className="flex-x" id="login-container">
          {/* 左侧 */}
          <div className="login-left center px-30">
            <img src={LoginImg} alt="login" />
          </div>
          {/* 右侧 */}
          <div className="login-right p-20 flex-y center">
            <h1>武汉科技大学教务处</h1>
            {/* 身份选择 */}
            <Menu
              className="m-20"
              onClick={this.chooseRole}
              mode="horizontal"
              selectedKeys={[current]}
            >
              <Menu.Item key="teacher">老师登录</Menu.Item>
              <Menu.Item key="student">学生登录</Menu.Item>
              <Menu.Item key="admin">管理员登录</Menu.Item>
            </Menu>
            {/* 账号表单 */}
            <Form className="mt-20">
              <Form.Item label="账号">
                <Input size="large" onChange={this.inputAccount}></Input>
              </Form.Item>
              <Form.Item label="密码">
                <Input
                  size="large"
                  type="password"
                  onChange={this.inputPassword}
                ></Input>
              </Form.Item>
              <Form.Item>
                <Button
                  onClick={this.login}
                  size="large"
                  type="primary"
                  className="w-100"
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    return { student: state.student };
  },
  (dispatch) => {
    return { saveStudentInfo: (info) => dispatch(saveStudentInfo(info)) };
  }
)(Login);
