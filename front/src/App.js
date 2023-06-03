import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import Student from "./page/Student";
import Profesor from "./page/Profesor";
import VideoMain from "./component/prof/VideoMain";
import NotFound from "./page/NotFound";
import "antd/dist/antd.min.css";
import SignUp from "./page/SignUp";
import classes from "./app.module.css";
import ClassOpen from "./component/form/ClassOpen";
import StudMain from "./component/stud/StudMain";
import CourseVideo from "./component/stud/CourseVideo";

function App() {
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.logo}>
          <h1>Interection Online Class</h1>
          <hr />
        </div>
        <div className={classes["header"]}>
          <nav className={classes["nav-item"]}>
            <Link to={"/"}>home</Link>
            <Link to={"stud"}>stud</Link>
            <Link to={"prof"}>prof</Link>
          </nav>
        </div>
        <div className={classes.main}>
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="log" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="prof" element={<Profesor />}>
              <Route path="class/:classnum" element={<VideoMain />} />
              <Route path="open" element={<ClassOpen />} />
            </Route>
            <Route path="stud" element={<Student />}>
              <Route path="class/:classnum" element={<StudMain />}>
                <Route path=":videonum" element={<CourseVideo />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
