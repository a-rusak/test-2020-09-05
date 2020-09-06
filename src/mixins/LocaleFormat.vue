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
      params = {
        locale: "ru-RU",
        maximumFractionDigits: MAXIMUM_FRACTION_DIGITS
      }
    ) {
      const { locale, ...options } = params;
      return number.toLocaleString(locale, options);
    }
  }
};
</script>
