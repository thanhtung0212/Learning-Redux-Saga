import React from "react";
import styles from "./styles";
import {
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  withStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};
renderFromHelper.propTypes = {
  touched: PropTypes.bool,
  error: PropTypes.bool,
};
// const renderChildren = (children) => {
//   if (typeof children === "function") {
//     return children(children);
//   } else {
//     return null;
//   }
// };
const renderSelectField = ({
  classes,
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) => {
  return (
    <FormControl className={classes.formControl} error={touched && error}>
      <InputLabel htmlFor="color-native-simple">{label}</InputLabel>
      <Select
        {...input}
        {...custom}
        inputProps={{
          name: input.name,
          id: "color-native-simple",
        }}
        value={input.value}
      >
        {children}
        {/* {renderChildren()} */}
      </Select>
      {renderFromHelper({ touched, error })}
    </FormControl>
  );
};
renderSelectField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  children: PropTypes.array,
  classes: PropTypes.object,
};
export default withStyles(styles)(renderSelectField);
