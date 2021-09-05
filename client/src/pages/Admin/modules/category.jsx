import { Table } from "antd";
import React, { Component } from "react";

const columns = [
  {
    title: "序号",
    align: "center",
    render: (value, row, index) => {
      return <span>{index + 1}</span>;
    },
  },
  {
    title: "用户名",
    align: "center",
    dataIndex: "userName",
  },
  {
    title: "邮箱",
    align: "center",
    dataIndex: "email",
  },
  {
    title: "上次登陆时间",
    align: "center",
    dataIndex: "lastLoginTime",
  },
  {
    title: "上次登陆IP",
    align: "center",
    dataIndex: "lastLoginIp",
  },
  {
    title: "操作",
    align: "center",
    render: (value, row, index) => {
      return <span>{index + 1}</span>;
    },
  },
];


export default class admin extends Component {
  state={
    dataSource=[]
  }

  render() {
    const {dataSource}=this.state
    return (
      <div>
        <Table dataSource={dataSource} columns={columns}></Table>
      </div>
    );
  }
}
