import React from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/styles";
import Header from "./Header";
import SideBar from "./SideBar";
import PropTypes from "prop-types";

const DashBoard = (props) => {
  const { children, classes } = props;
  return (
    <div className={classes.dashboard}>
      <Header />
      <SideBar />
      {children}
    </div>
  );
};
DashBoard.propTypes = {
  children: PropTypes.object,
  classes: PropTypes.object,
};
export default withStyles(styles)(DashBoard);
