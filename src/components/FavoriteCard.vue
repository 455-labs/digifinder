<script>
/**
 * FavoriteCard.vue
 * -----------------
 * A small, reusable component for displaying a single
 * Digimon entry inside the FavoritesDialog.
 *
 * The component shows:
 *  ✔ The Digimon's image
 *  ✔ The Digimon's name
 *  ✔ A delete (trash) button to remove it from favorites
 *
 * Interaction behavior:
 *  - Clicking anywhere on the card (except the trash icon)
 *    selects the Digimon → emitted as "select"
 *
 *  - Clicking the trash icon removes the Digimon from favorites
 *    → emitted as "remove"
 *
 * This keeps the card lightweight and purely UI-driven, while the
 * FavoritesDialog handles the actual logic, API calls, storage updates, etc.
 */
import { i18n } from '@/stores/translation'

export default {
  name: 'FavoriteCard',

  props: {
    /**
     * digimon (Object)
     * ----------------
     * Contains full Digimon data fetched from the API:
     *   - id
     *   - name
     *   - images[]
     *
     * This is provided by FavoritesDialog, which controls
     * both lazy loading and the API fetching logic.
     */
    digimon: Object
  },

  emits: [
    /**
     * "remove"
     * ----------
     * Emitted when the user clicks the trash icon.
     * Parent component must remove the Digimon from:
     *   - favorites array
     *   - loaded items
     *   - localStorage
     */
    'remove',

    /**
     * "select"
     * --------
     * Emitted when the user clicks the card area.
     * Parent will load and display the chosen Digimon
     * in the main screen.
     */
    'select'
  ],

  setup() {
    return { i18n }
  }
}
</script>

<template>
  <!--
    Card wrapper
    ------------
    - Entire card is clickable for selection.
    - "cursor: pointer" reinforces that behavior.
    - The trash button uses @click.stop to avoid triggering selection.
  -->
  <v-card
    class="favorite-card d-flex justify-space-between align-center pa-3"
    style="cursor: pointer;"
    @click="$emit('select', digimon.id)"
  >
    <!-- LEFT SIDE: Digimon thumbnail + name with tooltip -->
    <div class="d-flex align-center">
      <img
        :src="digimon.images[0]?.href"
        alt="Digimon image"
        width="60"
        height="60"
        style="object-fit: contain; margin-right: 1rem;"
      />

      <v-tooltip bottom>
        <template #activator="{ props }">
          <span v-bind="props" style="cursor: pointer;">
      <strong>{{ digimon.name }}</strong>
      </span>
    </template>
    <span>{{ i18n.dict.inspect }}</span>
  </v-tooltip>
  </div>

    <!-- RIGHT SIDE: Delete button with tooltip -->
    <!--
      @click.stop prevents the click event from bubbling up
      to the card’s main click handler.
    -->
      <v-tooltip bottom>
        <template #activator="{ props }">
    <v-btn
      class="remove"
      icon
      @click.stop="$emit('remove', digimon.id)"
      v-bind="props"
      >
      <v-icon>mdi-trash-can-outline</v-icon>
    </v-btn>
  </template>
  <span>{{ i18n.dict.remove }}</span>
</v-tooltip>
  </v-card>
</template>

<style scoped>
.favorites-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  padding: +.5rem;
}

.favorite-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5rem 1rem;
  width: 100%;
  gap: 0.5rem;
  cursor: pointer;
  background-color: var(--favorite-card) !important;
}

.favorite-card img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-right: 0.5rem;
}

.favorite-card strong {
  font-size: 1rem;
  color: var(--text-primary) !important;
}

.favorite-card .remove {
  margin-left: auto;
  background-color: var(--favorite-card) !important;
}

.favorite-card:hover {
  filter: brightness(0.90);
  transition: 0.2s ease;
}

/* TABLET / DESKTOP */
@media (min-width: 600px) {
  .favorites-container {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
  }

  .favorite-card {
    width: 100%;
    flex-direction: row;
    align-items: center;
  }

  .favorite-card .remove {
    align-self: center;
    background-color: var(--bg-gradient-bottom) !important;
    color:  var(--text-primary)  !important;
  }
}
</style>
