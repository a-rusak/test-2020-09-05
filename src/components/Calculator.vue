<template>
  <form
    @submit.prevent="apply"
    @keyup.esc="reset"
    class="calculator calculator--theme-default"
    :class="$style.wrapper"
  >
    <input v-model="expression" type="hidden" />
    <span
      class="calculator__stack"
      :class="$style.buffer"
      v-html="expressionToShow"
    />
    <span
      class="calculator__result"
      :class="$style.result"
      v-html="resultToShow"
    />
    <button
      :name="name"
      :value="value"
      :key="name"
      v-for="{ name, text, value, operator, area } of buttons"
      type="submit"
      :style="buttonStyle(area)"
      class="calculator__button"
      @click.prevent="onButtonClick({ name, value, operator })"
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
        this.expression
          .replace(".", this.localeDecimalSeparator)
          .replace(/(\*{2})/g, "^")
          .replace(/\*{1}|\/|-|\+|Infinity/g, replaceMathSign) + "&nbsp;"
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
      this.expression = this.expression === "" ? "" : this.result.toString();
    },
    reset() {
      this.expression = "";
      this.result = 0;
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
@mixin calc-display {
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
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
  @include calc-display;
  grid-area: bfr;
}
.result {
  @include calc-display;
  grid-area: res;
}
</style>
