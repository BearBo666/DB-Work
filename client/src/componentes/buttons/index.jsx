import { Button, Divider, Popconfirm } from "antd";
import React, { Component } from "react";

export default class index extends Component {
  render() {
    const { addAction, updateAction, deleteAction } = this.props;
    return (
      <div>
        <Button type="link" onClick={addAction}>
          增加
        </Button>
        <Divider type="vertical"></Divider>
        <Button type="link" onClick={updateAction}>
          修改
        </Button>
        <Divider type="vertical"></Divider>
        <Popconfirm
          title="确定删除吗？"
          onConfirm={deleteAction}
          okText="确定"
          cancelText="取消"
        >
          <Button type="link">删除</Button>
        </Popconfirm>
      </div>
    );
  }
}
