<script>
// Component responsible for displaying the selected Digimon's image
// and providing user interactions such as marking it as a favorite
// or navigating between Digimon entries.
export default {
  name: 'DisplayDigimon',

  // Events emitted to the parent component
  emits: ['prev', 'next'],

  props: {
    // Image URL passed from the parent component
    img: String,
  },

  data() {
    return {
      // Tracks whether the displayed Digimon is marked as a favorite.
      // This is local state (for now).
      isFavorite: false,
    }
  },

  methods: {
    // Toggles the favorite icon state
    toggleFavorite() {
      this.isFavorite = !this.isFavorite
    },
  },
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
            icon
            :color="isFavorite ? 'red' : 'grey'"
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
  max-width: 65%;
  height: auto;
}

.button-column {
  display: flex;
  flex-direction: column;
  margin: 1rem;
  gap: 1rem;
}

.circle-btn {
  background-color: var(--bg-gradient-bottom) !important;
  color: white !important;
  border-radius: 50%;
}
</style>
