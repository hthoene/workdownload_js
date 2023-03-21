<template>
  <div class="full-width column">
    <div class="full-width info-box">
      <p>
        We won't notify the client without your permission, this only gives you
        the option to notify the client with predefined emails manually.
      </p>
    </div>
    <div class="spacer-l"></div>
    <CustomInput
      mode="default"
      label="Client-Email"
      placeholder="Enter Client's Email"
      type="email"
      v-model="value"
      optional="true"
    ></CustomInput>
  </div>
</template>

<script>
import CustomInput from "@/components/element/CustomInput.vue";

export default {
  data() {
    return {
      value: "",
    };
  },
  components: { CustomInput },
  watch: {
    value(newValue) {
      this.$store.dispatch("setCreatingProperty", {
        property: "clientEmail",
        value: newValue,
      });
    },
  },
};
</script>

<style>
.info-box {
  border-style: solid;
  border-width: 1px;
  border-color: rgba(212, 212, 212, 0.479);
  border-radius: 0.4rem;
  padding: 1rem;
  text-align: center;
}

.info-box:hover {
  background-color: rgb(248, 248, 248);
}
</style>

<style scoped></style>
