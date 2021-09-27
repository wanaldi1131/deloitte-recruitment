import { Button, Card, Descriptions, Empty, Form, message, Spin } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../common/Header";
import Label from "../common/Label";
import { constantButtonLayout } from "../util/Propertiesconstant";
import { db } from "../firestore.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";


class InvoiceDetail extends Component {

    state = {
        loading: false,
        data: null,
        id: this.props.location.state ? this.props.location.state.id : null,
    };

    async componentDidMount() {
        const docRef = doc(db, "invoice", this.state.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            this.setState({
                data: docSnap.data()
            })
        }
        
    };

    async payInvoice() {
        this.setState({
            loading: true
        })

        const value = this.state.data
        const invoiceData = {
            seller: value.seller,
            id: value.id,
            buyer_name: value.buyer_name,
            buyer: value.buyer,
            generateDate: value.generateDate,
            status: "Paid",
            dueDate: value.dueDate,
            value: value.value,
        };
        console.log(invoiceData)
        updateDoc(doc(db, "invoice", value.id), invoiceData);
        await message.success({ content: "Invoice Successfully Paid!" });
        setTimeout(window.location.replace("/invoice/list"), 500);
    }

    render() {
        const disableComponent = this.props.role === "794aad24cbd58461011ed9094b7fa212" || this.props.role === "64c9ac2bb5fe46c3ac32844bb97be6bc" ? false : true;

        const data = this.state.data && [
            { title: <Label text={"Invoice Id"} weight="semi-bold" />, text: this.state.data.id },
            { title: <Label text={"Buyer"} weight="semi-bold" />, text: this.state.data.buyer_name },
            { title: <Label text={"Invoice Generated Date"} weight="semi-bold" />, text: this.state.data.generateDate },
            { title: <Label text={"Invoice Due Date"} weight="semi-bold" />, text: this.state.data.dueDate },
            { title: <Label text={"Status"} weight="semi-bold" />, text: this.state.data.status },
            { title: <Label text={"Value"} weight="semi-bold" />, text: this.state.data.value },
        ];

        return (
            <Spin size="large" style={{ position: "absolute", top: 128 }} spinning={this.state.loading}>
                <Header onBack title={"Invoice"} subTitle={this.state.id && this.state.id} />
                <Card size="small" >
                    {disableComponent ? (
                        <Empty description={<span>{"You don't have access to this"}</span>} />
                    ) : this.state.data != null ? (
                        <Descriptions colon={false} labelStyle={{ minWidth: 196, marginRight: 8 }} column={3}>
                            {data.map((item, index) => (
                                <Descriptions.Item key={index} label={item.title} span="3">
                                    <Label text={item.text ? item.text : "-"} weight="light" />
                                </Descriptions.Item>
                            ))}
                            {this.state.data.status === "Unpaid" ?
                                <Form.Item {...constantButtonLayout}>
                                    <Button type="primary" onClick={() => this.payInvoice()} style={{ marginRight: 4, ...this.props.style }}>
                                        Pay
                                    </Button>
                                </Form.Item>
                                : ""
                            }
                        </Descriptions>

                    ) : (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<Label text={"There is no invoice with this number."} weight="light" />} />
                    )}
                </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDetail);
