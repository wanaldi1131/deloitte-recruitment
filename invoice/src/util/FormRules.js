import Label from "../common/Label";

export const rulesLogin = () => {
  return {
    username: [
      {
        required: true,
        message: <Label text={"Username Required"} size="smaller" />,
      },
    ],
    password: [
      {
        required: true,
        message: <Label text={"Password Required"} size="smaller" />,
      },
    ],
  };
};

export const rulesUser = () => {
  return {
    name: [
      {
        required: true,
        message: <Label text={"Name Required!"} size="smaller" />,
      },
    ],
    username: [
      {
        required: true,
        message: <Label text={"Username Required!"} size="smaller" />,
      },
    ],
    password: [
      {
        required: true,
        message: <Label text={"Password Required!"} size="smaller" />,
      },
    ],
    role: [
      {
        required: true,
        message: <Label text={"Role Required!"} size="smaller" />,
      },
    ],
  };
};


export const rulesInvoice = () => {
  return {
    buyer: [
      {
        required: true,
        message: <Label text={"User Required!"} size="smaller" />,
      },
    ],
    generateDate: [
      {
        required: true,
        message: <Label text={"Invoice Date Required!"} size="smaller" />,
      },
    ],
    dueDate: [
      {
        required: true,
        message: <Label text={"Invoice Due Date Required!"} size="smaller" />,
      },
    ],
    value: [
      {
        required: true,
        message: <Label text={"Invoice Value Required!"} size="smaller" />,
      },
      {
        pattern: /^[1-9]+(\.[0-9]{1,2})?$/,
        message: <Label text={"Incorrect Value Format!"} size="smaller" />,
      },
    ],
  };
};