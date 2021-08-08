import React, { Component } from "react";

import Header from "../../componentes/Header";

import { ScheduleOutlined } from "@ant-design/icons";

import { Menu } from "antd";
const { Item } = Menu;

export default class Home extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <div className="w-100 h-100 flex-y">
        <Header collapsed={collapsed} toggle={this.toggle}></Header>
        <div className="grow-2 flex-x">
          <Menu
            className="menu h-100"
            mode="inline"
            inlineCollapsed={collapsed}
          >
            <Item key="1" icon={<ScheduleOutlined />}>
              我的课表
            </Item>
            <Item key="2" icon={<ScheduleOutlined />}>
              我的学生
            </Item>
            <Item key="3" icon={<ScheduleOutlined />}>
              我的教学班
            </Item>
            <Item key="4" icon={<ScheduleOutlined />}>
              我的班级
            </Item>
          </Menu>
          <div className="main grow-2"></div>
        </div>
      </div>
    );
  }
}
