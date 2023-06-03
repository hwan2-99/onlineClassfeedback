import React from "react";

import { useEffect, useState } from "react";
import profHandler from "../../lib/handler/profHandler";
import studHandler from "../../lib/handler/studHandler";

const SectionAdd = (props) => {
  const [section, setSetction] = useState({ start: 0, end: 0, content: "" });
  const [secList, setSecList] = useState([]);

  const getSectionList = async () => {
    const result = await studHandler.getVideoSecList(props.video_num);
    setSecList(result);
  };

  useEffect(() => {
    getSectionList();
  }, [props.video_num]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const result = await profHandler.postSectionToVideo({
      ...section,
      video_num: props.video_num,
    });
    console.log(result);
    getSectionList();
  };

  return (
    <>
      <h1>강의 영상의 섹션</h1>
      {secList.length === 0 ? (
        <h1>섹션이 없습니다.</h1>
      ) : (
        secList.map((sec) => {
          return (
            <div key={sec.sec_num}>
              <p>
                시작 : {sec.sec_start} % , 끝 : {sec.sec_end} %
              </p>
              <p>내용 : {sec.sec_content}</p>
            </div>
          );
        })
      )}
      비디오 넘버 :{props.video_num}
      <h1>섹션추가</h1>
      <form onSubmit={onSubmitHandler}>
        <h5>강의 시간 설정</h5>
        <br />
        <label>시작 시간 : </label>
        <input
          value={section.start}
          onChange={(e) => {
            setSetction((prev) => {
              return { ...prev, start: e.target.value };
            });
          }}
          type="number"
          min="0"
          max="100"
        />

        <label> 끝 시간 : </label>
        <input
          value={section.end}
          onChange={(e) => {
            setSetction((prev) => {
              return { ...prev, end: e.target.value };
            });
          }}
          type="number"
          min={section.start}
          max="100"
        />
        <br />
        <lablel> 섹션 내용 : </lablel>
        <input
          value={section.content}
          onChange={(e) => {
            setSetction((prev) => {
              return { ...prev, content: e.target.value };
            });
          }}
        />
        <br />
        <input type="submit" value="제출" />
      </form>
    </>
  );
};

export default SectionAdd;
