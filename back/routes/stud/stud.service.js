const pool = require("../../config/dbConfig");

module.exports = {
  classRegister: async (info) => {
    console.log(info);
    try {
      const conn = await pool.getConnection();

      const date = new Date();

      const { studentNum, course_num, prof_num } = info;

      const query = `Insert into course_info (
        stud_num,course_num, prof_num, start_date, prog_rate, last_date
      ) values (?,?,?,NOW(),0,NOW())`;

      const [{ affectedRows: result }] = await conn.query(query, [
        studentNum,
        course_num,
        prof_num,
      ]);
      conn.release();
      return result;
    } catch (error) {
      return error;
    }
  },

  qaPost: async (info) => {
    console.log("q&a 정보", info);
    try {
      const conn = await pool.getConnection();
      console.log(info);

      const {
        sec_num,
        videonum,
        studnum,
        qa_title,
        video_stop_time,
        qa_content,
      } = info;

      const query = `Insert into question (
        sec_num,video_num, stud_num,video_stop_time, qa_send_time, qa_title,qa_content
      ) values (?,?,?,?,NOW(),?,?)`;

      const [{ affectedRows: result }] = await conn.query(query, [
        sec_num,
        videonum,
        studnum,
        video_stop_time,
        qa_title,
        qa_content,
      ]);
      conn.release();
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  getMyClassList: async (num) => {
    try {
      const conn = await pool.getConnection();

      const query = `select course.course_num, course.course_name, 
        course_info.start_date, course_info.prog_rate 
        from course_info
        inner join course
        on course.course_num = course_info.course_num 
        where course_info.stud_num = ?`;

      const [result] = await conn.query(query, [num]);
      conn.release();
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  getClassVideoList: async (classNum) => {
    try {
      const conn = await pool.getConnection();

      const query = `select * from course 
        inner join video on video.course_num = course.course_num
        where video.course_num = ?`;

      const [result] = await conn.query(query, [classNum]);
      conn.release();
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  getSectionFaqList: async (num) => {
    try {
      const conn = await pool.getConnection();

      const query = `select * from question
        where sec_num = ?`;

      const [result] = await conn.query(query, [num]);
      conn.release();
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  postProblem: async (info) => {
    console.log("problem 정보", info);
    try {
      const conn = await pool.getConnection();
      console.log(info);

      const { type, comment, video_num } = info;

      const query = `INSERT INTO problem (video_num, type, comment) VALUES (?, ?, ?)`;

      const [result] = await conn.query(query, [video_num, type, comment]);
      conn.release();
      return result.affectedRows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
