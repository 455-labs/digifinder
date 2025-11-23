<script>
// Simple header component responsible for displaying the application logo
// and optional UI controls such as language selection or dark mode toggles.
export default {
  name: 'HeaderComponent',
}
</script>

<template>
  <!--
    The main header element. Uses a horizontal flex layout to position
    left-side controls, the centered logo, and right-side controls.
  -->
  <header class="app-header">
    <!-- Placeholder for tools such as language switcher -->
    <div class="left-slot">
      <!-- language selection -->
    </div>

    <!-- Main application logo with decorative ASCII-style text -->
    <h1 class="logo">DIGIFINDER</h1>

    <!-- Placeholder for additional controls such as dark mode toggle -->
    <div class="right-slot">
      <!-- darkModeButton -->
    </div>
  </header>
</template>

<style scoped>
/*
  Header container: sticks to the top and visually separates the
  application from the rest of the layout. The flex layout centers
  the logo while reserving space for controls on both sides.
*/
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.25rem 1rem;
  background-color: var(--color-2-mid);
  border-bottom: 1px solid #000000;
}

/*
  Logo styling: large monospace title with a vertical gradient.
  The gradient is clipped inside the text, producing a stylized
  "painted" or "metallic" effect. Flex: 1 keeps it centered.
*/
.logo {
  margin: 0;
  text-align: center;
  flex: 1;
  font-size: 2rem;
  font-family: Consolas, monospace;
  background: linear-gradient(to bottom, var(--color-1-light), var(--color-1-dark));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 2px var(--color-2-dark);
}

/*
  Slots that hold optional interactive components (language selector,
  dark mode button, etc.). Both sides have equal width to preserve
  symmetry around the centered logo.
*/
.left-slot,
.right-slot {
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
