import React, { Component } from "react";

import { Table, Modal, Input, Form } from "antd";
import Btns from "../../../componentes/Buttons";

import api from "../../../api";

export default class college extends Component {
  state = {
    collegeList: [{ id: 1, collegeName: "计算机" }],

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
        render: () => (
          <Btns
            Add={() => {
              this.setState({ addModal: true });
            }}
            Update={() => {
              this.setState({ updateModal: true });
            }}
            Delete={this.Delete}
          ></Btns>
        ),
      },
    ],

    addModal: false,
    updateModal: false,
  };

  //添加学院
  Add = () => {};

  //更新学院名称
  Update = () => {
    console.log("2");
  };

  //删除学院
  Delete = () => {
    console.log("3");
  };

  render() {
    const { collegeList, columns, addModal, updateModal } = this.state;
    return (
      <div>
        <Table rowKey="id" dataSource={collegeList} columns={columns}></Table>
        {/* 添加学院 */}
        <Modal
          title="添加学院"
          visible={addModal}
          cancelText="取消"
          okText="确定"
        >
          <Form>
            <Form.Item label="学院名称">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="修改学院信息"
          visible={updateModal}
          cancelText="取消"
          okText="确定"
        ></Modal>
      </div>
    );
  }
}
