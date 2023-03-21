<template>
  <div class="full-width info-box">
    <p>
      For security reasons a password is needed. This prevents others from
      downloading your client's files.
    </p>
  </div>
  <div class="spacer-l"></div>
  <div class="full-width full-height row pw-holder">
    <CustomInput
      mode="default"
      label="Delivery Password"
      placeholder="Enter a password for the delivery"
      v-model="value"
      type="password"
      :default="value"
      :key="passwordKey"
      :showByDefault="showByDefault"
    ></CustomInput>
    <div class="spacer-m"></div>
    <div class="round-button pointer" @click="generateNew">
      <img src="../../../assets/refresh.svg" class="icon-s" />
    </div>
  </div>
</template>

<script>
import CustomInput from "@/components/element/CustomInput.vue";

export default {
  data() {
    return {
      value: "",
      passwordKey: 502835,
      showByDefault: false,
    };
  },
  methods: {
    generateNew() {
      var randomstring = Math.random().toString(36).slice(-8);
      this.value = randomstring;
      this.showByDefault = true;
      this.passwordKey += 2;
    },
  },
  mounted() {
    this.generateNew();
  },
  components: { CustomInput },
  watch: {
    value(newValue) {
      this.$store.dispatch("setCreatingProperty", {
        property: "password",
        value: newValue,
      });
    },
  },
};
</script>

<style scoped>
.pw-holder {
  align-items: flex-end;
}

.round-button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4682da;
  height: 3rem;
  width: 3.3rem;
  align-self: flex-end;
  border-radius: 5rem;
}
.round-button:hover {
  background-color: #3f77ca;
  transform: scale(1.05);
}
</style>
