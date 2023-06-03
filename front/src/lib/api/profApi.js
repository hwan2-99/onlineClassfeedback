const CREATE_API = "http://localhost:5000/";

const prof = {
  classOpen: (Info) => {
    return fetch(CREATE_API + "prof/class", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(Info),
    });
  },

  getMyClassList: (num) => {
    return fetch(`${CREATE_API}prof/class/list/${num}`, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  getMyClassInfo: (classnum) => {
    return fetch(`${CREATE_API}prof/class/${classnum}`, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  getAllClassList: () => {
    return fetch(CREATE_API + "prof/classlist", {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  getClassVideoList: (classnum) => {
    return fetch(CREATE_API + "prof/video/list/" + classnum, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  getSectionQAList: (sec_num) => {
    return fetch(CREATE_API + "prof/qa/list/" + sec_num, {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    });
  },

  postVideoInClass: (video) => {
    return fetch(CREATE_API + "prof/upload/video", {
      method: "post",
      // headers: {
      //   "Content-type": "multipart/form-data",
      // },
      //video == form data 형식
      body: video,
    });
  },

  postVideoInfo: function (info) {
    return fetch(CREATE_API + "prof/video/info", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(info),
    });
  },

  postVideoSection: function (info) {
    return fetch(CREATE_API + "prof/video/section", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(info),
    });
  },

  updateQAAnswer: function (info) {
    return fetch(CREATE_API + "prof/section/update", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(info),
    });
  },
};

export default prof;
