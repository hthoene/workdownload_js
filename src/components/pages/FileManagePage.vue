<template>
  <DefaultCard>
    <template #title>
      <IconTitle>
        <template #icon>
          <img src="../../assets/blue_lock.svg" class="icon-l" />
        </template>
        <template #heading>
          <h1>Manage Files</h1>
          <p>Here you can manage the files the client sees.</p>
        </template>
      </IconTitle>
    </template>
    <template #default>
      <div class="row full-width right-button-holder">
        <CustomButton class="option-button" mode="default" @click="createFolder"
          ><span>Create Folder</span></CustomButton
        >
        <div class="spacer-s"></div>
        <CustomButton
          class="option-button"
          mode="default"
          @click.prevent="onUploadClick"
          ><span>Upload File</span></CustomButton
        >
      </div>

      <div class="spacer-l hide-desktop"></div>

      <div class="spacer-l"></div>
      <FileView
        delivery="delivery"
        :key="fileViewKey"
        :currentFolder="currentFolder"
        @openPath="openPath"
      ></FileView>
      <div class="spacer-l"></div>
      <div class="full-width">
        <CustomButton @click="goBack" mode="cancel"
          ><span>Back</span></CustomButton
        >
      </div>
    </template>
  </DefaultCard>
  <input type="file" multiple id="select-files" @change="onFileSelection" />

  <Teleport to="body">
    <div class="upload-background" v-if="uploading">
      <DefaultCard>
        <template #title>
          <h1>Uploading</h1>
        </template>
        <template #default>
          <p>Please wait, your files get encrypted and uploaded</p>
          <div class="full-width column">
            <div class="spacer-l"></div>
            <div class="spacer-s"></div>
            <span class="label">Uploading files (Please wait)</span>
            <div class="spacer-s"></div>
            <div id="progress-holder" class="full-width full-height bg-white-2">
              <div id="progress-indicator"></div>
            </div>
          </div>
        </template>
      </DefaultCard>
    </div>
  </Teleport>
</template>

<script>
import CustomButton from "../layout/CustomButton.vue";
import DefaultCard from "../layout/DefaultCard.vue";
import FileView from "../layout/FileView.vue";
import IconTitle from "../layout/IconTitle.vue";

import config from "../../_helpers/config";

import axios from "axios";

export default {
  data() {
    return {
      files: [],
      delivery: {},
      currentFolder: "",
      uploading: false,
      fileViewKey: 6239,
      downloading: false,
    };
  },
  watch: {
    uploading(value) {
      if (value == false) {
        console.log("UPDATING SITE");
        this.fileViewKey += 1;
      }
    },
  },
  mounted() {
    this.$store.dispatch("init");
    this.delivery = this.$store.state.delivery.delivery;
  },
  methods: {
    openPath(newPath) {
      this.currentFolder = newPath;
      this.fileViewKey = this.fileViewKey + 1;
    },
    createFolder() {
      this.$store
        .dispatch("post", {
          auth: true,
          url: "api/v1/file/createFolder",
          body: {
            deliveryId: this.delivery.id,
            password: "",
            localPath: this.currentFolder + "/NewFolder",
          },
        })
        .then(() => {
          this.fileViewKey++;
        });
    },
    onFileSelection(event) {
      console.log("SELECTED FILES:");
      this.files = event.target.files;
      console.log(this.files);
      this.uploadAll();
    },
    onUploadClick() {
      document.getElementById("select-files").click();
    },
    goBack() {
      this.$router.replace("/manage");
    },
    async uploadAll() {
      console.log("UPLOADING ALL");
      console.log(this.files);

      var arrFiles = Array.from(this.files);

      for (let i = 0; i < arrFiles.length; i++) {
        console.log("UPLOADING THIS FILE");
        console.log(arrFiles[i]);

        await this.submitFile(arrFiles[i]);
      }

      // Array.from(this.files).forEach((file) => {await });

      this.files = [];
    },

    async submitFile(file) {
      this.uploading = true;
      console.log("DATA:");
      console.log("DeliveryId: " + this.delivery.id);
      console.log(file);

      const formData = new FormData();
      formData.append("files", file);
      formData.append("folder", this.currentFolder);
      formData.append("deliveryId", this.delivery.id);
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("user"),
      };

      await axios
        .post(config.api_url + "api/v1/file/upload/", formData, {
          headers,
          onUploadProgress(progressEvent) {
            var percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log("UPDATING EVENT " + percentCompleted);
            console.log(progressEvent);
            document.getElementById("progress-indicator").style.width =
              percentCompleted + "%";
          },
        })
        .then((res) => {
          res.data.files; // binary representation of the file
          res.status; // HTTP status
          this.uploading = false;
        })
        .catch((err) => {
          console.log("WE GOT AN ERROR");
          console.log(err);
          alert("Unexpected error while uploading your file");
        });
    },
  },
  components: {
    IconTitle,
    DefaultCard,
    CustomButton,
    FileView,
  },
};
</script>

<style scoped>
.upload-background {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.212);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999999999999;
}

#progress-holder {
  height: 1.2rem;
  border-radius: 5rem;
}

#progress-text {
  font-size: 0.8rem;
  color: white;
}

#progress-indicator {
  width: 0%;
  background-color: #4682da;
  border-radius: 5rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#select-files {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  visibility: hidden;
}

.right-button-holder {
  align-items: flex-end;
  justify-content: flex-start;
}

.hide-desktop {
  display: none;
}

@media only screen and (max-width: 600px) {
  .option-button {
    flex: 1;
  }

  .hide-desktop {
    display: flex;
  }

  .hide-mobile {
    display: none;
  }
}
</style>
