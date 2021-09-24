import { Button, Form, Input, Tag, Space, message } from "antd";
import React, { Component } from "react";

import { CateList } from "../../api/category";
import { AddPioneer } from "../../api/pioneer";

const { CheckableTag } = Tag;

export default class index extends Component {
  state = {
    // 所有分类
    categoryList: [],
    // 选择的分类
    checkedCate: [],
  };

  componentDidMount() {
    this.fetchCate();
  }

  // 获得分类列表
  fetchCate = async () => {
    const res = await CateList();
    if (res.code === 10000) {
      this.setState({
        categoryList: res.data,
      });
    }
  };

  // 选择分类
  checkCate = (tag, checked) => {
    const { checkedCate } = this.state;
    const nextSelectedTags = checked
      ? [...checkedCate, tag]
      : checkedCate.filter((t) => t !== tag);

    this.setState({
      checkedCate: nextSelectedTags,
    });
  };

  // 提交
  submit = async (form) => {
    const { checkedCate } = this.state;
    form.categoryId = checkedCate.map((cate) => cate.categoryId);
    const res = await AddPioneer(form);
    if (res.code === 10000) {
      message.success("申请成功");
      this.props.history.push("/home");
    }
  };

  render() {
    const { categoryList, checkedCate } = this.state;
    return (
      <div className="w-100 h-100 center-x">
        <Form className="w-80 h-100" onFinish={this.submit}>
          <Form.Item name="name" label="姓名">
            <Input className="w-80" placeholder="姓名" />
          </Form.Item>
          <Form.Item name="title" label="头衔">
            <Input className="w-80" placeholder="多个头衔之间可以|分隔" />
          </Form.Item>
          <Form.Item name="email" label="邮箱">
            <Input className="w-80" placeholder="请输入邮箱"></Input>
          </Form.Item>
          <Form.Item name="freeTime" label="空闲时间">
            <Input className="w-80" placeholder="如:周三下午3:00"></Input>
          </Form.Item>
          <Form.Item name="introduce" label="自我介绍">
            <Input.TextArea
              className="w-80"
              placeholder="自我介绍"
            ></Input.TextArea>
          </Form.Item>
          {/* 选择领域 */}
          <Form.Item label="选择擅长领域">
            {categoryList.map((cate) => {
              return (
                <CheckableTag
                  style={{ border: "1px solid rgb(24, 144, 255)" }}
                  key={cate.categoryId}
                  checked={checkedCate.indexOf(cate) > -1}
                  onChange={(checked) => this.checkCate(cate, checked)}
                >
                  {cate.categoryName}
                </CheckableTag>
              );
            })}
          </Form.Item>
          {/* 擅长的话题 */}
          <Form.List name="topics">
            {(fields, { add, remove }) => (
              <div>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} className="flex-y">
                    <Form.Item
                      label="请输入擅长的话题"
                      {...restField}
                      name={[name, "title"]}
                      fieldKey={[fieldKey, "title"]}
                    >
                      <Input placeholder="例:如何转入计算机学院" />
                    </Form.Item>
                    <Form.Item
                      label="简述话题"
                      {...restField}
                      name={[name, "content"]}
                      fieldKey={[fieldKey, "content"]}
                    >
                      <Input.TextArea placeholder="简述你擅长的话题" />
                    </Form.Item>
                  </Space>
                ))}
                <Form.Item>
                  <Button onClick={() => add()}>增加话题</Button>
                </Form.Item>
              </div>
            )}
          </Form.List>

          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form>
      </div>
    );
  }
}
