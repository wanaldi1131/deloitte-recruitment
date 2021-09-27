import { CheckCircleTwoTone, CloseCircleTwoTone, ExclamationCircleTwoTone, WarningTwoTone } from "@ant-design/icons";
import React from "react";

export default function Label(props) {
  const currentWeight = (weight) => {
    switch (weight) {
      case "extra-light":
        return 200;

      case "light":
        return 300;

      case "regular":
        return 400;

      case "medium":
        return 500;

      case "semi-bold":
        return 600;

      case "bold":
        return 700;

      case "extra-bold":
        return 800;

      default:
        return 400;
    }
  };

  const currentIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircleTwoTone twoToneColor="#52c41a" style={{ marginRight: 8 }} />;

      case "info":
        return <ExclamationCircleTwoTone twoToneColor="#1890ff" style={{ marginRight: 8 }} />;

      case "warning":
        return <WarningTwoTone twoToneColor="#faad14" style={{ marginRight: 8 }} />;

      case "error":
        return <CloseCircleTwoTone twoToneColor="#ff4d4f" style={{ marginRight: 8 }} />;

      default:
    }
  };

  return (
    <span
      style={{
        fontSize: props.size,
        fontWeight: currentWeight(props.weight),
        fontStyle: props.italic ? "italic" : "normal",
        textTransform: props.capitalize ? "capitalize" : "none",
      }}
    >
      {props.showIcon && currentIcon(props.typeIcon)}
      {props.text}
    </span>
  );
}
