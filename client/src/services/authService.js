import axios from "axios";

class authService {
  signin(credentials, callback) {
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/login`, credentials)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // store it
          //*remove localStorage in the future* store in memory\
          console.log(response.headers);
          localStorage.setItem("token", response.headers["x-auth-token"]);
          callback(null);
        }
      })
      .catch((error) => {
        console.log(error);
        callback(error.response);
      });
  }

  register(registrationData, callback) {
    axios
      .post(`${process.env.REACT_APP_API_URL}/users/register`, registrationData)
      .then((response) => {
        if (response.status === 200) {
          // store it
          //*remove localStorage in the future* store in
          const token = response.headers["x-auth-token"];
          localStorage.setItem("token", token);
          console.log(token);
          console.log(response.headers);
          callback(null);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  isAuthenticated() {
    return localStorage.getItem("token") !== null;

    //when the user logs in show "welcome" with there name and a drop down

    //else show the login and register link if the user in not logged in
  }

  signout() {
    localStorage.removeItem("token");
  
  }
  getToken() {
    return localStorage.getItem("token");
  }
}

export default new authService();
