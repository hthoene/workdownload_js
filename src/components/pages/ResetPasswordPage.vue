<template>
  <DefaultCard>
    <template #title>
      <IconTitle>
        <template #icon
          ><img src="../../assets/blue_lock.svg" class="icon-l"
        /></template>
        <template #heading>
          <h1>Reset Password</h1>
          <p>Please follow this steps to reset your password.</p>
        </template>
      </IconTitle>
    </template>
    <template #default>
      <div class="full-width column" v-if="!hasToken">
        <CustomInput
          mode="default"
          type="email"
          label="Email"
          placeholder="Enter your email"
          v-model="email"
        ></CustomInput>
        <div class="spacer-m"></div>
        <div
          class="full-width"
          v-if="errorMessage != '' || successMessage != ''"
        >
          <span class="error" v-if="errorMessage != ''">{{
            errorMessage
          }}</span>
          <span class="success" v-if="successMessage != ''">{{
            successMessage
          }}</span>
          <div class="spacer-l"></div>
        </div>

        <CustomButton
          mode="default"
          @click="sendPasswordResetEmail"
          v-if="!loading"
          ><span>Reset Password</span></CustomButton
        >
        <div class="spacer-xl"></div>
        <CustomButton mode="cancel" @click="goBack"
          ><span>Back</span></CustomButton
        >
      </div>
      <div class="full-width column" v-else>
        <CustomInput
          mode="default"
          type="password"
          label="New Password"
          placeholder="Enter new password"
          v-model="password"
        ></CustomInput>
        <div class="spacer-m"></div>
        <CustomInput
          mode="default"
          type="password"
          label="Confirm new password"
          placeholder="Repeat new password"
          v-model="passwordConfirmation"
        ></CustomInput>
        <div class="spacer-l"></div>
        <div
          class="full-width"
          v-if="errorMessage != '' || successMessage != ''"
        >
          <span class="error" v-if="errorMessage != ''">{{
            errorMessage
          }}</span>
          <span class="success" v-if="successMessage != ''">{{
            successMessage
          }}</span>
          <div class="spacer-l"></div>
        </div>
        <CustomButton mode="default" @click="setNewPassword" v-if="!loading"
          ><span>Reset Password</span></CustomButton
        >
      </div>
    </template>
  </DefaultCard>
</template>

<script>
import CustomInput from "../element/CustomInput.vue";
import CustomButton from "../layout/CustomButton.vue";
import DefaultCard from "../layout/DefaultCard.vue";
import IconTitle from "../layout/IconTitle.vue";

export default {
  components: { IconTitle, DefaultCard, CustomInput, CustomButton },

  data() {
    return {
      tokenParam: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errorMessage: "",
      successMessage: "",
      loading: false,
    };
  },
  computed: {
    token() {
      return this.tokenParam;
    },
    hasToken() {
      return this.token != null;
    },
  },

  methods: {
    sendPasswordResetEmail() {
      this.errorMessage = "";
      this.successMessage = "";
      this.loading = true;
      this.$store
        .dispatch("post", {
          auth: false,
          url: "api/v1/reset/requestEmail",
          body: {
            email: this.email,
          },
        })
        .then(() => {
          this.successMessage = "Please confirm your email";
          this.loading = false;
        })
        .catch((error) => {
          let errorJson = JSON.parse(error);
          this.errorMessage = errorJson.message;
          this.loading = false;
        });
    },
    setNewPassword() {
      if (this.password.length < 6) {
        this.errorMessage = "Password needs at least 6 characters";
        return;
      }

      if (this.password != this.passwordConfirmation) {
        this.errorMessage = "Passwords do not match";
        return;
      }

      this.errorMessage = "";
      this.successMessage = "";
      this.loading = true;
      this.$store
        .dispatch("post", {
          auth: false,
          url: "api/v1/reset/confirm",
          body: {
            token: this.token,
            password: this.password,
          },
        })
        .then((message) => {
          console.log(message);
          this.successMessage = "Password changed successfully";
          this.loading = false;
        })
        .catch((error) => {
          let errorJson = JSON.parse(error);
          this.errorMessage = errorJson.message;
          this.loading = false;
        });
    },
    goBack() {
      this.$router.replace("login");
    },
  },

  mounted() {
    this.tokenParam = this.$route.query.token;
    console.log("Token: " + this.token);
  },
};
</script>
