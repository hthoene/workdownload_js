<template>
  <div class="full-width full-height notification-container">
    <div class="notifictaion"><h1>Test</h1></div>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style scoped>
.notification-container {
  position: absolute;
  pointer-events: none;
}

.notifictaion {
  display: none;
  pointer-events: all;
  background-color: rgb(238, 113, 113);
  border-radius: 0.4rem;
  width: 15rem;
  height: 5rem;
  position: absolute;
  top: 9rem;
  right: 10rem;
  z-index: 99999999;
}
</style>
