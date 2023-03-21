import config from "../_helpers/config";

const authModule = {
  state() {
    return {
      userData: null,
    };
  },
  mutations: {
    setUserData(state, value) {
      state.userData = value;
    },
  },
  actions: {
    updateUserData(_, value) {
      this.commit("setUserData", value);
    },
    checkLogin(state) {
      if (state.userData == null) {
        this.dispatch("login", null);
      }
    },
    logout() {
      localStorage.removeItem("user");
      this.commit("setUserData", null);
    },
    login(state, payload) {
      var headers = {};

      if (payload == null) {
        headers = {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("user"),
        };
      } else {
        var username = payload.email;
        var password = payload.password;
        headers = {
          "Content-Type": "application/json",
          Authorization: "Basic " + window.btoa(username + ":" + password),
        };
      }

      const requestOptions = {
        method: "POST",
        headers: headers,
        body: null,
      };

      return fetch(config.api_url + `api/v1/login`, requestOptions)
        .then((response) => {
          return response.text().then((text) => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
              if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                //location.reload(true);
              }

              return Promise.reject("Wrong Login data");
            }

            return data;
          });
        })
        .then((user) => {
          // login successful if there's a user in the response
          if (user) {
            // store user details and basic auth credentials in local storage
            // to keep user logged in between page refreshes

            this.commit("setUserData", user);
            state.userData = user;

            if (payload != null) {
              localStorage.setItem(
                "user",
                "Basic " + window.btoa(username + ":" + password)
              );
            }
          }

          return user;
        });
    },
  },
};

export default authModule;
