<template>
  <form @submit.prevent="apply" @keyup.esc="reset">
    <div class="display__wrapper">
      <label for="display-input" class="display__stack">
        {{ expressionToShow }}
      </label>
      <input
        v-model="expression"
        class="display__input"
        id="display-input"
        type="text"
        autofocus
      />
      <!-- Catch up and ignore click event fired on form submit -->
      <input class="display__fake-submit" type="submit" />
    </div>
    <br />
    <span>{{ resultToShow }}</span>
    <br />
    <button
      :name="name"
      :value="value"
      :key="name"
      v-for="{ name, text, value, operator } of buttons"
      type="submit"
      @click.prevent="onButtonClick({ name, value, operator })"
    >
      {{ text }}
    </button>
  </form>
</template>

<script>
import buttons from "./config/buttons";
import FormatNumber from "./mixins/FormatNumber";

export default {
  name: "Calc",

  mixins: [FormatNumber],

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
    },
    expressionToShow() {
      const replaceMathSign = mathSign => {
        switch (true) {
          case mathSign === "*":
            return "×";
          case mathSign === "/":
            return "÷";
          case mathSign === "-":
            return "−";
          case mathSign === "Infinity":
            return "∞";
        }
      };
      return this.expression
        .replace(".", this.decimalSeparator)
        .replace(/(\*{2})/g, "^")
        .replace(/\*{1}|\/|-|Infinity/g, replaceMathSign);
    },
    resultToShow() {
      return this.toLocaleString(this.lastResult);
    }
  },

  methods: {
    onButtonClick({ name, value }) {
      if (value) {
        this.expression += value.toString();
      } else {
        if (typeof this[name] !== "function") {
          throw ReferenceError(`Button handler called "${name}" doesn't exist`);
        }
        this[name]();
      }
    },
    apply() {
      this.expression =
        this.expression === "" ? "" : this.lastResult.toString();
    },
    reset() {
      this.expression = "";
      this.lastResult = 0;
    },
    percent() {
      const [value, percentValue] = this.expression
        .match(/\d+(?:\.\d+)?/g) // all numbers
        .slice(-2);
      const calculatedPercent = (Number(value) * Number(percentValue)) / 100;

      this.expression = this.expression.replace(
        /(\d+(?:\.\d+)?)(?!.*\d)/, // last number
        calculatedPercent.toString()
      );
    }
  }
};
</script>

<style lang="scss">
html {
  box-sizing: border-box;
}

*,
*::after,
*::before {
  box-sizing: inherit;
}

body {
  font-family: "Fira code", sans-serif;
  font-size: 2em;
  font-weight: bolder;
  padding: 1em;
}

input,
button,
select {
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
}

.display {
  &__wrapper {
    display: flex;
  }
  &__stack {
    width: 50%;
    padding: 0.25em;
    text-align: right;
    background: lightcoral;
  }
  &__input {
    width: 50%;
    // width: 1px;
    padding: 0.25em;
    margin: 0;
    // outline: none;
    background: #ccc;
    border: none;
    text-align: right;
  }
  &__fake-submit {
    display: none;
  }
}
</style>
