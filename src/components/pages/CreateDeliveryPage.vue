<template>
  <DefaultCard>
    <template #title>
      <IconTitle>
        <template #icon
          ><img src="../../assets/blue_lock.svg" class="icon-l"
        /></template>
        <template #heading>
          <h1>Create a new Delivery</h1>
          <p>Please follow this simple steps to create your first delivery.</p>
        </template>
      </IconTitle>
    </template>
    <template #default>
      <KeepAlive>
        <component :is="currentTab"></component>
      </KeepAlive>
      <div class="spacer-l"></div>
      <div class="row space-between full-width">
        <CustomButton @click="onBack" mode="cancel"
          ><span>Back</span></CustomButton
        >
        <LoadingIndicator v-if="loading"></LoadingIndicator>
        <CustomButton v-else @click="onNext" mode="default"
          ><span>Next</span></CustomButton
        >
      </div>
    </template>
  </DefaultCard>
</template>

<script>
import CustomInput from "../element/CustomInput.vue";
import ClientData from "../layout/create/ClientData.vue";
import TitleData from "../layout/create/TitleData.vue";
import OrderData from "../layout/create/OrderData.vue";
import PasswordData from "../layout/create/PasswordData.vue";
import DateData from "../layout/create/DateData.vue";
import ShowData from "../layout/create/ShowData.vue";
import CustomButton from "../layout/CustomButton.vue";
import DefaultCard from "../layout/DefaultCard.vue";
import IconTitle from "../layout/IconTitle.vue";
import LoadingIndicator from "../element/LoadingIndicator.vue";

export default {
  components: {
    IconTitle,
    DefaultCard,
    CustomInput,
    ClientData,
    CustomButton,
    OrderData,
    ShowData,
    DateData,
    LoadingIndicator,
  },
  mounted() {
    this.$store.dispatch("clearCreating");
  },
  data() {
    return {
      currentStep: 0,
      loading: false,
    };
  },
  computed: {
    currentTab() {
      switch (this.currentStep) {
        case 0:
          return TitleData;
        case 1:
          return ClientData;
        case 2:
          return OrderData;
        case 3:
          return DateData;
        case 4:
          return PasswordData;
        case 5:
          return ShowData;
      }
      return null;
    },
    title() {
      return this.$store.state.delivery.creatingDelivery.title;
    },
    orderNumber() {
      return this.$store.state.delivery.creatingDelivery.orderNumber;
    },
    clientEmail() {
      return this.$store.state.delivery.creatingDelivery.clientEmail;
    },
    deliveryDate() {
      return this.$store.state.delivery.creatingDelivery.deliveryDate;
    },
    password() {
      return this.$store.state.delivery.creatingDelivery.password;
    },
  },
  methods: {
    isInvalid() {
      return (
        this.title == "" ||
        this.orderNumber == "" ||
        this.deliveryDate == "" ||
        this.password == ""
      );
    },
    onBack() {
      if (this.currentStep <= 0) {
        this.$router.replace("/dashboard");
      } else {
        this.currentStep--;
      }
    },
    onNext() {
      if (this.currentStep >= 5) {
        this.create();
      } else {
        this.currentStep++;
      }
    },
    create() {
      if (this.isInvalid()) return;
      this.loading = true;
      this.$store
        .dispatch("post", {
          url: "api/v1/delivery/create",
          body: {
            title: this.title,
            orderNumber: this.orderNumber,
            clientEmail: this.clientEmail,
            deliveryDate: this.deliveryDate,
            password: this.password,
          },
          auth: true,
        })
        .then((response) => {
          if (response.message == "Created new Delivery successfully") {
            this.$router.replace("/dashboard");
          }
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>
