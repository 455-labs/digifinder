<script>
// ---------------------------------------------------------
// DisplayDigimon.vue
// ---------------------------------------------------------
// This component displays the currently selected Digimon's image,
// provides navigation controls (previous/next), and allows the user
// to add or remove the Digimon from their favorites.
//
// The component supports:
// - Displaying the Digimon image passed through props
// - Toggling the "favorite" status for the active Digimon
// - Synchronizing favorite status across the entire application
// - Emitting navigation events for parent-level control
// ---------------------------------------------------------

import { i18n } from '@/stores/translation'

export default {
  name: 'DisplayDigimon',

  // Events emitted to the parent (e.g., App.vue or container)
  emits: ['prev', 'next'],

  // Props received from parent:
  // - img: URL of the Digimon image
  // - id: numerical Digimon identifier
  props: {
    img: String,
    id: Number,
  },

  data() {
    return {
      // List of IDs corresponding to Digimon marked as favorites
      // by the user. This list is loaded from localStorage.
      favoriteDigimons: [],
    }
  },

  created() {
    // Load any previously saved favorites from localStorage.
    // This ensures that the component initializes with the
    // correct persisted favorite state.
    const saved = localStorage.getItem("favoriteDigimons")
    if (saved) {
      this.favoriteDigimons = JSON.parse(saved)
    }
  },

  mounted() {
    // Listen for a "favorite-updated" event broadcast globally.
    // This ensures that if another component modifies the favorites
    // list, this component stays synchronized.
    window.addEventListener("favorite-updated", this.syncFavorites)
  },

  beforeUnmount() {
    // Remove the global event listener to prevent memory leaks.
    window.removeEventListener("favorite-updated", this.syncFavorites)
  },

  methods: {
    // ---------------------------------------------------------
    // TOGGLE FAVORITE
    // ---------------------------------------------------------
    // Adds or removes the current Digimon (this.id) from the local
    // favorites list. This method:
    // - updates the internal array
    // - persists changes to localStorage
    // - broadcasts a global update event
    // ---------------------------------------------------------
    toggleFavorite() {
      if (this.favoriteDigimons.includes(this.id)) {
        // Remove from favorites by filtering the ID out
        this.favoriteDigimons = this.favoriteDigimons.filter(
          digimonId => digimonId !== this.id
        )
        console.log("Removed from favorites!")
      } else {
        // Add the ID to favorites
        this.favoriteDigimons.push(this.id)
        console.log("Added to favorites!")
      }

      // Save the updated favorites list to localStorage
      localStorage.setItem(
        "favoriteDigimons",
        JSON.stringify(this.favoriteDigimons)
      )

      // Notify other components that the favorites list has changed
      window.dispatchEvent(new Event("favorite-updated"))
    },

    // Synchronizes the local favorites list with the value stored
    // in localStorage. This is called when another component updates
    // the global favorites list.
    syncFavorites() {
      const saved = localStorage.getItem("favoriteDigimons")
      this.favoriteDigimons = saved ? JSON.parse(saved) : []
    },
  },

  computed: {
    // Returns true if the currently displayed Digimon is part of
    // the user's favorites. The computed property keeps the UI
    // in sync with the favorites list.
    isFavorite() {
      return this.favoriteDigimons.includes(this.id)
    }
  },

  setup() {
    // Expose the translation store inside the template.
    return { i18n }
  }
}
</script>


<template>
  <!-- Main Digimon display card -->
  <div class="digimon-card">
    <!-- Digimon image -->
    <img :src="img" alt="Digimon image" class="digimon-img" />

    <!-- Button column (favorite, previous, next) -->
    <div class="button-column">

      <!-- Favorite toggle with tooltip -->
      <v-tooltip open-on-hover bottom>
        <template #activator="{ props }">
          <v-btn
            class="favorite-btn"
            :class="{ active: isFavorite }"
            icon
            @click="toggleFavorite"
            v-bind="props"
            :title="isFavorite ? 'Unlike' : 'Like'"
            :aria-pressed="isFavorite"
          >
            <v-icon>{{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
          </v-btn>
        </template>
        <span>{{ isFavorite ? i18n.dict.unfavorite  :  i18n.dict.favorite }}</span>
      </v-tooltip>

      <!-- Previous Digimon button with tooltip -->
      <v-tooltip open-on-hover bottom>
        <template #activator="{ props }">
          <v-btn icon class="circle-btn" @click="$emit('prev')" v-bind="props" title="Previous">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </template>
        <span>{{ i18n.dict.prev }}</span>
      </v-tooltip>

      <!-- Next Digimon button with tooltip -->
      <v-tooltip open-on-hover bottom>
        <template #activator="{ props }">
          <v-btn icon class="circle-btn" @click="$emit('next')" v-bind="props" title="Next">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </template>
        <span>{{ i18n.dict.next }}</span>
      </v-tooltip>
    </div>
  </div>
</template>

<style scoped>
/*
  Digimon display card:
  - Main container for image and controls
  - Uses flexible layout for responsive design
  - Styled as a themed card with shadow and rounded corners
*/
.digimon-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: var(--surface-card);
  border-radius: 12px;
  margin: 1rem auto;
  padding: 1.5rem;
  width: 100%;
  min-height: 350px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

/*
  Digimon image:
  - Keeps original aspect ratio
  - Scales responsively within the card
*/
.digimon-img {
  margin: 1rem;
  object-fit: contain;
  border: 1px solid black;
  max-width: 90%;
  height: auto;
}

/*
  Button container:
  - Holds favorite and navigation buttons
  - Layout changes based on screen size
*/
.button-column {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 1rem;
  gap: 1rem;
}

/*
  Favorite button styling:
  - Visual distinction between active and inactive states
*/
.favorite-btn {
  background-color: var(--favorite-btn) !important;
  color: var(--btn-symbol-color) !important;
}

.favorite-btn.active {
  background-color: var(--favorite-btn-active) !important;
  color: var(--btn-symbol-color) !important;
}

/*
  Navigation buttons (previous / next)
*/
.circle-btn {
  background-color: var(--arrow-btn) !important;
  color: var(--btn-symbol-color) !important;
}

/*
  Responsive adjustments (mobile-first)
  - Switches card layout to horizontal
  - Stacks action buttons vertically
*/
@media (min-width: 600px) {
  .digimon-card {
    flex-direction: row;
    justify-content: space-between;
    min-height: 350px;
  }

  .digimon-img {
    max-width: 65%;
    margin: 1rem;
  }

  .button-column {
    flex-direction: column;
    gap: 1rem;
    margin: 1rem;
  }
}
</style>
