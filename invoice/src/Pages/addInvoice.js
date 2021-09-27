import { Card, DatePicker, Empty, Form, Input, message, Select, Spin } from "antd";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// import { prepareComponent } from "../../../../Action/CommonAction";
import ButtonCancel from "../common/ButtonCancel";
import ButtonSubmit from "../common/ButtonSubmit";
import Header from "../common/Header";
import Label from "../common/Label";
import { constantButtonLayout, constantLayout } from "../util/Propertiesconstant";
import { db } from "../firestore.js";
import { doc, setDoc, query, where, getDocs, collection } from "firebase/firestore";
import { rulesInvoice } from "../util/FormRules";
import { v4 as uuidv4 } from 'uuid';


class AddInvoice extends Component {

    state = {
        loading: false,
        user_list: false,
    };

    async componentDidMount() {
        let user_data = []
        const q = query(collection(db, "user"), where("role", "==", "794aad24cbd58461011ed9094b7fa212"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const tempData = doc.data();
            user_data.push(
                {
                    id: tempData.id,
                    name: tempData.name,
                }
            )
        });
        await this.setState({
            user_list: user_data
        })
        console.log(this.state.user_list)
    }

    _onFinish = async (value) => {
        this.setState({
            loading: true
        })

        const id = uuidv4()

        setDoc(doc(db, "invoice", id), {
            seller: this.props.user_id,
            id: id,
            buyer_name: value.buyer[0],
            buyer: value.buyer[1],
            generateDate: value.generateDate.format("DD-MM-YYYY"),
            status: "Unpaid",
            dueDate: value.dueDate.format("DD-MM-YYYY"),
            value: value.value,
        });
        await message.success({ content: "Invoice Successfully added!" });
        setTimeout(window.location.replace("/invoice/list"), 500);

    };
    render() {
        const disableComponent = this.props.role === "794aad24cbd58461011ed9094b7fa212" || this.props.role === "64c9ac2bb5fe46c3ac32844bb97be6bc" ? false : true;
        const rules = rulesInvoice();

        return (
            <Spin size="large" style={{ position: "absolute", top: 128 }} spinning={this.state.loading}>
                <Header onBack title={"Invoice"} subTitle={"Add Invoice"} />
                <Form {...constantLayout} onFinish={this._onFinish} colon={false} disabled={this.state.loading}>
                    <Card>
                        {disableComponent ? (
                            <Empty description={<span>{"You don't have access to this"}</span>} />
                        ) : (
                            <Fragment>
                                <Form.Item label={<Label text={"Buyer"} />} name="buyer" rules={rules.buyer}>
                                    <Select >
                                        {
                                            this.state.user_list &&
                                            this.state.user_list.map((item) => {
                                                return (
                                                    <Select.Option key={item.id} value={[item.name, item.id]}>{item.name}</Select.Option>
                                                )
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item name="generateDate" label="Invoice Date" rules={rules.generateDate}>
                                    <DatePicker format="DD/MM/YYYY" />
                                </Form.Item>
                                <Form.Item name="dueDate" label="Invoice Due Date" rules={rules.dueDate}>
                                    <DatePicker format="DD/MM/YYYY" />
                                </Form.Item>
                                <Form.Item label={<Label text={"Value"} />} name="value" rules={rules.value}>
                                    <Input />
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
        user_id: state.user_id,
        role: state.role,
    };
};

const mapDispatchToProps = (dispatch) => {
    return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddInvoice);
