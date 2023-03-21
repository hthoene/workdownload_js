<template>
  <div class="full-width full-height">
    <div id="folder-navigation" class="full-width row">
      <FolderNavigation
        :currentFolder="currentFolder"
        @openPath="openPath"
      ></FolderNavigation>
    </div>
    <div class="spacer-xs"></div>
    <div
      id="navigation-holder"
      class="full-width"
      v-if="fileList.length > 0 || folderList.length > 0"
    >
      <LoadingIndicator v-if="loading"></LoadingIndicator>
      <div class="full-width file-folder-holder" v-else>
        <FolderElement
          v-for="f in folders"
          :key="f.localPath"
          :folder="f"
          class="file-navigation-element"
          @openFolder="openFolder"
          @onFolderMenu="onFolderMenu"
          @downloadThisFolder="downloadThisFolder"
        ></FolderElement>
        <FileElement
          v-for="f in files"
          :key="f.localPath"
          :file="f"
          class="file-navigation-element"
          @refresh="refresh"
          @onMenu="onMenu"
          @downloadThis="downloadThis"
        ></FileElement>
      </div>
    </div>
    <div v-else class="full-width">
      <div class="full-width" id="empty-container" v-if="!loading">
        <div class="spacer-s"></div>
        <img src="../../assets/empty-box.svg" class="icon-xxl" />
        <p>There are no files yet</p>
        <div class="spacer-s"></div>
      </div>
      <LoadingIndicator v-else></LoadingIndicator>
    </div>
  </div>
  <Teleport to="body">
    <div class="download-background" v-if="downloading">
      <DefaultCard>
        <template #title>
          <h1>Downloading</h1>
        </template>
        <template #default>
          <div class="download-center">
            <div><LoadingIndicator></LoadingIndicator></div>
            <div class="spacer-xs"></div>
            <p>Please wait, larger files may take a while.</p>
          </div>
        </template>
      </DefaultCard>
    </div>
    <div
      @click="onBackgroundClick"
      id="backgroundClickDetector"
      v-if="detectBackground"
    ></div>
    <div
      class="column file-menu-container"
      id="fileMenuBox"
      ref="fileMenuBox"
      v-show="showMenuFile"
    >
      <div v-if="menuFile" class="file-menu column">
        <span @click="openRenamePopup">Rename</span>
        <span @click="downloadFile">Download</span>
        <span @click="deleteFile">Delete</span>
      </div>
      <div v-else class="file-menu column">
        <span @click="openRenamePopup">Rename</span>
        <span @click="downloadFolder">Download</span>
        <span @click="deleteFolder">Delete</span>
      </div>
    </div>
    <div
      class="column"
      id="renamePopup"
      v-if="showRenamePopup"
      @click.stop="closeRename"
    >
      <DefaultCard @click.stop>
        <template #title><h1>Rename</h1></template>
        <template #default>
          <div class="full-width full-height" @click.stop>
            <div class="full-width" v-if="renameError != ''">
              <span class="error">{{ renameError }}</span>
              <div class="spacer-l"></div>
            </div>
            <div class="full-width" v-if="menuFile">
              <CustomInput
                mode="default"
                label="File name"
                placeholder="Enter file name"
                v-model="renameTo"
                :default="menuFile.fileName"
                @click.stop
              >
              </CustomInput>
            </div>
            <div class="full-width" v-else>
              <CustomInput
                mode="default"
                label="Folder name"
                placeholder="Enter folder name"
                v-model="renameTo"
                :default="menuFolder.folderName"
                @click.stop
              >
              </CustomInput>
            </div>

            <div class="spacer-l"></div>
            <div v-if="loadRename" class="full-width">
              <LoadingIndicator></LoadingIndicator>
            </div>

            <CustomButton v-else @click.stop="renameFile" mode="default"
              ><span>Rename</span></CustomButton
            >
            <div class="spacer-s"></div>
            <CustomButton mode="cancel" @click.stop="closeRename"
              ><span>Cancel</span></CustomButton
            >
          </div>
        </template>
      </DefaultCard>
    </div>
  </Teleport>

  <Teleport to="body"> </Teleport>
</template>

