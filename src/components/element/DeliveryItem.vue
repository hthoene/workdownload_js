<template>
  <tr>
    <td>{{ title }}</td>
    <td>{{ clientEmail }}</td>
    <td>{{ deliveryDate }}</td>

    <td>
      <div class="edit-button column center pointer" @click="editDelivery">
        <img src="../../assets/edit_white.svg" class="icon-s" />
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["title", "clientEmail", "deliveryDate", "id", "deliveries"],
  components: {},
  methods: {
    editDelivery() {
      console.log("Delivery selected:");

      var delivery = this.deliveries.filter((d) => d.id == this.id)[0];

      this.$store.dispatch("setDelivery", delivery);

      this.$router.replace("/manage");
    },
  },
};
</script>

<style scoped>
.delivery-table th,
.delivery-table td {
  padding: 12px 15px;
  text-align: left;
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

@media only screen and (max-width: 1080px) {
  .delivery-table tbody tr:last-of-type {
    border-bottom: none;
  }
}

tr td {
  max-width: 8rem;
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
