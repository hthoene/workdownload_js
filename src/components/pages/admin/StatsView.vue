<template>
  <div class="full-width">
    <h3>Stats</h3>
    <div class="spacer-s"></div>
    <LoadingIndicator v-if="loading"></LoadingIndicator>
    <div class="table-holder full-width" v-else>
      <table class="full-width">
        <thead>
          <tr>
            <th>Users</th>
            <th>Used Storage</th>
            <th>Free Storage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ users }}</td>
            <td>{{ storageUsedText }}</td>
            <td>{{ storageFreeText }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="spacer-m"></div>
    <LoadingIndicator v-if="storageLoading"></LoadingIndicator>
    <ProgressIndicator
      v-else
      :total="storageTotalText"
      :progress="storageProgress"
    ></ProgressIndicator>
  </div>
</template>

<script>
import LoadingIndicator from "@/components/element/LoadingIndicator.vue";
import ProgressIndicator from "@/components/element/ProgressIndicator.vue";

export default {
  components: { LoadingIndicator, ProgressIndicator },
  data() {
    return {
      users: 0,
      storageUsedText: "",
      storageFreeText: "",
      storageTotalText: "",
      totalDiskStorageUsed: 0,
      loading: true,
      storageUsed: 0,
      storageTotal: 0,
      storageLoading: true,
    };
  },
  mounted() {
    this.$store
      .dispatch("post", {
        url: "api/v1/stats/userAmount",
        auth: true,
        body: null,
      })
      .then((message) => {
        this.users = message.message;
        this.loading = false;
      })
      .catch((error) => {
        console.log(error);
      });

    this.$store
      .dispatch("post", {
        url: "api/v1/stats/storageStats",
        auth: true,
        body: null,
      })
      .then((message) => {
        this.storageUsedText = message.storageUsedText;
        this.storageTotalText = message.storageTotalText;
        this.storageFreeText = message.storageFreeText;
        this.storageTotal = message.storageTotal;
        this.storageUsed = message.storageUsed;
        this.totalDiskStorageUsed = message.totalDiskStorageUsed;
        this.storageLoading = false;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  computed: {
    storageProgress() {
      console.log("USED: " + this.storageUsed);
      console.log("TOTAL: " + this.storageTotal);

      let value = (this.totalDiskStorageUsed / this.storageTotal) * 100;
      console.log("PROGRESS: " + value);
      return value;
    },
  },
};
</script>

<style scoped>
.table-holder {
  overflow-y: auto;
}

::-webkit-scrollbar {
  height: 5px;
}

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
  font-size: 0.9rem;
}

thead tr {
  background-color: #f2f3f4;
  color: rgb(89, 89, 92);
  font-weight: 400;

  text-align: left;
}

th,
td {
  padding: 12px 15px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-weight: 500;
}

tbody tr {
  border-bottom: 1px solid #dddddd;
}

tbody tr:nth-of-type(even) {
  background-color: #f2f3f4;
}

tbody tr:last-of-type {
  border-bottom: 2px solid #59595a27;
}

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
</style>
