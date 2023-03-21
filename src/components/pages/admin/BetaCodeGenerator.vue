<template>
  <div class="column beta-code-home full-width">
    <h3>Beta Code Generator</h3>
    <div class="spacer-s"></div>
    <LoadingIndicator v-if="loading"></LoadingIndicator>
    <CustomButton v-else mode="default" @click="generateBetaCode">
      <span>Generate New</span>
    </CustomButton>
    <div class="spacer-s"></div>
    <div
      class="code-holder pointer"
      v-if="currentCode != ''"
      @click="copyToClipboard"
    >
      <LoadingIndicator v-if="loading"></LoadingIndicator>
      <span v-else class="code-text">{{ currentCode }}</span>
    </div>
  </div>
</template>

<script>
import LoadingIndicator from "@/components/element/LoadingIndicator.vue";
import CustomButton from "@/components/layout/CustomButton.vue";

export default {
  components: { CustomButton, LoadingIndicator },
  data() {
    return {
      currentCode: "",
      loading: false,
    };
  },
  methods: {
    generateBetaCode() {
      this.loading = true;
      this.$store
        .dispatch("post", {
          url: "api/v1/betacode/new",
          auth: true,
          body: null,
        })
        .then((resp) => {
          this.currentCode = resp.message;
          this.copyToClipboard();
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    copyToClipboard() {
      navigator.clipboard.writeText(this.currentCode);
    },
  },
};
</script>

<style scoped>
.beta-code-home {
  justify-content: flex-start;
  align-items: center;
}

.code-holder {
  color: rgb(51, 51, 53);
  font-weight: 600;
  padding: 1rem 2rem 1rem 2rem;
  border-radius: 0.4rem;
  outline-style: solid;
  outline-color: rgb(194, 194, 194);
  outline-width: 1px;
  transition: all 0.1s;
}

.code-holder:hover {
  transform: scale(1.01);
}

.code-holder:active {
  transform: scale(1.05);
}

.code-text {
  letter-spacing: 1ch;
}
</style>
