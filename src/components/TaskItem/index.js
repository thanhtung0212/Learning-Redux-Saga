import React from "react";
import { withStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import PropTypes from "prop-types";

import styles from "./styles";

function TaskItem(props) {
  const { classes, task, status, onClickEdit, onClickDelete } = props;
  const { id, title } = task;

  return (
    <Card key={id} className={classes.card}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item md={8}>
            <Typography component="h2">{title}</Typography>
          </Grid>
          <Grid item md={4}>
            <Typography component="h2">{status.label}</Typography>
          </Grid>
        </Grid>
        <p>{task.description} </p>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={onClickDelete}
        >
          Delete
        </Button>

        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          onClick={onClickEdit}
        >
          Edit Task
        </Button>
      </CardActions>
    </Card>
  );
}
TaskItem.propTypes = {
  classes: PropTypes.object,
  task: PropTypes.object,
  status: PropTypes.object,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
};
export default withStyles(styles)(TaskItem);
