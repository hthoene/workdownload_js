<template>
  <DefaultCard>
    <template #title>
      <IconTitle>
        <template #icon
          ><img src="../../assets/blue_lock.svg" class="icon-l"
        /></template>
        <template #heading><h1>Please login to continue</h1></template>
      </IconTitle>
    </template>
    <template #default>
      <div v-if="this.errorMessage != ''" class="column">
        <p class="error">{{ errorMessage }}</p>
        <div class="spacer-l"></div>
      </div>

      <Form class="full-width full-height">
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
        <div class="spacer-l"></div>
        <div class="row right reversed">
          <LoadingIndicator v-if="loading"></LoadingIndicator>
          <CustomButton v-else mode="default" @click.prevent="login">
            <span>Login</span>
          </CustomButton>
          <div class="spacer-s"></div>
          <CustomButton mode="cancel" @click="toRegister">
            <span>Or Register</span>
          </CustomButton>
          <div class="spacer-s"></div>
        </div>
        <div class="center row">
          <CustomButton mode="flat"
            ><span class="blue-text" @click="resetPassword"
              >Forgot password?</span
            ></CustomButton
          >
        </div>
      </Form>
    </template>
  </DefaultCard>
</template>

<script>
import CustomInput from "../element/CustomInput.vue";
import LoadingIndicator from "../element/LoadingIndicator.vue";
import CustomButton from "../layout/CustomButton.vue";
import DefaultCard from "../layout/DefaultCard.vue";
import IconTitle from "../layout/IconTitle.vue";

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
      errorMessage: "",
      loading: false,
    };
  },

  methods: {
    toRegister() {
      this.$router.replace("/register");
    },
    login() {
      this.loading = true;
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
          this.$router.replace("/dashboard");
        })
        .catch(() => {
          this.errorMessage = "Please check your login data";
          this.loading = false;
        });
    },
    resetPassword() {
      this.$router.replace("reset");
    },
  },
};
</script>

<style scoped>
.reversed {
  flex-direction: row-reverse;
}

.blue-text {
  color: rgb(80, 129, 192);
  font-size: 0.7rem;
}
</style>
