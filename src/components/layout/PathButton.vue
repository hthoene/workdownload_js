<template>
  <CustomButton @click="onPathClick" mode="path"
    ><span>{{ folderName }}</span></CustomButton
  >
</template>

<script>
import CustomButton from "./CustomButton.vue";

export default {
  components: { CustomButton },
  props: ["folderName", "fullPath"],
  emits: ["folderClick"],
  methods: {
    onPathClick() {
      console.log("ON PATH CLICK");
      this.$emit("folderClick", this.fullPath);
    },
  },
};
</script>

<style scoped>
span {
  color: #777777;
  font-size: 0.98rem;
}

span:hover {
  color: #696969;
}
</style>
