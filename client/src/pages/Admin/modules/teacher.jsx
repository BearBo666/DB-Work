import React, { Component } from "react";

import { Table, Modal, Input, Form, message, Select, Button } from "antd";

import Btns from "../../../componentes/Buttons";

import api from "../../../api";

const { Option } = Select;

export default class Teacher extends Component {
  state = {
    //学院列表
    collegeList: [],
    //老师列表
    teacherList: [],

    //弹窗可视
    addModal: false,
    updateModal: false,

    //表头
    columns: [
      {
        title: "序号",
        align: "center",
        render: (v, r, index) => {
          return <span>{index + 1}</span>;
        },
      },
      {
        title: "老师工号",
        dataIndex: "teacherNum",
        align: "center",
      },
      {
        title: "老师名称",
        dataIndex: "name",
        align: "center",
      },
      {
        title: "老师职称",
        dataIndex: "title",
        align: "center",
      },
      {
        title: "老师邮箱",
        dataIndex: "email",
        align: "center",
      },
      {
        title: "操作",
        fixed: "right",
        align: "center",
        width: 100,
        render: (value, row) => {
          return <Btns></Btns>;
        },
      },
    ],

    //选中的学院id
    collegeId: 0,
  };

  componentDidMount() {
    this.collegeFetch();
  }

  //获得学院列表
  collegeFetch = async () => {
    const res = await api.Get("college");
    if (res.code === 10000) {
      this.setState({ collegeList: res.data });
    }
  };

  //获得专业列表
  teacherFetch = async (collegeId) => {
    const res = await api.Get("teacher", { collegeId });
    if (res.code === 10000) {
      this.setState({
        collegeId,
        teacherList: res.data,
        addModal: false,
        updateModal: false,
      });
    }
  };

  render() {
    const { collegeList, teacherList, columns } = this.state;
    return (
      <div>
        <Select
          className="my-10"
          style={{ width: "180px" }}
          placeholder="请选择学院"
          onSelect={this.teacherFetch}
        >
          {collegeList.map((college) => {
            const { collegeId, collegeName } = college;
            return (
              <Option key={collegeId} value={collegeId}>
                {collegeName}
              </Option>
            );
          })}
        </Select>
        <Button
          type="primary"
          className="mx-20"
          onClick={() => this.setState({ addModal: true })}
        >
          增加
        </Button>
        <Table
          rowKey="majorId"
          dataSource={teacherList}
          columns={columns}
        ></Table>
      </div>
    );
  }
}
