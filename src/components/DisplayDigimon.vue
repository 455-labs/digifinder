<script>
// Component responsible for displaying the selected Digimon's image
// and providing user interactions such as marking it as a favorite
// or navigating between Digimon entries.
export default {
  name: 'DisplayDigimon',

  props: {
    // (Optional) Image source passed from a parent component.
    // Currently not used in the template, but included for future extensibility.
    img: String,
  },

  data() {
    return {
      // Tracks whether the displayed Digimon is marked as a favorite.
      // This is purely local state for now and can later be emitted to the parent.
      isFavorite: false,
    }
  },

  methods: {
    // Toggles the favorite state.
    // Future expansion: emit an event to inform the parent about the change.
    toggleFavorite() {
      this.isFavorite = !this.isFavorite
      // this.$emit("saveFavorite", this.isFavorite)
    },
  },
}
</script>

<template>
  <!--
    Main card containing the Digimon image and the action buttons.
    The styling and layout are handled in the scoped CSS.
  -->
  <div class="digimon-card">
    <!--
      Digimon image display.
      Currently uses a static test image; in the future, this can be replaced
      with the "img" prop once the API integration is complete.
    -->
    <img :src="img" alt="Digimon image" class="digimon-img" />

    <!--
      Vertical stack of interactive buttons:
      - Favorite toggle
      - Previous Digimon
      - Next Digimon
      The navigation buttons currently have no logic attached.
    -->
    <div class="button-column">
      <!-- Favorite toggle button.
           Color and icon change based on isFavorite state. -->
      <v-btn icon :color="isFavorite ? 'red' : 'grey'" @click="toggleFavorite">
        <v-icon>
          {{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}
        </v-icon>
      </v-btn>

      <!-- Previous Digimon button (placeholder) -->
      <v-btn icon class="circle-btn">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <!-- Next Digimon button (placeholder) -->
      <v-btn icon class="circle-btn">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
/*
  Card container that holds the Digimon image and action buttons.
  - Light background based on theme variables
  - Rounded corners for a modern card design
  - Centered horizontally with a fixed maximum width
*/
.digimon-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-2-light);
  border-radius: 12px;
  margin: 1rem auto;
  padding: 1.5rem;
  width: 100%;
  min-height: 350px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

/*
  Digimon image styling:
  - Contained scaling to prevent distortion
  - Small border for definition
  - Margin for spacing inside the card
*/
.digimon-img {
  margin: 1rem;
  object-fit: contain;
  border: 1px solid black;
  max-width: 65%;
  height: auto;
}

/*
  Column layout for the action buttons.
  - Vertical stacking
  - Even spacing between buttons
*/
.button-column {
  display: flex;
  flex-direction: column;
  margin: 1rem;
  gap: 1rem;
}

/*
  Simple circular button style for navigation controls.
  Uses the app’s theme color for consistency.
*/
.circle-btn {
  background-color: var(--color-1-dark) !important;
  color: white !important;
  border-radius: 50%;
}
</style>
