import React, { useEffect } from "react";
import { withStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators, compose } from "redux";

import { STATUSES } from "../../contants/index";
import styles from "./styles";
import TaskList from "../../components/TaskList/index";
import TaskForm from "../TaskForm/index";
import SearchBox from "../../components/SearchBox/index";
import * as taskActions from "../../actions/task";
import * as modalActions from "../../actions/modal";
import { Box } from "@material-ui/core";

const TaskBoard = (props) => {
  useEffect(() => {
    function fetchlist() {
      const { taskActionsCreators } = props;
      const { fetchListTask } = taskActionsCreators;
      fetchListTask();
    }
    fetchlist();
    //eslint-disable-next-line
  }, []);

  const openForm = () => {
    const { modalAction, taskActionsCreators } = props;
    const { showModal, changeModalContent, changeModalTitle } = modalAction;
    const { setTaskEditing } = taskActionsCreators;
    setTaskEditing(null);
    showModal();
    changeModalTitle("Them moi cong viec");
    changeModalContent(<TaskForm />);
  };
  const handleEditTask = (task) => {
    const { taskActionsCreators, modalAction } = props;
    const { setTaskEditing } = taskActionsCreators;
    const { showModal, changeModalContent, changeModalTitle } = modalAction;
    showModal();
    changeModalTitle("Update cong viec");
    changeModalContent(<TaskForm />);
    setTaskEditing(task);
  };
  const showModalDeleteTask = (task) => {
    const { modalAction, classes } = props;
    const {
      showModal,
      changeModalContent,
      changeModalTitle,
      hideModal,
    } = modalAction;
    showModal();
    changeModalTitle("Delete cong viec");
    changeModalContent(
      <div className={classes.modalDelete}>
        <div className={classes.modalConfirmText}>
          Ban co chac chan muon xoa{" "}
          <span className={classes.modalConfirmTextBold}>{task.title}</span>?
        </div>
        <Box display="flex" flexDirection="row-reverse" mt={2}>
          <Box ml={1}>
            <Button variant="contained" onClick={hideModal}>
              Cancel
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleDeleteTask(task)}
            >
              Ok
            </Button>
          </Box>
        </Box>
      </div>
    );
  };

  const handleDeleteTask = (task) => {
    const { id } = task;
    const { taskActionsCreators } = props;
    console.log(taskActionsCreators);

    const { deleteTask } = taskActionsCreators;
    deleteTask(id);
  };

  const renderBoard = () => {
    const { listTask } = props;
    let xhtml = null;
    xhtml = (
      <Grid container spacing={2}>
        {STATUSES.map((status) => {
          const taskFiltered = listTask.filter(
            (task) => task.status === status.value
          );
          return (
            <TaskList
              onClickEdit={handleEditTask}
              onClickDelete={showModalDeleteTask}
              key={status.value}
              task={taskFiltered}
              status={status}
            />
          );
        })}
      </Grid>
    );
    return xhtml;
  };

  const loadData = () => {
    const { taskActionsCreators } = props;
    const { fetchListTask } = taskActionsCreators;
    fetchListTask();
  };
  const handleFillter = (e) => {
    const { value } = e.target;
    const { taskActionsCreators } = props;
    const { filterTask } = taskActionsCreators;
    filterTask(value);
  };
  const renderSearchBox = () => {
    let xhtml = null;
    xhtml = <SearchBox handleChange={handleFillter} />;
    return xhtml;
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={loadData}
        style={{ marginRight: 20 }}
      >
        Load Data
      </Button>
      <Button variant="contained" color="primary" onClick={openForm}>
        <AddIcon /> THÊM MỚI CÔNG VIỆC
      </Button>
      {renderSearchBox()}
      {renderBoard()}
    </div>
  );
};

TaskBoard.propTypes = {
  classes: PropTypes.object,
  taskActionsCreators: PropTypes.shape({
    fetchListTask: PropTypes.func,
    filterTask: PropTypes.func,
    setTaskEditing: PropTypes.func,
    deleteTask: PropTypes.func,
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
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(TaskBoard);
