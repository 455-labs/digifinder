<script>
// SearchBar component: handles user-provided search queries
// and emits events upward for the parent to handle.
// This component does NOT communicate with the API directly —
// it only collects user actions and passes them upward.
import { i18n } from '@/stores/translation'

export default {
  name: 'SearchBar',

  // Uses min/max indexes which are exported from src/components/Main.vue
  props: {
    minId: Number,
    maxId: Number,
    suggestions: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      query: '',
      error: '', // Error message to UI
    }
  },

  methods: {
    searchDigimon() {
      const value = this.query.trim();
      this.error = '';

      // 1) Search using id value, regex checks if every character is number
      if (/^\d+$/.test(value)) {
        const num = Number(value);

      if (num < this.minId || num > this.maxId) {
        this.error = `Index has to be between ${this.minId}-${this.maxId}.`;

        this.$emit('toast', this.error);
        return;
      }

        // Valid numeric search to emits search to Main.vue
        this.$emit('search', num);
        return;
      }

      // 2) Search using name
      if (value.length < 3) {
        this.error = 'Minimum length for Digimon name is 3 characters.';
        this.$emit('toast', this.error);
        return;
      }

      if (value.length > 55) {
        this.error = 'Maximum length for Digimon name is 55 characters.';
        this.$emit('toast', this.error);
        return;
      }

      // Valid name to search that is emitted to Main.vue
      this.$emit('search', value);
    },

    randomDigimon() {
      this.$emit('random');
    },
  },

  setup() {
    return { i18n }
  }
};
</script>

<template>
  <!--
    Wrapper for the search interface.
    Centers the input field and buttons in a vertical layout.
  -->
  <div class="search-wrapper">
    <!--
      Vuetify input field with:
      - v-model binding to "query"
      - built-in clear button
      - search icon
      - "solo" variant for a cleaner look
      - "enter" key to search
    -->

    <!-- Autocomplete / search field -->
     <v-autocomplete
      v-model="query"
      :items="suggestions"
      :label="i18n.dict.label"
      variant="solo"
      clearable
      prepend-inner-icon="mdi-magnify"
      class="search-input"
      hide-no-data
      hide-details
      @keyup.enter="searchDigimon"
    />

    <!--
      Row of action buttons: Search and Random.
      Buttons share styling via the "digibtn" class.
    -->
    <div class="button-row">
      <v-btn class="digibtn" variant="flat" @click="searchDigimon">{{ i18n.dict.search }}</v-btn>
      <v-btn class="digibtn" variant="flat" @click="randomDigimon">{{ i18n.dict.random }}</v-btn>
    </div>
  </div>
</template>

<style scoped>
/*
  Layout wrapper for the search area.
  Aligns items to the center and adds spacing around the content.
*/
.search-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0;
}

/* Width of the search input field (main search box) */
.search-input {
  width: 100%;
  padding: 1rem  0;
}

/* Horizontal row for action buttons, with spacing between them */
.button-row {
  display: flex;
  gap: 1rem;
  width: 100%;
}

/* Ensures both buttons grow equally to fill the row */
.button-row > * {
  flex: 1;
  width: 100%;
}

/*
  Base styling for both buttons.
  Uses application theme colors defined in CSS variables.
*/
.digibtn {
  background-color: var(--bg-gradient-bottom) !important;
  color: var(--text-primary) !important;
  font-weight: 600;
  letter-spacing: 0.5px;
  border-radius: 8px;
  transition: 0.2s;
}

/* Hover effect: lighter highlight */
.digibtn:hover {
  background-color: var(--surface-card) !important;
}

/* Active state: uses mid tone color for feedback */
.digibtn:active {
  background-color: var(--header-bg) !important;
}

/* Customizes Vuetify's ripple effect color */
.digibtn .v-ripple__animation {
  background-color: var(--header-bg) !important;
}

@media (min-width: 600px) {
  .button-row {
    flex-direction: row;
  }
}
</style>
