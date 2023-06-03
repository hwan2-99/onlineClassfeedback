import React from "react";
import { Link, Outlet } from "react-router-dom";
import MyCourse from "../component/stud/MyCourse";
import RegisterCourse from "../component/stud/RegisterCourse";
import RegisterModal from "../component/stud/RegisterModal";
import classes from "./stylesheet/Student.module.css";

const Student = () => {
  return (
    <>
      <h3>강의실</h3>
      <RegisterModal>
        <RegisterCourse />
      </RegisterModal>
      <hr />
      <div className={classes.wrapper}>
        <section className={classes["list-wrapper"]}>
          <MyCourse />
        </section>
        <section className={classes["course-wrapper"]}>
          <Outlet />
        </section>
      </div>
    </>
  );
};

export default Student;
