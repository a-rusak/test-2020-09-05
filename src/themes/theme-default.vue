<template>
  <footer>Current theme: {{ theme }}</footer>
</template>
<script>
import "./tokens/colors.css";
import "./tokens/box-shadow.css";
import "./tokens/sizes.css";

export default {
  name: "theme",
  computed: {
    theme() {
      return "default";
    }
  }
};
</script>
<style>
:root {
  --theme-color-bg: var(--pl-color-black-035);
  --theme-color-border: var(--pl-color-black-000);
  --theme-color-border-inside: var(--pl-color-white-opacity-030);
  --theme-color-text: var(--pl-color-white-100);
  --theme-radius-border: 6px;
  --theme-color-bg-button-regular: var(--pl-color-grey-052);
  --theme-color-text-button-regular: var(--pl-color-white-093);
  --theme-color-bg-button-dark: var(--pl-color-black-041);
  --theme-color-bg-button-accent: var(--pl-color-amber-060);
  --theme-color-border-button-focus: var(--pl-color-white-opacity-050);
  --theme-color-border-button-hover: var(--pl-color-white-opacity-030);
  --theme-size-padding: var(--pl-size-base);
  --theme-box-shadow: var(--pl-box-shadow-large);
  --theme-color-bg-header: var(--pl-color-white-093);
  --theme-color-border-footer: var(--pl-color-white-093);
  --theme-color-text-footer: var(--pl-color-grey-052);
  --theme-font-size-footer: calc(var(--pl-size-base) * 0.75);
  --theme-font-size-calculator: calc(var(--pl-size-base) * 2);
}
</style>