<script>
import FileElement from "../element/FileElement.vue";
import FolderElement from "../element/FolderElement.vue";
import LoadingIndicator from "../element/LoadingIndicator.vue";
import FolderNavigation from "./FolderNavigation.vue";
import config from "../../_helpers/config";
import CustomInput from "../element/CustomInput.vue";
import CustomButton from "./CustomButton.vue";
import DefaultCard from "./DefaultCard.vue";

export default {
  props: ["currentFolder"],

  data() {
    return {
      fileList: [],
      folderList: [],
      loadingFiles: true,
      loadingFolders: true,
      menuFile: null,
      menuFolder: null,
      renamePopup: false,
      renameTo: "",
      renameError: "",
      detectBackground: false,
      loadRename: false,
      downloading: false,
    };
  },

  computed: {
    delivery() {
      return this.$store.state.delivery.delivery;
    },
    files() {
      return this.fileList;
    },
    folders() {
      return this.folderList;
    },
    loading() {
      return this.loadingFiles || this.loadingFolders;
    },
    showMenuFile() {
      return (
        (this.menuFile != null || this.menuFolder != null) && !this.downloading
      );
    },
    showRenamePopup() {
      return this.renamePopup;
    },
  },
  methods: {
    onBackgroundClick() {
      if (this.downloading) return;
      this.detectBackground = false;
      this.menuFile = null;
      this.menuFolder = null;
    },
    onMenu(payload) {
      this.detectBackground = true;
      this.menuFile = payload.file;
      document.getElementById("fileMenuBox").style.left =
        payload.event.pageX + "px";
      document.getElementById("fileMenuBox").style.top =
        payload.event.pageY + "px";
    },
    onFolderMenu(payload) {
      this.detectBackground = true;
      this.menuFolder = payload.folder;
      document.getElementById("fileMenuBox").style.left =
        payload.event.pageX + "px";
      document.getElementById("fileMenuBox").style.top =
        payload.event.pageY + "px";
    },
    refresh() {
      this.openPath(this.currentFolder);
    },
    openPath(fullPath) {
      console.log("Opening full path: " + fullPath);
      this.$emit("openPath", fullPath);
    },
    openFolder(folderName) {
      this.openPath(this.currentFolder + folderName + "/");
      this.fileViewKey = this.fileViewKey + 1;
    },
    loadFilesAndFolders() {
      this.$store
        .dispatch("post", {
          url: "api/v1/file/show/files",
          body: {
            deliveryId: this.delivery.id,
            password: this.delivery.password,
            localPath: this.currentFolder,
          },
          auth: false,
        })
        .then((response) => {
          this.fileList = response;
          this.fileViewKey = this.fileViewKey + 1;
          this.$forceUpdate();
          this.loadingFiles = false;
        })
        .catch(() => {
          this.refresh();
        });

      this.$store
        .dispatch("post", {
          url: "api/v1/file/show/folders",
          body: {
            deliveryId: this.delivery.id,
            password: this.delivery.password,
            localPath: this.currentFolder,
          },
        })
        .then((response) => {
          this.folderList = response;
          this.fileViewKey = this.fileViewKey + 1;
          this.$forceUpdate();
          this.loadingFolders = false;
        })
        .catch(() => {
          this.refresh();
        });
    },
    deleteFile() {
      let deleteFile = this.menuFile;
      this.menuFile = null;
      this.detectBackground = false;
      this.$store
        .dispatch("post", {
          url: "api/v1/file/delete",
          body: {
            deliveryId: this.delivery.id,
            localPath: deleteFile.localPath,
            password: "",
          },
          auth: true,
        })
        .then(() => {
          this.refresh();
        });
    },
    deleteFolder() {
      let deleteFile = this.menuFolder;

      console.log("Deleting folder: " + deleteFile.localPath);

      this.menuFolder = null;
      this.detectBackground = false;
      this.$store
        .dispatch("post", {
          url: "api/v1/file/deleteFolder",
          body: {
            deliveryId: this.delivery.id,
            localPath: deleteFile.localPath,
            password: "",
          },
          auth: true,
        })
        .then(() => {
          this.refresh();
        });
    },
    downloadThis(file) {
      this.menuFile = file;
      this.downloadFile();
    },
    downloadThisFolder(folder) {
      console.log("DOWNLOADING FOLDER:");
      console.log(folder);

      this.menuFolder = folder;
      this.downloadFolder();
    },
    downloadFile() {
      this.downloading = true;
      var body = {
        deliveryId: this.delivery.id,
        password: this.delivery.password,
        localPath: this.menuFile.localPath,
      };

      fetch(config.api_url + "api/v1/file/download", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      })
        .then((resp) => {
          console.log("RESPONSE FROM DOWNLOAD");
          return resp.blob();
        })
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          // the filename you want
          let fileName = this.menuFile.fileName;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url); // or you know, something with better UX...
          this.downloading = false;
        })
        .catch((err) => {
          console.log("ERROR WHILE DOWNLOADING");
          console.log(err);
          this.downloading = false;
        });
    },
    downloadFolder() {
      this.downloading = true;
      var body = {
        deliveryId: this.delivery.id,
        password: this.delivery.password,
        localPath: this.menuFolder.localPath,
      };

      fetch(config.api_url + "api/v1/file/downloadFolder", {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
      })
        .then((resp) => {
          console.log("RESPONSE FROM DOWNLOAD");
          return resp.blob();
        })
        .then((blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          // the filename you want
          let fileName = "export.zip";
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url); // or you know, something with better UX...
          this.downloading = false;
        })
        .catch((err) => {
          console.log("ERROR WHILE DOWNLOADING");
          console.log(err);
          this.downloading = false;
        });
    },
    openRenamePopup() {
      this.renameError = "";
      this.renamePopup = true;
    },
    closeRename() {
      this.renamePopup = false;
    },
    renameFile() {
      this.loadRename = true;
      let path = "";
      if (this.menuFile) {
        path = this.menuFile.localPath;
      } else {
        path = this.menuFolder.localPath;
      }

      this.$store
        .dispatch("post", {
          auth: true,
          url: "api/v1/file/rename",
          body: {
            deliveryId: this.delivery.id,
            password: this.delivery.password,
            localPath: path,
            renameTo: this.renameTo,
          },
        })
        .then(() => {
          this.renamePopup = false;
          this.refresh();
          this.loadRename = false;
        })
        .catch((err) => {
          let error = JSON.parse(err);
          console.log(error);
          this.renameError = error.message;
          this.loadRename = false;
        });
    },
  },

  components: {
    FileElement,
    FolderElement,
    FolderNavigation,
    LoadingIndicator,
    CustomInput,
    CustomButton,
    DefaultCard,
  },
  mounted() {
    this.loadFilesAndFolders();
  },
};
</script>

