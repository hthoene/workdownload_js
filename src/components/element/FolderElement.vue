<template>
  <div class="full-width full-height pointer" @click="openFolder">
    <div
      class="file-element full-width row space-between all-container"
      @click="hideMenu"
    >
      <div class="row center full-width">
        <div class="file-type-circle column center">
          <img src="../../assets/folder.svg" class="icon-m" />
        </div>

        <div class="spacer-m"></div>
        <span class="file-name">{{ folder.folderName }}</span>
        <div v-if="downloadMode" class="file-actions pointer">
          <div v-if="showDownload" class="clicker" @click.stop="downloadFile">
            <img
              src="../../assets/download.svg"
              @click="downloadFolder"
              class="icon-s"
            />
          </div>
        </div>
        <div v-else class="file-actions">
          <div class="clicker pointer" @click.stop="showMenu">
            <img src="../../assets/dots.svg" class="icon-m" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["folder"],
  emits: ["openFolder", "onFolderMenu", "downloadThisFolder"],
  data() {
    return {
      menu: false,
    };
  },
  computed: {
    showDownload() {
      console.log("ELEMENTS: " + this.elements);
      return this.elements > 0;
    },
    elements() {
      return this.folder.folderElements;
    },
    downloadMode() {
      if (this.$route.path == "/files") return false;
      return this.$store.state.delivery.delivery.downloadMode;
    },
  },
  components: {},
  methods: {
    openFolder() {
      this.$emit("openFolder", this.folder.folderName);
    },
    downloadFolder() {
      this.$emit("downloadThisFolder", this.folder);
    },
    showMenu(event) {
      this.menu = true;
      this.$emit("onFolderMenu", { event, folder: this.folder });
    },
    hideMenu() {
      this.menu = false;
    },

    refresh() {
      this.$emit("refresh");
    },
  },
};
</script>

<style scoped>
.file-action-menu {
  z-index: 99999999;
  position: absolute;
  right: 0;
  top: 0;
  background-color: white;
  border-style: solid;
  border-width: 1px;
  border-color: #e7e7e7;
  border-radius: 0.4rem;
  width: 10rem;
  height: fit-content;
  display: flex;
  flex-direction: column;
}

.menu-button {
  cursor: pointer;
  width: 100%;
  border-style: solid;
  border-width: 1px;
  border-color: #e7e7e7;
  border-bottom: 1px;
  padding: 0.2rem;
}

.menu-button:hover {
  background-color: rgb(243, 243, 243);
}

.file-type-circle {
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  justify-content: center;
}

.file-element {
  border-style: solid;
  border-width: 1px;
  border-color: rgb(223, 223, 223);
  height: 3rem;
  border-radius: 0.4rem;
  background-color: white;
  padding: 0 1rem;
  position: relative;
}

.file-element:hover {
  background-color: #f5f5f5;
}

.file-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 2rem;
  align-self: center;
  flex: auto;
  justify-content: flex-end;
}

.clicker {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 10rem;
}

.clicker:hover {
  background-color: #e7e7e7;
}

.file-name {
  font-weight: 500;
  font-size: 0.9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: start;
  white-space: nowrap;
  width: 75%;
}

.all-container {
  overflow-x: hidden;
  width: 100%;
}
</style>
