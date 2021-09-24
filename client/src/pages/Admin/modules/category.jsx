import React, { Component } from "react";
import { message, Modal, Form, Input, Select } from "antd";
import * as Icon from "@ant-design/icons";

import MyTable from "../../../componentes/table";
import {
  AddCate,
  UpdateCate,
  DeleteCate,
  CateList,
} from "../../../api/category";

// 表头
const columns = [
  {
    key: "categoryName",
    title: "分类名称",
    align: "center",
    dataIndex: "categoryName",
  },
  {
    key: "iconClass",
    title: "icon名称",
    align: "center",
    dataIndex: "iconClass",
  },
];

export default class admin extends Component {
  state = {
    dataSource: [],
  };

  componentDidMount() {
    this.fetch();
  }

  // 添加分类
  addCate = () => {
    return () => {
      Modal.confirm({
        title: "添加分类",
        okText: "确定",
        cancelText: "取消",
        content: (
          <Form ref={(c) => (this.addForm = c)}>
            <Form.Item
              name="categoryName"
              rules={[{ required: true, message: "请输入分类名称" }]}
            >
              <Input placeholder="分类名称"></Input>
            </Form.Item>
            <Form.Item
              name="iconClass"
              rules={[{ required: true, message: "请选择icon类名" }]}
            >
              <Select placeholder="icon类名">
                {Object.keys(Icon).map((iconKey) => {
                  if (iconKey != "IconProvider") {
                    return (
                      <Select.Option key={iconKey} value={iconKey}>
                        {" "}
                        {React.createElement(Icon[iconKey], {
                          style: {
                            fontSize: "20px",
                            margin: "10px",
                          },
                        })}
                        {iconKey}
                      </Select.Option>
                    );
                  }
                })}
              </Select>
            </Form.Item>
          </Form>
        ),
        onOk: async () => {
          const res = await AddCate(this.addForm.getFieldsValue());
          if (res.code === 10000) {
            message.success("添加成功");
            this.fetch();
          }
        },
      });
    };
  };

  updateCate = (row) => {
    return () => {
      console.log(row);
    };
  };

  // 删除分类
  deleteCate = (row) => {
    return async () => {
      const res = await DeleteCate({ categoryId: row.categoryId });
      if (res.code === 10000) {
        message.success("删除成功");
        this.fetch();
      }
    };
  };

  // 获得分类列表
  fetch = async () => {
    const res = await CateList();
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
          addAction={this.addCate}
          updateAction={this.updateCate}
          deleteAction={this.deleteCate}
        ></MyTable>
      </div>
    );
  }
}
