<script>
// SearchBar component: handles user-provided search queries
// and emits events upward for the parent to handle.
// This component does NOT communicate with the API directly —
// it only collects user actions and passes them upward.
export default {
  name: 'SearchBar',

  data() {
    return {
      // Bound to the text field; stores the user's search query
      query: '',
    }
  },

  methods: {
    // Triggered when the user clicks the "Search" button.
    // For now, logs the query but can later be connected to an API call
    searchDigimon() {
      console.log('Searching:', this.query)
      this.$emit('search', this.query)
    },

    // Random Digimon selection button.
    // Emit a random request upward
    randomDigimon() {
      this.$emit('random')
    },
  },
}
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
    -->
    <v-text-field
      v-model="query"
      label="Search Digimon..."
      variant="solo"
      clearable
      prepend-inner-icon="mdi-magnify"
      class="search-input"
      @keyup.enter="searchDigimon"
    />

    <!--
      Row of action buttons: Search and Random.
      Buttons share styling via the "digibtn" class.
    -->
    <div class="button-row">
      <v-btn class="digibtn" variant="flat" @click="searchDigimon">Search</v-btn>
      <v-btn class="digibtn" variant="flat" @click="randomDigimon">Random</v-btn>
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
</style>
