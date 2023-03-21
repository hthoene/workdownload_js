<template>
  <div class="spacer-l"></div>
  <span class="label">Share this url with your client</span>
  <div class="spacer-xs"></div>
  <div class="full-width row generation-holder">
    <div class="url-share row center pointer" @click="copyToClipboard">
      <span>{{ fullUrl }}</span>
      <div class="spacer-xs hide-mobile"></div>
      <img src="../../assets/copy.svg" class="icon-s hide-mobile" />
    </div>
    <div class="spacer-m"></div>
    <div v-if="loading" class="shrink">
      <LoadingIndicator> </LoadingIndicator>
    </div>

    <CustomButton v-else mode="default" @click="generateNew"
      ><span>New</span></CustomButton
    >
  </div>
  <div class="spacer-m"></div>

  <div class="full-width">
    <div class="spacer-s"></div>
  </div>
</template>

<script>
import CustomButton from "../layout/CustomButton.vue";
import config from "../../_helpers/config";
import LoadingIndicator from "../element/LoadingIndicator.vue";

export default {
  components: {
    CustomButton,
    LoadingIndicator,
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    generateNew() {
      this.loading = true;
      this.$store
        .dispatch("post", {
          url: "api/v1/delivery/generateNewUrlName/" + this.delivery.id,
          auth: true,
          body: {},
        })
        .then((message) => {
          var delivery = this.delivery;
          delivery.urlName = message.message;
          this.$store.dispatch("setDelivery", delivery);
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.fullUrl);
    },
    goBack() {
      this.$router.replace("/manage");
    },
  },
  computed: {
    delivery() {
      return this.$store.state.delivery.delivery;
    },
    fullUrl() {
      return config.frontend_url + this.delivery.urlName;
    },
  },
};
</script>

<style scoped>
.generation-holder {
  align-items: flex-end;
}

.url-share {
  padding: 0.4rem 0.8rem;
  background-color: rgb(243, 243, 243);
  color: rgb(98, 98, 102);
  border-radius: 0.2rem;
  transition: all 0.1s;
  height: 3rem;
  width: 100%;
}

.url-share:hover {
  transform: scale(1.03);
}

.url-share:active {
  transform: scale(1.08);
}

.url-share:hover {
  background-color: rgb(230, 228, 228);
}

.url-share img {
  transition: all 0.1s;
  cursor: pointer;
}

.url-share img:hover {
  transform: scale(1.2);
}

.url-share img:active {
  transform: scale(1.4);
}

@media only screen and (max-width: 600px) {
  .generation-holder {
    flex-direction: column;
    align-items: stretch;
  }
  .hide-mobile {
    display: none;
  }
}
</style>
