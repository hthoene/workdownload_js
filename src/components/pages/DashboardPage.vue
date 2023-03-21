<template>
  <DefaultCard>
    <template #title>
      <IconTitle>
        <template #icon
          ><img src="../../assets/blue_lock.svg" class="icon-l"
        /></template>
        <template #heading>
          <h1>Dashboard</h1>
          <p>Manage your deliveries for your clients.</p>
        </template>
      </IconTitle>
    </template>
    <template #default>
      <LoadingIndicator v-if="loading"></LoadingIndicator>
      <div class="full-width full-height">
        <div class="full-width" id="delivery-tab">
          <TabElement
            option1="Open"
            option2="Delivered"
            option3="Paused"
            :selection="filterSelection"
            @select="selectFilter"
          ></TabElement>
        </div>

        <div class="spacer-l"></div>
        <div
          class="column full-width delivery-scroll-view"
          v-if="visibleDeliveries.length > 0"
        >
          <table class="delivery-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Client-Email</th>
                <th>Delivery Date</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <DeliveryItem
                v-for="d in visibleDeliveries"
                :key="d.id"
                :title="d.title"
                :clientEmail="d.clientEmail"
                :deliveryDate="d.deliveryDateText"
                class="delivery-item"
                :deliveries="deliveries"
                :id="d.id"
              >
              </DeliveryItem>
            </tbody>
          </table>
        </div>
        <div v-else>
          <div class="spacer-s"></div>
          <img src="../../assets/empty-box.svg" class="icon-xxl" />
          <p>
            There is nothing to show yet. Please create your first delivery with
            the button below.
          </p>
          <div class="spacer-s"></div>
        </div>
        <div class="spacer-l"></div>
        <div class="full-width">
          <CustomButton mode="default" @click="createDelivery">
            <img src="../../assets/page_white.svg" class="icon-m" />
            <div class="spacer-s"></div>
            <span>Create new Delivery</span>
          </CustomButton>
        </div>
      </div>
    </template>
  </DefaultCard>
</template>

<script>
import DeliveryItem from "../element/DeliveryItem.vue";
import LoadingIndicator from "../element/LoadingIndicator.vue";
import CustomButton from "../layout/CustomButton.vue";
import DefaultCard from "../layout/DefaultCard.vue";
import IconTitle from "../layout/IconTitle.vue";
import TabElement from "../layout/TabElement.vue";

export default {
  data() {
    return {
      deliveries: [],
      visibleDeliveries: [],
      filterSelection: 1,
      loading: true,
    };
  },
  methods: {
    createDelivery() {
      this.$router.replace("/create");
    },
    selectFilter(num) {
      var filterFor = "NONE";
      var filterFor2 = "NONE";
      var filterFor3 = "NONE";

      if (num == 1) {
        filterFor = "CLIENT_PAID";
        filterFor2 = "WAITING_FOR_PAYMENT";
        filterFor3 = "OPEN";
      } else if (num == 2) {
        filterFor = "DELIVERED";
      } else {
        filterFor = "PAUSED";
      }

      this.visibleDeliveries = this.deliveries.filter(
        (delivery) =>
          delivery.deliveryStatus == filterFor ||
          delivery.deliveryStatus == filterFor2 ||
          delivery.deliveryStatus == filterFor3
      );

      this.filterSelection = num;
    },
  },
  components: {
    DefaultCard,
    IconTitle,
    TabElement,
    DeliveryItem,
    CustomButton,
    LoadingIndicator,
  },
  mounted() {
    this.$store
      .dispatch("post", {
        url: "api/v1/delivery/getAll",
        auth: true,
      })
      .then((data) => {
        this.deliveries = data;
        this.selectFilter(1);
        this.loading = false;
      });
  },
};
</script>

<style scoped>
.delivery-table {
  border-collapse: collapse;
  font-size: 0.9rem;
  border-radius: 0.3rem;
  overflow: hidden;
}

th,
td {
  resize: none;
  overflow: auto;
  width: min-content;
  height: 100%;
}

.delivery-table thead tr {
  background-color: #f2f3f4;
  color: rgb(89, 89, 92);
  font-weight: 400;

  text-align: left;
}

.delivery-table th,
.delivery-table td {
  padding: 12px 15px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: 500;
}

.delivery-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.delivery-table tbody tr:nth-of-type(even) {
  background-color: #f2f3f4;
}

.delivery-table tbody tr:last-of-type {
  border-bottom: 2px solid #59595a27;
}

@media only screen and (max-width: 600px) {
  .delivery-table tbody tr:last-of-type {
    border-bottom: none;
  }
}

#delivery-tab {
  height: 4rem;
}

.delivery-scroll-view {
  overflow-y: scroll;
  max-height: 25rem;
  width: 100%;
  overflow-x: hidden;
}

::-webkit-scrollbar {
  width: 0px;
  height: 3px;
}

.delivery-item:not(:last-child) {
  margin-bottom: 0.6rem;
}

@media only screen and (max-width: 600px) {
  .delivery-scroll-view {
    overflow-y: scroll;
    overflow: auto;
  }
}
</style>
