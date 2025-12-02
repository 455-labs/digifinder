<script>
/**
 * FavoritesDialog.vue
 * --------------------
 * This component displays the user’s saved Digimon favorites
 * inside a Vuetify modal dialog. The dialog supports:
 *
 *  ✔ Lazy loading (loads 10 Digimon at a time)
 *  ✔ Infinite scroll inside the dialog
 *  ✔ Removing favorites from the list
 *  ✔ Selecting a Digimon to load it in the main view
 *  ✔ Automatic updates when the dialog is reopened
 *  ✔ Theme-aware styling (light/dark mode)
 *
 * "favorites" is persisted in localStorage as an array of Digimon IDs.
 */

import { ref, onMounted, watch, computed } from 'vue'
import FavoriteCard from './FavoriteCard.vue'
import { fetchDigimon } from '@/api/digimonApi.js'

export default {
  name: 'FavoritesDialog',
  components: { FavoriteCard },

  // The parent listens for this event to load a selected Digimon.
  emits: ['select', 'update:modelValue'],

  props: {
    // v-model binding: true = open, false = closed
    modelValue: Boolean
  },

  setup(props, { emit }) {
    /**
     * dialogOpen
     * ----------
     * A computed wrapper around v-model.
     * This ensures two-way binding works cleanly:
     *
     *   parent → dialog   (open/close)
     *   dialog → parent   (emit update)
     */
    const dialogOpen = computed({
      get: () => props.modelValue,
      set: (val) => emit('update:modelValue', val)
    })

    /**
     * favorites
     * ---------
     * Raw list of IDs loaded from localStorage.
     */
    const favorites = ref([])

    /**
     * loadedItems
     * -----------
     * Contains the actual Digimon objects fetched via API.
     * Only a portion of `favorites` is loaded at a time.
     */
    const loadedItems = ref([])

    /**
     * batchSize
     * ---------
     * Number of Digimon to load per scroll.
     */
    const batchSize = 10

    /**
     * currentIndex
     * ------------
     * Pointer to how many Digimon have already been loaded.
     * Example:
     *   0 → 10
     *   10 → 20
     *   20 → 30
     */
    const currentIndex = ref(0)

    /**
     * onMounted()
     * ---------------------
     * Runs once when the component is mounted.
     * Loads the favorites from localStorage and fetches the first batch.
     */
    onMounted(() => {
      const saved = localStorage.getItem('favoriteDigimons')
      if (saved) {
        favorites.value = JSON.parse(saved)
      }
      loadNextBatch()
    })

    /**
     * Watch dialog opening
     * ---------------------
     * Whenever the parent sets modelValue = true,
     * the dialog is reopening → reload everything.
     *
     * This ensures:
     *   - Removals are reflected
     *   - Additions are reflected
     *   - Lazy load starts fresh each time
     */
    watch(() => props.modelValue, (newVal) => {
      if (newVal) {
        const saved = localStorage.getItem('favoriteDigimons')
        favorites.value = saved ? JSON.parse(saved) : []

        // Reset all lazy load data
        loadedItems.value = []
        currentIndex.value = 0

        loadNextBatch()
      }
    })

    /**
     * loadNextBatch()
     * ---------------------------------------------
     * Loads the next group of Digimon from favorites.
     * If the user has a huge amount of favorites (1000+),
     * only the necessary objects are loaded at a time.
     */
    function loadNextBatch() {
      const nextSlice = favorites.value.slice(
        currentIndex.value,
        currentIndex.value + batchSize
      )

      // Nothing left to load
      if (nextSlice.length === 0) return

      // Fetch Digimon objects for the next slice of IDs
      Promise.all(nextSlice.map(id => fetchDigimon(id)))
        .then(results => loadedItems.value.push(...results))
        .catch(() => {})

      // Move lazy load pointer forward
      currentIndex.value += batchSize
    }

    /**
     * onScroll()
     * -------------------------------------------
     * Custom infinite scroll implementation.
     * Vuetify 3 removed <v-infinite-scroll>, so we manually
     * detect when the scroll container is near the bottom.
     */
    function onScroll(e) {
      const target = e.target

      // Load next items if user scrolls within 150px from bottom
      if (target.scrollTop + target.clientHeight >= target.scrollHeight - 150) {
        loadNextBatch()
      }
    }

    /**
     * removeFavorite(id)
     * -----------------------------------------------
     * Removes a Digimon from both:
     *   - favorites list
     *   - loadedItems list
     *
     * Then updates localStorage and emits a global event
     * so DisplayDigimon.vue can update the heart icon.
     */
    function removeFavorite(id) {
      // Remove ID from the favorites array
      favorites.value = favorites.value.filter(f => f !== id)

      // Remove the Digimon object from the loaded list
      loadedItems.value = loadedItems.value.filter(d => d.id !== id)

      // Save updated list
      localStorage.setItem('favoriteDigimons', JSON.stringify(favorites.value))

      // Notify all components that favorites changed
      window.dispatchEvent(new Event('favorite-updated'))
    }

    /**
     * chooseDigimon(id)
     * -----------------------------------------------
     * Called when the user clicks a Digimon card.
     *
     * Behavior:
     *   1. Emit "select" → parent loads that Digimon
     *   2. Close the dialog immediately
     */
    function chooseDigimon(id) {
      emit('select', id)
      dialogOpen.value = false
    }

    return {
      dialogOpen,
      favorites,
      loadedItems,
      loadNextBatch,
      removeFavorite,
      chooseDigimon,
      onScroll
    }
  }
}
</script>

<template>
  <!-- Dialog wrapper -->
  <v-dialog v-model="dialogOpen" max-width="500">
    <v-card class="favorites-list">
      <v-card-title class="text-h6">
        Favorite Digimons
      </v-card-title>

      <!-- Scrollable content container -->
      <v-card-text
        class="favorites-scroll"
        @scroll="onScroll"
      >
        <div class="favorites-container">
          <!-- Render each Digimon card -->
          <FavoriteCard
            v-for="digimon in loadedItems"
            :key="digimon.id"
            :digimon="digimon"
            @remove="removeFavorite"
            @select="chooseDigimon"
          />
        </div>
      </v-card-text>

      <!-- Close button -->
      <v-card-actions>
        <v-btn color="primary" block @click="dialogOpen = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
/* ---------------------------------------------
   FAVORITES DIALOG STYLING (THEMED)
   --------------------------------------------- */

/* Main card background + text color based on theme */
.favorites-list {
  background-color: var(--surface-card) !important;
  color: var(--text-primary) !important;
}

/* Title inherits theme heading color */
.favorites-list .v-card-title {
  color: var(--text-heading) !important;
  font-weight: bold;
}

/* Scroll container styling */
.favorites-scroll {
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 8px;
}

/* Items stacked vertically with spacing */
.favorites-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Close button styled with theme color */
.favorites-list .v-btn {
  color: var(--text-heading) !important;
}

@media (max-width: 400px) {
  .favorites-scroll {
    max-height: 50vh;
  }
}

@media (min-width: 800px) {
  .v-dialog {
    max-width: 700px;
  }
}
</style>
