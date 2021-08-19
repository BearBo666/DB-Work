import React, { Component } from "react";

import { Table, Modal, Input, Form, message } from "antd";
import Btns from "../../../componentes/Buttons";

import api from "../../../api";

export default class college extends Component {
  state = {
    //学院列表
    collegeList: [],

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
        title: "学院名称",
        dataIndex: "collegeName",
        align: "center",
      },
      {
        title: "操作",
        fixed: "right",
        align: "center",
        width: 100,
        render: (value, row, index) => (
          <Btns
            Add={() => {
              this.setState({ addModal: true });
            }}
            Update={() => {
              this.setState({ updateModal: true, collegeId: row.collegeId });
            }}
            Delete={() => {
              this.setState({ collegeId: row.collegeId });
              this.Delete();
            }}
          ></Btns>
        ),
      },
    ],

    collegeName: "",
    collegeId: "",
  };

  componentDidMount() {
    this.Get();
  }

  //添加学院
  Add = async () => {
    const { collegeName } = this.state;
    const res = await api.Add("college", { collegeName });
    if (res.code === 10000) {
      message.success("添加成功");
      this.Get();
    }
  };

  //更新学院名称
  Update = async () => {
    const { collegeName, collegeId } = this.state;
    const res = await api.Update("college", { collegeName, collegeId });
    if (res.code === 10000) {
      message.success("修改成功");
      this.Get();
    }
  };

  //删除学院
  Delete = () => {
    const { collegeId } = this.state;
    Modal.confirm({
      title: "提示",
      content: "确定要删除此学院吗？",
      cancelText: "取消",
      okText: "确定",
      onOk: async () => {
        const res = await api.Delete("college", { collegeId });
        if (res.code === 10000) {
          message.success("删除成功");
          this.Get();
        }
      },
    });
  };

  //学院列表
  Get = async () => {
    const res = await api.Get("college");
    if (res.code === 10000) {
      this.setState({
        collegeList: res.data,
        addModal: false,
        updateModal: false,
      });
    }
  };

  render() {
    const { collegeList, columns, addModal, updateModal } = this.state;
    return (
      <div>
        <Table
          pagination={{ position: ["bottomLeft"], showSizeChanger: true }}
          rowKey="collegeId"
          dataSource={collegeList}
          columns={columns}
        ></Table>
        {/* 添加学院 */}
        <Modal
          destroyOnClose={true}
          title="添加学院"
          visible={addModal}
          cancelText="取消"
          okText="确定"
          onOk={this.Add}
        >
          <Form>
            <Form.Item label="学院名称">
              <Input
                defaultValue=""
                onChange={(e) => {
                  this.setState({ collegeName: e.target.value });
                }}
              />
            </Form.Item>
          </Form>
        </Modal>
        {/* 更新学院信息 */}
        <Modal
          destroyOnClose={true}
          title="修改学院信息"
          visible={updateModal}
          cancelText="取消"
          okText="确定"
          onOk={this.Update}
        >
          <Form>
            <Form.Item label="学院名称">
              <Input
                defaultValue=""
                onChange={(e) => {
                  this.setState({ collegeName: e.target.value });
                }}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}
