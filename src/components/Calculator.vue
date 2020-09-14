<template>
  <form
    name="calculator"
    :class="$style.wrapper"
    class="calculator"
    @submit.prevent="apply"
  >
    <input v-model="expression" type="hidden" />
    <span data-cy="buffer" class="calculator__buffer" :class="$style.buffer">
      <bdi v-html="expressionToShow" />
    </span>
    <output class="calculator__result" :class="$style.result">
      <bdi v-html="resultToShow" />
    </output>
    <button
      v-for="{ name, text, value, operator, area, style } of buttons"
      :key="name"
      :name="name"
      :value="value"
      :class="{ [buttonClass(style)]: style }"
      :style="buttonStyle(area)"
      type="submit"
      class="calculator__button"
      @click.prevent="onButtonClick({ name, value, operator })"
      @keypress.enter.prevent
    >
      {{ text }}
    </button>
  </form>
</template>

<script>
import buttons from "../config/calculator-buttons";
import LocaleFormat from "../mixins/LocaleFormat";

export default {
  name: "Calculator",

  mixins: [LocaleFormat],

  data() {
    return {
      expression: "",
      result: 0
    };
  },

  mounted() {
    document.addEventListener("keydown", this.onDocumentKeyUp);
  },

  beforeDestroy() {
    document.removeEventListener("keydown", this.onDocumentKeyUp);
  },

  watch: {
    expression(expressionString) {
      let result;
      if (expressionString === "") {
        result = 0;
        this.result = result;
      }
      try {
        result = eval(expressionString);
        this.result = Number(result.toFixed(this.maximumFractionDigits));
      } catch (e) {
        // eslint-disable-next-line
        console.info(e.message);
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
          case mathSign === "+":
            return " + ";
          case mathSign === "*":
            return " × ";
          case mathSign === "/":
            return " ÷ ";
          case mathSign === "-":
            return " − ";
          case mathSign === "Infinity":
            return "∞";
        }
      };
      return (
        "&nbsp;" +
        this.expression
          .replace(".", this.localeDecimalSeparator)
          .replace(/(\*{2})/g, "^")
          .replace(/\*{1}|\/|-|\+|Infinity/g, replaceMathSign)
      );
      // .replace(/\d+(?:\.\d+)?/g, number =>
      //   this.toLocaleString(Number(number))
      // );
    },
    resultToShow() {
      return this.toLocaleString(this.result);
    },
    buttonStyle() {
      return area => ({ gridArea: area });
    },
    buttonClass() {
      return modificator => `calculator__button--${modificator}`;
    }
  },

  methods: {
    onDocumentKeyUp({ key }) {
      switch (true) {
        case /F\d/.test(key):
          break;
        case /(\d|%|\/|\*|-|\+)/.test(key):
          this.expression += key;
          break;
        case /Backspace/.test(key):
          this.expression = this.expression.slice(
            0,
            this.expression.length - 1
          );
          break;
        case /Enter|=/.test(key):
          this.apply();
          break;
        case /Escape/.test(key):
          this.reset();
          break;
        default:
          break;
      }
    },
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
      this.expression = this.expression === "" ? "" : this.result.toString();
    },
    reset() {
      this.expression = "";
      this.result = 0;
    },
    percent() {
      if (this.expression.length < 2) return;

      const [value, percentValue] = this.expression
        .match(/\d+(?:\.\d+)?/g) // all numbers
        .slice(-2);
      const calculatedPercent = (Number(value) * Number(percentValue)) / 100;

      this.expression = this.expression.replace(
        /(\d+(?:\.\d+)?)(?!.*\d)/, // last number
        calculatedPercent.toString()
      );
    },
    plusMinus() {
      this.expression = this.expression.replace(
        /(\d+(?:\.\d+)?)(?!.*\d)/, // last number
        match => `(-${match})`
      );
    }
  }
};
</script>

<style lang="scss" module>
.wrapper {
  display: grid;
  grid-template-areas:
    "bfr bfr bfr bfr"
    "res res res res"
    "rst plm prc div"
    "nb7 nb8 nb9 mul"
    "nb4 nb5 nb6 mns"
    "nb1 nb2 nb3 pls"
    "nm0 nm0 spr eql";
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: min-content min-content repeat(5, 1fr);
  gap: 1px;
}
.buffer {
  grid-area: bfr;
}
.result {
  grid-area: res;
}
</style>
