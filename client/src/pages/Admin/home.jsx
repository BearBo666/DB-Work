import { Menu } from "antd";
import React, { Component, lazy } from "react";

import {
  UserOutlined,
  UnorderedListOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router";

const Category = lazy(() => import("./modules/category"));
const User = lazy(() => import("./modules/user"));
const Admin = lazy(() => import("./modules/admin"));
const Pioneer = lazy(() => import("./modules/pioneer"));

export default class home extends Component {
  handleClick = ({ key }) => {
    this.props.history.push(`/admin/home/${key}`);
  };

  render() {
    return (
      <div className="w-100 h-100 flex-x">
        <Menu mode="vertical" onClick={this.handleClick}>
          <Menu.Item key="category" icon={<UnorderedListOutlined />}>
            分类管理
          </Menu.Item>
          <Menu.Item key="pioneer" icon={<TeamOutlined />}>
            前人管理
          </Menu.Item>
          <Menu.Item key="admin" icon={<SafetyCertificateOutlined />}>
            管理员列表
          </Menu.Item>
          <Menu.Item key="user" icon={<UserOutlined />}>
            用户列表
          </Menu.Item>
        </Menu>
        <Suspense fallback={<h1>loading.....</h1>}>
          <Switch>
            <Route path="/admin/home/category" component={Category}></Route>
            <Route path="/admin/home/user" component={User}></Route>
            <Route path="/admin/home/admin" component={Admin}></Route>
            <Route path="/admin/home/pioneer" component={Pioneer}></Route>
            <Redirect to="/admin/home"></Redirect>
          </Switch>
        </Suspense>
      </div>
    );
  }
}
