import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Login from "./Login";

const Home = () => {
  const curState = useSelector((state) => state);

  console.log(curState);

  return (
    <div>
      {!curState.isLogIn && (
        <div>
          <Login />
        </div>
      )}
    </div>
  );
};

export default Home;
