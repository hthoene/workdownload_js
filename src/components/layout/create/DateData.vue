<template>
  <div class="full-width info-box">
    <p>
      This date should give your client a hint about when the order is expected.
      The client will see this.
    </p>
  </div>
  <div class="spacer-l"></div>
  <div class="full-width full-height">
    <CustomInput
      mode="default"
      label="Expected Delivery Date"
      placeholder="Enter an expected delivery date"
      type="date"
      v-model="value"
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
        property: "deliveryDate",
        value: newValue,
      });
    },
  },
};
</script>

<style scoped></style>
