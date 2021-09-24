import React, { Component } from "react";
import { Input, Form, Button, message } from "antd";
import { AddArticle } from "../../api/article";

const { TextArea } = Input;

export default class add extends Component {
  submit = async (form) => {
    const res = await AddArticle(form);
    if (res.code === 10000) {
      message.success("发布成功");
      this.props.history.push("/home");
    }
  };

  render() {
    return (
      <div>
        <Form onFinish={this.submit}>
          <Form.Item name="title">
            <Input placeholder="标题"></Input>
          </Form.Item>
          <Form.Item name="content">
            <TextArea autoSize={{ minRows: "10", maxRows: "20" }}></TextArea>
          </Form.Item>
          <Button htmlType="submit" type="primary">
            发布
          </Button>
        </Form>
      </div>
    );
  }
}
