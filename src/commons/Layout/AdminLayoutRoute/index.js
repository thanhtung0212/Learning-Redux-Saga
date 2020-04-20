import React from "react";
import { Route } from "react-router-dom";

import DashBoard from "../../../components/DashBoard";
import PropTypes from "prop-types";

const AdminLayout = (props) => {
  console.log(props);
  const { component: YourComponent, ...remainProps } = props;
  console.log(YourComponent && YourComponent);

  return (
    <Route
      {...remainProps}
      render={(routeProps) => {
        return (
          <DashBoard>
            <YourComponent {...routeProps} />
          </DashBoard>
        );
      }}
    />
  );
};
AdminLayout.propTypes = {
  path: PropTypes.string,
  exact: PropTypes.bool,
  component: PropTypes.func,
  name: PropTypes.string,
};
export default AdminLayout;
