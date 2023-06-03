import React from "react";
import { Button } from "antd";
import { useEffect, useState } from "react";
import studHandler from "../../lib/handler/studHandler";
import QA from "./QA";
import classes from "./QaManage.module.css";

const QaManage = (props) => {
  const [section, setSetction] = useState({
    sec_num: 0,
    start: 0,
    end: 0,
    content: "",
  });
  const [secList, setSecList] = useState([]);

  const getSectionList = async () => {
    const result = await studHandler.getVideoSecList(props.video_num);
    setSecList(result);
    console.log(result);
  };

  useEffect(() => {
    getSectionList();
  }, [props.video_num]);

  return (
    <>
      <div className={classes.wrapper}>
        {secList.length === 0 && <h1>섹션이 없습니다..!</h1>}
        {secList.length >= 1 && (
          <>
            <section className={classes.sectionWrapper}>
              <h1>Section List</h1>
              {secList.map((sec) => {
                return (
                  <div key={sec.sec_num} className={classes.section}>
                    <p>
                      <b>{sec.sec_end}%</b>
                    </p>
                    <p>{sec.sec_content}</p>
                    <Button
                      onClick={(e) => {
                        setSetction(sec);
                      }}
                    >
                      Q&A 보기
                    </Button>
                  </div>
                );
              })}
            </section>
            <section className={classes.qaWrapper}>
              <QA sec_num={section.sec_num} />
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default QaManage;
