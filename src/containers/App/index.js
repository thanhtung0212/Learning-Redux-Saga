import React from "react";
import { withStyles } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Switch } from "react-router-dom";

import TaskBoard from "../Taskboard/index";
import styles from "./styles";
import theme from "../../commons/Theme/index";
import { Provider } from "react-redux";
import configureStore from "../../redux/configureStore";
import GlobalLoading from "../../components/GlobalLoading";
import CommonModal from "../../components/Modal";
import { ADMIN_ROUTES } from "../../contants/index";
import AdminLayoutRoute from "../../commons/Layout/AdminLayoutRoute";

const store = configureStore();

class App extends React.Component {
  renderAdminRoutes() {
    let xhtml = null;
    console.log(ADMIN_ROUTES);

    xhtml = ADMIN_ROUTES.map((route) => {
      return (
        <AdminLayoutRoute
          key={route.path}
          path={route.path}
          component={route.component}
          exact={route.exact}
          name={route.name}
        />
      );
    });
    return xhtml;
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <ToastContainer />
            <GlobalLoading />
            <CommonModal />
            <Switch> {this.renderAdminRoutes()}</Switch>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default withStyles(styles)(App);
