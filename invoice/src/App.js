import React, { Component } from "react";
import { Button, Layout, Menu, PageHeader } from 'antd';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { Switch } from "react-router-dom";
import { PrivateRoute } from "./util/PrivateRoute";
import { connect } from "react-redux";
import Label from "./common/Label";
import listUser from "./Pages/listUser";
import addUser from "./Pages/addUser";
import listInvoice from "./Pages/listInvoice";
import addInvoice from "./Pages/addInvoice";
import invoiceDetail from "./Pages/detailInvoice";
import Login from "./auth/Login";
import { RESET_SESSION } from "./actions/actions";

const admin = [
  {
    menu_name: "User List",
    link: "/user/list",
    key: "user_list"
  },
]

const notadmin = [
  {
    menu_name: "Invoice List",
    link: "/invoice/list",
    key: "invoice_list"
  },
]

class App extends Component {

  state = {
    prepareComponent: true,
    collapsed: false,
  };

  async doLogout(){
    await this.props.dispatch({ type: RESET_SESSION, payload : "" });
    window.location.replace("/")
  }

  render() {
    const buttonlogout = (
      <Button onClick={() => this.doLogout()}>Logout</Button>
    )

    const menu = (this.props.role === "21232f297a57a5a743894a0e4a801fc3" ? admin : notadmin)
    return (
      <Router basename={`/`}>
        {
          this.props.user_id != null ?
            <Layout style={{ height: "100vh" }}>
              <Layout.Header style={{ backgroundColor: "#ffffff", padding: 0, height: 56 }}>
                <PageHeader
                  title={<Label text={"Invoice Generator"} weight="bold" />}
                  style={{ padding: "8px 32px" }}
                  extra={[buttonlogout]}
                />
              </Layout.Header>
              <Layout style={{ borderTop: "1px solid #f5f5f5" }}>
                <Layout.Sider>
                  <Menu
                    style={{ height: '100vh' }}
                    mode="inline"
                    theme="dark"
                  >
                    {menu.map((item) => {
                      return (
                        <Menu.Item key={item.key}>
                          <NavLink exact to={item.link}>
                            {item.menu_name}
                          </NavLink>
                        </Menu.Item>
                      )
                    }
                    )}
                  </Menu>
                </Layout.Sider>
                <Layout.Content style={{ overflowX: "auto" }}>
                  <Switch>

                    <PrivateRoute path={"/user/list"} component={listUser} />
                    <PrivateRoute path={"/user/add"} component={addUser} />
                    <PrivateRoute path={"/invoice/list"} component={listInvoice} />
                    <PrivateRoute path={"/invoice/add"} component={addInvoice} />
                    <PrivateRoute path={"/invoice/detail"} component={invoiceDetail} />
                  </Switch>
                </Layout.Content>
              </Layout>
            </Layout> :

            <Route path={"/"} component={Login} exact />
        }
      </Router>
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

export default connect(mapStateToProps)(App);

