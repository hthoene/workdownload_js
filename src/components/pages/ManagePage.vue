<template>
  <DefaultCard>
    <template #title>
      <IconTitle>
        <template #icon
          ><img src="../../assets/blue_lock.svg" class="icon-l"
        /></template>
        <template #heading>
          <h1>Manage Delivery</h1>
          <p>Please choose an option to continue.</p>
        </template>
      </IconTitle>
    </template>
    <template #default>
      <div class="spacer-s"></div>

      <div class="full-width row">
        <CustomButton class="equal" mode="default" @click="editData"
          ><span>Edit Data</span></CustomButton
        >
        <div class="spacer-m"></div>
        <CustomButton class="equal" mode="default" @click="editFiles"
          ><span>Upload Files</span></CustomButton
        >
        <div class="spacer-m"></div>
        <CustomButton class="equal" mode="default" @click="sendEmails"
          ><span>Send Emails</span></CustomButton
        >
      </div>

      <div class="spacer-l"></div>
      <label class="label">Choose Status</label>
      <div class="spacer-s"></div>
      <div class="full-width tab-selector">
        <TabElement
          option1="Open"
          option2="Delivered"
          option3="Paused"
          :key="selectedKey"
          :selection="selectedStatus"
          @select="onSelectStatus"
        >
        </TabElement>
      </div>
      <EditUrlPage></EditUrlPage>
      <div class="spacer-m"></div>
      <div class="full-width">
        <CustomButton mode="cancel" @click="goBack"
          ><span>Back</span></CustomButton
        >
      </div>
    </template>
  </DefaultCard>
</template>

<script>
import CustomButton from "../layout/CustomButton.vue";
import DefaultCard from "../layout/DefaultCard.vue";
import IconTitle from "../layout/IconTitle.vue";
import TabElement from "../layout/TabElement.vue";
import EditUrlPage from "./EditUrlPage.vue";

export default {
  components: { DefaultCard, IconTitle, CustomButton, EditUrlPage, TabElement },
  data() {
    return {
      selectedStatus: 1,
      deliveryStatus: "",
      selectedKey: 57279,
    };
  },
  watch: {
    selectedStatus() {
      this.selectedKey += 1;
    },
  },
  methods: {
    goBack() {
      this.$router.replace("/dashboard");
    },
    sendEmails() {
      this.$router.replace("/email");
    },
    editFiles() {
      this.$router.replace("/files");
    },
    editData() {
      this.$router.replace("/edit");
    },
    editUrl() {
      this.$router.replace("/share");
    },

    onSelectStatus(statusId) {
      console.log("SELCTION STATUS: " + statusId);
      this.selectedStatus = statusId;
      switch (statusId) {
        case 1:
          this.deliveryStatus = "OPEN";
          break;
        case 2:
          this.deliveryStatus = "DELIVERED";
          break;
        case 3:
          this.deliveryStatus = "PAUSED";
          break;
      }
      this.onSave();
    },
    onSave() {
      this.$store
        .dispatch("post", {
          auth: true,
          url: "api/v1/delivery/update",
          body: {
            id: this.delivery.id,
            deliveryStatus: this.deliveryStatus,
          },
        })
        .then((message) => {
          this.$store.dispatch("setDelivery", message);
        });
    },
    setSelectedStatus(index) {
      this.selectedStatus = index;
    },
  },
  computed: {
    delivery() {
      return this.$store.state.delivery.delivery;
    },
  },
  mounted() {
    this.$store.dispatch("init").then(() => {
      console.log("DELIVERY LOADED IS");
      console.log(this.delivery);
      switch (this.delivery.deliveryStatus) {
        case "OPEN":
          this.setSelectedStatus(1);
          break;
        case "DELIVERED":
          this.setSelectedStatus(2);
          break;
        case "PAUSED":
          this.setSelectedStatus(3);
          break;
      }
      console.log("Loaded from init: " + this.selectedStatus);
    });
  },
};
</script>

<style scoped>
.circle-button-holder {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.button-holder {
  width: 100%;
  justify-content: space-evenly;
}

.circle-button {
  cursor: pointer;
  display: flex;
  background-color: #4682da;
  border-radius: 5rem;
  width: 5rem;
  height: 5rem;
  align-items: center;
  justify-content: center;
  transition: all 0.1s;
}

.circle-button:hover {
  background-color: #4177c9;
  transform: scale(1.03);
}
</style>
