const pool = require("../../config/dbConfig");
const multer = require("multer");

module.exports = {
  insertSectionToVideo: async (sectionInfo) => {
    try {
      const conn = await pool.getConnection();

      const { start, end, content, video_num } = sectionInfo;

      const query = `Insert into video_section (
        video_num , 
        sec_start,  
        sec_end,
        sec_content
      ) values (?,?,?,?)`;

      const [{ affectedRows: result }] = await conn.query(query, [
        video_num,
        start,
        end,
        content,
      ]);
      conn.release();
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  updateQAAnswer: async ({ num, answer }) => {
    try {
      const conn = await pool.getConnection();

      const query = `UPDATE question SET qa_reply_content = ?, qa_response_yn = 1 
      WHERE qa_num = ?`;

      const [{ affectedRows: result }] = await conn.query(query, [answer, num]);
      conn.release();
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  videoUpload: async (videoInfo) => {
    //서버에 저장
    console.log(videoInfo);

    //디비에 저장
    try {
      const conn = await pool.getConnection();
    } catch (error) {
      return error;
    }
  },

  insertVideoInfo: async (videoInfo) => {
    try {
      const conn = await pool.getConnection();

      const { course_num, profnum, fileName, video_title, video_order } =
        videoInfo;

      const query = `Insert into video (
        course_num, prof_num, video_filename, video_upload_date, video_title, video_order
      ) values (?,?,?,NOW(),?,?)`;

      const [{ affectedRows: result }] = await conn.query(query, [
        course_num,
        profnum,
        fileName.split(".")[0],
        video_title,
        video_order,
      ]);
      conn.release();
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  insertClass: async (classInfo) => {
    console.log(classInfo);
    //디비
    try {
      const conn = await pool.getConnection();

      const { course_name, capacity, course_term, course_content, num } =
        classInfo;

      const query = `Insert into course (
        prof_num,course_name, capacity, course_term,course_content
      ) values (?,?,?,?,?)`;

      const [{ affectedRows: result }] = await conn.query(query, [
        num,
        course_name,
        capacity,
        course_term,
        course_content,
      ]);
      conn.release();
      return result;
    } catch (error) {
      return error;
    }
  },
  //비디오별 문제점 불러오기
  getProblemList: async (num) => {
    try {
      const conn = await pool.getConnection();

      const query = `Select * from problem where video_num = ?`;

      const [result] = await conn.query(query, [num]);
      conn.release();
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  getClassInfo: async (num) => {
    try {
      const conn = await pool.getConnection();

      const query = `Select * from course where course_num = ?`;

      const [result] = await conn.query(query, [num]);
      conn.release();
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  getProfClassList: async (num) => {
    try {
      const conn = await pool.getConnection();

      const query = `Select * from course where prof_num = ?`;

      const [result] = await conn.query(query, [num]);
      conn.release();
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  getAllClassList: async () => {
    try {
      const conn = await pool.getConnection();

      const query = `Select * from course`;

      const [result] = await conn.query(query);
      conn.release();
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  getMyVideoInfo: async (num) => {
    try {
      const conn = await pool.getConnection();

      const query = `Select * from video where course_num=${num}`;

      const [result] = await conn.query(query);
      conn.release();
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },
};
