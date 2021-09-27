import { Button } from "antd";
import React, { Component } from "react";

class ButtonSubmit extends Component {
  render() {
    return (
      <Button type="primary" htmlType="submit" style={{ marginRight: 4, ...this.props.style }}>
        Submit
      </Button>
    );
  }
}

export default ButtonSubmit;
