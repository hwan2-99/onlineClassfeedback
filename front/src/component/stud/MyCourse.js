import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import dateToUse from "../../lib/date";
import studHandler from "../../lib/handler/studHandler";
import classes from "../../page/stylesheet/Student.module.css";

const MyCourse = () => {
  const studnum = useSelector((state) => state.num);

  const [loading, setLoading] = useState(false);
  const [classList, setList] = useState([]);

  useEffect(() => {
    //에러
    try {
      const loadList = async () => {
        //로딩중
        setLoading(true);
        const result = await studHandler.getMyClassList(studnum);
        setList(result);
      };

      loadList();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [studnum]);

  if (loading) {
    return (
      <div>
        <h1>로딩중</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>현재 듣는 강좌</h1>
        <hr />
        {classList.map((item) => {
          return (
            <ul key={item.course_num} className={classes.list}>
              <li>
                <b>{item.course_name}</b>
              </li>
              <li>진행률 {item.prog_rate} %</li>
              <li>시작일:{dateToUse(item.start_date)}</li>
              <Link to={`class/${item.course_num}`}>강의실 가기</Link>
            </ul>
          );
        })}
      </div>
    );
  }
};

export default MyCourse;
