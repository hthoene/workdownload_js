<template>
  <div id="custom-input" :class="'column ' + mode">
    <p v-if="customUrlError" id="customUrlErrorMessage" class="redError">
      {{ message }}
    </p>
    <label :for="label" class="text-dark-1">{{ getFullLabel }}</label>

    <p id="error-message" v-if="showError">
      {{ message }}
    </p>
    <div v-if="mode != 'custom-url'" class="spacer-s"></div>
    <div class="relative full-width">
      <div
        class="password-eye pointer"
        v-if="type == 'password'"
        @click="togglePassword"
      >
        <img src="../../assets/view.svg" class="icon-s" />
      </div>
      <input
        :type="finalType"
        :id="label"
        :placeholder="placeholder"
        @input="onInput"
        v-model="myInput"
        :class="{ redError: customUrlError, 'bg-white-2': true }"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "label",
    "type",
    "placeholder",
    "modelValue",
    "mode",
    "message",
    "default",
    "optional",
    "showByDefault",
  ],
  components: {},
  data() {
    return { myInput: "", finalType: "text" };
  },
  computed: {
    currentInput() {
      return this.modelValue;
    },
    showError() {
      return this.message != "" && this.mode != "custom-url";
    },
    customUrlError() {
      return this.message != "" && this.mode == "custom-url";
    },
    getFullLabel() {
      if (this.optional) {
        return this.label + " (Optional)";
      } else {
        return this.label;
      }
    },
  },
  mounted() {
    if (this.showByDefault) {
      this.finalType = "text";
    } else {
      this.finalType = this.type;
    }

    if (this.default) {
      this.myInput = this.default;
    }
  },
  methods: {
    onInput() {
      this.$emit("update:modelValue", this.myInput);
    },
    togglePassword() {
      if (this.finalType == "text") {
        this.finalType = "password";
      } else {
        this.finalType = "text";
      }
    },
  },
};
</script>

<style scoped>
#customUrlErrorMessage {
  position: absolute;
  transform: translate(0px, -1.7rem);
  font-size: 0.8rem;
  font-weight: bold;
}

.redError {
  color: rgb(221, 68, 68) !important;
}

#custom-input {
  position: relative;
  width: 100%;
  align-items: flex-start;
}

label {
  font-size: 0.8rem;
}

.custom-url {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
}

.custom-url input {
  font-size: 0.8rem;
  height: 100%;
  background-color: transparent;
  border-style: none;
  padding: 0;
  border: none;
  color: white;
  font-weight: 400;
  width: 100%;
}

.custom-url input:placeholder-shown {
  color: white;
  border-color: red;
}

.default input {
  width: 100%;
  height: 3rem;
  padding: 0rem 1rem;
  font-size: 0.95rem;
  border-style: none;
  border-width: 1px;
  border-radius: 0.2rem;
  color: rgb(81, 83, 83);
  font-weight: 500;
}

.default input::placeholder {
  font-weight: 400;
  color: rgb(180, 183, 185);
}

.default input:focus:not(:placeholder-shown),
.default input:active:not(:placeholder-shown) {
  border: none;
  color: rgb(96, 99, 102);
  font-weight: 500;
}

.password-eye {
  right: 1rem;
  top: 0.8rem;
  position: absolute;
}

.password-eye img {
  transition: all 0.2s;
}

.password-eye:hover img {
  transform: scale(1.1);
}
</style>
