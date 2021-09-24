import React, { Component } from "react";
import { Button, Carousel, Upload, message } from "antd";
import * as Icon from "@ant-design/icons";

import "./index.scss";
import Nav1 from "../../assets/img/nav1.png";
import Card from "../../componentes/pioneer";
import { CateList } from "../../api/category";
import { PioneerList } from "../../api/pioneer";

const uploader = {
  name: "avatar",
  action: "http://127.0.0.1:7658/upload/avatar",
  headers: {
    token: localStorage.getItem("token"),
  },
  onSuccess(res) {
    if (res.code === 10000) {
      message.success("上传成功");
    }
  },
};

export default class Home extends Component {
  state = {
    pioneerList: [],
    categoryList: [],
  };

  componentDidMount() {
    this.fetch();
    this.fetchCate();
  }

  // 获得前人列表
  fetch = async () => {
    const res = await PioneerList();
    if (res.code === 10000) {
      this.setState({
        pioneerList: res.data,
      });
    }
  };

  // 获得分类列表
  fetchCate = async () => {
    const res = await CateList();
    if (res.code === 10000) {
      this.setState({
        categoryList: res.data,
      });
    }
  };

  // 滑动到底发起请求
  scorll = () => {
    const main = this.main;
    let rest = main.scrollHeight - main.clientHeight - main.scrollTop;
    if (rest <= 5) {
      console.log("快滑到底了");
    }
  };

  // 跳转到申请前人
  jump = () => {
    this.props.history.push("/apply");
  };

  // 发布文章
  edit = () => {
    this.props.history.push("/edit");
  };

  render() {
    const { categoryList, pioneerList } = this.state;
    return (
      <div className="w-100" style={{ height: "100vh" }}>
        <div
          onScrollCapture={this.scorll}
          className="flex-y ai-center"
          ref={(c) => (this.main = c)}
        >
          {/* 轮播图 */}
          {/* <Carousel effect="fade"> */}
          <div className="w-100 slider">
            <img src={Nav1} className="w-100 h-100" alt="图片加载失败"></img>
          </div>
          {/* </Carousel> */}
          {/* 分类icon */}
          <div className="cate-list flex-x jc-start ai-center p-5">
            {categoryList.map((cate, i) => {
              return (
                <div key={i} className="cate-item flex-y ai-center m-5">
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
          <div className="main rela flex-y ai-center">
            {pioneerList.map((pioneer, i) => {
              return <Card pioneer={pioneer} key={i}></Card>;
            })}
            <Upload {...uploader} className="uploadBtn">
              <Button
                onClick={this.upload}
                size="large"
                type="primary"
                shape="circle"
                icon={React.createElement(Icon["CloudUploadOutlined"])}
              ></Button>
            </Upload>
            <Button
              onClick={this.jump}
              className="applyBtn"
              size="large"
              type="primary"
              shape="circle"
              icon={React.createElement(Icon["PlusOutlined"])}
            ></Button>
            <Button
              onClick={this.edit}
              className="editBtn"
              size="large"
              type="primary"
              shape="circle"
              icon={React.createElement(Icon["EditOutlined"])}
            ></Button>
          </div>
        </div>
      </div>
    );
  }
}
