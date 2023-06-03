const express = require("express");
const router = express.Router();
const fs = require("fs");

const studService = require("./stud.service");

router.post("/register", async (req, res) => {
  try {
    const result = await studService.classRegister(req.body);
    return res
      .status(200)
      .json({ status: 200, data: result, message: "강의 등록 성공" });
  } catch (error) {
    return res.status(200).json({ status: 500, message: "오류 발생" });
  }
});

router.post("/qa", async (req, res) => {
  try {
    const result = await studService.qaPost(req.body);
    return res
      .status(200)
      .json({ status: 200, data: result, message: "qa 등록 성공" });
  } catch (error) {
    return res.status(200).json({ status: 500, message: "오류 발생" });
  }
});

router.get("/class/:studnum", async (req, res) => {
  try {
    console.log(req.params);
    const result = await studService.getMyClassList(req.params.studnum);
    return res
      .status(200)
      .json({ status: 200, data: result, message: "리스트 가져오기 성공" });
  } catch (error) {
    return res.status(200).json({ status: 500, message: "오류 발생" });
  }
});

//태그 faq 리스트 가져오기
router.get("/faq/:secnum", async (req, res) => {
  try {
    console.log(req.params);
    const result = await studService.getSectionFaqList(req.params.secnum);
    return res
      .status(200)
      .json({ status: 200, data: result, message: "리스트 가져오기 성공" });
  } catch (error) {
    return res.status(200).json({ status: 500, message: "오류 발생" });
  }
});
router.get("/video/:num", (req, res) => {
  res.sendFile(
    "C:\\Users\\KT\\Desktop\\onlineClass\\back\\uploads\\video" + "/video.mp4"
  );
});
//비디오 태그 리스트 가져오기
router.get("/video/section/:num", async (req, res) => {
  try {
    console.log(req.params);
    const result = await studService.getVideoSectionList(req.params.num);
    return res
      .status(200)
      .json({ status: 200, data: result, message: "리스트 가져오기 성공" });
  } catch (error) {
    return res.status(200).json({ status: 500, message: "오류 발생" });
  }
});

//강의 비디오 리스트 가져오기
router.get("/video/list/:classnum", async (req, res) => {
  const { classnum } = req.params;
  try {
    const result = await studService.getClassVideoList(classnum);
    return res
      .status(200)
      .json({ status: 200, data: result, message: "리스트 가져오기 성공" });
  } catch (error) {
    return res.status(200).json({ status: 500, message: "오류 발생" });
  }
});
router.post("/problem", async (req, res) => {
  try {
    const { video_num, type, comment } = req.body;
    const result = await studService.postProblem({ type, comment }, video_num);
    return res.status(200).json({
      status: 200,
      data: result,
      message: "문제 등록 성공",
    });
  } catch (error) {
    console.log("오류 발생:", error.message);
    return res.status(500).json({ status: 500, message: "오류 발생" });
  }
});

//비디오 스트리밍
router.get("/video/:fileName", (req, res) => {
  const { fileName } = req.params;

  const fullPath = `uploads/video/${fileName}.mp4`;
  const fileStat = fs.statSync(fullPath);
  const { size } = fileStat;
  const { range } = fileStat;

  // 범위에 대한 요청이 있을 경우
  if (range) {
    // bytes= 부분을 없애고 - 단위로 문자열을 자름
    const parts = range.replace(/bytes=/, "").split("-");
    // 시작 부분의 문자열을 정수형으로 변환
    const start = parseInt(parts[0]);
    // 끝 부분의 문자열을 정수형으로 변환 (끝 부분이 없으면 총 파일 사이즈에서 - 1)
    const end = parts[1] ? parseInt(parts[1]) : size - 1;
    // 내보낼 부분의 길이
    const chunk = end - start + 1;
    // 시작 부분과 끝 부분의 스트림을 읽음
    const stream = fs.createReadStream(fullPath, { start, end });
    // 응답
    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunk,
      "Content-Type": "video/mp4",
    });
    // 스트림을 내보냄
    stream.pipe(res);
  } else {
    // 범위에 대한 요청이 아님
    res.writeHead(200, {
      "Content-Length": size,
      "Content-Type": "video/mp4",
    });
    // 스트림을 만들고 응답에 실어보냄
    fs.createReadStream(fullPath).pipe(res);
  }
});

module.exports = router;
