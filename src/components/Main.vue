<script>
// Importing the core content components used inside the main section
// of the application. Each component handles its own UI responsibility:
// - SearchBar: user input for selecting or randomizing Digimon
// - DisplayDigimon: shows the current Digimon's image and interactive buttons
// - DigimonData: displays detailed information about the selected Digimon
import SearchBar from './SearchBar.vue'
import DisplayDigimon from './DisplayDigimon.vue'
import DigimonData from './DigimonData.vue'

export default {
  components: { SearchBar, DigimonData, DisplayDigimon },
}
</script>

<template>
  <!--
    Main content area. Acts as the central visual section of the app.
    The ".main" class gives it a full-height background behind all child components.
  -->
  <main class="main">
    <div class="container">
      <!-- Search input and action buttons -->
      <SearchBar />

      <!-- Current Digimon visual representation -->
      <DisplayDigimon />

      <!-- Static demonstration of Digimon data (later dynamic) -->
      <DigimonData
        name="Allomon"
        :index="265"
        level="Adult"
        attribute="Data"
        type="Dinosaur"
        :fields="['Nature Spirits', 'Dragon’s Roar']"
      />
    </div>
  </main>
</template>

<style scoped>
/*
  Full-height main area with a vertical gradient background.
  The flex-grow behavior is inherited from the parent ".app" container,
  ensuring that this section expands to fill the available space.
*/
.main {
  flex: 1;
  background: linear-gradient(to bottom, var(--color-1-light), var(--color-1-dark));
  padding: 1rem;
}
</style>
