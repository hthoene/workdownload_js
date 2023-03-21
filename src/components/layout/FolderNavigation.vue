<template>
  <div class="full-width">
    <div class="row full-width wrapping" id="folder-path-holder">
      <div class="row" v-for="p in paths" :key="p.fullPath">
        <PathButton
          :folderName="p.folderName"
          :fullPath="p.fullPath"
          @folderClick="openPathM"
        >
        </PathButton>
        <p>/</p>
      </div>
    </div>
  </div>
</template>

<script>
import PathButton from "./PathButton.vue";

export default {
  components: { PathButton },
  props: ["currentFolder"],
  data() {
    return {
      folders: [],
    };
  },
  emits: ["openPath"],
  methods: {
    openPathM(newPath) {
      console.log("opening path:");
      console.log(newPath);
      this.$emit("openPath", newPath);
    },
  },
  computed: {
    paths() {
      console.log("CURRENT FOLDER");
      console.log(this.currentFolder);

      var slicedPaths = this.currentFolder.split("/").filter((path) => {
        return path != "";
      });

      var result = [];

      result.push({ folderName: "Uploads", fullPath: "" });

      for (let i = 0; i < slicedPaths.length + 1; i++) {
        var fullPath = "";
        var lastName = "";
        for (let j = 0; j < i; j++) {
          fullPath += slicedPaths[j] + "/";
          lastName = slicedPaths[j];
        }
        result.push({ folderName: lastName, fullPath: fullPath });
      }

      return result.filter((e) => e.folderName != "");
    },
  },
};
</script>

<style scoped>
.wrapping {
  flex-wrap: wrap;
}
</style>
