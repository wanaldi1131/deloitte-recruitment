import { ArrowLeftOutlined, CloseOutlined } from "@ant-design/icons";
import { Card, PageHeader } from "antd";
import React, { Component } from "react";

class Header extends Component {
  state = {};
  render() {
    return (
      <Card size={"small"} bordered={false} bodyStyle={{ padding: "6px 12px" }}>
        <PageHeader
          onBack={this.props.onBack ? () => window.history.back() : this.props.onClose ? () => this.props.onClose() : false}
          backIcon={this.props.onClose ? <CloseOutlined /> : <ArrowLeftOutlined />}
          title={this.props.title}
          subTitle={this.props.subTitle}
          style={{ margin: 0, padding: 0, border: 0 }}
          extra={this.props.extra}
        />
      </Card>
    );
  }
}

export default Header;
