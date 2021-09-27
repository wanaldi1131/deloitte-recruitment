import { Button, Card, Empty, Table } from "antd";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// import { prepareComponent } from "../../../../Action/CommonAction";
import Header from "../common/Header";
import Label from "../common/Label";
import { db } from "../firestore.js";
import { collection, doc, getDocs, query, deleteDoc, where } from "firebase/firestore";
import { Link } from "react-router-dom";

class ListInvoice extends Component {

    state = {
        user_list: [],
    };

    _onDelete = async (id) => {
        const userRef = doc(db, 'user', id);
        await deleteDoc(userRef)
    };

    async componentDidMount() {
        let data = []
        const qBuyer = query(collection(db, "invoice"), where("buyer", "==", this.props.user_id));
        const qSeller = query(collection(db, "invoice"), where("seller", "==", this.props.user_id));

        const querySnapshot = await getDocs(this.props.role === "794aad24cbd58461011ed9094b7fa212" ? qBuyer : qSeller);
        querySnapshot.forEach((doc) => {
            const tempData = doc.data();
            console.log(tempData)
            data.push(
                {
                    buyer_name: tempData.buyer_name,
                    generateDate: tempData.generateDate,
                    dueDate: tempData.dueDate,
                    value: tempData.value,
                    status: tempData.status,
                    id: tempData.id,
                }
            )
        });
        await this.setState({
            user_list: data
        })
    }

    render() {
        const disableComponent = this.props.role === "794aad24cbd58461011ed9094b7fa212" || this.props.role === "64c9ac2bb5fe46c3ac32844bb97be6bc" ? false : true;

        const addInvoiceButton = (
            <Link to={"/invoice/add"}>
                <Button disabled={this.props.disabled}>Add Invoice</Button>
            </Link>
        )

        const buyerColumn = [
            {
                title: <Label text={"Buyer Name"} weight="semi-bold" />,
                dataIndex: 'buyer_name',
                key: 'buyer_name',
            },
            {
                title: <Label text={"Invoice Generated Date"} weight="semi-bold" />,
                dataIndex: 'generateDate',
                key: 'generateDate',
            },
            {
                title: <Label text={"Invoice Due Date"} weight="semi-bold" />,
                dataIndex: 'dueDate',
                key: 'dueDate',
            },
            {
                title: <Label text={"Value"} weight="semi-bold" />,
                dataIndex: 'value',
                key: 'value',
            },
            {
                title: <Label text={"Status"} weight="semi-bold" />,
                dataIndex: 'status',
                key: 'status',
            },
            {
                title: 'Action',
                key: 'id',
                render: (value) =>
                    <Link key={value.id}
                        to={{
                            pathname: "/invoice/detail",
                            state: { id: value.id }
                        }}>
                        <Button>
                            {value.status === "Unpaid" ? "Pay" : "View"}
                        </Button>
                    </Link>
                ,
            },
        ];

        const sellerColumn = [
            {
                title: <Label text={"Buyer Name"} weight="semi-bold" />,
                dataIndex: 'buyer_name',
                key: 'buyer_name',
            },
            {
                title: <Label text={"Invoice Generated Date"} weight="semi-bold" />,
                dataIndex: 'generateDate',
                key: 'generateDate',
            },
            {
                title: <Label text={"Invoice Due Date"} weight="semi-bold" />,
                dataIndex: 'dueDate',
                key: 'dueDate',
            },
            {
                title: <Label text={"Value"} weight="semi-bold" />,
                dataIndex: 'value',
                key: 'value',
            },
            {
                title: <Label text={"Status"} weight="semi-bold" />,
                dataIndex: 'status',
                key: 'status',
            },
        ];

        const column = this.props.role === "794aad24cbd58461011ed9094b7fa212" ? buyerColumn : sellerColumn

        return (
            <Fragment>
                <Header title={"Invoice"} subTitle={"Invoice List"} extra={this.props.role === "64c9ac2bb5fe46c3ac32844bb97be6bc" ? [addInvoiceButton] : []} />
                <Card>
                    {disableComponent ? (
                        <Empty description={<span>{"You don't have access to this"}</span>} />
                    ) : (
                        <Table columns={column} dataSource={this.state.user_list} />
                    )}
                </Card>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user_id: state.user_id,
        name: state.name,
        role: state.role,
    };
};

const mapDispatchToProps = (dispatch) => {
    return { dispatch };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListInvoice);
