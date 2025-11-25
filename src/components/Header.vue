<script>
// ---------------------------------------------------------
// HeaderComponent.vue
// ---------------------------------------------------------
// The main top bar of the application.
// This component is responsible for displaying:
//
// - The application logo (centered)
// - Left-side tools (Favorites)
// - Right-side tools (Help, Dark Mode toggle, Language menu)
//
// This component currently contains only UI logic and placeholder
// functions. Real behavior — such as persisting dark mode or
// localization — will be implemented later.
//
// Uses Vue's Composition API for state management.
// ---------------------------------------------------------

import { ref, onMounted } from 'vue'

export default {
  name: 'HeaderComponent',

  setup(props, { emit }) {
    // ---------------------------------------------------------
    // DARK MODE (placeholder)
    // ---------------------------------------------------------
    // "darkMode" keeps track of whether the app is currently in dark
    // or light mode. The actual theme-switching logic is not yet
    // implemented — at the moment we only log the value.
    //
    // Later improvements:
    // - Store this value in localStorage
    // - Apply a CSS class to <body>
    // - Update Vuetify theme dynamically
    // ---------------------------------------------------------
    const darkMode = ref(false)

    function toggleDarkMode() {
      darkMode.value = !darkMode.value
      console.log('Dark mode toggled:', darkMode.value)

      const newTheme = darkMode.value ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', newTheme)
      localStorage.setItem('darkMode', newTheme)
    }

    onMounted(() => {
      const saved = localStorage.getItem('darkMode')

      if (saved === 'dark') {
        darkMode.value = true
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        darkMode.value = false
        document.documentElement.setAttribute('data-theme', 'light')
      }
    })

    // ---------------------------------------------------------
    // LANGUAGE SELECTION (placeholder)
    // ---------------------------------------------------------
    // Stores the currently selected language.
    // Later:
    // - Save preference to localStorage
    // - Integrate real translation system (i18n)
    // ---------------------------------------------------------
    const language = ref('fi')

    function setLanguage(lang) {
      language.value = lang
      console.log('Language changed:', lang)
    }

    // ---------------------------------------------------------
    // FAVORITES SCREEN (placeholder)
    // ---------------------------------------------------------
    // In the future this will open a real "Favorites" view or modal.
    // Right now it only logs the action.
    // ---------------------------------------------------------
    function openFavorites() {
      console.log('Favorites page will open later')
    }

    // ---------------------------------------------------------
    // HELP / HOW-TO SCREEN (placeholder)
    // ---------------------------------------------------------
    // In the future this will open a modal or a dedicated help page.
    // ---------------------------------------------------------
    function openHelp() {
      emit('open-help')
    }

    // ---------------------------------------------------------
    // Expose everything to the template
    // ---------------------------------------------------------
    return {
      darkMode,
      language,
      toggleDarkMode,
      setLanguage,
      openFavorites,
      openHelp,
    }
  },
}
</script>

