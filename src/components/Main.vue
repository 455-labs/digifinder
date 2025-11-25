<script>
// -------------------------------------------------------------
// Main.vue
// -------------------------------------------------------------
// This component acts as the central controller of the app.
// It connects the SearchBar, DisplayDigimon, and DigimonData
// components together and manages all Digimon fetching logic.
//
// Responsibilities:
// - Listen to search and random events from SearchBar
// - Fetch Digimon data from DigiAPI
// - Store the currently active Digimon in reactive state
// - Load min/max Digimon ID range from the API
// - Automatically fetch a random Digimon on page load
// -------------------------------------------------------------

import SearchBar from './SearchBar.vue'
import DisplayDigimon from './DisplayDigimon.vue'
import DigimonData from './DigimonData.vue'

// Vue Composition API tools:
// - ref(): creates reactive state values
// - onMounted(): runs code when the component is first loaded
import { ref, onMounted } from 'vue'

// API helper functions (located in /src/api/digimonApi.js)
import { fetchDigimon, fetchDigimonBounds } from '@/api/digimonApi.js'

export default {
  components: { SearchBar, DigimonData, DisplayDigimon },

  setup() {
    // -----------------------------------------------------------
    // Reactive State
    // -----------------------------------------------------------

    // Currently visible Digimon object (full API response).
    const activeDigimon = ref(null)

    // Minimum and maximum Digimon IDs available from the API.
    // Used for random selection and next/previous navigation.
    const minId = ref(null)
    const maxId = ref(null)

    // -----------------------------------------------------------
    // Load Digimon ID Boundaries (min/max)
    // -----------------------------------------------------------
    // Fetches the full Digimon list using a high pageSize, then
    // determines the smallest and largest available ID numbers.
    async function loadBounds() {
      const bounds = await fetchDigimonBounds()
      minId.value = bounds.min
      maxId.value = bounds.max
    }

    // -----------------------------------------------------------
    // Wrapper: Load Digimon by ID
    // -----------------------------------------------------------
    // This helper function centralizes Digimon loading by ID.
    // It updates activeDigimon and ensures all navigation logic
    // (previous, next, random) uses the same code.
    async function loadDigimonById(id) {
      const data = await fetchDigimon(id)
      activeDigimon.value = data
    }

    // -----------------------------------------------------------
    // Handle Search Input
    // -----------------------------------------------------------
    // Triggered when the SearchBar emits "search" with user input.
    // Accepts both names and IDs because the API supports both.
    async function onSearch(query) {
      if (!query) return

      try {
        const data = await fetchDigimon(query)
        activeDigimon.value = data
      } catch (err) {
        console.error('Digimon not found:', query)
      }
    }

    // -----------------------------------------------------------
    // Fetch a Random Digimon
    // -----------------------------------------------------------
    // Uses the ID range [minId, maxId] to pick a random Digimon.
    async function fetchRandomDigimon() {
      if (minId.value === null || maxId.value === null) return

      const randomId = Math.floor(Math.random() * (maxId.value - minId.value + 1)) + minId.value

      await loadDigimonById(randomId)
    }

    // -----------------------------------------------------------
    // Navigate to the next Digimon by ID
    // -----------------------------------------------------------
    // If we go beyond maxId → wrap to minId.
    function showNextDigimon() {
      if (!activeDigimon.value) return

      let nextId = activeDigimon.value.id + 1
      if (nextId > maxId.value) {
        nextId = minId.value // wrap-around
      }

      loadDigimonById(nextId)
    }

    // -----------------------------------------------------------
    // Navigate to the previous Digimon by ID
    // -----------------------------------------------------------
    // If we go below minId → wrap to maxId.
    function showPreviousDigimon() {
      if (!activeDigimon.value) return

      let prevId = activeDigimon.value.id - 1
      if (prevId < minId.value) {
        prevId = maxId.value // wrap-around
      }

      loadDigimonById(prevId)
    }

    // -----------------------------------------------------------
    // Auto-run on page load
    // -----------------------------------------------------------
    // Fetch the ID boundaries first, then immediately load
    // a random Digimon so the screen never starts empty.
    onMounted(async () => {
      await loadBounds()
      await fetchRandomDigimon()
    })

    // -----------------------------------------------------------
    // Exposed values to the template
    // -----------------------------------------------------------
    return {
      activeDigimon,
      onSearch,
      fetchRandomDigimon,
      showNextDigimon,
      showPreviousDigimon,
    }
  },
}
</script>

<template>
  <!--
    Main visual area of the application.
    The ".container" keeps everything centered and responsive.
  -->
  <main class="main">
    <div class="container">
      <!--
        SearchBar emits:
        - @search="onSearch"  → to search Digimon by user input
        - @random="fetchRandomDigimon" → to load a random Digimon
      -->
      <SearchBar @search="onSearch" @random="fetchRandomDigimon" />

      <!-- Digimon image card -->
      <DisplayDigimon
        :img="activeDigimon?.images?.[0]?.href"
        :id="activeDigimon?.id"
        @prev="showPreviousDigimon"
        @next="showNextDigimon"
      />

      <!-- Detailed data card for the current Digimon -->
      <DigimonData
        :name="activeDigimon?.name"
        :index="activeDigimon?.id"
        :level="activeDigimon?.levels?.[0]?.level"
        :attribute="activeDigimon?.attributes?.[0]?.attribute"
        :type="activeDigimon?.types?.[0]?.type"
        :fields="activeDigimon?.fields"
      />
    </div>
  </main>
</template>

<style scoped>
/*
  Main layout area:
  - fills available space
  - has a gradient background based on theme variables
  - padding ensures spacing inside the container
*/
.main {
  flex: 1;
  background: linear-gradient(to bottom, var(--bg-gradient-top), var(--bg-gradient-bottom));
  padding: 1rem;
}
</style>
