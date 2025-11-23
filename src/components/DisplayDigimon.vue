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

<style scoped>
.digimon-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: var(--color-2-light);
  border-radius: 12px;
  max-width: 30rem;
  margin: auto;
  margin-top: 1rem;
}

.digimon-img {
  margin: 1rem;
  object-fit: contain;
  border: 1px solid black;
}

.button-column {
  display: flex;
  flex-direction: column;
  margin: 1rem;
  gap: 1rem;
}

.circle-btn {
  background-color: var(--color-1-dark) !important;
  color: white !important;
  border-radius: 50%;
}
</style>
