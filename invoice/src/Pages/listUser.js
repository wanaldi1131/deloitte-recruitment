import { Button, Card, Empty, Popconfirm, Table } from "antd";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
// import { prepareComponent } from "../../../../Action/CommonAction";
import Header from "../common/Header";
import Label from "../common/Label";
import { db } from "../firestore.js";
import { collection, doc, getDocs, query, deleteDoc, where } from "firebase/firestore";
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

class ListUser extends Component {

    state = {
        user_list: [],
    };

    _onDelete = async (id) => {
        const userRef = doc(db, 'user', id);
        await deleteDoc(userRef);
        this.componentDidMount();
    };

    async componentDidMount() {
        let data = []
        const q = query(collection(db, "user"), where("role", "!=", "21232f297a57a5a743894a0e4a801fc3"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            const tempData = doc.data();
            data.push(
                {
                    id: tempData.id,
                    name: tempData.name,
                    role: tempData.role === "794aad24cbd58461011ed9094b7fa212" ? "buyer" : (tempData.role === "64c9ac2bb5fe46c3ac32844bb97be6bc" ? "seller" : "Not Known")
                }
            )
        });
        await this.setState({
            user_list: data
        })
    }

    render() {
        const disableComponent = this.props.role === "21232f297a57a5a743894a0e4a801fc3" ? false : true;

        const addUserButton = (
            <Link to={"/user/add"}>
                <Button disabled={this.props.disabled}>Add User</Button>
            </Link>
        )

        const columns = [
            {
                title: <Label text={"Name"} weight="semi-bold" />,
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: <Label text={"Role"} weight="semi-bold" />,
                dataIndex: 'role',
                key: 'role',
            },
            {
                title: 'Action',
                key: 'id',
                render: (value) =>
                    <Popconfirm
                        key={value.id}
                        placement="bottomRight"
                        onConfirm={() => this._onDelete(value.id)}
                        title={"Are you sure want to delete this user?"}
                        okText={"Ok"}
                        cancelText={"Cancel"}
                    >
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                ,
            },
        ];

        return (
            <Fragment>
                <Header title={"User"} subTitle={"User List"} extra={[addUserButton]} />
                <Card>
                    {disableComponent ? (
                        <Empty description={<span>{"You don't have access to this"}</span>} />
                    ) : (
                        <Table columns={columns} dataSource={this.state.user_list} />
                    )}
                </Card>
            </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListUser);
