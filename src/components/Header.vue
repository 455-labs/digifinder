<script>
export default {
  name: 'HeaderComponent',
}
</script>

<template>
  <header class="app-header">
    <div class="left-slot">
      <!-- language selection -->
    </div>

    <h1 class="logo">(╯°□°)╯DIGIFINDER⸜(˃_˂｡)</h1>

    <div class="right-slot">
      <!-- darkModeButton -->
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  background-color: var(--color-1-light);
  border-bottom: 1px solid #000000;
}

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

.left-slot,
.right-slot {
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
