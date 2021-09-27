import { Card, Empty, Form, Input, message, Select, Spin } from "antd";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import ButtonCancel from "../common/ButtonCancel";
import ButtonSubmit from "../common/ButtonSubmit";
import Header from "../common/Header";
import Label from "../common/Label";
import { constantButtonLayout, constantLayout } from "../util/Propertiesconstant";
import { db } from "../firestore.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { rulesUser } from "../util/FormRules";


var md5 = require('md5')

class AddUser extends Component {

    state = {
        loading: false,
    };

    _onFinish = async (value) => {
        this.setState({
            loading: true
        })
        const id = md5(value.username)

        const docRef = doc(db, "user", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            message.error({ content: "Username already exist!" });
        } else {
            setDoc(doc(db, "user", id), {
                id: id,
                name: value.name,
                username: value.username,
                password: md5(value.password),
                role: md5(value.role),
            });
            await message.success({ content: "User Successfully added!" });
            setTimeout(window.location.replace("/user/list"), 500);
        }

    };
    render() {
        const disableComponent = this.props.role === "21232f297a57a5a743894a0e4a801fc3" ? false : true;

        const rules = rulesUser();

        return (
            <Spin size="large" style={{ position: "absolute", top: 128 }} spinning={this.state.loading}>
                <Header onBack title={"User"} subTitle={"Add User"} />
                <Form {...constantLayout} onFinish={this._onFinish} colon={false} disabled={this.state.loading}>
                    <Card>
                        { disableComponent ? (
                            <Empty description={<span>{"You don't have access to this"}</span>} />
                        ) : (
                            <Fragment>
                                <Form.Item label={<Label text={"Name"} />} name="name" rules={rules.name}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label={<Label text={"Username"} />} name="username" rules={rules.username}>
                                    <Input />
                                </Form.Item>
                                <Form.Item label={<Label text={"Password"} />} name="password" rules={rules.password}>
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item label={<Label text={"Role"} />} name="role" rules={rules.role}>
                                    <Select >
                                        <Select.Option value="buyer">Buyer</Select.Option>
                                        <Select.Option value="seller">Seller</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item {...constantButtonLayout}>
                                    <ButtonSubmit />
                                    <ButtonCancel />
                                </Form.Item>
                            </Fragment>
                        )}
                    </Card>
                </Form>
            </Spin>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user_id,
        role: state.role,
    };
};

const mapDispatchToProps = (dispatch) => {
    return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
