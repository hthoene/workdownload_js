<template>
  <DefaultCard>
    <template #title>
      <IconTitle>
        <template #icon>
          <img src="../../assets/blue_lock.svg" class="icon-l" />
        </template>
        <template #heading>
          <h1 @click="printDelivery">Edit Delivery</h1>
        </template>
      </IconTitle>
    </template>
    <template #default>
      <LoadingIndicator v-if="loading"></LoadingIndicator>
      <div
        class="full-width full-height column"
        id="form-holder"
        :key="formKey"
        v-else
      >
        <CustomInput
          mode="default"
          label="Delivery Title"
          placeholder="Enter Delivery Title"
          type="text"
          :default="delivery.title"
          v-model="title"
        ></CustomInput>
        <div class="spacer-l"></div>
        <CustomInput
          mode="default"
          label="Order Number"
          placeholder="Enter Order Number"
          type="text"
          :default="delivery.orderNumber"
          v-model="orderNumber"
        ></CustomInput>

        <div class="spacer-l"></div>
        <CustomInput
          mode="default"
          label="Client Email"
          placeholder="Enter client's email"
          type="email"
          :default="delivery.clientEmail"
          v-model="clientEmail"
        ></CustomInput>
        <div class="spacer-l"></div>
        <CustomInput
          mode="default"
          label="Excepted Delivery Date"
          placeholder="Enter Expected Delivery Date"
          type="date"
          :default="deliveryDateHtml"
          v-model="deliveryDate"
        ></CustomInput>
        <div class="spacer-l"></div>
        <CustomInput
          mode="default"
          label="Delivery password"
          placeholder="Enter a secure password"
          type="password"
          :default="delivery.password"
          v-model="password"
        ></CustomInput>
        <div class="spacer-l"></div>
        <div v-if="error">
          <p class="error">
            Some data is invalid. Please make sure everything is filled.
          </p>
          <div class="spacer-l"></div>
        </div>
        <div v-if="success">
          <p class="success">Saved</p>
          <div class="spacer-l"></div>
        </div>

        <div class="full-width">
          <LoadingIndicator v-if="loadingSave"></LoadingIndicator>
          <CustomButton v-else mode="default" @click="onSave">
            <img src="../../assets/folder_white.svg" class="icon-s" />
            <div class="spacer-s"></div>
            <span>Save</span>
          </CustomButton>
        </div>
        <div class="spacer-s"></div>
        <div class="full-width">
          <CustomButton mode="cancel" @click="goBack"
            ><span>Back</span></CustomButton
          >
        </div>
        <div class="spacer-m"></div>
        <div class="column center full-width">
          <CustomButton
            @click="deleteDelivery"
            mode="flat"
            class="justify-center"
            ><span class="delete-delivery-text"
              >Delete Delivery</span
            ></CustomButton
          >
        </div>
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
      selectedStatus: 1,
      formKey: 0,
      title: "",
      orderNumber: "",
      deliveryStatus: "NONE",
      clientEmail: "",
      deliveryDate: "",
      password: "",
      loadingSave: false,
      error: false,
      success: false,
    };
  },
  mounted() {
    this.title = this.delivery.title;
    this.orderNumber = this.delivery.orderNumber;
    this.deliveryStatus = this.delivery.deliveryStatus;
    this.clientEmail = this.delivery.clientEmail;
    this.deliveryDate = this.deliveryDateHtml;
    this.password = this.delivery.password;
  },
  methods: {
    deleteDelivery() {
      this.$store
        .dispatch("post", {
          url: "api/v1/delivery/delete/" + this.delivery.id,
          auth: true,
          body: null,
        })
        .then(() => {
          this.$router.replace("dashboard");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    printDelivery() {
      console.log(this.$store.state.delivery.delivery);
    },
    goBack() {
      this.$router.replace("/manage");
    },
    onSave() {
      this.error = false;
      this.success = false;
      this.loadingSave = true;
      console.log("Saving data:");
      console.log(this.title);
      console.log(this.orderNumber);
      console.log(this.clientEmail);
      console.log(this.deliveryDate);
      console.log(this.password);

      this.$store
        .dispatch("post", {
          auth: true,
          url: "api/v1/delivery/update",
          body: {
            id: this.delivery.id,
            title: this.title,
            orderNumber: this.orderNumber,
            clientEmail: this.clientEmail,
            deliveryDate: this.deliveryDate,
            password: this.password,
          },
        })
        .then((message) => {
          console.log("WORKED");
          console.log(message);
          this.$store.dispatch("setDelivery", message);
          this.loadingSave = false;
          this.success = true;
        })
        .catch((err) => {
          console.log("ERROR SAVING");
          console.log(err);
          this.loadingSave = false;
          this.error = true;
        });
    },

    uploadUpdates() {},
  },
  watch: {
    delivery(newValue) {
      console.log("WATCHER GOT NEW VALUE");
      console.log(newValue);
      this.formKey += 1;
      this.loading = false;
    },
  },
  computed: {
    loading() {
      return this.delivery == {};
    },
    delivery() {
      return this.$store.state.delivery.delivery;
    },
    deliveryDateHtml() {
      let dateData = this.delivery.deliveryDate;

      if (dateData == null) return null;

      let dateFromBackend = dateData[0] + "-" + dateData[1] + "-" + dateData[2];

      var MyDate = new Date(dateFromBackend);

      var MyDateString =
        MyDate.getFullYear() +
        "-" +
        ("0" + (MyDate.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + MyDate.getDate()).slice(-2);

      console.log("Date is " + MyDateString);
      return MyDateString;
    },
  },
};
</script>

<style scoped>
.delete-delivery-text {
  color: rgb(182, 63, 63);
}

#form-holder {
  align-items: flex-start;
}

.tab-selector {
  height: 3rem;
}

::-webkit-scrollbar {
  width: 0px;
}
</style>
