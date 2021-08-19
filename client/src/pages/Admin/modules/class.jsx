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
        title: "班级名称",
        dataIndex: "className",
        align: "center",
      },
      {
        title: "班主任名称",
        dataIndex: "teacherName",
        align: "center",
      },
      {
        title: "操作",
        fixed: "right",
        align: "center",
        width: 200,
        render: (value, row) => {
          return (
            <Btns
              Add={() => {
                this.setState({ addModal: true });
              }}
              Update={() => {
                this.setState({ updateModal: true, classId: row.classId });
              }}
              Delete={() => {
                this.setState({ classId: row.classId });
                this.Delete();
              }}
            ></Btns>
          );
        },
      },
    ],

    //选中的学院id
    collegeId: "",
    //选中的专业id
    majorId: "",
    //选中的班级id
    classId: "",
    //班级名称
    className: "",
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

  //添加专业
  Add = async () => {
    const { className, majorId } = this.state;
    const res = await api.Add("major", { className, majorId });
    if (res.code === 10000) {
      message.success("添加成功");
    }
    this.classFetch(majorId);
  };

  //更新专业名称
  Update = async () => {
    const { classId, className, majorId } = this.state;
    const res = await api.Update("major", { classId, className });
    if (res.code === 10000) {
      message.success("修改成功");
      this.Select(majorId);
    }
  };

  //删除班级
  Delete = () => {
    const { classId, majorId } = this.state;
    Modal.confirm({
      title: "提示",
      content: "确定要删除此班级吗？",
      cancelText: "取消",
      okText: "确定",
      onOk: async () => {
        const res = await api.Delete("major", { classId });
        if (res.code === 10000) {
          message.success("删除成功");
          this.Select(majorId);
        }
      },
    });
  };

  render() {
    const {
      collegeList,
      majorList,
      columns,
      addModal,
      updateModal,
      classList,
    } = this.state;
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
        <Button
          type="primary"
          className="mx-20"
          onClick={() => this.setState({ addModal: true })}
        >
          增加
        </Button>
        <Table
          rowKey="classId"
          dataSource={classList}
          columns={columns}
        ></Table>
        {/* 添加班级 */}
        <Modal
          destroyOnClose={true}
          title="添加班级"
          visible={addModal}
          cancelText="取消"
          okText="确定"
          onOk={this.Add}
        >
          <Form>
            <Form.Item label="名称">
              <Input
                defaultValue=""
                onChange={(e) => {
                  this.setState({ majorName: e.target.value });
                }}
              />
            </Form.Item>
          </Form>
        </Modal>
        {/* 更新专业信息 */}
        <Modal
          destroyOnClose={true}
          title="修改班级信息"
          visible={updateModal}
          cancelText="取消"
          okText="确定"
          onOk={this.Update}
        >
          <Form>
            <Form.Item label="专业名称">
              <Input
                defaultValue=""
                onChange={(e) => {
                  this.setState({ majorName: e.target.value });
                }}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
