import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Skeleton } from "antd";
import React from "react";

class ButtonDelete extends React.Component {
  render() {
    return this.props.detail ? (
      <Popconfirm
        placement="bottomRight"
        onConfirm={this.props.onConfirm}
        title={"Are you sure want to delete this user?"}
        okText={"Ok"}
        cancelText={"Cancel"}
      >
        <Button danger icon={<DeleteOutlined />} />
      </Popconfirm>
    ) : (
      <Skeleton.Button size={"small"} shape={"round"} />
    );
  }
}

export default ButtonDelete;
