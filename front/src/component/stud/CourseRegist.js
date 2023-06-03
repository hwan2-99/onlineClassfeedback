import React from "react";

import { useSelector } from "react-redux";
import studHandler from "../../lib/handler/studHandler";

const CourseRegist = (props) => {
  const [course_num, prof_num] = [props.course_num, props.prof_num];
  const studentNum = useSelector((state) => state.num);

  const onRegisterClassHandler = async (e) => {
    const result = await studHandler.studClassRegister({
      course_num: course_num,
      prof_num: prof_num,
      studentNum: studentNum,
    });

    console.log(result);
  };

  return (
    <>
      <hr />
      <ul>
        <li>강의명 : {props.course_name} </li>
        <li>수용인원 : {props.capacity}</li>
        <li>수강기간 : {props.course_term}</li>
        <button onClick={onRegisterClassHandler}>강의 등록하기</button>
      </ul>
    </>
  );
};

export default CourseRegist;
