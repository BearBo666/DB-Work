import React, { Component } from "react";

import { Button } from "antd";

export default class index extends Component {
  render() {
    const { Add, Update, Delete } = this.props;
    return (
      <div className="flex-x">
        <Button className="mx-10" type="primary" onClick={Add}>
          新增
        </Button>
        <Button
          type="primary"
          style={{ color: "white" }}
          className="bg-1 mx-10 center"
          onClick={Update}
        >
          修改
        </Button>
        <Button className="mx-10" type="primary" danger onClick={Delete}>
          删除
        </Button>
      </div>
    );
  }
}
