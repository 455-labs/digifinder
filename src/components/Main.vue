<script>
// -------------------------------------------------------------
// Main.vue
// -------------------------------------------------------------
// Central controller component of the application. This component
// coordinates all Digimon-related logic, including input handling,
// data fetching, navigation, and image preloading.
//
// Key responsibilities:
// - Receive and process search and random events from SearchBar.vue
// - Fetch Digimon data from the DigiAPI helper functions
// - Maintain the currently displayed Digimon's reactive state
// - Determine and store the minimum/maximum valid Digimon IDs
// - Automatically load a random Digimon when the page initializes
// -------------------------------------------------------------

import SearchBar from './SearchBar.vue'
import DisplayDigimon from './DisplayDigimon.vue'
import DigimonData from './DigimonData.vue'
import { i18n } from '@/stores/translation'

// Vue Composition API utilities:
// ref(): defines reactive values
// onMounted(): runs once when the component is initially rendered
import { ref, onMounted } from 'vue'

// API helper utilities located in src/api/digimonApi.js
import { fetchDigimon, fetchDigimonBounds } from '@/api/digimonApi.js'

export default {
  components: { SearchBar, DigimonData, DisplayDigimon },

  setup(_, { emit }) {
    // -----------------------------------------------------------
    // Reactive State Values
    // -----------------------------------------------------------

    // Holds the currently active Digimon. Updated via API calls.
    const activeDigimon = ref(null)

    // Range of valid Digimon IDs, retrieved from DigiAPI.
    const minId = ref(null)
    const maxId = ref(null)

    /**
     * Emits a toast message upward to App.vue.
     * @param {string} msg - The notification text.
     */
    function toast(msg) {
      emit('toast', msg)
    }

    /**
     * Fetches Digimon data and ensures the image is preloaded
     * before updating the visible Digimon. Prevents UI flicker
     * and ensures a smoother user experience.
     *
     * @param {string|number} idOrQuery - Digimon ID or name.
     */
    async function loadDigimonWithPreload(idOrQuery) {
      try {
        const data = await fetchDigimon(idOrQuery)

        if (!data || !data.id) {
          emit('toast', 'Digimon not found!')
          return null
        }

        const imgUrl = data.images?.[0]?.href

        // If no image is provided, update immediately.
        if (!imgUrl) {
          activeDigimon.value = data
          return data
        }

        // Preload the image before updating state.
        await new Promise((resolve) => {
          const img = new Image()
          img.onload = resolve
          img.src = imgUrl
        })

        activeDigimon.value = data
        return data

      } catch (err) {
        emit('toast', 'Unable to contact Digimon API')
        return null
      }
    }

    // -----------------------------------------------------------
    // Load Digimon ID Boundaries (min/max)
    // -----------------------------------------------------------
    // Fetches the full ID range once on startup. Used later for
    // random selection and next/previous navigation.
    async function loadBounds() {
      const bounds = await fetchDigimonBounds()
      minId.value = bounds.min
      maxId.value = bounds.max
    }

    // -----------------------------------------------------------
    // Handle Search Input
    // -----------------------------------------------------------
    // Resolves searches originating from SearchBar.vue.
    async function onSearch(query) {
      if (!query) {
        emit('toast', 'Please enter a Digimon name')
        return
      }

      const result = await loadDigimonWithPreload(query)

      if (!result) {
        emit('toast', 'Digimon not found!')
      }
    }

    // -----------------------------------------------------------
    // Fetch a Random Digimon
    // -----------------------------------------------------------
    // Uses the known ID range to generate a random valid ID.
    async function fetchRandomDigimon() {
      if (minId.value === null || maxId.value === null) {
        emit('toast', 'Unable to contact Digimon API')
        return
      }

      const randomId =
        Math.floor(Math.random() * (maxId.value - minId.value + 1)) + minId.value

      await loadDigimonWithPreload(randomId)
    }

    // -----------------------------------------------------------
    // Navigation: Show Next Digimon by ID
    // -----------------------------------------------------------
    // Wraps from max → min when reaching the end.
    async function showNextDigimon() {
      if (!activeDigimon.value) return

      let nextId = activeDigimon.value.id + 1
      if (nextId > maxId.value) nextId = minId.value

      await loadDigimonWithPreload(nextId)
    }

    // -----------------------------------------------------------
    // Navigation: Show Previous Digimon by ID
    // -----------------------------------------------------------
    // Wraps from min → max when reaching the beginning.
    async function showPreviousDigimon() {
      if (!activeDigimon.value) return

      let prevId = activeDigimon.value.id - 1
      if (prevId < minId.value) prevId = maxId.value

      await loadDigimonWithPreload(prevId)
    }

    // -----------------------------------------------------------
    // Automatic Initialization on Page Load
    // -----------------------------------------------------------
    // Loads the ID range, then immediately shows a random Digimon
    // so the interface never begins in an empty state.
    onMounted(async () => {
      await loadBounds()
      await fetchRandomDigimon()
    })

    // -----------------------------------------------------------
    // Exposed values and methods for template usage
    // -----------------------------------------------------------
    return {
      activeDigimon,
      minId,
      maxId,
      onSearch,
      fetchRandomDigimon,
      showNextDigimon,
      showPreviousDigimon,
      toast,
      i18n,
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
      <SearchBar
        :min-id="minId"
        :max-id="maxId"
        @search="onSearch"
        @random="fetchRandomDigimon"
        @toast="toast"
      />

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
