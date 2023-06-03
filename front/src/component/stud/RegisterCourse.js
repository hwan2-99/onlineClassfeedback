import React from "react";
import { useEffect, useState } from "react";
import profHandler from "../../lib/handler/profHandler";
import CourseRegist from "./CourseRegist";

const RegisterCourse = () => {
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      setLoading(true);
      const fetchingList = async () => {
        const result = await profHandler.getRegisterableClass();
        setCourseList(result);
      };
      fetchingList();
      setLoading(false);
      console.log(courseList);
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (loading) {
    return (
      <div>
        <h1>로딩중</h1>
      </div>
    );
  } else {
    return (
      <>
        <h1>강의 등록 하기</h1>
        <div>신청 가능한 강의 목록 강의목록 가져오기</div>
        {courseList.map((course) => {
          return (
            <CourseRegist
              key={course.course_num}
              course_num={course.course_num}
              prof_num={course.prof_num}
              course_name={course.course_name}
              capacity={course.capacity}
              course_term={course.course_term}
            />
          );
        })}
      </>
    );
  }
};

export default RegisterCourse;
