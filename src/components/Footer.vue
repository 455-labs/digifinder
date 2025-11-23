<script>
// Simple footer component displayed at the bottom of the application.
// Contains minimal content: copyright text and branding.
export default {
  name: 'FooterComponent',
}
</script>

<template>
  <!--
    Application footer. Centered horizontally and styled as a small
    status bar appearing at the bottom of the layout.
  -->
  <footer class="app-footer">
    <!-- Copyright notice with a small emoji/icon -->
    <p class="copyright">&copy;2025 - 455 Labs &#127825;</p>
  </footer>
</template>

<style scoped>
/*
  Footer container: styled as a slim bar with centered text.
  Shares the same color theme as the header for visual consistency.
*/
.app-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.5rem;
  background-color: var(--color-2-mid);
  border-top: 1px solid #000000;
  font-family: Consolas, monospace;
}
</style>
