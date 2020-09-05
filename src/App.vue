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
    <span>{{ lastResult }}</span>
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
const buttons = [
  {
    name: "reset",
    text: "C"
  },
  {
    name: "apply",
    text: "="
  },
  {
    name: "plusMinus",
    text: "±"
  },
  {
    name: "minus",
    text: "−",
    value: "-"
  },
  {
    name: "plus",
    text: "+",
    value: "+"
  },
  {
    name: "multiplication",
    text: "×",
    value: "*"
  },
  {
    name: "division",
    text: "÷",
    value: "/"
  },
  {
    name: "zero",
    text: "0",
    value: "0"
  },
  {
    name: "one",
    text: "1",
    value: "1"
  },
  {
    name: "two",
    text: "2",
    value: "2"
  },
  {
    name: "delimiter",
    text: ",",
    value: "."
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
        .replace(".", ",")
        .replace(/(\*{2})/g, "^")
        .replace(/\*{1}|\/|-|Infinity/g, replaceMathSign);
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
