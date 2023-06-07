import React, { useState, useEffect } from "react";
import classes from "./Feedback.module.css";
import profHandler from "../../lib/handler/profHandler";
import ChartFeedback from "../form/ChartFeedback";

const FeedBack = (props) => {
  const { video_num } = props; // props로부터 video_num 값 가져오기
  const [currentTab, clickTab] = useState(0);
  const [menuArr, setMenuArr] = useState([
    { key: "rest", name: "Rest", content: "Tab menu ONE", result: null },
    { key: "problem", name: "Problem", content: "Tab menu TWO", result: null },
    { key: "note", name: "Note", content: "Tab menu THREE", result: null },
    { key: "quality", name: "Quality", content: "Tab menu four", result: null },
  ]);

  const selectMenuHandler = async (index) => {
    clickTab(index);
    const selectedKey = menuArr[index].key; // 선택된 메뉴의 key 값 가져오기
    const result = await profHandler.getProblemListByType(
      video_num,
      selectedKey
    );
    console.log(result);

    // Update the menuArr to include the result
    const updatedMenuArr = [...menuArr];
    updatedMenuArr[index].result = result;
    setMenuArr(updatedMenuArr);
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
          <p>{menuArr[currentTab].result}</p>
          <ChartFeedback
            video_num={video_num}
            selectedKey={menuArr[currentTab].key}
            content={menuArr[currentTab].result} // Pass the result as content
          />
        </div>
      </div>
    </>
  );
};

export default FeedBack;
