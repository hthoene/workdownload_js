<template>
  <DefaultCard>
    <template #title>
      <IconTitle>
        <template #icon
          ><img src="../../assets/blue_lock.svg" class="icon-l"
        /></template>
        <template #heading><h1>Profile Settings</h1></template>
      </IconTitle>
    </template>
    <template #default>
      <div class="full-width full-height">
        <div class="row center">
          <div class="profile-circle">
            <img :src="profileUrl" class="full-width full-height" />
          </div>
          <div class="spacer-l"></div>

          <label for="file-upload" class="custom-file-upload"
            >Upload New Picture</label
          >
          <input
            id="file-upload"
            accept="image/jpeg, image/png, image/jpg"
            type="file"
            @change="imageChange"
          />
        </div>
        <div v-if="success" class="full-width">
          <div class="spacer-m"></div>
          <p class="success">Uploaded file, please reload page</p>
        </div>

        <div class="spacer-l"></div>
        <LoadingIndicator v-if="loadingCompany"></LoadingIndicator>
        <CustomInput
          v-else
          mode="default"
          label="Freelancer/Company name"
          placeholder="Enter freelancer/company name"
          :default="companyName"
          v-model="company"
        ></CustomInput>
        <div class="spacer-l"></div>

        <LoadingIndicator v-if="loadingStorageData"></LoadingIndicator>

        <ProgressIndicator
          v-else
          :progress="totalStorageAvailablePercentage"
          :total="totalStorageAvailable"
        ></ProgressIndicator>
        <div class="spacer-s"></div>
        <div class="row">
          <span class="label"
            >Need More Storage? <a href="contact">Contact us!</a></span
          >
        </div>

        <div class="spacer-l"></div>
        <LoadingIndicator v-if="loadingName"></LoadingIndicator>

        <CustomButton v-else mode="default" @click="onSave"
          ><span>Save</span></CustomButton
        >
        <div class="spacer-s"></div>
        <CustomButton mode="cancel" @click="logout"
          ><span>Logout</span></CustomButton
        >
        <div class="spacer-s"></div>
        <CustomButton mode="delete" @click="deleteAccount"
          ><span>Delete Account</span></CustomButton
        >
      </div>
    </template>
  </DefaultCard>
</template>

<script>
import CustomInput from "../element/CustomInput.vue";
import ProgressIndicator from "../element/ProgressIndicator.vue";
import CustomButton from "../layout/CustomButton.vue";
import DefaultCard from "../layout/DefaultCard.vue";
import IconTitle from "../layout/IconTitle.vue";
import config from "../../_helpers/config";
import axios from "axios";
import LoadingIndicator from "../element/LoadingIndicator.vue";

export default {
  components: {
    DefaultCard,
    IconTitle,
    CustomInput,
    CustomButton,
    ProgressIndicator,
    LoadingIndicator,
  },

  data() {
    return {
      uploading: false,
      success: false,
      company: "",
      loadingName: false,
      storageInfo: null,
      loadingStorageData: true,
      loadingCompany: true,
    };
  },
  mounted() {
    this.$store
      .dispatch("post", {
        url: "api/v1/user/storageInfo",
        auth: true,
        body: null,
      })
      .then((message) => {
        this.storageInfo = message;
        this.loadingStorageData = false;
        this.loadingCompany = false;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  computed: {
    totalStorageAvailable() {
      return this.storageInfo.totalStorageAvailableText;
    },
    totalStorageAvailablePercentage() {
      let available =
        (this.storageInfo.usedStorage /
          this.storageInfo.totalStorageAvailable) *
        100;
      console.log("AVAILABLE");
      console.log(available);
      return available;
    },
    profileUrl() {
      if (this.$store.state.authentication.userData == null) {
        return "";
      }

      return this.$store.state.authentication.userData.profilePictureUrl;
    },
    companyName() {
      if (this.$store.state.authentication.userData == null) {
        return "";
      }
      return this.$store.state.authentication.userData.companyName;
    },
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/login");
    },
    onSave() {
      if (this.company == "") {
        return;
      }
      this.loadingName = true;
      this.$store
        .dispatch("post", {
          url: "api/v1/user/updateCompany",
          body: {
            companyName: this.company,
          },
          auth: true,
        })
        .then((userData) => {
          this.loadingName = false;
          this.$store.dispatch("updateUserData", userData);
        })
        .catch(() => {
          console.log("ERROR");
          this.loadingName = false;
        });
    },
    imageChange() {
      console.log("UPLOADING");
      var uploadElement = document.getElementById("file-upload");
      this.submitFile(uploadElement.files[0]);
    },
    async submitFile(file) {
      this.uploading = true;
      console.log("DATA:");
      console.log(file);

      const formData = new FormData();
      formData.append("file", file);
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.getItem("user"),
      };

      axios
        .post(config.api_url + "api/v1/file/uploadProfilePicture/", formData, {
          headers,
          onUploadProgress(progressEvent) {
            var percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log("UPDATING EVENT " + percentCompleted);
            console.log(progressEvent);
          },
        })
        .then((res) => {
          res.data.files; // binary representation of the file
          res.status; // HTTP status
          this.uploading = false;
          this.success = true;
        })
        .catch((err) => {
          console.log("WE GOT AN ERROR");
          console.log(err);
          alert("Unexpected error while uploading your file");
        });
    },
    deleteAccount() {
      window.location.href =
        "mailto:contact@work.download?subject=Account Deletion&body=Account deletion request - No need to change this email";
    },
  },

  watch: {},
};
</script>

<style scoped>
input[type="file"] {
  display: none;
}

.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 0.9rem;
}

.profile-circle {
  width: 5rem;
  height: 5rem;
  overflow: hidden;
  border-radius: 50rem;
}

.custom-file-upload:hover {
  background-color: rgb(236, 236, 236);
}
</style>
