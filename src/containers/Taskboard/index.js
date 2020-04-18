import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

import { STATUSES } from "../../contants/index";
import styles from "./styles";
import TaskList from "../../components/TaskList/index";
import TaskForm from "../TaskForm/index";
import SearchBox from "../../components/SearchBox/index";
import * as taskActions from "../../actions/task";
import * as modalActions from "../../actions/modal";

class TaskBoard extends Component {
  componentWillMount() {
    const { taskActionsCreators } = this.props;
    const { fetchListTask } = taskActionsCreators;
    fetchListTask();
  }

  openForm = () => {
    const { modalAction, taskActionsCreators } = this.props;
    const { showModal, changeModalContent, changeModalTitle } = modalAction;
    const { setTaskEditing } = taskActionsCreators;
    setTaskEditing(null);
    showModal();
    changeModalTitle("Them moi cong viec");
    changeModalContent(<TaskForm />);
  };
  handleEditTask = (task) => {
    const { taskActionsCreators, modalAction } = this.props;
    const { setTaskEditing } = taskActionsCreators;
    const { showModal, changeModalContent, changeModalTitle } = modalAction;
    showModal();
    changeModalTitle("Update cong viec");
    changeModalContent(<TaskForm />);
    setTaskEditing(task);
  };

  renderBoard() {
    const { listTask } = this.props;
    let xhtml = null;
    xhtml = (
      <Grid container spacing={2}>
        {STATUSES.map((status) => {
          const taskFiltered = listTask.filter(
            (task) => task.status === status.value
          );
          return (
            <TaskList
              onClickEdit={this.handleEditTask}
              key={status.value}
              task={taskFiltered}
              status={status}
            />
          );
        })}
      </Grid>
    );
    return xhtml;
  }

  loadData = () => {
    const { taskActionsCreators } = this.props;
    const { fetchListTask } = taskActionsCreators;
    fetchListTask();
  };
  handleFillter = (e) => {
    const { value } = e.target;
    const { taskActionsCreators } = this.props;
    const { filterTask } = taskActionsCreators;
    filterTask(value);
  };
  renderSearchBox() {
    let xhtml = null;
    xhtml = <SearchBox handleChange={this.handleFillter} />;
    return xhtml;
  }

  render() {
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.loadData}
          style={{ marginRight: 20 }}
        >
          Load Data
        </Button>
        <Button variant="contained" color="primary" onClick={this.openForm}>
          <AddIcon /> THÊM MỚI CÔNG VIỆC
        </Button>
        {this.renderSearchBox()}
        {this.renderBoard()}
      </div>
    );
  }
}
TaskBoard.propTypes = {
  classes: PropTypes.object,
  taskActionsCreators: PropTypes.shape({
    fetchListTask: PropTypes.func,
    filterTask: PropTypes.func,
    setTaskEditing: PropTypes.func,
  }),
  modalActions: PropTypes.shape({
    showModal: PropTypes.func,
    hideModal: PropTypes.func,
    changeModalContent: PropTypes.func,
    changeModalTitle: PropTypes.func,
  }),
  listTask: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    listTask: state.task.listTask,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    taskActionsCreators: bindActionCreators(taskActions, dispatch),
    modalAction: bindActionCreators(modalActions, dispatch),
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(TaskBoard)
);
