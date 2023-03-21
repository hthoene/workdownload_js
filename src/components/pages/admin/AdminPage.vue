<template>
  <DefaultCard>
    <template #title>
      <IconTitle>
        <template #icon
          ><img src="../../../assets/blue_lock.svg" class="icon-l"
        /></template>

        <template #heading>
          <h1>Admin Panel</h1>
          <p class="">This is the admin panel</p>
        </template>
      </IconTitle>
    </template>
    <template #default>
      <TabElement
        option1="Stats"
        option2="Deliveries"
        option3="Beta"
        :selection="selection"
        @select="changeTab"
      ></TabElement>
      <div class="spacer-s"></div>
      <div class="tab-container full-width full-height">
        <KeepAlive>
          <component :is="getPage" />
        </KeepAlive>
      </div>
    </template>
  </DefaultCard>
</template>

<script>
import DefaultCard from "@/components/layout/DefaultCard.vue";
import IconTitle from "@/components/layout/IconTitle.vue";
import TabElement from "@/components/layout/TabElement.vue";
import BetaCodeGenerator from "./BetaCodeGenerator.vue";
import DeliveryAdminManage from "./DeliveryAdminManage.vue";
import StatsView from "./StatsView.vue";

export default {
  components: {
    DefaultCard,
    IconTitle,
    TabElement,
  },
  data() {
    return {
      selection: 1,
    };
  },
  computed: {
    getPage() {
      switch (this.selection) {
        case 1:
          return StatsView;
        case 2:
          return DeliveryAdminManage;
        case 3:
          return BetaCodeGenerator;
      }
      return DeliveryAdminManage;
    },
  },
  methods: {
    changeTab(index) {
      this.selection = index;
    },
  },
};
</script>

<style scoped>
.tab-container {
  padding: 1rem;
  outline-style: solid;
  outline-width: 1px;
  outline-color: rgb(218, 218, 218);
  border-radius: 0.4rem;
}
</style>
