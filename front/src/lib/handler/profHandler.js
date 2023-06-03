import prof from "../api/profApi";

const SUCCESS = 200;
const FAIL = 500;

const profHandler = {
  postSectionToVideo: async (Info) => {
    try {
      let apiResult = await prof.postVideoSection(Info);

      const result = apiResult;

      return result;
    } catch (error) {
      console.log("Fail");
      console.log(error);

      return false;
    }
  },
  classPost: async (Info) => {
    try {
      let apiResult = await prof.classOpen(Info);

      const result = apiResult;

      return result;
    } catch (error) {
      console.log("Fail");
      console.log(error);

      return false;
    }
  },

  getClassInfo: async (classnum) => {
    try {
      let apiResult = await prof.getMyClassInfo(classnum);
      const result = await apiResult.json();

      if (result.status === 200) {
        return result.data;
      }
    } catch (error) {
      console.log(error);
    }
  },

  getClassList: async (num) => {
    try {
      let apiResult = await prof.getMyClassList(num);
      const result = await apiResult.json();
      console.log(result);

      if (result.status === 200) {
        return result.data;
      }
    } catch (error) {
      console.log(error);
    }
  },

  getRegisterableClass: async () => {
    try {
      let apiResult = await prof.getAllClassList();
      const result = await apiResult.json();
      console.log(result);

      if (result.status === 200) {
        return result.data;
      }
    } catch (error) {
      console.log(error);
    }
  },

  getMyVideoList: async (classnum) => {
    try {
      let apiResult = await prof.getClassVideoList(classnum);
      const result = await apiResult.json();
      console.log(result);

      if (result.status === 200) {
        return result.data;
      }
    } catch (error) {
      console.log(error);
    }
  },

  getSectionQAList: async (sec_num) => {
    try {
      let apiResult = await prof.getSectionQAList(sec_num);
      const result = await apiResult.json();

      if (result.status === SUCCESS) {
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  },

  postVideo: async (data) => {
    try {
      let apiResult = await prof.postVideoInClass(data);
      const result = await apiResult.json();

      if (result.status === SUCCESS) {
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  },

  postVideoInfo: async (data) => {
    console.log(data);
    try {
      let apiResult = await prof.postVideoInfo(data);
      const result = await apiResult.json();

      if (result.status === 200) {
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  },

  postQAAnswer: async (data) => {
    try {
      let apiResult = await prof.updateQAAnswer(data);
      const result = await apiResult.json();

      if (result.status === 200) {
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default profHandler;
