import React from "react";
import "./ProfLayout.css";
import { Outlet, Link } from "react-router-dom";
import ClassList from "../component/prof/ClassList";
import VideoMain from "../component/prof/VideoMain";
import { useSelector } from "react-redux";

const ProfLayout = (props) => {
  const curState = useSelector((state) => state);

  console.log(curState);

  return (
    <div className="wrapper">
      <header>
        <li>이름 : {curState.name}</li>
        <li>교수 : {curState.isProf === true ? "yes" : "no"}</li>
        <li>번호 : {curState.num}</li>
      </header>
      <div className="prof-body">
        <div className="class-main">
          <ClassList />
        </div>
        <div className="video-main">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfLayout;
