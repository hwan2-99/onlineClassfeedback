import React, { useEffect, useState } from "react";
import classes from "./VideoMain.module.css";
import { useParams } from "react-router-dom";
import VideoUpload from "../form/VideoUploadForm";
import Video from "./Video";
import BasicModal from "../../layout/BasicModal";
import profHandler from "../../lib/handler/profHandler";

const VideoMain = () => {
  const { classnum } = useParams();
  const [video_list, setVideoList] = useState([]);
  const [classInfo, setClassInfo] = useState({
    capacity: 0,
    course_content: "",
    course_name: "",
    course_num: 0,
    course_term: 0,
    prof_num: 0,
  });

  useEffect(() => {
    const getClassVideo = async (classnum) => {
      const c_obj = await profHandler.getClassInfo(classnum);
      const v_list = await profHandler.getMyVideoList(classnum);
      setClassInfo(c_obj[0]);
      setVideoList(v_list);
      return;
    };

    getClassVideo(classnum);
  }, [classnum]);

  return (
    <div className={classes.wrpper}>
      <h1>{classInfo.course_name}</h1>
      <hr />
      <h5>{classInfo.course_content}</h5>
      <BasicModal title={"영상업로드"}>
        <VideoUpload classnum={classnum} profnum={classInfo.prof_num} />
      </BasicModal>
      <hr />
      {video_list.length === 0 ? (
        <h1>강의 영상이 없습니다. 업로드 해주세요.</h1>
      ) : (
        video_list.map((video) => {
          return (
            <Video
              key={video.video_num}
              num={video.video_num}
              order={video.video_order}
              title={video.video_title}
              uploadDate={video.video_upload_date}
              views={video.video_views}
            />
          );
        })
      )}
    </div>
  );
};

export default VideoMain;
