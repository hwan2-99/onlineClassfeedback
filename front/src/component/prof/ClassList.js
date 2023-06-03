import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import profHandler from "../../lib/handler/profHandler";

const ClassList = () => {
  //교수 번호 가져오기
  const num = useSelector((state) => state.num);

  const [loading, setLoading] = useState(true);
  const [classList, setList] = useState([]);

  useEffect(() => {
    //에러
    try {
      const loadList = async () => {
        //로딩중
        setLoading(true);
        const result = await profHandler.getClassList(num);
        setList(result);
      };

      loadList();
      setLoading(false);
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
      <div>
        <h1>강좌목록</h1>
        <hr />
        {classList.map((course) => {
          return (
            <div key={course.course_num}>
              <p>{course.course_name}</p>
              <Link to={`class/${course.course_num}`}>강좌 이동</Link>
              <hr />
            </div>
          );
        })}
        <h1>강좌 개설</h1>
        <Link to="open">강좌 개설 하기</Link>
      </div>
    );
  }
};

export default ClassList;
