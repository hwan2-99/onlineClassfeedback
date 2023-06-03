const userInitialState = {
  isProf: false,
  num: "",
  email: "",
  name: "",
  isLogIn: false,
};

const userReducer = (state = userInitialState, action) => {
  if (action.type === "login") {
    console.log("reducer 로 넘어오는 정보", action.info);
    const info = action.info;
    if (info.isProf) {
      return {
        isLogIn: true,
        isProf: info.isProf,
        num: info.prof_num,
        email: info.prof_email,
        name: info.prof_name,
      };
    } else {
      return {
        isLogIn: true,
        isProf: info.isProf,
        num: info.stud_num,
        email: info.stud_email,
        name: info.stud_name,
      };
    }
  }

  if (action.type === "logout") {
    return userInitialState;
  }

  return state;
};

export default userReducer;
