<template>
  <DefaultCard>
    <template #title>Please wait</template>
    <template #default>
      <LoadingIndicator></LoadingIndicator>
    </template>
  </DefaultCard>
</template>

<script>
import DefaultCard from "../layout/DefaultCard.vue";
import LoadingIndicator from "./LoadingIndicator.vue";

export default {
  components: { DefaultCard, LoadingIndicator },
};
</script>
