<script>
export default {
  name: 'DisplayDigimon',
  props: {
    img: String,
  },
  data() {
    return {
      isFavorite: false,
    }
  },
  methods: {
    toggleFavorite() {
      this.isFavorite = !this.isFavorite
      // tähän myöhemmin:
      // this.$emit("saveFavorite", this.isFavorite)
    },
  },
}
</script>

<template>
  <div class="digimon-card">
    <img
      src="https://digi-api.com/images/digimon/w/Allomon.png"
      alt="Digimon image"
      class="digimon-img"
    />

    <div class="button-column">
      <!-- Toggle-favorite -->
      <v-btn icon :color="isFavorite ? 'red' : 'grey'" @click="toggleFavorite">
        <v-icon>
          {{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}
        </v-icon>
      </v-btn>

      <v-btn icon class="circle-btn">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>

      <v-btn icon class="circle-btn">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
  </div>
</template>
