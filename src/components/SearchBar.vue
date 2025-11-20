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
