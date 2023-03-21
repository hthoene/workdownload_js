<template>
  <div class="full-width info-box">
    <p>
      The delivery title should be a unique identifier for you. Your client
      won't see it.
    </p>
  </div>
  <div class="spacer-l"></div>
  <div class="full-width full-height">
    <CustomInput
      mode="default"
      label="Delivery Title"
      placeholder="Enter a name for the delivery"
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
        property: "title",
        value: newValue,
      });
      console.log(this.$store.state.delivery.creatingDelivery);
    },
  },
};
</script>

<style scoped></style>
