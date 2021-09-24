import React, { Component } from "react";

import { GetArticleList } from "../../api/article";
import { BorderlessTableOutlined } from "@ant-design/icons";
import "./list.scss";

export default class list extends Component {
  state = {
    articleList: [],
  };

  componentDidMount() {
    this.fetch();
  }

  // 文章列表
  fetch = async () => {
    const { pioneerId } = this.props.location.state.pioneer;
    const res = await GetArticleList({ pioneerId });
    if (res.code === 10000) {
      this.setState({
        articleList: res.data,
      });
    }
  };

  // 跳转到文章详情
  jump = (articleId) => {
    return () => {
      this.props.history.push("/index", { articleId });
    };
  };

  render() {
    const { topics, email, freeTime } = this.props.location.state.pioneer;
    const { articleList } = this.state;
    return (
      <div className="w-100 h-100 center-y">
        <div className="info mt-20 fs-20">
          前人信息
          <div className="ft-bl fs-16 my-5">联系邮箱: {email}</div>
          <div className="ft-bl fs-16 my-5">空闲时间: {freeTime}</div>
        </div>
        <div className="topic-list my-20 fs-20">
          擅长话题
          {topics.map((topic, i) => {
            const { title, content } = topic;
            return (
              <div key={i} className="topic-item">
                <div>
                  {" "}
                  <BorderlessTableOutlined
                    style={{ color: "rgb(252, 201, 29)", marginRight: "5px" }}
                  />
                  {title}
                </div>
                <div className="fs-16">{content}</div>
              </div>
            );
          })}
        </div>
        <div className="article-list fs-20">
          文章列表
          {articleList.map((a) => {
            return (
              <div
                onClick={this.jump(a.articleId)}
                key={a.articleId}
                className="article-item"
              >
                {a.title}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
