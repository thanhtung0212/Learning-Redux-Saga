import React from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import CloseIcon from "@material-ui/icons/Clear";
import Modal from "@material-ui/core/Modal";
import styles from "./styles";
import * as ModalActions from "../../actions/modal";

function CommonModal(props) {
  const { classes, open, component, modalActions, title } = props;

  const { hideModal } = modalActions;
  return (
    <Modal open={open} onClose={hideModal}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <span className={classes.title}>{title}</span>
          <CloseIcon className={classes.icon} onClick={hideModal} />
        </div>
        <div className={classes.content}>{component}</div>
      </div>
    </Modal>
  );
}

CommonModal.propTypes = {
  classes: PropTypes.object,
  title: PropTypes.string,
  open: PropTypes.bool,
  modalAction: PropTypes.shape({
    hideModal: PropTypes.func,
  }),
  component: PropTypes.object,
};
const mapStateToProps = (state) => ({
  open: state.modal.showModal,
  component: state.modal.component,
  title: state.modal.title,
});
const mapDispatchToProps = (dispatch) => ({
  modalActions: bindActionCreators(ModalActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(CommonModal);
