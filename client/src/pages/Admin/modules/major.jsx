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
        title: "专业名称",
        dataIndex: "majorName",
        align: "center",
      },
      {
        title: "操作",
        fixed: "right",
        align: "center",
        width: 100,
        render: (value, row) => {
          return (
            <Btns
              Add={() => {
                this.setState({ addModal: true });
              }}
              Update={() => {
                this.setState({ updateModal: true, majorId: row.majorId });
              }}
              Delete={() => {
                this.setState({ majorId: row.majorId });
                this.Delete();
              }}
            ></Btns>
          );
        },
      },
    ],

    //选中的专业id
    majorId: "",
    majorName: "",
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
  Select = async (collegeId) => {
    const res = await api.Get("major", { collegeId });
    if (res.code === 10000) {
      this.setState({
        collegeId,
        majorList: res.data,
        addModal: false,
        updateModal: false,
      });
    }
  };

  //添加专业
  Add = async () => {
    const { majorName, collegeId } = this.state;
    const res = await api.Add("major", { majorName, collegeId });
    if (res.code === 10000) {
      message.success("添加成功");
      this.Select(collegeId);
    }
  };

  //更新专业名称
  Update = async () => {
    const { majorId, majorName, collegeId } = this.state;
    const res = await api.Update("major", { majorId, majorName });
    if (res.code === 10000) {
      message.success("修改成功");
      this.Select(collegeId);
    }
  };

  //删除专业
  Delete = () => {
    const { majorId, collegeId } = this.state;
    Modal.confirm({
      title: "提示",
      content: "确定要删除此专业吗？",
      cancelText: "取消",
      okText: "确定",
      onOk: async () => {
        const res = await api.Delete("major", { majorId });
        if (res.code === 10000) {
          message.success("删除成功");
          this.Select(collegeId);
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
      collegeId,
    } = this.state;
    return (
      <div>
        <Select
          className="my-10"
          style={{ width: "180px" }}
          placeholder="请选择学院"
          onSelect={this.Select}
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
          dataSource={majorList}
          columns={columns}
        ></Table>
        {/* 添加专业 */}
        <Modal
          destroyOnClose={true}
          title="添加学院"
          visible={addModal}
          cancelText="取消"
          okText="确定"
          onOk={this.Add}
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
        {/* 更新专业信息 */}
        <Modal
          destroyOnClose={true}
          title="修改专业信息"
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
