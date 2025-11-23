<script>
export default {
  name: 'FooterComponent',
}
</script>

<template>
  <footer class="app-footer">
    <p class="copyright">&copy;2025 - 455 Labs &#127825;</p>
  </footer>
</template>

<style scoped>
.app-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.5rem;
  background-color: var(--color-1-light);
  border-top: 1px solid #000000;
  font-family: Consolas, monospace;
}
</style>
