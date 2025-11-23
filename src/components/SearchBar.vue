<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      query: '',
    }
  },
  methods: {
    searchDigimon() {
      console.log('Searching:', this.query)
    },
    randomDigimon() {
      console.log('Random!')
    },
  },
}
</script>

<template>
  <div class="search-wrapper">
    <v-text-field
      v-model="query"
      label="Search Digimon..."
      variant="solo"
      clearable
      prepend-inner-icon="mdi-magnify"
      class="search-input"
    />

    <div class="button-row">
      <v-btn class="digibtn" @click="searchDigimon">Search</v-btn>
      <v-btn class="digibtn" @click="randomDigimon">Random</v-btn>
    </div>
  </div>
</template>

<style scoped>
.search-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
}

.search-input {
  width: 50rem;
}

.button-row {
  display: flex;
  gap: 1rem;
  width: 30rem;
}

.button-row > * {
  flex: 1;
}

.digibtn {
  background-color: var(--color-1-dark) !important;
  color: black !important;
  font-weight: 600;
  letter-spacing: 0.5px;
  border-radius: 8px;
  transition: 0.2s;
}

.digibtn:hover {
  background-color: var(--color-1-light) !important;
  cursor: pointer;
}

.digibtn:active {
  background-color: var(--color-2-mid) !important;
}

.digibtn .v-ripple__animation {
  background-color: var(--color-2-mid) !important;
}
</style>
