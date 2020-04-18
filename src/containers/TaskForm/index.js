import React from "react";
import { withStyles } from "@material-ui/styles";

import Button from "@material-ui/core/Button";
import styles from "./styles";
import { Grid } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import { compose, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import MenuItem from "@material-ui/core/MenuItem";

import * as ModalActions from "../../actions/modal";
import * as taskActions from "../../actions/task";
import renderTextField from "../../components/FormHelper/TextField";
import validate from "./validate";
import renderSelectField from "../../components/FormHelper/Select";

class TaskForm extends React.Component {
  handleSubmitForm = (data) => {
    const { taskActionsCreators } = this.props;
    const { addTask } = taskActionsCreators;
    const { title, description } = data;
    addTask(title, description);
  };

  renderStatusSelection() {
    let xhtml = null;
    const { taskEditing, classes } = this.props;
    if (taskEditing && taskEditing.id) {
      xhtml = (
        <Field
          id="status"
          label="Trạng thái"
          className={classes.select}
          name="status"
          component={renderSelectField}
        >
          <MenuItem value={0}>Ready</MenuItem>
          <MenuItem value={1}>In Progress</MenuItem>
          <MenuItem value={2}>Completed</MenuItem>
        </Field>
      );
    }

    return xhtml;
  }

  render() {
    const {
      classes,
      modalActions,
      handleSubmit,
      invalid,
      submitting,
    } = this.props;

    const { hideModal } = modalActions;
    return (
      <form onSubmit={handleSubmit(this.handleSubmitForm)}>
        <Grid container>
          <Grid item md={12}>
            <Field
              id="title"
              label="Title"
              className={classes.textField}
              margin="normal"
              name="title"
              component={renderTextField}
            />
          </Grid>
          <Grid item md={12}>
            <Field
              id="description"
              label="Description"
              className={classes.textField}
              margin="normal"
              name="description"
              component={renderTextField}
            />
          </Grid>
          {this.renderStatusSelection()}
          <Grid item md={12}>
            <Box display="flex" flexDirection="row-reverse" mt={2}>
              <Box ml={1}>
                <Button variant="contained" onClick={hideModal}>
                  Cancel
                </Button>
              </Box>
              <Box>
                <Button
                  disabled={invalid || submitting}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </form>
    );
  }
}
TaskForm.propTypes = {
  open: PropTypes.bool,
  classes: PropTypes.object,
  modalAction: PropTypes.shape({
    hideModal: PropTypes.func,
  }),
  taskActionsCreators: PropTypes.shape({
    addTask: PropTypes.func,
  }),
  handleSubmit: PropTypes.func,
  invalod: PropTypes.bool,
  submitting: PropTypes.bool,
  taskEditing: PropTypes.object,
};
const mapStateToProps = (state) => {
  return {
    taskEditing: state.task.taskEditing,
    initialValues: {
      title: state.task.taskEditing ? state.task.taskEditing.title : null,
      description: state.task.taskEditing
        ? state.task.taskEditing.description
        : null,
      status: state.task.taskEditing ? state.task.taskEditing.status : null,
    },
  };
};
const mapDispatchToProps = (dispatch) => ({
  modalActions: bindActionCreators(ModalActions, dispatch),
  taskActionsCreators: bindActionCreators(taskActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const FORM_NAME = "TASK_MANAGEMENT";

const withReduxForm = reduxForm({
  form: FORM_NAME,
  validate,
});

export default compose(
  withStyles(styles),
  withConnect,
  withReduxForm
)(TaskForm);
