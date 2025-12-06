<script>
// SearchBar component: Handles user-provided search input and
// emits validated events upward to the parent component (Main.vue).
// This component does not interact with the API directly; it only
// processes user input and triggers search, random, and validation events.

import { i18n } from '@/stores/translation'

export default {
  name: 'SearchBar',

  // Props imported from Main.vue — represent the valid index range
  // used for validating numeric search queries.
  props: {
    minId: Number,
    maxId: Number,
  },

  data() {
    return {
      // The raw text the user enters.
      query: '',
      // Stores validation messages shown to the user.
      error: '',
    }
  },

  methods: {
    /**
     * Validates the user's search input and emits the appropriate event.
     * Supports two types of queries:
     *  - Numeric ID searches
     *  - Name-based searches
     */
    searchDigimon() {
      const value = this.query.trim()
      this.error = ''

      // ---------------------------------------------------------
      // 1) Numeric search: check if the value contains only digits
      // ---------------------------------------------------------
      if (/^\d+$/.test(value)) {
        const num = Number(value)

        // Ensure the numeric ID falls within the allowed range.
        if (num < this.minId || num > this.maxId) {
          this.$emit(
            'toast',
            i18n.dict.errorIndexRange
              .replace('{min}', this.minId)
              .replace('{max}', this.maxId)
            )
          return
        }

        // Valid numeric ID → emit search request upward.
        this.$emit('search', num)
        return
      }

      // ---------------------------------------------------------
      // 2) Name search: validate minimum and maximum length
      // ---------------------------------------------------------
      if (value.length < 3) {
        this.$emit('toast', i18n.dict.errorMinLength)
        return
      }

      if (value.length > 55) {
        this.$emit('toast', i18n.dict.errorMaxLength)
        return
      }

      // Valid name → emit search event upward.
      this.$emit('search', value)
    },

    /**
     * Emits a "random" event to request a random Digimon from the parent.
     */
    randomDigimon() {
      this.$emit('random')
    },
  },

  setup() {
    // Provides the translation store for UI text.
    return { i18n }
  }
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
      - "enter" key to search
    -->
    <v-text-field
      v-model="query"
      :label="i18n.dict.label"
      :key="i18n.lang"
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
