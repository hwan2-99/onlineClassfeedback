const pool = require("../../config/dbConfig");

module.exports = {
  insertUser: async (userInfo) => {
    try {
      console.log("회원가입 정보 :", userInfo);
      const conn = await pool.getConnection();

      const { name, email, password, phoneNum, isProf } = userInfo;

      const query =
        isProf === true
          ? `Insert into professor (
        prof_name,password, p_num, prof_email
      ) values (?,?,?,?)`
          : `Insert into student (
        stud_name, stud_password, stud_phone , stud_email
      ) values (?,?,?,?)`;

      const [{ affectedRows: result }] = await conn.query(query, [
        name,
        password,
        phoneNum,
        email,
      ]);
      return result;
    } catch (error) {
      return error;
    }
  },

  loginUser: async (loginInfo) => {
    try {
      console.log("로그인 정보 :", loginInfo);
      const conn = await pool.getConnection();

      const { username, password, isProf = false } = loginInfo;
      console.log(loginInfo);
      const query =
        isProf === true
          ? `Select * from professor where prof_email = ? and password = ?`
          : `Select * from student where stud_email = ? and stud_password = ?`;

      const [[result]] = await conn.query(query, [username, password]);

      return result;
    } catch (error) {
      return error;
    }
  },
};
