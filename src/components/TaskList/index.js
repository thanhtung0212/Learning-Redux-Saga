import React from "react";
import { withStyles } from "@material-ui/styles";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import TaskItem from "../TaskItem/index";
import styles from "./styles";
import PropTypes from "prop-types";
function TaskList(props) {
  const { classes, task, status, onClickEdit } = props;

  return (
    <Grid item md={4} xs={12} key={status.value}>
      <Box mt={2} mb={2}>
        <div className={classes.status}> {status.label}</div>
      </Box>
      <div className={classes.wrapperListTask}>
        {task.map((task) => {
          return (
            <TaskItem
              onClickEdit={() => onClickEdit(task)}
              task={task}
              status={status}
              key={task.id}
            />
          );
        })}
      </div>
    </Grid>
  );
}
TaskList.propTypes = {
  classes: PropTypes.object,
  task: PropTypes.array,
  status: PropTypes.object,
  onClickEdit: PropTypes.func,
};
export default withStyles(styles)(TaskList);
