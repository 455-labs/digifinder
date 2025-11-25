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
      <!-- Favorite toggle -->
      <v-btn icon :color="isFavorite ? 'red' : 'grey'" @click="toggleFavorite">
        <v-icon>
          {{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}
        </v-icon>
      </v-btn>

      <!-- Previous Digimon button -->
      <v-btn icon class="circle-btn" @click="$emit('prev')">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <!-- Next Digimon button -->
      <v-btn icon class="circle-btn" @click="$emit('next')">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
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
