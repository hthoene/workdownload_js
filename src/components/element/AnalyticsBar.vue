<template>
  <div class="analytics-bar full-width column" v-if="showBar">
    <div class="analytics-holder column">
      <h3>We use Google Analytics</h3>
      <p>
        We use <a href="https://analytics.google.com/">Google Analytics</a> to
        improve the website. Data is anonym and wont be shared.
      </p>
      <div class="spacer-m"></div>
      <div class="row full-width button-holder">
        <CustomButton mode="cancel" @click="disableCookies"
          ><span>Reject</span></CustomButton
        >
        <div class="spacer-m"></div>
        <CustomButton mode="default" @click="enableCookies"
          ><span>Accept</span></CustomButton
        >
      </div>
    </div>
  </div>
</template>

<script>
import CustomButton from "../layout/CustomButton.vue";

export default {
  data() {
    return {
      enableAnalytics: false,
      showBar: false,
    };
  },
  mounted() {},
  computed: {
    path() {
      return this.$route.path;
    },
  },
  watch: {
    path(value) {
      console.log("CURRENT ROUTE: " + value);

      let showOn = [
        "/dashboard",
        "/files",
        "/edit",
        "/manage",
        "/email",
        "/create",
      ];

      let analytics = localStorage.getItem("enableAnalytics");

      if (
        showOn.includes(value) &&
        !(analytics == "true" || analytics == "false")
      ) {
        this.showBar = true;
      } else {
        this.showBar = false;
      }
    },
  },
  methods: {
    enableCookies() {
      this.$gtag.optIn();
      localStorage.setItem("enableAnalytics", "true");
      this.showBar = false;
    },
    disableCookies() {
      this.$gtag.optOut();
      localStorage.setItem("enableAnalytics", "false");
      this.showBar = false;
    },
  },
  components: { CustomButton },
};
</script>

<style scoped>
.analytics-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 1rem 20% 1rem 20%;
  align-items: center;
}

.analytics-holder {
  padding: 1rem;
  border-radius: 0.4rem;
  background-color: rgb(255, 255, 255);
  width: fit-content;
  box-shadow: 0 0 3px 3px rgba(59, 59, 59, 0.11);
  justify-content: center;
  align-items: center;
}

.button-holder {
  align-items: center;
  justify-content: center;
}

@media only screen and (max-width: 600px) {
  .analytics-bar {
    padding: 1rem 2rem 1rem 2rem;
  }
}
</style>
