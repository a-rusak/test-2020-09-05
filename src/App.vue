<template>
  <div :class="$style.app">
    <header class="app__header">
      <h1>Calculator</h1>
    </header>
    <main class="app__main" :class="$style.main">
      <Calculator />
    </main>
    <footer class="app__footer">
      <Theme />
    </footer>
  </div>
</template>

<script>
import Calculator from "./components/Calculator";

const currentTheme = "default";

export default {
  name: "App",

  components: {
    Calculator,
    Theme() {
      return import(`./themes/theme-${currentTheme}`);
    }
  },
  computed: {
    theme() {
      return currentTheme;
    }
  }
};
</script>

<style lang="scss" module>
.app {
  display: grid;
  grid-template-rows: min-content 1fr min-content;
  height: 100vh;
}
.main {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
