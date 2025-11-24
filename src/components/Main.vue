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

    // Stores the currently displayed Digimon.
    // Starts as "null" and is filled once the user searches
    // or when a random Digimon is loaded on page startup.
    const activeDigimon = ref(null)

    // These values will hold the smallest and largest Digimon IDs
    // available from the API (needed for random selection).
    const minId = ref(null)
    const maxId = ref(null)

    // -----------------------------------------------------------
    // Load Digimon ID Boundaries (min/max)
    // -----------------------------------------------------------
    // This function fetches all Digimon from the API and determines
    // the lowest and highest Digimon ID numbers available.
    // These values are required for random Digimon functionality.
    async function loadBounds() {
      const bounds = await fetchDigimonBounds()
      minId.value = bounds.min
      maxId.value = bounds.max
    }

    // -----------------------------------------------------------
    // Handle Search Input
    // -----------------------------------------------------------
    // This function runs when SearchBar emits a "search" event.
    // The "query" is the user input (name or ID).
    // If found, the Digimon is stored in activeDigimon.
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
    // Uses the preloaded min and max Digimon IDs to pick a random one.
    // Once selected, the data is fetched from the API and displayed.
    async function fetchRandomDigimon() {
      if (minId.value === null || maxId.value === null) return

      // Pick a random integer between [minId, maxId]
      const randomId = Math.floor(Math.random() * (maxId.value - minId.value + 1)) + minId.value

      const data = await fetchDigimon(randomId)
      activeDigimon.value = data
    }

    // -----------------------------------------------------------
    // Auto-run when page loads
    // -----------------------------------------------------------
    // onMounted() runs only once, after the component is fully loaded.
    // Here we:
    // 1) Load the min/max Digimon ID boundaries
    // 2) Immediately fetch a random Digimon
    onMounted(async () => {
      await loadBounds()
      await fetchRandomDigimon()
    })

    // -----------------------------------------------------------
    // Expose the data and functions to the template
    // -----------------------------------------------------------
    return {
      activeDigimon,
      onSearch,
      fetchRandomDigimon,
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
      <DisplayDigimon :img="activeDigimon?.images?.[0]?.href" />

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
  background: linear-gradient(to bottom, var(--color-1-light), var(--color-1-dark));
  padding: 1rem;
}
</style>
