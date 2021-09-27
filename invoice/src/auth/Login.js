import { LockFilled, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Spin } from "antd";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { Component } from "react";
import { connect } from "react-redux";
import { RESET_SESSION, SET_LOADING, SET_SESSION } from "../actions/actions";
import { db } from "../firestore";
import { rulesLogin } from "../util/FormRules";
import style from "./Login.module.css";


var md5 = require('md5')

class Login extends Component {
  _formRef = React.createRef();
  _usernameRef = React.createRef();

  async componentDidMount() {
    this.props.dispatch({ type: RESET_SESSION, payload: "" });
  }

  _onFinish = async (value) => {
    const { username, password } = value;
    const userRef = collection(db, "user")
    const q1 = query(userRef, where("username", "==", username), where("password", "==", md5(password)));
    this.props.dispatch({ type: SET_LOADING, payload: true });
    const querySnapshot = await getDocs(q1);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        this.props.dispatch({ type: SET_SESSION, payload: doc.data() });
      });
    } else {
      this.props.dispatch({ type: SET_LOADING, payload: false });
      await message.error({ content: "Username or password is incorrect!" });
    }

  };

  render() {

    const rules = rulesLogin()
    return (
      <Spin size="large" style={{ position: "absolute", top: 128 }} spinning={this.props.auth_loading}>
        <div className={style.Container}>
          <div className={style.Wrapper}>
            <div className={style.Body}>
              <div className={style.Title}>Invoice Generator</div>
              <Form layout="vertical" ref={this._formRef} onFinish={this._onFinish}>
                <Form.Item name="username">
                  <Input prefix={<UserOutlined />} placeholder={"Username"} rules={rules.username} />
                </Form.Item>
                <Form.Item name="password">
                  <Input.Password prefix={<LockFilled />} placeholder={"Password"} rules={rules.password} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ width: "100%", backgroundColor: "#2DC0F4", borderColor: "#2DC0F4" }} disabled={this.props.auth_loading}>
                    Login
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </Spin>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user_id: state.user_id,
    name: state.name,
    role: state.role,
    auth_loading: state.auth_loading,
  };
};

export default connect(mapStateToProps)(Login);
