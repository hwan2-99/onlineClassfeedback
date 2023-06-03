const CREATE_API = "http://localhost:3000/";

const studApi = {
  classRegister: (info) => {
    return fetch(CREATE_API + "stud/register", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(info),
    });
  },

  studClassList: (num) => {
    console.log(num);
    return fetch(CREATE_API + "stud/class/" + num, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  videoList: (classnum) => {
    return fetch(CREATE_API + "stud/video/list/" + classnum, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  getVideoSec: (num) => {
    return fetch(CREATE_API + "stud/video/section/" + num, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  getSecFAQ: (secnum) => {
    return fetch(CREATE_API + "stud/faq/" + secnum, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  postQA: (info) => {
    return fetch(CREATE_API + "stud/qa", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(info),
    });
  },

  postProblem: async (info, video_num) => {
    try {
      const response = await fetch(
        CREATE_API + "problem?video_num=" + video_num,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(info),
        }
      );

      const result = await response.json();

      if (response.ok) {
        return result;
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.log("문제 등록 실패:", error.message);
      return false;
    }
  },
};
export default studApi;
