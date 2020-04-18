import React from "react";
import { withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";

import styles from "./styles";

function SearchBox(props) {
  const { classes, handleChange } = props;

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        autoComplete="off"
        onChange={handleChange}
        className={classes.textField}
        placeholder="Nhập từ khóa"
      />
    </form>
  );
}
export default withStyles(styles)(SearchBox);
