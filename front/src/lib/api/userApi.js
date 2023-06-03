const CREATE_API = "http://localhost:5000/";

const user = {
  signUp: (user) => {
    return fetch(CREATE_API + "user/signup", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
  },

  login: (info) => {
    return fetch(CREATE_API + "user/login", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(info),
    });
  },

  logout: (user) => {},
};

export default user;
