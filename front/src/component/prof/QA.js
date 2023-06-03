import React from "react";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import profHandler from "../../lib/handler/profHandler";
import studHandler from "../../lib/handler/studHandler";

const QA = (props) => {
  const [qaList, setQaList] = useState([]);
  const [curAnswer, setAnswer] = useState("");

  const loadList = async (num) => {
    const result = await studHandler.getSecFAQList(num);
    setQaList(result);
  };

  useEffect(() => {
    loadList(props.sec_num);
    console.log("큐엔에이 리스트", qaList);
  }, [props.sec_num]);

  const QAAnswerPost = async (num, answer) => {
    const body = {
      num,
      answer,
    };

    console.log(body);

    const result = await profHandler.postQAAnswer(body);

    console.log(result);
    await loadList(props.sec_num);
    setAnswer("");
  };

  return (
    <>
      <h1>~ Q&A List ~</h1>
      {qaList.length === 0 && <h1>질문 좀 해라 애들아</h1>}
      {qaList.length > 0 &&
        qaList.map((qa) => {
          return (
            <div key={qa.qa_num}>
              <p>제목 : {qa.qa_title}</p>
              <p>질문 내용 : {qa.qa_content}</p>
              {qa.qa_response_yn === 1 ? (
                <>
                  <p>답변 : {qa.qa_reply_content}</p>
                </>
              ) : (
                <>
                  <Input
                    onChange={(e) => {
                      // console.log(e.currentTarget.value);
                      setAnswer(e.currentTarget.value);
                    }}
                  />
                  <Button
                    onClick={() => {
                      QAAnswerPost(qa.qa_num, curAnswer);
                    }}
                  >
                    답변 하기
                  </Button>
                </>
              )}
              <hr />
            </div>
          );
        })}
    </>
  );
};

export default QA;
