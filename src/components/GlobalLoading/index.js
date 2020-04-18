import React from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";

import loadingIcon from "../../assets/images/loading.gif";

function GlobalLoading(props) {
  const { classes, showLoading } = props;
  let xhtml = null;
  if (showLoading) {
    xhtml = (
      <div className={classes.globalLoading}>
        <img src={loadingIcon} alt="loading" className={classes.icon} />
      </div>
    );
  }
  return xhtml;
}

GlobalLoading.propTypes = {
  classes: PropTypes.object,
  showLoading: PropTypes.bool,
};
const mapStateToProps = (state) => {
  return {
    showLoading: state.ui.showLoading,
  };
};

const withConnect = connect(mapStateToProps, null);

export default compose(withStyles(styles), withConnect)(GlobalLoading);
