import studApi from "../api/studApi";

const SUCCESS = 200;

const studHandler = {
  studClassRegister: async (info) => {
    try {
      let apiResult = await studApi.classRegister(info);

      const result = apiResult;

      if (result.status === SUCCESS) {
        return result;
      }
    } catch (error) {
      console.log("register Fail");

      return false;
    }
  },

  getMyClassList: async (num) => {
    try {
      let apiResult = await studApi.studClassList(num);
      const listResult = await apiResult.json();

      if (listResult.status === SUCCESS) {
        return listResult.data;
      }
    } catch (error) {
      console.log("getlist Fail");
      return false;
    }
  },

  getClassVideoList: async (num) => {
    try {
      let apiResult = await studApi.videoList(num);
      const listResult = await apiResult.json();

      if (listResult.status === SUCCESS) {
        return listResult.data;
      }
    } catch (error) {
      console.log("getlist Fail");
      return false;
    }
  },

  getVideoSecList: async (num) => {
    try {
      let apiResult = await studApi.getVideoSec(num);
      const listResult = await apiResult.json();

      if (listResult.status === SUCCESS) {
        return listResult.data;
      }
    } catch (error) {
      console.log("getlist Fail");
      return false;
    }
  },

  getSecFAQList: async (tagnum) => {
    try {
      let apiResult = await studApi.getSecFAQ(tagnum);
      const listResult = await apiResult.json();

      if (listResult.status === SUCCESS) {
        return listResult.data;
      }
    } catch (error) {
      console.log("getlist Fail");
      return false;
    }
  },

  postQAStud: async (info) => {
    try {
      let apiResult = await studApi.postQA(info);

      const result = apiResult;

      if (result.status === SUCCESS) {
        return result;
      }
    } catch (error) {
      console.log("qa add Fail");

      return false;
    }
  },

  postProblem: async (info) => {
    try {
      let apiResult = await studApi.postProblem(info);

      const result = apiResult;

      if (result.status === SUCCESS) {
        return result;
      }
    } catch (error) {
      console.log("qa add Fail");

      return false;
    }
  },

  postProblem: async (type, comment, video_num) => {
    console.log("핸들러 확인");
    try {
      let apiResult = await studApi.postProblem(type, comment, video_num);
      console.log(video_num);

      const result = apiResult;

      if (result.status === SUCCESS) {
        return result;
      }
    } catch (error) {
      console.log("problem add Fail");

      return false;
    }
  },
};

export default studHandler;
