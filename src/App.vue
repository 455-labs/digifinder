<script>
// Importing the top-level layout components.
// These represent the main structural sections of the application.
import HeaderComponent from './components/Header.vue'
import MainComponent from './components/Main.vue'
import FooterComponent from './components/Footer.vue'

export default {
  // Registering the imported components so they can be used in the template.
  components: {
    HeaderComponent,
    MainComponent,
    FooterComponent,
  },
}
</script>

<template>
  <!--
    Root container for the entire application.
    The global ".app" class defines the layout as a vertical flexbox
    that stretches from top to bottom of the viewport.
  -->
  <div class="app">
    <!-- The top header bar, containing the logo and optional UI controls -->
    <HeaderComponent />

    <!-- Main content area: search bar, selected Digimon image, and info panel -->
    <MainComponent />

    <!-- Footer displayed at the bottom of the page -->
    <FooterComponent />
  </div>
</template>
