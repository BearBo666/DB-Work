import React, { Component } from "react";
import { Carousel } from "antd";
import Nav1 from "../../assets/img/nav1.png";
import * as Icon from "@ant-design/icons";
import "./index.scss";

import Card from "../../componentes/pioneer";

export default class index extends Component {
  state = {
    categoryList: [
      {
        categoryId: 0,
        categoryName: "求职实习",
        iconClass: "MessageOutlined",
      },
      {
        categoryId: 1,
        categoryName: "求职实习",
        iconClass: "MessageOutlined",
      },
      {
        categoryId: 2,
        categoryName: "求职实习",
        iconClass: "MessageOutlined",
      },
      {
        categoryId: 3,
        categoryName: "求职实习",
        iconClass: "MessageOutlined",
      },
      {
        categoryId: 4,
        categoryName: "求职实习",
        iconClass: "MessageOutlined",
      },
      {
        categoryId: 5,
        categoryName: "求职实习",
        iconClass: "MessageOutlined",
      },
      {
        categoryId: 6,
        categoryName: "求职实习",
        iconClass: "MessageOutlined",
      },
    ],
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    console.log("发起请求");
  };

  scorll = () => {
    const m = this.main;
    let rest = m.scrollHeight - m.clientHeight - m.scrollTop;
    if (rest <= 5) {
      console.log("快滑到底了");
    }
  };

  render() {
    const { categoryList } = this.state;
    return (
      <div className="w-100 h-100 flex-y">
        {/* 轮播图 */}
        <Carousel autoplay effect="fade">
          <div className="w-100 slider">
            <img src={Nav1} className="w-100 h-100"></img>
          </div>
        </Carousel>
        {/* 分类icon */}
        <div className="cate-list flex-x jc-start ai-center p-5">
          {categoryList.map((cate) => {
            return (
              <div
                key={cate.categoryId}
                className="cate-item flex-y ai-center m-5"
              >
                <div className="round icon-font center-x">
                  {React.createElement(Icon[cate.iconClass], {
                    className: "icon",
                  })}
                </div>
                <div className="mt-5 cate-title">{cate.categoryName}</div>
              </div>
            );
          })}
        </div>
        {/* 主体区域 */}
        <div
          onScrollCapture={this.scorll}
          className="main flex-y ai-center"
          ref={(c) => (this.main = c)}
        >
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </div>
      </div>
    );
  }
}
