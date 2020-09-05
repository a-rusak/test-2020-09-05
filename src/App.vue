<template>
  <div>
    <form @submit.prevent="apply" @keyup.esc="reset">
      <input type="text" v-model="expression" autofocus />
      <input type="submit" v-show="false" />
      <br />
      <span>{{ lastResult }}</span>
      <br />
      <button
        :name="name"
        :value="value"
        :key="name"
        v-for="{ name, text, value } of buttons"
        type="submit"
        @click="onButtonClick({ name, value })"
      >
        {{ text }}
      </button>
    </form>
  </div>
</template>

<script>
// import { evaluate } from "mathjs";

const buttons = [
  {
    name: "reset",
    text: "C"
  },
  {
    name: "apply",
    text: "="
  }
];

export default {
  name: "Calc",

  data() {
    return {
      expression: "",
      lastResult: 0
    };
  },

  watch: {
    expression(expressionString) {
      let lastResult;
      if (expressionString === "") {
        lastResult = 0;
        this.lastResult = lastResult;
      }
      try {
        lastResult = eval(expressionString);
        this.lastResult = Number(lastResult.toFixed(15));
      } catch (e) {
        console.log(e.message);
      }
    }
  },

  computed: {
    buttons() {
      return buttons;
    }
  },

  methods: {
    onButtonClick({ name, value }) {
      if (value === undefined) {
        this[name]();
      }
    },
    apply() {
      console.log("apply");
      this.expression = this.expression === "" ? "" : this.lastResult;
    },
    reset() {
      console.log("reset");
      this.expression = "";
      this.lastResult = 0;
    }
  }
};
</script>

<style lang="scss">
body {
  font-family: "Myriad Pro", sans-serif;
}

input {
  font-family: inherit;
}
</style>
