import config from "../_helpers/config";

const deliveryModule = {
  state() {
    return {
      delivery: {},
      creatingDelivery: {},
    };
  },

  mutations: {
    clearCreatingDelivery(state) {
      state.creatingDelivery = {};
    },
    setDelivery(state, newDelivery) {
      state.delivery = newDelivery;
    },
    setCreatingDeliveryProperty(state, payload) {
      state.creatingDelivery[payload.property] = payload.value;
    },
  },
  actions: {
    clearCreating() {
      this.commit("clearCreatingDelivery");
    },
    setCreatingProperty(_, payload) {
      this.commit("setCreatingDeliveryProperty", {
        property: payload.property,
        value: payload.value,
      });
    },
    init(state) {
      var localStorageDelivery = JSON.parse(localStorage.getItem("delivery"));

      if (localStorageDelivery != null) {
        this.commit("setDelivery", localStorageDelivery);
        state.delivery = localStorageDelivery;
      }
    },
    setDelivery(_, delivery) {
      this.commit("setDelivery", delivery);
      localStorage.setItem("delivery", JSON.stringify(delivery));
    },
    postRaw(_, payload) {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload.body),
      };

      return fetch(config.api_url + payload.url, requestOptions)
        .then((response) => {
          return response.text().then((text) => {
            if (!response.ok) {
              return Promise.reject(text);
            }

            return text;
          });
        })
        .then((result) => {
          return result;
        });
    },
    post(_, payload) {
      var headers = {
        "Content-Type": "application/json",
      };

      if (payload.auth) {
        headers = {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("user"),
        };
      }

      const requestOptions = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload.body),
      };

      return fetch(config.api_url + payload.url, requestOptions)
        .then((response) => {
          return response.text().then((text) => {
            const data = text && JSON.parse(text);
            if (!response.ok) {
              return Promise.reject(text);
            }

            return data;
          });
        })
        .then((result) => {
          return result;
        });
    },
  },
};

export default deliveryModule;
