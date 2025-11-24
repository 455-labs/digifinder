<script>
// Importing the core UI components used inside the main section.
// Each component handles a separate responsibility:
// - SearchBar: accepts user input (search term or random action)
// - DisplayDigimon: shows the selected Digimon's image
// - DigimonData: displays detailed Digimon information
import SearchBar from './SearchBar.vue'
import DisplayDigimon from './DisplayDigimon.vue'
import DigimonData from './DigimonData.vue'

// "ref" is imported from Vue's Composition API.
// A ref() creates a reactive value — when it changes, the UI updates automatically.
import { ref } from 'vue'

// Reusable API function that fetches Digimon data from DigiAPI.
import { fetchDigimon } from '@/api/digimonApi.js'

export default {
  components: { SearchBar, DigimonData, DisplayDigimon },

  // The setup() function is part of Vue 3's Composition API.
  // Everything returned from setup() becomes available in the <template>.
  setup() {
    // ----------------------------------------------
    // activeDigimon:
    // ----------------------------------------------
    // A reactive variable storing the currently displayed Digimon.
    // Vue's "ref(null)" means:
    //   - The initial value is null (nothing selected yet)
    //   - When we later assign a value (activeDigimon.value = ...),
    //     the UI updates automatically.
    const activeDigimon = ref(null)

    // ----------------------------------------------
    // onSearch():
    // ----------------------------------------------
    // Called when the SearchBar emits a "search" event.
    // The event passes the search term entered by the user.
    //
    // The "@" symbol in <SearchBar @search="onSearch" />
    // means: "Listen to the 'search' event and call onSearch()".
    //
    // The received query is then used to call the API.
    async function onSearch(query) {
      try {
        const data = await fetchDigimon(query)
        activeDigimon.value = data
      } catch (err) {
        console.error('Digimon not found:', query)
      }
    }

    // Everything returned from setup() is exposed to the template.
    return {
      activeDigimon,
      onSearch, // Must be returned so @search can call it
    }
  },
}
</script>

<template>
  <!--
    Main content area of the app.
    The <main> element spans the full vertical space.
    All actual visible content is inside the "container", which
    gives us consistent layout width across all screen sizes.
  -->
  <main class="main">
    <div class="container">
      <!--
        The SearchBar component emits a "search" event.
        The @search syntax means we are listening for that event.
        When triggered, onSearch(query) is executed.
      -->
      <SearchBar @search="onSearch" />

      <!--
        Displays the Digimon image.
        The ":" symbol before "img" means "bind this value reactively".
        We use optional chaining (?.) to avoid errors when activeDigimon is null.
      -->
      <DisplayDigimon :img="activeDigimon?.images?.[0]?.href" />

      <!--
        Pass Digimon details to the DigimonData component.
        All fields use ":" to bind reactive values.
      -->
      <DigimonData
        :name="activeDigimon?.name"
        :index="activeDigimon?.id"
        :level="activeDigimon?.levels?.[0]?.level"
        :attribute="activeDigimon?.attributes?.[0]?.attribute"
        :type="activeDigimon?.types?.[0]?.type"
        :fields="activeDigimon?.fields"
      />
    </div>
  </main>
</template>

<style scoped>
/*
  Full-height main area with a vertical gradient background.
  The padding ensures that inner content does not touch the screen edges.
*/
.main {
  flex: 1;
  background: linear-gradient(to bottom, var(--color-1-light), var(--color-1-dark));
  padding: 1rem;
}
</style>
