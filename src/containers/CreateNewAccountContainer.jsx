import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../redux/actions";

export default function CreateNewAccountContainer({ component: Component }) {
  const dispatch = useDispatch();
  const registerApi = useSelector(state => state.api.registerApi);

  return (
    <Component
      handleSubmit={values => dispatch(register(values))}
      loading={registerApi.loading}
      error={registerApi.status === "error" ? registerApi.error : false}
    />
  );
}
