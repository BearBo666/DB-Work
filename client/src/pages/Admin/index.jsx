import React, { Component, lazy, Suspense } from "react";

import Header from "../../componentes/Header";

import {
  BankOutlined,
  ApartmentOutlined,
  HomeOutlined,
  ShopOutlined,
  BookOutlined,
  SelectOutlined,
  UserSwitchOutlined,
  ToolOutlined,
} from "@ant-design/icons";

import { Menu } from "antd";
import { Route, Switch } from "react-router-dom";
const { Item, SubMenu } = Menu;

//路由
const College = lazy(() => import("./modules/college"));

export default class Home extends Component {
  state = {
    collapsed: false,
  };

  //菜单折叠
  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  menuClick = ({ key }) => {
    this.props.history.push(`/admin/${key}`);
  };

  render() {
    const { collapsed } = this.state;
    return (
      <div className="w-100 h-100 flex-y">
        <Header collapsed={collapsed} toggle={this.toggle}></Header>
        <div className="grow-2 flex-x">
          <Menu
            onClick={this.menuClick}
            className="menu h-100"
            mode="inline"
            inlineCollapsed={collapsed}
          >
            <SubMenu key="1" title="学校管理" icon={<BankOutlined />}>
              <Item key="college" icon={<ShopOutlined />}>
                学院管理
              </Item>
              <Item key="major" icon={<ApartmentOutlined />}>
                专业管理
              </Item>
              <Item key="class" icon={<HomeOutlined />}>
                班级管理
              </Item>
            </SubMenu>
            <SubMenu key="2" title="人员管理" icon={<UserSwitchOutlined />}>
              <Item key="teacher" icon={<ShopOutlined />}>
                老师管理
              </Item>
              <Item key="student" icon={<ApartmentOutlined />}>
                学生管理
              </Item>
            </SubMenu>
            <SubMenu key="3" title="选课管理" icon={<SelectOutlined />}>
              <Item key="teachingClass" icon={<ShopOutlined />}>
                教学班管理
              </Item>
              <Item key="course" icon={<BookOutlined />}>
                课程管理
              </Item>
            </SubMenu>
            <SubMenu key="4" title="设施管理" icon={<ToolOutlined />}>
              <Item key="building" icon={<ShopOutlined />}>
                教学楼管理
              </Item>
              <Item key="room" icon={<BookOutlined />}>
                教室管理
              </Item>
            </SubMenu>
          </Menu>
          <div className="p-20 grow-2">
            <Suspense fallback={<h1>loading....</h1>}>
              <Switch>
                <Route path="/admin/college" component={College}></Route>
              </Switch>
            </Suspense>
          </div>
        </div>
      </div>
    );
  }
}
