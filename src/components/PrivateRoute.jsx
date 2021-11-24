import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../Contexts/Auth";

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  return currentUser ? (
    <Route {...rest}>{(props) => <Component {...props} />}</Route>
  ) : (
    <Redirect to="/login" />
  );
}
