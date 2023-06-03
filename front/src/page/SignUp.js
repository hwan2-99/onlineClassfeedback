import React from "react";
import StudSignUpForm from "../component/form/StudSignUpForm";
import classes from "./stylesheet/page.module.css";

const SignUp = () => {
  return (
    <div className={classes.wrapper}>
      <h1>회원가입 페이지</h1>
      <hr />
      <div className={classes["login-wrapper"]}>
        <StudSignUpForm />
      </div>
    </div>
  );
};
export default SignUp;
