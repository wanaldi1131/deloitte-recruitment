import { CloseOutlined } from "@ant-design/icons";
import { Card, Descriptions, Drawer, Empty, PageHeader, Skeleton } from "antd";
import React, { Component } from "react";
import { RANDOM_ID } from "../../../../Enum/PropertiesConstant";
import { ROUTER_CONSTANT } from "../../../../Enum/RouterConstant";
import * as DataTypeService from "../../../../Service/Admin/DataTypeService";
import Banner from "../../../Common/Banner/Banner";
import ButtonDelete from "../../../Common/Button/ButtonDelete";
import ButtonEdit from "../../../Common/Button/ButtonEdit";
import Label from "../../../Common/Label/Label";

class DetailUser extends Component {
  state = {
    widthDrawer: window.innerWidth < 768 ? "100vw" : 512,
  };

  _onDelete = async (id, updated_at) => {
    const { token, refresh_token, dispatch, closeDrawer, resetTable } = this.props;

    if (this.props.permission.delete || this.props.permission.delete_own) {
      await DataTypeService.doDelete(token, refresh_token, id, { updated_at }, dispatch, closeDrawer);
      await resetTable();
    } else {
      closeDrawer();
    }
  };
  render() {
    const buttonEdit = this.props.detail && (
      <ButtonEdit
        key={RANDOM_ID(8)}
        detail={this.props.detail}
        router={{
          pathname: ROUTER_CONSTANT.DATA_TYPE.EDIT,
          state: {
            id: this.props.detail.id
          }
        }}
        disabled={this.props.permission.delete ? false : this.props.permission.delete_own ? this.props.detail.created_by !== this.props.user : true}
      />
    );

    const buttonDelete = this.props.detail && (
      <ButtonDelete
        key={RANDOM_ID(8)}
        detail={this.props.detail}
        onConfirm={() => this._onDelete(this.props.detail.id, this.props.detail.updated_at)}
        disabled={this.props.permission.delete ? false : this.props.permission.delete_own ? this.props.detail.created_by !== this.props.user : true}
      />
    );

    const data = this.props.detail && [
      { title: <Label text={this.props.t("COMMON:FIELD_ID")} weight="semi-bold" />, text: this.props.detail.id },
      { title: <Label text={this.props.t("DATA_TYPE:FIELD_NAME")} weight="semi-bold" />, text: this.props.detail.name },
      { title: <Label text={this.props.t("DATA_TYPE:FIELD_DESCRIPTION")} weight="semi-bold" />, text: this.props.detail.description },
    ];

    return (
      <div>
        <Drawer
          placement="right"
          onClose={() => this.props.closeDrawer()}
          visible={this.props.visible}
          closable={false}
          width={this.state.widthDrawer}
          bodyStyle={{ padding: 0 }}
        >
          <PageHeader
            backIcon={<CloseOutlined />}
            onBack={() => this.props.closeDrawer()}
            title={<Label text={this.props.t("DATA_TYPE:DETAIL.TITLE")} size="large" weight="medium" />}
            extra={[buttonEdit, buttonDelete]}
          />

          <Card size="small" title={!this.props.skeleton_loading && this.props.detail && <Banner status={this.props.detail.status} />}>
            {this.props.skeleton_loading ? (
              <Skeleton active />
            ) : this.props.detail ? (
              <Descriptions colon={false} labelStyle={{ minWidth: 128, marginRight: 8 }} column={3}>
                {data.map((item, index) => (
                  <Descriptions.Item key={index} label={item.title} span="3">
                    <Label text={item.text ? item.text : "-"} weight="light" />
                  </Descriptions.Item>
                ))}
              </Descriptions>
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<Label text={this.props.t("COMMON:DATA_NOT_FOUND")} weight="light" />} />
            )}
          </Card>
        </Drawer>
      </div>
    );
  }
}

export default DetailUser;
