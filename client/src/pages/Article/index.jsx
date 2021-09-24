import React, { Component } from "react";
import Day from "dayjs";
import { GetArticleDetail } from "../../api/article";

export default class index extends Component {
  state = {
    article: {},
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = async () => {
    const { articleId } = this.props.location.state;
    const res = await GetArticleDetail({ articleId });
    if (res.code === 10000) {
      this.setState({
        article: res.data,
      });
    }
  };

  render() {
    const { article } = this.state;
    const { title, content, createdAt } = article;
    return (
      <div className="w-100 h-100 p-20">
        <div className="fs-20 ft-bler">{title}</div>
        <div style={{ color: "#aaaaaa" }}>
          {Day(createdAt).format("YYYY-MM-DD")}
        </div>
        <div className="fs-16">{content}</div>
      </div>
    );
  }
}
