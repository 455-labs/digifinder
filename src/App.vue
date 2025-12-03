<script>
// Importing the top-level layout components.
// These represent the main structural sections of the application.
import HeaderComponent from './components/Header.vue'
import MainComponent from './components/Main.vue'
import FooterComponent from './components/Footer.vue'
import Toast from './components/Toast.vue';
import FavoritesDialog from './components/FavoritesDialog.vue'
import { i18n } from '@/stores/translation'

import { ref } from 'vue'

export default {
  components: {
    HeaderComponent,
    MainComponent,
    FooterComponent,
    Toast,
    FavoritesDialog,
  },

  data() {
    return {
      toastVisible: false,
      toastMessage: ''
    };
  },

  methods: {
    showToast(msg) {
      this.toastMessage = msg;
      this.toastVisible = true;

      setTimeout(() => {
        this.toastVisible = false;
      }, 2500);
    },

    loadFavorite(id) {
      this.$refs.main.onSearch(id)
    }
  },

  setup() {
    // Shared state for the Help modal
    const howToDialog = ref(false)
    // Shared state for the Favorites modal
    const favoritesDialog = ref(false)

    // Expose to children via provide/inject OR event listeners
    return { howToDialog, favoritesDialog, i18n }
  },
}
</script>

<template>
  <v-app>
  <div class="app">
    <!-- Header triggers opening the dialog -->
    <HeaderComponent
      @open-help="howToDialog = true"
      @open-favorites="favoritesDialog = true"
      @select-favorite="loadFavorite"
    />

    <!-- Main content area -->
    <MainComponent @toast="showToast" ref="main" />

    <!-- Footer -->
    <FooterComponent />

    <!-- How to dialog -->
    <v-dialog v-model="howToDialog" max-width="500">
      <v-card class="howto-card">
        <v-card-title class="d-flex justify-space-between align-center">
          {{ i18n.dict.title }}
        </v-card-title>

        <v-card-text>
          <p>🔍 <strong>{{ i18n.dict.searchTitle }}</strong> {{ i18n.dict.searchText }}</p>
          <p>🎲 <strong>{{ i18n.dict.randomTitle }}</strong> {{ i18n.dict.randomText }}</p>
          <p>⬅️➡️ <strong>{{ i18n.dict.navigateTitle }}</strong>{{ i18n.dict.navigateText }}</p>
          <p>❤️ <strong>{{ i18n.dict.favoritesTitle }}</strong>{{ i18n.dict.favoritesText }}</p>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" block @click="howToDialog = false"> {{ i18n.dict.close }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- FAVORITES -->
    <FavoritesDialog
      v-model="favoritesDialog"
      @select="loadFavorite"
    />

    <Toast :message="toastMessage" :visible="toastVisible" />
  </div>
  </v-app>
</template>
