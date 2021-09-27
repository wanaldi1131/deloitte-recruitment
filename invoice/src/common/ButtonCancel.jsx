import { Button } from "antd";
import React, { Component } from "react";

class ButtonCancel extends Component {
  render() {
    return (
      <Button style={{ marginLeft: 4 }} onClick={() => window.history.back()}>
        Cancel
      </Button>
    );
  }
}

export default ButtonCancel;