<template>
  <!--
    Header container:
    Uses a 3-part flex layout:
      LEFT  |  CENTER (logo)  |  RIGHT

    justify-content: space-between keeps left and right on edges,
    while .center uses flex:1 to force the logo into perfect center.
  -->
  <header class="app-header">
    <div class="container">
    <!-- LEFT SIDE BUTTONS (Favorites) -->
    <!-- Buttons grouped inside a flex container -->
    <div class="side left">

              <!-- Help Button with Tooltip -->
        <v-tooltip bottom>
          <template #activator="{ props }">
            <v-btn icon v-bind="props" @click="openHelp">
              <v-icon>mdi-help-circle-outline</v-icon>
            </v-btn>
          </template>
        <span>Help</span>
      </v-tooltip>

      <!-- Favorites Button with Tooltip -->
      <v-tooltip bottom>
        <template #activator="{ props }">
          <v-btn icon v-bind="props" @click="openFavorites">
            <v-icon>mdi-heart-outline</v-icon>
          </v-btn>
        </template>
      <span>Favorites</span>
      </v-tooltip>
    </div>

    <!-- CENTER LOGO -->
    <!-- This block stretches to ensure the logo remains centered -->
    <div class="center">
      <h1 class="logo">DIGIFINDER</h1>
    </div>

    <!-- RIGHT SIDE BUTTONS: Help, Dark Mode, Language menu -->
    <div class="side right">
            <!-- Dark Mode Toggle with Tooltip -->
      <v-tooltip bottom>
        <template #activator="{ props }">
          <v-btn icon v-bind="props" @click="toggleDarkMode">
            <v-icon>
              {{ darkMode ? "mdi-weather-night" : "mdi-weather-sunny" }}
            </v-icon>
          </v-btn>
        </template>
        <span>{{ darkMode ? "Switch to Light Mode" : "Switch to Dark Mode" }}</span>
      </v-tooltip>
      <!-- Language Button with Tooltip + Click Menu -->
      <v-menu>
        <template #activator="{ props: menuProps }">
          <v-tooltip text="Change language" bottom>
            <template #activator="{ props: tooltipProps }">

            <!-- Merge both activators: tooltip AND menu -->
            <v-btn
              icon
              v-bind="{ ...tooltipProps, ...menuProps }"
        >
              <v-icon>mdi-earth</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
      </template>

      <v-list>
        <v-list-item @click="setLanguage('fi')">🇫🇮 Finnish</v-list-item>
        <v-list-item @click="setLanguage('en')">🇬🇧 English</v-list-item>
      </v-list>
      </v-menu>

    </div>
      <!-- LEFT SIDE BUTTONS (Favorites) -->
      <!-- Buttons grouped inside a flex container -->
      <div class="side left">
        <!-- Help Button -->
        <v-btn icon @click="openHelp">
          <v-icon>mdi-help-circle-outline</v-icon>
        </v-btn>

        <!-- Favorites Button -->
        <v-btn icon @click="openFavorites">
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn>
      </div>

      <!-- CENTER LOGO -->
      <!-- This block stretches to ensure the logo remains centered -->
      <div class="center">
        <h1 class="logo">DIGIFINDER</h1>
      </div>

      <!-- RIGHT SIDE BUTTONS: Help, Dark Mode, Language menu -->
      <div class="side right">
        <!-- Dark Mode Toggle -->
        <v-btn icon @click="toggleDarkMode">
          <v-icon>
            {{ darkMode ? 'mdi-weather-night' : 'mdi-weather-sunny' }}
          </v-icon>
        </v-btn>

        <!-- Language Selector Menu -->
        <v-menu>
          <template #activator="{ props }">
            <v-btn icon v-bind="props">
              <v-icon>mdi-earth</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item @click="setLanguage('fi')">🇫🇮 Finnish</v-list-item>
            <v-list-item @click="setLanguage('en')">🇬🇧 English</v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* ---------------------------------------------------------
   HEADER LAYOUT
--------------------------------------------------------- */
/*
  Creates a 3-column layout using flexbox:
  - Left   (buttons)
  - Center (logo)
  - Right  (buttons)

  The logo stays centered regardless of how many buttons
  are added to left or right.
*/
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  background-color: var(--header-bg);
  border-bottom: 1px solid #000;
}

.container {
  max-width: 100%;
  display: flex;
}

/* ---------------------------------------------------------
   CENTER LOGO STYLE
--------------------------------------------------------- */
.logo {
  margin: 0;
  text-align: center;
  font-size: 2rem;
  font-family: Consolas, monospace;

  /* Gradient applied to text */
  background: linear-gradient(to bottom, var(--bg-gradient-top), var(--bg-gradient-bottom));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke: 2px var(--header-bg-dark);
}

/*
  The center container stretches and keeps the logo perfectly centered.
*/
.center {
  flex: 1;
  display: flex;
  justify-content: center;
}

/* ---------------------------------------------------------
   SIDE BUTTON GROUPS
--------------------------------------------------------- */
/*
  Left and right button containers.
  Using gap for spacing instead of margin for cleaner layout.
*/
.side {
  width: 120px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* Optional helpers for clarity */
.side.left {
  justify-content: flex-start;
}

.side.right {
  justify-content: flex-end;
}
</style>
