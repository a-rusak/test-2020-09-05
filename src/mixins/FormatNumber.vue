<script>
export default {
  computed: {
    decimalSeparator() {
      return (0.5).toLocaleString().match(/\D/)[0] || ",";
    }
  },

  methods: {
    toLocaleString(number, { locale = "ru-RU", options = {} } = {}) {
      return number.toLocaleString(locale, options);
    }
  }
};
</script>
