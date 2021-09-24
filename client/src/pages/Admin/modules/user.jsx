import React, { Component } from "react";

import { UserList } from "../../../api/user";
import MyTable from "../../../componentes/table";

const columns = [
  {
    key: "userName",
    title: "用户名",
    align: "center",
    dataIndex: "userName",
  },
  {
    key: "created_at",
    title: "注册时间",
    align: "center",
    dataIndex: "createdAt",
  },
];

export default class admin extends Component {
  state = {
    dataSource: [],
  };

  componentDidMount() {
    this.fetch();
  }

  addAdmin = () => {
    return () => {};
  };

  updateAdmin = (row) => {
    return () => {};
  };

  deleteAdmin = (row) => {
    return () => {};
  };

  // 管理员列表
  fetch = async () => {
    const res = await UserList();
    if (res.code === 10000) {
      this.setState({
        dataSource: res.data,
      });
    }
  };

  render() {
    const { dataSource } = this.state;
    return (
      <div className="w-100 h-100 bg-grey">
        <MyTable
          dataSource={dataSource}
          columns={columns}
          addAction={this.addAdmin}
          updateAction={this.updateAdmin}
          deleteAction={this.deleteAdmin}
        ></MyTable>
      </div>
    );
  }
}
