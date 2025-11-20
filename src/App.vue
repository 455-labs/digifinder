<script>
import HeaderComponent from './components/Header.vue'
import MainComponent from './components/Main.vue'
import FooterComponent from './components/Footer.vue'

export default {
  components: {
    HeaderComponent,
    MainComponent,
    FooterComponent,
  },
}
</script>

<template>
  <div class="app">
    <HeaderComponent />
    <MainComponent />
    <FooterComponent />
  </div>
</template>
