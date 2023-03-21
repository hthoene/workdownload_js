<template>
  <div>
    <h3>Delivery Admin Manage</h3>
    <div class="spacer-s"></div>
    <LoadingIndicator v-if="loading"></LoadingIndicator>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Last Download</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="d in oldDeliveries" :key="d.id">
          <td>{{ d.id }}</td>
          <td>{{ d.lastAccess }}</td>
          <td>
            <CustomButton mode="default"><span>Move To HDD</span></CustomButton>
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import LoadingIndicator from "@/components/element/LoadingIndicator.vue";
import CustomButton from "@/components/layout/CustomButton.vue";

export default {
  components: { LoadingIndicator, CustomButton },
  data() {
    return {
      loading: true,
      oldDeliveries: [],
    };
  },
  mounted() {
    this.$store
      .dispatch("post", {
        url: "api/v1/admin/delivery/getOldDeliveries/2",
        auth: true,
        body: null,
      })
      .then((resp) => {
        console.log(resp);
        this.oldDeliveries = resp;
        this.loading = false;
      })
      .catch(() => {});
  },
};
</script>

<style scoped>
.delivery-item {
  padding: 1rem;
  border-radius: 0.4rem;
  margin-bottom: 0.8rem;
}
</style>
