<template>
  <div class="full-width info-box">
    <p>
      The order number is a unique identifier for the order. Your client will
      get the number to identify his order.
    </p>
  </div>
  <div class="spacer-l"></div>
  <div class="full-width full-height row">
    <CustomInput
      :key="orderKey"
      mode="default"
      label="Order-Number"
      placeholder="Enter a unique identifier for the order"
      :default="orderNum"
      v-model="orderNum"
    ></CustomInput>
    <div class="spacer-m"></div>
    <div class="round-button pointer" @click="generateOrderNum">
      <img src="../../../assets/refresh.svg" class="icon-s" />
    </div>
  </div>
</template>

<script>
import CustomInput from "@/components/element/CustomInput.vue";

function generateRandomInteger(max) {
  return Math.floor(Math.random() * max) + 1;
}

export default {
  components: { CustomInput },
  data() {
    return {
      orderNum: generateRandomInteger(999999999),
      orderKey: 5872,
    };
  },
  mounted() {
    this.generateOrderNum();
  },

  methods: {
    generateOrderNum() {
      this.orderNum = generateRandomInteger(99999999);
      this.orderKey += 1;
    },
  },
  watch: {
    orderNum(newValue) {
      this.$store.dispatch("setCreatingProperty", {
        property: "orderNumber",
        value: newValue,
      });
      console.log(this.$store.state.delivery.creatingDelivery);
    },
  },
};
</script>

<style scoped>
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
