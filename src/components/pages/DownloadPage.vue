<template>
  <LoadingCard v-if="loading"></LoadingCard>
  <DefaultCard v-if="!loggedIn && !loading">
    <template #title>
      <IconTitle>
        <template #icon
          ><img src="../../assets/blue_lock.svg" class="icon-l"
        /></template>

        <template #heading>
          <h1>Password needed</h1>
          <p>For security reasons, the supplier had to create a password.</p>
        </template>
      </IconTitle>
    </template>
    <template #default>
      <p v-if="wrongPassword" class="error">Wrong password, please try again</p>
      <div v-if="wrongPassword" class="spacer-l"></div>
      <CustomInput
        label="Enter password"
        type="password"
        mode="default"
        placeholder="Enter password"
        v-model="password"
      ></CustomInput>
      <div class="spacer-l"></div>
      <CustomButton
        mode="default"
        class="mobile-full-width"
        @click="clientLogin"
        ><span>Continue</span></CustomButton
      >
    </template>
  </DefaultCard>
  <DefaultCard v-if="loggedIn">
    <template #title>
      <div class="full-width relative">
        <img :src="profilePictureUrl" class="icon-xxl fit profile-picture" />
        <div class="row company-name-holder">
          <h1>{{ delivery.owner.companyName }}</h1>
          <div v-if="delivery.owner.verified" class="spacer-xs"></div>
          <img
            v-if="delivery.owner.verified"
            src="../../assets/verified.svg"
            class="icon-m"
          />
        </div>

        <div class="spacer-m"></div>
        <div :class="delivery.deliveryStatus" class="status-badge">
          <span>{{ deliveryStatus }}</span>
        </div>
      </div>
    </template>
    <template #default>
      <div class="spacer-m"></div>
      <div class="row space-between full-width data-holder">
        <div class="data-row">
          <h3>Order-Number</h3>
          <p>{{ delivery.orderNumber }}</p>
        </div>
        <div class="data-row" v-if="delivery.deliveryStatus != 'DELIVERED'">
          <h3>Expected Until</h3>
          <p>{{ delivery.deliveryDateText }}</p>
        </div>
        <div class="data-row" v-else>
          <h3>Delivered At</h3>
          <p>{{ delivery.deliveredAtText }}</p>
        </div>
      </div>

      <div class="spacer-xl"></div>
      <FileView
        v-if="!loading"
        :currentFolder="currentFolder"
        @openPath="openPath"
        :key="fileViewKey"
      ></FileView>
      <div v-else class="full-width">
        <LoadingIndicator></LoadingIndicator>
      </div>
    </template>
  </DefaultCard>
</template>

<script>
import CustomInput from "../element/CustomInput.vue";
import LoadingCard from "../element/LoadingCard.vue";
import LoadingIndicator from "../element/LoadingIndicator.vue";
import CustomButton from "../layout/CustomButton.vue";
import DefaultCard from "../layout/DefaultCard.vue";
import FileView from "../layout/FileView.vue";
import IconTitle from "../layout/IconTitle.vue";

export default {
  components: {
    DefaultCard,
    FileView,
    LoadingIndicator,
    CustomInput,
    CustomButton,
    IconTitle,
    LoadingCard,
  },
  metaInfo() {
    return {
      title: "WorkDownload - Your files",
    };
  },
  data() {
    return {
      currentFolder: "",
      password: "",
      loading: true,
      loggedIn: false,
      fileViewKey: 20485,
      wrongPassword: false,
      failAmount: -1,
    };
  },
  mounted() {
    console.log(this.$route.params.urlName);

    this.$store
      .dispatch("post", {
        url: "api/v1/delivery/getByUrlName",
        body: {
          urlName: this.$route.params.urlName,
        },
      })
      .then((message) => {
        console.log("GOT MESSAGE FROM URL");
        console.log(message);
        this.$store.dispatch("setDelivery", {
          id: message.id,
          urlName: message.urlName,
        });
        this.loading = false;
        this.password = localStorage.getItem("deliveryLogin" + message.id);
        this.clientLogin();
      })
      .catch(() => {
        this.$router.replace("/notfound");
      });
  },
  computed: {
    delivery() {
      return this.$store.state.delivery.delivery;
    },
    profilePictureUrl() {
      return this.delivery.owner.profilePictureUrl;
    },
    deliveryStatus() {
      switch (this.delivery.deliveryStatus) {
        case "OPEN":
          return "Waiting for delivery";
        case "DELIVERED":
          return "Delivered";
        case "PAUSED":
          return "Paused";
      }
      return "error";
    },
  },
  methods: {
    setWrongPassword() {
      this.failAmount++;
      if (this.failAmount > 0) this.wrongPassword = true;
    },
    openPath(fullPath) {
      this.currentFolder = fullPath;
      this.fileViewKey = this.fileViewKey + 1;
    },
    clientLogin() {
      this.$store
        .dispatch("post", {
          url: "api/v1/delivery/clientLogin",
          body: {
            deliveryId: this.delivery.id,
            password: this.password,
          },
        })
        .then((message) => {
          console.log("GOT MESSAGE FROM URL");
          console.log(message);

          var deliveryObj = message;
          deliveryObj.downloadMode = true;

          this.$store.dispatch("setDelivery", deliveryObj);
          this.loggedIn = true;
          localStorage.setItem("deliveryLogin" + deliveryObj.id, this.password);
        })
        .catch((err) => {
          console.log("unexpected error");
          console.log(err);
          this.setWrongPassword();
        });
    },
  },
};
</script>

<style scoped>
.data-holder {
  background-color: white;
  padding: 1rem;
  border-radius: 0.4rem;
  border-color: rgb(231, 231, 231);
  border-style: solid;
  border-width: 1px;
}

.data-holder:hover {
  background-color: rgb(247, 247, 247);
}

.data-row {
  flex: 1;
}

.status-badge {
  width: 100%;
}

.status-badge span {
  color: rgb(255, 255, 255);
  padding: 0.4rem 1rem 0.4rem 1rem;
  border-radius: 5rem;
  font-size: 0.9rem;
}

.OPEN span {
  background-color: #4380b1;
}

.DELIVERED span {
  background-color: #43b17a;
}

.PAUSED span {
  background-color: #b16f43;
}

.profile-picture {
  position: absolute;
  top: -6rem;
  outline-style: solid;
  outline-color: white;
  outline-width: 0.4rem;
  left: 13.5rem;
  height: 5rem;
  width: 5rem;
  border-radius: 50rem;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.123);
}

.company-name-holder {
  justify-content: center;
  align-items: center;
}

@media only screen and (max-width: 600px) {
  .profile-picture {
    position: initial;
  }
}
</style>
