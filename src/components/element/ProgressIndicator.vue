<template>
  <div class="full-width column progress-container">
    <p class="label">{{ label }}</p>
    <div class="spacer-xs"></div>
    <div class="full-width progress-holder">
      <div id="progress"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["progress", "total"],
  mounted() {
    document.getElementById("progress").style.width = this.width;
  },
  computed: {
    width() {
      if (this.progress < 0.001) {
        return "0.001%";
      } else if (this.progress > 100) {
        return "100%";
      }
      console.log(this.progress + "%");
      return this.progress + "%";
    },
    label() {
      return "Storage used (Total: " + this.total + ")";
    },
  },
};
</script>

<style scoped>
.progress-container {
  align-items: flex-start;
}

.progress-holder {
  background-color: rgb(240, 240, 240);
  height: 1rem;
  border-radius: 5rem;
  overflow: hidden;
}

#progress {
  background-color: rgb(109, 192, 141);
  height: 100%;
}
</style>
