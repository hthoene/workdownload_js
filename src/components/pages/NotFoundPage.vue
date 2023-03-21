<template>
  <div class="full-width full-height column not-found-site">
    <h1>RESOURCE NOT FOUND</h1>
    <div class="spacer-m"></div>
    <p>Sorry, we could not find any resource on this path.</p>
    <p>Please make sure the url is correct or try again later.</p>
    <div class="spacer-l"></div>
    <div id="homebutton">
      <CustomButton mode="default" @click="goHome"
        ><span>Home</span></CustomButton
      >
    </div>
  </div>
</template>

<script>
import CustomButton from "../layout/CustomButton.vue";

export default {
  components: { CustomButton },
  methods: {
    goHome() {
      this.$router.replace("/");
    },
  },
};
</script>

<style scoped>
#homebutton {
  width: fit-content;
  align-self: center;
}

@media only screen and (max-width: 600px) {
  .not-found-site {
    min-height: 50vh;
    justify-content: center;
    align-items: center;
    padding: 2rem;
  }
}
</style>
