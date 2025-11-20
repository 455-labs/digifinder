<script>
import SearchBar from './SearchBar.vue'
import DisplayDigimon from './DisplayDigimon.vue'
import DigimonData from './DigimonData.vue'
export default {
  components: { SearchBar, DigimonData, DisplayDigimon },
}
</script>

<template>
  <main class="main">
    <SearchBar />
    <DisplayDigimon />
    <DigimonData
      name="Allomon"
      :index="265"
      level="Adult"
      attribute="Data"
      type="Dinosaur"
      :fields="['Nature Spirits', 'Dragon’s Roar']"
    />
  </main>
</template>
