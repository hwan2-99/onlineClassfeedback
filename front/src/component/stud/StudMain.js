import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import dateToUse from "../../lib/date";
import studHandler from "../../lib/handler/studHandler";
import classes from "./StudMain.module.css";

const StudMain = () => {
  const { classnum } = useParams();
  const navigater = useNavigate();

  const [loading, setLoading] = useState(false);
  const [videoList, setList] = useState([]);

  useEffect(() => {
    //에러
    try {
      const loadList = async () => {
        //로딩중
        setLoading(true);
        const result = await studHandler.getClassVideoList(classnum);
        setList(result);
      };

      loadList();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [classnum]);

  if (loading) {
    return (
      <div>
        <h1>로딩중</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>강의 시청</h1>
        <hr />
        <div className={classes["main-wrapper"]}>
          {videoList.length === 0 && <h1>강의 영상이 없습니다</h1>}
          <section>
            <Outlet />
          </section>
          <hr />
          <section className={classes["video-list-wrapper"]}>
            {videoList.length > 0 &&
              videoList.map((video) => {
                return (
                  <div key={video.video_num} className={classes["video-list"]}>
                    <p>
                      <b>{video.course_name}</b>
                    </p>
                    <p>
                      <b>제 {video.video_order} 강</b>
                    </p>
                    <p>제목 : {video.video_title}</p>
                    <p>업로드 날짜 :{dateToUse(video.video_upload_date)}</p>
                    <Button
                      onClick={(e) => {
                        navigater(`${video.video_num}`, { state: video });
                        console.log(video);
                      }}
                    >
                      강의 시청하기
                    </Button>
                  </div>
                );
              })}
          </section>
        </div>
      </div>
    );
  }
};

export default StudMain;
