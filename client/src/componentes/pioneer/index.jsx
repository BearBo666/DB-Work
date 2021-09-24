import React, { Component } from "react";
import { Avatar, Tag } from "antd";
import { BorderlessTableOutlined } from "@ant-design/icons";

import "./index.scss";
import { withRouter } from "react-router";

const BaseApi = "http://127.0.0.1:7658/upload/";

@withRouter
export default class index extends Component {
  // 跳转至前人详情
  jump = () => {
    this.props.history.push("/list", { pioneer: this.props.pioneer });
  };

  render() {
    const { pioneer } = this.props;
    const { avatar, name, title, topics } = pioneer;
    return (
      <div
        onClick={this.jump}
        className="pioneer-card br-10 w-90 my-10 flex-y jc-around"
      >
        <div className="card-top flex-x jc-start ai-center">
          {/* 头像 */}
          <Avatar className="mr-10" size={45} src={BaseApi + avatar}></Avatar>
          <div className="flex-y">
            <div className="flex-x ai-center">
              <div className="mr-10 ft-bler fs-18">{name}</div>
              <Tag
                className="center-y"
                style={{ height: "18px" }}
                color="rgb(24, 144, 255)"
              >
                认证
              </Tag>
            </div>
            <div className="fs-10 my-3 ft-bl" style={{ color: "#aaaaaa" }}>
              {title}
            </div>
          </div>
        </div>
        <div className="card-main flex-y">
          {topics.map((topic, i) => {
            return (
              <div className="flex-x ai-center p-2" key={i}>
                <BorderlessTableOutlined
                  style={{ color: "rgb(252, 201, 29)", marginRight: "5px" }}
                />
                <div className="ft-bl">{topic.title}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
