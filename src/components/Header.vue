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
import { i18n, setLang } from '@/stores/translation'

export default {
  name: 'HeaderComponent',

  setup(_, { emit }) {
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
    const language = ref(i18n.lang)

    function changeLanguage(lang) {
      setLang(lang)
      language.value = lang
    }

    // ---------------------------------------------------------
    // FAVORITES SCREEN
    // ---------------------------------------------------------
    // Opens the Favorites dialog in App.vue via an emitted event.
    // The dialog displays a scrollable list of saved Digimon,
    // allowing users to view, select, or remove favorites.
    // ---------------------------------------------------------
    function openFavorites() {
      emit('open-favorites')
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
    // NAVIGATION BUTTON FOR MOBILE
    // ---------------------------------------------------------
    // Header buttons move below the navigation button when
    // the device width is less than 600 px.
    // ---------------------------------------------------------
    const mobileMenu = ref(false)

    // ---------------------------------------------------------
    // Expose everything to the template
    // ---------------------------------------------------------
    return {
      darkMode,
      language,
      toggleDarkMode,
      changeLanguage,
      openFavorites,
      openHelp,
      mobileMenu,
      i18n
    }
  },
}
</script>

<template>
  <!--
    Header container:
    Uses a 3-part flex layout:
      LEFT  |  CENTER (logo)  |  RIGHT
  -->
  <header class="app-header">
    <div class="container">

      <!-- LEFT SIDE BUTTONS -->
      <div class="side left desktop-only">
        <!-- Help Button with Tooltip -->
        <v-tooltip bottom>
          <template #activator="{ props }">
            <v-btn icon v-bind="props" @click="openHelp">
              <v-icon>mdi-help-circle-outline</v-icon>
            </v-btn>
          </template>
          <span>{{ i18n.dict.help }}</span>
        </v-tooltip>

        <!-- Favorites Button with Tooltip -->
        <v-tooltip bottom>
          <template #activator="{ props }">
            <v-btn icon v-bind="props" @click="openFavorites">
              <v-icon>mdi-bookmark-outline</v-icon>
            </v-btn>
          </template>
          <span>{{ i18n.dict.favorites }}</span>
        </v-tooltip>
      </div>

      <!-- CENTER LOGO -->
      <div class="center">
        <h1 class="logo">DIGIFINDER</h1>
      </div>

      <!-- RIGHT SIDE BUTTONS -->
      <div class="side right desktop-only">
        <!-- Dark Mode Toggle with Tooltip -->
        <v-tooltip bottom>
          <template #activator="{ props }">
            <v-btn icon v-bind="props" @click="toggleDarkMode">
              <v-icon>
                {{ darkMode ? 'mdi-weather-night' : 'mdi-weather-sunny' }}
              </v-icon>
            </v-btn>
          </template>
          <span>{{ darkMode ? i18n.dict.lightmode :  i18n.dict.darkmode }}</span>
        </v-tooltip>

        <!-- Language Button (Tooltip + Menu) -->
        <v-menu>
          <template #activator="{ props: menuProps }">
            <v-tooltip bottom text="Change language">
              <template #activator="{ props: tooltipProps }">
                <v-btn icon v-bind="{ ...tooltipProps, ...menuProps }">
                  <v-icon>mdi-earth</v-icon>
                </v-btn>
              </template>
            </v-tooltip>
          </template>

          <v-list>
            <v-list-item @click="changeLanguage('fi')">{{ i18n.dict.fi }}</v-list-item>
            <v-list-item @click="changeLanguage('en')">{{ i18n.dict.en }}</v-list-item>
          </v-list>
        </v-menu>
      </div>

      <!-- MOBILE MENU NAV-BUTTON -->
      <v-btn class="hamburger" icon @click="mobileMenu = true">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </div>

    <!-- MOBILE DRAWER -->
     <v-navigation-drawer
     v-model="mobileMenu"
     temporary
     location="right"
     :class="darkMode ? 'mobile-drawer-dark' : 'mobile-drawer-light'">
        <v-list>
        <v-list-item @click="openHelp">
          <v-icon left>mdi-help-circle-outline</v-icon>
          {{ i18n.dict.help }}
        </v-list-item>

        <v-list-item @click="openFavorites">
          <v-icon left>mdi-bookmark-outline</v-icon>
          {{ i18n.dict.favorites }}
        </v-list-item>

        <v-list-item @click="toggleDarkMode">
          <v-icon left>{{ darkMode ? 'mdi-weather-night' : 'mdi-weather-sunny' }}</v-icon>
          {{ darkMode ? i18n.dict.lightmode :  i18n.dict.darkmode }}
        </v-list-item>

        <v-list-group>
          <template #activator="{ props }">
          <v-list-item v-bind="props" class="d-flex align-center">
            <v-icon class="me-2">mdi-earth</v-icon>
            {{ i18n.dict.changelang }}
          </v-list-item>
          </template>

          <v-list-item @click="changeLanguage('fi')">{{ i18n.dict.fi }}</v-list-item>
          <v-list-item @click="changeLanguage('en')">{{ i18n.dict.en }}</v-list-item>

        </v-list-group>
      </v-list>
    </v-navigation-drawer>
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
  background: linear-gradient( to right,
    var(--header-bg-dark) 0%,
    var(--header-bg) 50%,
    var(--header-bg-dark) 100%
  );
  border-bottom: 1px solid #000;
}

.container {
  display: flex;
  gap: 1.5rem;
  max-width: 100%;
  margin: 0 auto;
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

/* Navigation button */
.hamburger {
  display: none;
}

.mobile-drawer-light {
  background-color: var(--surface-card);
  color: var(--text-primary);
}

.mobile-drawer-dark {
  background-color: #1a1d21;
  color: #f5f5f5;
}

/* MOBILE FIRST */
@media (max-width: 600px) {
  .desktop-only {
    display: none;
  }

  .container {
    position: relative;
    height: 48px;
  }

  .hamburger {
    display: inline-flex;
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }

  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
  }
}
</style>
