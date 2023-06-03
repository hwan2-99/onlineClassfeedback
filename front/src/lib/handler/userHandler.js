import User from "../api/userApi";

const SUCCESS = 200;
const FAIL = 500;

const userHandler = {
  signUp: async (user) => {
    try {
      let apiResult = await User.signUp(user);

      const result = apiResult;

      if (result.status === SUCCESS) {
        return result;
      }
    } catch (error) {
      console.log("SignUp Fail");

      return false;
    }
  },

  login: async (user) => {
    try {
      let apiResult = await User.login(user);

      const body = await apiResult.json();

      console.log(body);
      //로그인 로직 처리
      if (body.status === SUCCESS) {
        return { status: body.status, data: body.data };
      } else {
        return false;
      }
    } catch (error) {
      console.log("Login Fail");
      return false;
    }
  },

  logout: () => {},
};

export default userHandler;
