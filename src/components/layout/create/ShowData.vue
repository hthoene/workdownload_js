<template>
  <div class="full-width info-box">
    <p>Please check the following data and click 'Next'</p>
  </div>
  <div class="spacer-l"></div>

  <div class="full-width" v-if="!isValid">
    <div class="row">
      <p class="error">Some information is missing or invalid.</p>
    </div>
    <div class="spacer-l"></div>
  </div>

  <div class="full-width full-height">
    <table class="delivery-table">
      <thead>
        <tr>
          <th>Property</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Delivery Title</td>
          <td>{{ title }}</td>
        </tr>
        <tr>
          <td>Client's Email</td>
          <td>{{ clientEmail }}</td>
        </tr>
        <tr>
          <td>Delivery Date</td>
          <td>
            {{ deliveryDate }}
          </td>
        </tr>
        <tr>
          <td>Order Number</td>
          <td>
            {{ orderNumber }}
          </td>
        </tr>
        <tr>
          <td>Password</td>
          <td>
            {{ password }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  components: {},

  computed: {
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
    isValid() {
      return (
        this.title != "" &&
        this.orderNumber != "" &&
        this.deliveryDate != "" &&
        this.password != "" &&
        this.title &&
        this.orderNumber &&
        this.deliveryDate &&
        this.password
      );
    },
  },
};
</script>

<style scoped>
.delivery-table {
  border-collapse: collapse;
  font-size: 0.9rem;
  border-radius: 0.3rem;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  width: 100%;
}

th,
td {
  resize: none;
  overflow: auto;
  height: 100%;
  width: min-content;
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

.delivery-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.delivery-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}

.delivery-table tbody tr:last-of-type {
  border-bottom: 2px solid #4682da;
}

tr td {
  max-width: 9rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.status-badge {
  padding: 0.4rem 1rem;
  border-radius: 5rem;
  color: white;
  font-size: 0.8rem;
  background-color: rgb(145, 147, 150);
}

.edit-button {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 5rem;
  justify-content: center;
  background-color: #4682da;
  transition: all 0.1s;
}

.edit-button:hover {
  background-color: #4276c5;
  transform: scale(1.05);
}
</style>
