import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { Button, Progress, Slider } from "antd";
import {
  CaretRightOutlined,
  PauseOutlined,
  SoundOutlined,
  SoundFilled,
} from "@ant-design/icons";
import classes from "./CourseVideo.module.css";
import BasicModal from "../../layout/BasicModal";
import studHandler from "../../lib/handler/studHandler";
import QASend from "../form/QASend";
import dateToUse from "../../lib/date";
import ReactPlayer from "react-player";

const CourseVideo = () => {
  const location = useLocation();
  const [showPlayButton, setShowPlayButton] = useState(false);
  const videoRef = useRef();
  const studNum = useSelector((state) => state.num);
  const [loading, setLoading] = useState(true);
  const [qaList, setList] = useState([]);
  const [buttonList, setButtonList] = useState([]); // 버튼 목록 상태와 setter 추가
  const [percent, setPercent] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [noteText, setNoteText] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);
  const toggleMuteHandler = () => {
    setVideoState((prevState) => ({
      ...prevState,
      muted: !prevState.muted,
    }));
  };
  const handleRestButtonClick = () => {
    setShowButtons(false);
    setShowPlayButton(true);
    setShowControls(true);
    setButtonList([]); // 버튼 목록 초기화
    setShowTextInput(true); // Rest 버튼을 눌렀을 때 입력 상자 표시
  };

  const handleProblemButtonClick = () => {
    setShowButtons(true); // 수정: setShowButtons를 true로 설정하여 버튼들을 보이도록 변경
    setShowPlayButton(false); // 재생 버튼 숨김
    setShowTextInput(true); // 텍스트 입력 상자 보임
    setShowControls(false); // 컨트롤 바 숨김
    setButtonList([]); // 버튼 목록 초기화
  };

  const handleTextSubmit = () => {
    setShowPlayButton(true); // 재생 버튼 보임
    setShowTextInput(false); // 텍스트 입력 상자 숨김
    setShowControls(true); // 컨트롤 바 보임
  };

  const handleNoteButtonClick = () => {
    setShowButtons(true); // 버튼들을 보이도록 설정
    setShowPlayButton(false); // 재생 버튼을 숨김
    setShowTextInput(false); // 텍스트 입력 상자를 숨김
    setShowControls(false); // 컨트롤 바를 숨김
    setButtonList([]); // 버튼 목록 초기화
    setShowNoteInput(true); // 입력 폼을 보이도록 설정
  };

  const handleQualityButtonClick = () => {
    setShowButtons(false);
    setShowPlayButton(true);
    setShowControls(true);
    setButtonList([]); // 버튼 목록 초기화
  };
  const playHandler = () => {
    setShowButtons(false);
    setShowControls(false); // 버튼이 사라지면 컨트롤 바도 사라지도록 설정
  };
  const handleNoteTextSubmit = () => {
    // 재생 버튼을 보이도록 상태 변경
    setShowPlayButton(true);
    // input 폼을 숨김
    setShowNoteInput(false);
    console.log("Submitted note:", noteText);
    setShowPlayButton(true); // 재생 버튼을 보임
    setShowTextInput(false); // 텍스트 입력 상자를 숨김
    setShowControls(true); // 컨트롤 바를 보임
    setNoteText(""); // 노트 텍스트 초기화
  };
  const pauseHandler = () => {
    setShowButtons(true); // 버튼들을 보이도록 설정
    setShowPlayButton(false); // 재생 버튼을 숨김
    setShowControls(true); // 버튼이 보이는 동안은 컨트롤 바도 보이도록 설정

    const buttonRest = (
      <Button
        key="rest"
        className={classes["video-button"]}
        onClick={handleRestButtonClick}
      >
        Rest
      </Button>
    );

    const buttonProblem = (
      <Button
        key="problem"
        className={classes["video-button"]}
        onClick={handleProblemButtonClick}
      >
        Problem
      </Button>
    );

    const buttonNote = (
      <Button
        key="note"
        className={classes["video-button"]}
        onClick={handleNoteButtonClick}
      >
        Note
      </Button>
    );

    const buttonQuality = (
      <Button
        key="quality"
        className={classes["video-button"]}
        onClick={handleQualityButtonClick}
      >
        Quality
      </Button>
    );

    const newButtonList = [
      buttonRest,
      buttonProblem,
      buttonNote,
      buttonQuality,
    ];

    setButtonList(newButtonList); // 버튼 목록을 업데이트
  };

  const onVolumeChangeHandler = (value) => {
    setVolume(value);
    setVideoState((prevState) => ({
      ...prevState,
      volume: value,
    }));
  };
  const onMouseEnterHandler = () => {
    setShowControls(true);
  };

  const onMouseLeaveHandler = () => {
    setShowControls(false);
  };

  //videoState
  const [videoState, setVideoState] = useState({
    playing: false, // 재생중인지
    muted: false, // 음소거인지
    controls: false, // 기본으로 제공되는 컨트롤러 사용할건지
    volume: 0.5, // 볼륨크기
    playbackRate: 1.0, // 배속
    played: 0, // 재생의 정도 (value)
    seeking: false, // 재생바를 움직이고 있는지
    duration: 0, // 전체 시간
    currentTime: 0,
  });

  const onProgressHandler = (state) => {
    //퍼센트 계산
    setPercent(
      Math.round((state.playedSeconds / videoRef.current.getDuration()) * 100)
    );
    setVideoState({
      ...videoState,
      currentTime: state.playedSeconds,
    });
    setCurrentTime(state.playedSeconds); // 추가된 부분
  };

  //멈췄다 실행했다.
  const playPauseHandler = () => {
    setVideoState({
      ...videoState,
      playing: !videoState.playing,
    });

    console.log(videoState);
  };
  const handleTextChange = (event) => {
    // Handle text input change event
    // ...
    setShowPlayButton(true);
  };
  const {
    video_num,
    video_order,
    video_title,
    video_filename,
  } = location.state;

  const onSeekHandler = (value) => {
    videoRef.current.seekTo(value);
    setVideoState({
      ...videoState,
      currentTime: value,
    });
  };

  const getVideoSection = async (num) => {
    const result = await studHandler.getVideoSecList(num);
    console.log("db 결과", result);
  };

  useEffect(() => {
    if (showPlayButton) {
      const newButtonList = [
        <Button key="rest" className={classes["video-button"]}>
          Rest
        </Button>,
        <Button key="problem" className={classes["video-button"]}>
          Problem
        </Button>,
        <Button key="note" className={classes["video-button"]}>
          Note
        </Button>,
        <Button key="quality" className={classes["video-button"]}>
          Quality
        </Button>,
      ];
      setButtonList(newButtonList);
    }
  }, [showPlayButton]);

  return (
    <div className={classes["wrapper"]}>
      <div
        className={classes["video-wrapper"]}
        onMouseEnter={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
      >
        <div
          className={classes["video-wrapper"]}
          onMouseEnter={onMouseEnterHandler}
          onMouseLeave={onMouseLeaveHandler}
        ></div>
        <h2>강의실</h2>
        <section>
          <h1>
            제{video_order} 강
            <br />
            강의 명: {video_title},{video_filename}
            <br />
          </h1>
          비디오 번호: {video_num} / {video_filename}
          <hr />
          <ReactPlayer
            width="inherit"
            ref={videoRef}
            height="400px"
            url={`http://localhost:3000/${video_filename}.mp4`}
            playing={videoState.playing}
            muted={videoState.muted}
            onPlay={playHandler}
            controls={videoState.controls}
            poster={"../../asset/asset/play"}
            volume={videoState.volume}
            light={true}
            onPause={pauseHandler}
            onProgress={onProgressHandler}
          />
          {showButtons && ( //비디오 컨트롤 버튼
            <div className={classes["video-controls"]}>
              <div className={classes["control-item"]}>
                {videoState.muted ? (
                  <SoundOutlined onClick={toggleMuteHandler} />
                ) : (
                  <SoundFilled onClick={toggleMuteHandler} />
                )}
              </div>
              {showNoteInput ? (
                <div>
                  <input
                    type="text"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                  />
                  <Button onClick={handleNoteTextSubmit}>Submit</Button>
                </div>
              ) : (
                <div>
                  {showTextInput ? (
                    <div>
                      <input type="text" onChange={handleTextChange} />
                      <Button onClick={handleTextSubmit}>Submit</Button>
                    </div>
                  ) : showPlayButton ? (
                    <Button
                      key="play"
                      className={classes["video-button"]}
                      onClick={playPauseHandler}
                    >
                      Play
                    </Button>
                  ) : (
                    buttonList
                  )}
                </div>
              )}
            </div>
          )}
          <div>
            {!showButtons && (
              <div>
                {videoState.playing ? (
                  <PauseOutlined onClick={playPauseHandler} />
                ) : (
                  <CaretRightOutlined onClick={playPauseHandler} />
                )}
              </div>
            )}
          </div>
        </section>
      </div>
      <div className={classes["FAQ-wrapper"]}>
        <section>
          <h2>FAQ</h2>
          <div className={classes["qa-wrapper"]}>
            <br />
            {!loading && (
              <>
                {qaList.length === 0 && <h1> Q&A가 없습니다.</h1>}
                {qaList.map((qa) => {
                  return (
                    <div key={qa.qa_num} className={classes.qa}>
                      <p>Q : {qa.qa_title}</p>
                      <p>내용 : {qa.qa_content}</p>
                      <p>A : {qa.qa_reply_content}</p>
                      <p>보낸 날짜 : {dateToUse(qa.qa_send_time)}</p>
                    </div>
                  );
                })}
              </>
            )}
            <div className={classes["video-overlay"]}>
              {" "}
              <p className={classes["current-time"]}>{currentTime}</p>{" "}
            </div>{" "}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CourseVideo;
