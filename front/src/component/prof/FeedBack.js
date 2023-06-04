import React, { useState } from "react";
import classes from "./Feedback.module.css";
import profHandler from "../../lib/handler/profHandler";

const FeedBack = (props) => {
  const { video_num } = props; // props로부터 video_num 값 가져오기
  const [currentTab, clickTab] = useState(0);

  const menuArr = [
    { key: "rest", name: "Rest", content: "Tab menu ONE" },
    { key: "problem", name: "Problem", content: "Tab menu TWO" },
    { key: "note", name: "Note", content: "Tab menu THREE" },
    { key: "quality", name: "Quality", content: "Tab menu four" },
  ];

  const selectMenuHandler = async (index) => {
    clickTab(index);
    const selectedKey = menuArr[index].key; // 선택된 메뉴의 key 값 가져오기
    await profHandler.getProblemListByType(video_num, selectedKey);
  };

  return (
    <>
      <div className={classes.TabMenu}>
        <ul>
          {menuArr.map((el, index) => (
            <li
              key={el.key}
              className={
                index === currentTab
                  ? `${classes.submenu} ${classes.focused}`
                  : classes.submenu
              }
              onClick={() => selectMenuHandler(index)}
            >
              {el.name}
            </li>
          ))}
        </ul>
        <div className={classes.desc}>
          <p>{menuArr[currentTab].content}</p>
        </div>
      </div>
    </>
  );
};

export default FeedBack;
