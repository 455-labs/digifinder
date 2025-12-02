<script>
// Component responsible for displaying the selected Digimon's image
// and providing user interactions such as marking it as a favorite
// or navigating between Digimon entries.
export default {
  name: 'DisplayDigimon',

  // Events emitted to the parent
  emits: ['prev', 'next'],

  // Image URL, id Number passed from the parent component
  props: {
    img: String,
    id: Number,
  },

  data() {
    return {
      // Array containing favorite digimons as array
      favoriteDigimons: [],
    }
  },

  created() {
    // Loads favorites from local storage
    const saved = localStorage.getItem("favoriteDigimons")
    if (saved) {
      this.favoriteDigimons = JSON.parse(saved)
    }
  },

  mounted() {
    // Listen for "favorite-updated" events from anywhere in the app
    window.addEventListener("favorite-updated", this.syncFavorites)
  },

  beforeUnmount() {
    window.removeEventListener("favorite-updated", this.syncFavorites)
  },

  methods: {
    // Toggles the favorite icon state
    toggleFavorite() {
      if (this.favoriteDigimons.includes(this.id)) {
        // Removes digimon from favourise
        this.favoriteDigimons = this.favoriteDigimons.filter(
          digimonId => digimonId !== this.id
        )
        console.log("Removed from favorites!")
      } else {
        // Adds digimon to favourites
        this.favoriteDigimons.push(this.id)
        console.log("Added to favorites!")
      }

      // Updates local storage
      localStorage.setItem(
        "favoriteDigimons",
        JSON.stringify(this.favoriteDigimons)
      )

      window.dispatchEvent(new Event("favorite-updated"))
    },

    syncFavorites() {
      const saved = localStorage.getItem("favoriteDigimons")
      this.favoriteDigimons = saved ? JSON.parse(saved) : []
    },
  },

  computed: {
    // Computed property checks always if digimon is in favorites
    isFavorite() {
      return this.favoriteDigimons.includes(this.id)
    }
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
        <span>{{ isFavorite ? 'Unlike' : 'Like' }}</span>
      </v-tooltip>

      <!-- Previous Digimon button with tooltip -->
      <v-tooltip open-on-hover bottom>
        <template #activator="{ props }">
          <v-btn icon class="circle-btn" @click="$emit('prev')" v-bind="props" title="Previous">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </template>
        <span>Previous</span>
      </v-tooltip>

      <!-- Next Digimon button with tooltip -->
      <v-tooltip open-on-hover bottom>
        <template #activator="{ props }">
          <v-btn icon class="circle-btn" @click="$emit('next')" v-bind="props" title="Next">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </template>
        <span>Next</span>
      </v-tooltip>
    </div>
  </div>
</template>

<style scoped>
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

.digimon-img {
  margin: 1rem;
  object-fit: contain;
  border: 1px solid black;
  max-width: 90%;
  height: auto;
}

.button-column {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 1rem;
  gap: 1rem;
}

.favorite-btn {
  background-color: var(--favorite-btn) !important;
  color: var(--btn-symbol-color) !important;
}

.favorite-btn.active {
  background-color: var(--favorite-btn-active) !important;
  color: var(--btn-symbol-color) !important;
}

.circle-btn {
  background-color: var(--arrow-btn) !important;
  color: var(--btn-symbol-color) !important;
}

/* MOBILE-FIRST */
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
