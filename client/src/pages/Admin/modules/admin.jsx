import React, { Component } from "react";

import { AdminList, AdminRegister } from "../../../api/admin";
import MyTable from "../../../componentes/table";

const columns = [
  {
    key: "userName",
    title: "用户名",
    align: "center",
    dataIndex: "name",
  },
  { key: "email", title: "邮箱", align: "center", dataIndex: "email" },
  {
    key: "lastLoginTime",
    title: "上次登陆时间",
    align: "center",
    dataIndex: "lastLoginTime",
  },
  {
    key: "lastLoginIp",
    title: "上次登陆IP",
    align: "center",
    dataIndex: "lastLoginIp",
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
    const res = await AdminList();
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
