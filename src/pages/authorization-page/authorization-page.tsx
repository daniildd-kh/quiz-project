import React from "react";
import { NavLink } from "react-router-dom";
import LoginForm from "../../components/common/authorization-forms/login-form/login-form";
import Authorization from "../../components/common/authorization/authorization";

const AuthorizationPage = () => {
  return (
    <>
      <Authorization />
    </>
  );
};

export default AuthorizationPage;
