<template>
  <div id="tab-element" class="bg-white-2 row">
    <div
      v-if="option1"
      class="element row center"
      @click="select(1)"
      :class="{ selected: selection == 1 }"
    >
      <p>{{ option1 }}</p>
    </div>
    <div
      v-if="option2"
      class="element row center"
      :class="{ selected: selection == 2 }"
      @click="select(2)"
    >
      <p>{{ option2 }}</p>
    </div>
    <div
      v-if="option3"
      class="element row center"
      @click="select(3)"
      :class="{ selected: selection == 3 }"
    >
      <p>{{ option3 }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["option1", "option2", "option3", "selection"],
  components: {},
  emits: ["select"],
  methods: {
    select(num) {
      this.$emit("select", num);
    },
  },
};
</script>

<style scoped>
#tab-element {
  height: 100%;
  width: 100%;
  justify-content: space-evenly;
  padding: 0.4rem;
  border-radius: 0.4rem;
}

.element {
  padding: 0.4rem;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: all 0.1s;
}

.element:hover {
  background-color: #e1e3e4;
}

.element.selected:hover {
  background-color: rgb(250, 250, 250);
}

.element p {
  font-size: 0.85rem;
  font-weight: 500;
}

.selected {
  background-color: white;
  box-shadow: 1px 1px 5px 1px #28282909;
}
</style>
