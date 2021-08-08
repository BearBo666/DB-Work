import React, { Component } from "react";

import Header from "../../componentes/Header";

import {
  ScheduleOutlined,
  PieChartOutlined,
  SelectOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
const { Item } = Menu;

export default class index extends Component {
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
            <Item key="grade" icon={<PieChartOutlined />}>
              我的成绩
            </Item>
            <Item key="schedult" icon={<ScheduleOutlined />}>
              我的课表
            </Item>
            <Item key="select" icon={<SelectOutlined />}>
              选课
            </Item>
          </Menu>
          <div className="main grow-2"></div>
        </div>
      </div>
    );
  }
}
