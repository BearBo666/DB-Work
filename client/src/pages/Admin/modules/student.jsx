import React, { Component } from "react";

import { Table, Modal, Input, Form, message, Select, Button } from "antd";

import Btns from "../../../componentes/Buttons";

import api from "../../../api";

const { Option } = Select;

export default class college extends Component {
  state = {
    //学院列表
    collegeList: [],
    //专业列表
    majorList: [],
    //班级列表
    classList: [],
    //学生列表
    studentList: [],

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
        title: "学号",
        dataIndex: "studentNum",
        align: "center",
      },
      {
        title: "姓名",
        dataIndex: "name",
        align: "center",
      },
      {
        title: "邮箱",
        dataIndex: "email",
        align: "center",
      },
      {
        title: "操作",
        fixed: "right",
        align: "center",
        width: 200,
        render: (value, row) => {
          return <Btns></Btns>;
        },
      },
    ],

    //选中的学院id
    collegeId: "",
    //选中的专业id
    majorId: "",
    //选中的班级id
    classId: "",
    //选中的学生id
    studentNum: "",
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
  majorFetch = async (collegeId) => {
    const res = await api.Get("major", { collegeId });
    if (res.code === 10000) {
      this.setState({ majorList: res.data, collegeId });
    }
  };

  //获得班级列表
  classFetch = async (majorId) => {
    const res = await api.Get("class", { majorId });
    if (res.code === 10000) {
      this.setState({
        majorId,
        classList: res.data,
        addModal: false,
        updateModal: false,
      });
    }
  };

  //获得学生列表
  studentFetch = async (classId) => {
    const res = await api.Get("student", { classId });
    if (res.code === 10000) {
      this.setState({
        classId,
        studentList: res.data,
        addModal: false,
        updateModal: false,
      });
    }
  };

  render() {
    const { collegeList, majorList, columns, classList, studentList } =
      this.state;
    return (
      <div>
        {/* 选择学院 */}
        <Select
          className="my-10"
          style={{ width: "180px" }}
          placeholder="请选择学院"
          onSelect={this.majorFetch}
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
        {/* 选择专业 */}
        <Select
          className="m-10"
          style={{ width: "180px" }}
          placeholder="请选择专业"
          onSelect={this.classFetch}
        >
          {majorList.map((major) => {
            const { majorId, majorName } = major;
            return (
              <Option key={majorId} value={majorId}>
                {majorName}
              </Option>
            );
          })}
        </Select>
        {/* 选择班级 */}
        <Select
          className="m-10"
          style={{ width: "180px" }}
          placeholder="请选择班级"
          onSelect={this.studentFetch}
        >
          {classList.map((c) => {
            const { classId, className } = c;
            return (
              <Option key={classId} value={classId}>
                {className}
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
          rowKey="studentName"
          dataSource={studentList}
          columns={columns}
        ></Table>
      </div>
    );
  }
}
