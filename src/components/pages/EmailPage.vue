<template>
  <DefaultCard>
    <template #title>
      <IconTitle>
        <template #icon
          ><img src="../../assets/blue_lock.svg" class="icon-l"
        /></template>
        <template #heading>
          <h1>Manage Emails</h1>
          <p class="align-left">
            Emails can be used to inform the user about events. Any email can
            only be sent once.
          </p>
        </template>
      </IconTitle>
    </template>
    <template #default>
      <TabElement
        option1="Delivery Created"
        option2="Delivered"
        :selection="tabSelected"
        @select="selectTab"
      ></TabElement>
      <div class="spacer-l"></div>
      <h3>
        Preview
        <span class="small">(Preview may differ from the original)</span>
      </h3>
      <div class="spacer-s"></div>
      <LoadingIndicator v-if="loading"></LoadingIndicator>
      <div class="preview-container" v-else>
        <span
          v-if="!cannotSendDelivered"
          class="email-preview"
          id="email-preview"
          v-html="loaded"
        ></span>
      </div>

      <div class="spacer-l"></div>

      <div class="full-width">
        <p v-if="showError" class="error">
          {{ errorMessage }}
        </p>

        <div v-if="showError" class="spacer-s"></div>
        <p v-if="cannotSendDelivered" class="error">
          Cannot send, because delivery status is not 'Delivered'
        </p>

        <p class="success" v-if="emailSent">Email sent</p>
        <div v-if="emailSent" class="spacer-s"></div>

        <div v-if="cannotSendDelivered" class="spacer-s"></div>
        <LoadingIndicator v-if="emailLoading"></LoadingIndicator>
        <div class="full-width" v-if="!cannotSendDelivered">
          <CustomButton
            v-if="!emailLoading"
            mode="default"
            :submode="buttonSubmode"
            @click="sendEmail"
            ><span>Send to client</span></CustomButton
          >
        </div>

        <div class="spacer-s"></div>
        <CustomButton mode="cancel" @click="goBack"
          ><span>Back</span></CustomButton
        >
      </div>
    </template>
  </DefaultCard>
</template>

<script>
import LoadingIndicator from "../element/LoadingIndicator.vue";
import CustomButton from "../layout/CustomButton.vue";
import DefaultCard from "../layout/DefaultCard.vue";
import IconTitle from "../layout/IconTitle.vue";
import TabElement from "../layout/TabElement.vue";

export default {
  components: {
    DefaultCard,
    IconTitle,
    CustomButton,
    TabElement,
    LoadingIndicator,
  },
  data() {
    return {
      loaded: "",
      tabSelected: 1,
      loading: true,
      errorMessage: "",
      emailSent: false,
      emailLoading: false,
    };
  },
  computed: {
    buttonSubmode() {
      if (this.cannotSendDelivered) {
        return "disabled";
      }
      return "";
    },
    user() {
      return this.$store.state.authentication.userData;
    },
    delivery() {
      return this.$store.state.delivery.delivery;
    },
    cannotSendDelivered() {
      if (this.tabSelected == 1) return false;
      return this.delivery.deliveredAtText == null;
    },
    showError() {
      return this.errorMessage != "";
    },
  },
  watch: {
    user() {
      if (this.user == null) return;
      this.loadEmail();
    },
  },
  methods: {
    selectTab(index) {
      this.tabSelected = index;
      this.loadEmail();
      this.errorMessage = "";
    },
    loadEmail() {
      if (this.user == null) return;

      let urlName = "";

      switch (this.tabSelected) {
        case 1:
          urlName = "deliveryCreated";
          break;
        case 2:
          urlName = "delivered";
          break;
        default:
          urlName = "delivered";
          break;
      }

      this.$store
        .dispatch("postRaw", {
          url: "api/v1/email/template/" + urlName,
          auth: false,
          body: {
            deliverer: this.user.companyName,
            deliveredAt: this.delivery.deliveredAtText,
            password: this.delivery.password,
            deliveryDate: this.delivery.deliveryDateText,
          },
        })
        .then((message) => {
          this.loaded = message;
          this.loading = false;
        });
    },
    sendEmail() {
      this.emailLoading = true;
      if (this.tabSelected == 1) {
        this.sendDeliveryCreated();
      } else {
        this.sendDeliveredEmail();
      }
    },
    sendDeliveredEmail() {
      this.$store
        .dispatch("post", {
          url: "api/v1/email/sendDelivered",
          auth: true,
          body: {
            deliveryId: this.delivery.id,
          },
        })
        .then((message) => {
          this.emailLoading = false;
          if (message.message != "Success") {
            this.errorMessage = message.message;
          } else {
            this.errorMessage = "";
            this.emailSent = true;
          }
        })
        .catch((error) => {
          console.log(error);
          this.errorMessage = error;
        });
    },
    sendDeliveryCreated() {
      this.$store
        .dispatch("post", {
          url: "api/v1/email/sendDeliveryCreated",
          auth: true,
          body: {
            deliveryId: this.delivery.id,
          },
        })
        .then((message) => {
          this.emailLoading = false;
          if (message.message != "Success") {
            this.errorMessage = message.message;
          } else {
            this.errorMessage = "";
            this.emailSent = true;
          }
        })
        .catch((error) => {
          console.log(error);
          this.errorMessage = error;
        });
    },
    goBack() {
      this.$router.replace("manage");
    },
  },
  mounted() {
    this.$store.dispatch("init").then(() => {
      this.loadEmail();
    });
  },
};
</script>

<style scoped>
.preview-container {
  width: 100%;
  height: 20rem;
  box-shadow: 1px 1px 3px 3px rgba(0, 0, 0, 0.178);
  border-radius: 0.4rem;
  overflow: auto;
}
.email-preview {
  width: 100%;
  height: 100%;
}

.small {
  font-size: 0.8rem;
  color: grey;
}

@media only screen and (max-width: 600px) {
  .align-left {
    margin-top: 0.4rem;
    text-align: center;
  }
}
</style>
