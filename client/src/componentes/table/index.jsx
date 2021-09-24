import React, { Component } from "react";
import { Button, Card, Table } from "antd";

import Buttons from "../buttons";

export default class index extends Component {
  render() {
    const { dataSource, columns, addAction, updateAction, deleteAction } =
      this.props;

    let realColumns = [
      {
        key: "index",
        title: "序号",
        align: "center",
        render: (value, row, index) => {
          return <span>{index + 1}</span>;
        },
      },
      ...columns,
      {
        key: "action",
        title: "操作",
        align: "center",
        width: "360px",
        render: (value, row, index) => {
          return (
            <Buttons
              addAction={addAction(row)}
              updateAction={updateAction(row)}
              deleteAction={deleteAction(row)}
            ></Buttons>
          );
        },
      },
    ];

    return (
      <div className="w-100 h-100 bg-grey">
        <Card className="m-10">
          <Button
            type="primary"
            onClick={addAction()}
            style={{
              marginBottom: "20px",
            }}
          >
            增加
          </Button>
          <Table dataSource={dataSource} columns={realColumns}></Table>
        </Card>
      </div>
    );
  }
}
