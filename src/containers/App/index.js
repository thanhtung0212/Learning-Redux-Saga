import React from "react";
import { withStyles } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TaskBoard from "../Taskboard/index";
import styles from "./styles";
import theme from "../../commons/Theme/index";
import { Provider } from "react-redux";
import configureStore from "../../redux/configureStore";
import GlobalLoading from "../../components/GlobalLoading";
import CommonModal from "../../components/Modal";

const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ToastContainer />
          <GlobalLoading />
          <CommonModal />
          <TaskBoard />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default withStyles(styles)(App);
