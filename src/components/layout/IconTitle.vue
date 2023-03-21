<template>
  <div class="column" id="title-column">
    <div class="column center" id="circle-icon-holder">
      <slot name="icon"></slot>
    </div>
    <div class="spacer-m"></div>
    <slot name="heading"></slot>
    <div class="spacer-m"></div>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style scoped>
#circle-icon-holder {
  height: 4rem;
  width: 4rem;
  border-radius: 500rem;
  background-color: #d9e3f2;
  justify-content: center;
  align-items: center;
}

#title-column {
  align-items: flex-start;
}

@media only screen and (max-width: 600px) {
  #title-column {
    align-items: center;
  }
}
</style>
