import React, { Component } from "react";

import "./index.scss";
import Logo from "../../assets/img/logo.png";

import { Avatar, Modal } from "antd";
import { withRouter } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

class Header extends Component {
  toggleMenu = () => {
    this.props.toggle();
  };

  logout = () => {
    Modal.confirm({
      title: "提示",
      content: "确定要注销登录吗？",
      cancelText: "取消",
      okText: "确定",
      onOk: () => {
        window.localStorage.removeItem("token");
        this.props.history.push("/login");
      },
    });
  };

  render() {
    const { collapsed } = this.props;
    return (
      <div className="w-100 header flex-x jc-between ai-center">
        <div className="header-left pl-24 center">
          <img src={Logo} className="header-logo mr-15" />
          <div className="toggle-btn center mr-20" onClick={this.toggleMenu}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
            )}
          </div>

          <h2 className="header-title ">武汉科技大学教务处</h2>
        </div>
        <div className="header-right mr-30 h-100 center">
          <div className="header-avatar h-100 center px-10 mr-20">
            <Avatar src={Logo} />
            <span className="ml-10">欢迎您，熊博</span>
          </div>
          <div className="logout-btn h-100 center px-10">
            <LogoutOutlined />
            <span className="ml-5" onClick={this.logout}>
              退出登录
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
