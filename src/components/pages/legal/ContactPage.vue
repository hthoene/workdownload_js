<template>
  <DefaultCard>
    <template #title>
      <h1>
        Love to hear from you,<br />
        Get in touch 👋
      </h1>
    </template>
    <template #default>
      <CustomInput
        mode="default"
        label="Name"
        placeholder="Enter name"
        v-model="name"
      ></CustomInput>
      <div class="spacer-m"></div>
      <CustomInput
        mode="default"
        type="email"
        label="Email"
        placeholder="Enter email"
        v-model="email"
      ></CustomInput>
      <div class="spacer-m"></div>
      <span class="label">Message</span>
      <div class="spacer-s"></div>
      <textarea
        class="multiline bg-white-2 full-width"
        cols="50"
        placeholder="Enter message"
        type="text"
        v-model="message"
      ></textarea>
      <div class="spacer-l"></div>
      <div v-if="errorMessage != '' || success != ''">
        <span v-if="success != ''" class="success">{{ success }}</span>
        <span v-if="errorMessage != ''" class="error">{{ errorMessage }}</span>
        <div class="spacer-l"></div>
      </div>
      <div class="full-width">
        <LoadingIndicator v-if="loading"></LoadingIndicator>
        <CustomButton v-else mode="default" @click.prevent="send">
          <span>Send</span>
        </CustomButton>
      </div>
    </template>
  </DefaultCard>
</template>

<script>
import CustomInput from "@/components/element/CustomInput.vue";
import LoadingIndicator from "@/components/element/LoadingIndicator.vue";
import CustomButton from "@/components/layout/CustomButton.vue";
import DefaultCard from "@/components/layout/DefaultCard.vue";

export default {
  components: { DefaultCard, CustomInput, CustomButton, LoadingIndicator },
  data() {
    return {
      message: "",
      email: "",
      name: "",
      success: "",
      errorMessage: "",
      loading: false,
    };
  },
  methods: {
    send() {
      this.loading = true;
      this.errorMessage = "";
      this.success = "";
      if (this.email == "" || this.name == "" || this.message == "") {
        this.errorMessage = "All fields are required";
        return;
      }
      this.$store
        .dispatch("post", {
          url: "api/v1/email/sendContact",
          auth: false,
          body: {
            name: this.name,
            email: this.email,
            message: this.message,
          },
        })
        .then((message) => {
          this.success = message.message;
          if (this.message == "Success") {
            window.location.reload();
          }
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.errorMessage = "Could not send email";
        });
      console.log("message: " + this.message);
    },
  },
};
</script>

<style scoped>
.multiline {
  width: 100%;
  height: 3rem;
  padding: 0.7rem 1rem;
  font-size: 0.95rem;
  border-style: none;
  border-width: 1px;
  border-radius: 0.4rem;
  color: rgb(81, 83, 83);
  font-weight: 500;
  height: 10rem;
  resize: none;
}

.multiline::placeholder {
  font-weight: 400;
  color: rgb(180, 183, 185);
}

.multiline:focus:not(:placeholder-shown),
.multiline:active:not(:placeholder-shown) {
  border: none;
  color: rgb(96, 99, 102);
  font-weight: 500;
}
</style>
