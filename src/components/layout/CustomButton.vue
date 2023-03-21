<template>
  <div>
    <button id="custom-button" :class="mode" :disabled="isDisabled">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["mode", "submode"],
  computed: {
    isDisabled() {
      return this.submode == "disabled";
    },
  },
};
</script>

<style scoped>
#custom-button {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 0.8rem;
}

.delete {
  transition: all 0.1s;
  color: rgb(204, 103, 103);
  border-radius: 0.4rem;
  background-color: transparent;
  height: 2rem;
  border: none;
  font-weight: 500;
}

.delete:hover {
  color: rgb(175, 87, 87);
}

.add,
.manage {
  background-color: transparent;
  border: none;
  color: #0038ff;
  padding: 0;
  border-radius: 0.4rem;
  transition: all 0.2s;
  font-size: 1rem;
  font-weight: 500;
}

.manage {
  font-weight: 600;
}

.add:hover,
.manage:hover {
  color: rgb(53, 53, 53);
}

.submit {
  padding: 1rem 2rem;
  background-color: #0038ff;
  border-radius: 2rem;
  color: white;
  border: none;
  font-weight: 500;
}

.default {
  height: 3rem;
  padding: 0.75rem 2rem;
  background-color: #4682da;
  border-radius: 0.3rem;
  color: white;
  border: none;
  font-weight: 500;

  border-width: 2px;
  border-style: none;
  transition: all 0.1s;
}

.default:disabled {
  background-color: rgb(189, 187, 187);
}

.default:disabled:hover {
  background-color: rgb(160, 45, 45);
}

.default:hover {
  padding: 0.75rem 2rem;
  background-color: #3d6fbb;
}

.defaultDelete {
  height: 3rem;
  padding: 0.75rem 2rem;
  background-color: rgb(204, 103, 103);
  border-radius: 0.3rem;
  color: white;
  border: none;
  font-weight: 500;

  border-width: 2px;
  border-style: none;
  transition: all 0.1s;
}

.defaultDelete:disabled {
  background-color: rgb(126, 47, 47);
}

.defaultDelete:disabled:hover {
  background-color: rgb(97, 31, 31);
}

.defaultDelete:hover {
  padding: 0.75rem 2rem;
  background-color: rgb(168, 85, 85);
}

.more {
  height: 3rem;
  padding: 0.75rem 2rem;
  background-color: #d5e4fa;
  border-radius: 0.3rem;
  color: #537ec0;
  border: none;
  font-weight: 500;
  border-width: 2px;
  border-style: none;
  transition: all 0.1s;
}

.more:disabled {
  background-color: rgb(180, 53, 53);
}

.more:disabled:hover {
  background-color: rgb(160, 45, 45);
}

.more:hover {
  padding: 0.75rem 2rem;
  background-color: #b9cce9;
}

.cancel {
  height: 3rem;
  padding: 0.75rem 2rem;
  background-color: transparent;
  border-radius: 0.3rem;
  color: #4682da;
  border-style: solid;
  font-weight: 500;
  border-width: 1px;
  border-color: #4682da;
  transition: all 0.1s;
}

.cancel:disabled {
  background-color: rgb(180, 53, 53);
}

.cancel:disabled:hover {
  background-color: rgb(160, 45, 45);
}

.cancel:hover {
  padding: 0.75rem 2rem;
  background-color: rgb(248, 248, 248);
}

.icon {
  background-color: transparent;
  border-radius: 2rem;
  border-color: transparent;
  width: 2rem;
  height: 2rem;
  transition: all 0.1s;
}

.icon:hover {
  background-color: #2e2e2e;
}

.flat {
  background-color: transparent;
  border-radius: 0.3rem;
  color: #838586;
  border: none;
  font-weight: 500;
}

.path {
  background-color: transparent;
  border-radius: 0.3rem;
  color: #bababa;
  border: none;
  font-weight: 500;
}

.path:hover {
  text-decoration: underline;
}

.icon-text,
.icon-text {
  padding: 0;
  color: #0038ff;
  background-color: transparent;
  border: none;
}
</style>
