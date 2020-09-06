<script>
const MAXIMUM_FRACTION_DIGITS = 15;
export default {
  computed: {
    localeDecimalSeparator() {
      return (0.5).toLocaleString().match(/\D/)[0] || ",";
    },
    maximumFractionDigits() {
      return MAXIMUM_FRACTION_DIGITS;
    }
  },

  methods: {
    toLocaleString(
      number,
      options = {
        locale: "ru-RU",
        maximumFractionDigits: MAXIMUM_FRACTION_DIGITS
      }
    ) {
      const { locale, ...settings } = options;
      console.log(locale, settings);
      return number.toLocaleString(locale, settings);
    }
  }
};
</script>
