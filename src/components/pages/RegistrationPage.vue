<template>
  <DefaultCard>
    <template #title>
      <IconTitle>
        <template #icon
          ><img src="../../assets/blue_lock.svg" class="icon-l"
        /></template>
        <template #heading><h1>Registration</h1></template>
      </IconTitle>
    </template>
    <template #default>
      <div class="full-width full-height" v-if="!success">
        <div v-if="this.errorMessage != ''" class="column">
          <p class="error">{{ errorMessage }}</p>
          <div class="spacer-l"></div>
        </div>

        <Form class="full-width full-height">
          <CustomInput
            mode="default"
            placeholder="Enter your freelancer/company name"
            label="Enter name"
            type="name"
            v-model="companyName"
          ></CustomInput>
          <div class="spacer-m"></div>
          <CustomInput
            mode="default"
            placeholder="Enter your email"
            label="Enter email"
            type="email"
            v-model="email"
          ></CustomInput>
          <div class="spacer-m"></div>
          <CustomInput
            type="password"
            mode="default"
            placeholder="Enter your password"
            label="Enter password"
            v-model="password"
          ></CustomInput>
          <div class="spacer-m"></div>
          <CustomInput
            type="password"
            mode="default"
            placeholder="Confirm your password"
            label="Enter password again"
            v-model="passwordConfirmation"
          ></CustomInput>
          <div class="spacer-m"></div>
          <CustomInput
            mode="default"
            placeholder="Enter Beta Code"
            label="Enter Beta Code"
            type="name"
            v-model="betaCode"
          ></CustomInput>
          <div class="spacer-m"></div>
          <div class="row">
            <input id="terms-of-use" type="checkbox" @change="changeTerms" />
            <div class="spacer-s"></div>
            <label for="terms-of-use"
              >I accept the <a v-bind:href="termsLink">Terms of Use</a></label
            >
          </div>

          <div class="spacer-l"></div>
          <div class="row right">
            <CustomButton mode="cancel" @click.prevent="toLogin">
              <span>Or Login</span>
            </CustomButton>
            <div class="spacer-s"></div>
            <LoadingIndicator v-if="loading"></LoadingIndicator>
            <CustomButton v-else mode="default" @click.prevent="register">
              <span>Register</span>
            </CustomButton>
          </div>
        </Form>
      </div>
      <div v-else class="column full-width">
        <p class="success shrink">Please confirm your email</p>
        <div class="spacer-m"></div>
        <CustomButton mode="default" @click="toLogin">
          <span>Login</span>
        </CustomButton>
      </div>
    </template>
  </DefaultCard>
</template>

<script>
import CustomInput from "../element/CustomInput.vue";
import LoadingIndicator from "../element/LoadingIndicator.vue";
import CustomButton from "../layout/CustomButton.vue";
import DefaultCard from "../layout/DefaultCard.vue";
import IconTitle from "../layout/IconTitle.vue";
import config from "../../_helpers/config";

export default {
  components: {
    DefaultCard,
    IconTitle,
    CustomInput,
    CustomButton,
    LoadingIndicator,
  },

  data() {
    return {
      email: "",
      password: "",
      companyName: "",
      errorMessage: "",
      passwordConfirmation: "",
      termsOfUse: "",
      betaCode: "",
      loading: false,
      success: false,
    };
  },

  computed: {
    termsLink() {
      return config.frontend_url + "termsofuse";
    },
  },

  methods: {
    changeTerms(value) {
      this.termsOfUse = value.target.checked;
    },
    toLogin() {
      this.$router.replace("/login");
    },
    register() {
      this.errorMessage = "";

      if (!this.termsOfUse) {
        this.errorMessage = "Terms of Use need to be accepted";
        return;
      }

      if (this.password == "") {
        this.errorMessage = "Password is empty";
        return;
      }

      if (this.password.length < 6) {
        this.errorMessage = "Password has to have at least 6 characters";
        return;
      }

      if (this.password != this.passwordConfirmation) {
        this.errorMessage = "Passwords do not match";
        return;
      }

      if (this.companyName.length < 4) {
        this.errorMessage = "Name has to be at least 5 characters long";
        return;
      }

      if (
        this.email.length < 5 ||
        !this.email.includes("@") ||
        !this.email.includes(".")
      ) {
        this.errorMessage = "Email is invalid";
        return;
      }

      this.loading = true;

      this.$store
        .dispatch("postRaw", {
          url: "api/v1/registration",
          auth: false,
          body: {
            email: this.email,
            password: this.password,
            companyName: this.companyName,
            betaCode: this.betaCode,
          },
        })
        .then((response) => {
          console.log(response);
          this.loading = false;
          this.success = true;
        })
        .catch((err) => {
          let error = JSON.parse(err);
          console.log(err);
          if (error.message == "Beta code invalid") {
            this.errorMessage = "Beta code invalid";
          } else {
            this.errorMessage = "Something went wrong";
          }
          this.loading = false;
        });
    },
  },
};
</script>