<style scoped>
.download-background {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.103);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999999999999;
}

.download-center {
  align-items: flex-start;
  justify-content: flex-start;
}

.download-center div {
  width: fit-content;
}

#backgroundClickDetector {
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 999999;
  left: 0;
  top: 0;
}

.file-folder-holder {
  overflow-y: none;
}

#renamePopup {
  position: absolute;
  justify-content: center;
  align-items: center;
  z-index: 999999999999;
  left: 0;
  top: 0;
  background-color: #00000049;
  width: 100vw;
  height: 100vh;
}

.file-menu {
  justify-content: center;
  align-items: center;
  border-radius: 0.4rem;
  color: rgb(68, 68, 68);
  outline-style: solid;
  outline-width: 1px;
  outline-color: rgb(223, 223, 223);
}

.file-menu-container {
  min-width: 8rem;
  position: absolute;
  background-color: white;
  z-index: 9999999;
  top: -999px;
  left: -999px;
}

.file-menu span {
  padding: 0.2rem;
  width: 100%;
  text-align: center;
  cursor: pointer;
}

.file-menu span:hover {
  background-color: rgb(245, 245, 245);
}

#navigation-holder {
  border-style: solid;
  border-width: 1px;
  padding: 0.8rem;
  border-color: rgb(229, 231, 233);
  border-radius: 0.4rem;
  overflow-y: auto;
  max-height: 20rem;
}

.file-navigation-element:not(:last-child) {
  margin-bottom: 0.5rem;
}

#empty-container {
  border-style: dashed;
  border-color: grey;
  border-width: 1px;
  border-radius: 0.4rem;
  padding: 2rem;
}

@media only screen and (max-width: 600px) {
  .download-background {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
  }

  .download-center {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
}
</style>
