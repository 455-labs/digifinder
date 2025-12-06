<script>
// ---------------------------------------------------------
// HeaderComponent.vue
// ---------------------------------------------------------
// This component implements the main top header of the application.
// It is responsible for rendering:
//
// - The centered application logo
// - Left-side action buttons ( Help, Favorites)
// - Right-side action buttons ( Dark Mode, Language Menu)
//
// The component also manages user-interface related state, such as
// dark mode, language selection, and the mobile navigation menu.
//
// This component uses the Vue Composition API.
// ---------------------------------------------------------

import { ref, onMounted } from 'vue'
import { i18n, setLang } from '@/stores/translation'

export default {
  name: 'HeaderComponent',

  setup(_, { emit }) {
    // ---------------------------------------------------------
    // DARK MODE TOGGLE
    // ---------------------------------------------------------
    // `darkMode` tracks whether the UI is currently in dark or light
    // mode.
    //
    // Responsibilities:
    // - Update the local state
    // - Set the <html> tag's "data-theme" attribute
    // - Persist the selected theme into localStorage
    //
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
      // Load previously stored dark mode preference, if any.
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
    // LANGUAGE SELECTION
    // ---------------------------------------------------------
    // Manages the currently active application language.
    //
    // Notes:
    // - Uses the global i18n store to track the selected language
    // - User language preference is already persisted to localStorage
    //   via the translation store (translation.js)
    // - Changing the language updates the active dictionary and affects
    //   all UI translations across the application
    // ---------------------------------------------------------
    const language = ref(i18n.lang)

    function changeLanguage(lang) {
      setLang(lang)
      language.value = lang
    }

    // ---------------------------------------------------------
    // FAVORITES DIALOG CONTROL
    // ---------------------------------------------------------
    // Emits an event to the parent component (App.vue) requesting that
    // the Favorites dialog be opened. The dialog itself is managed in
    // the parent, not here.
    // ---------------------------------------------------------
    function openFavorites() {
      emit('open-favorites')
    }

    // ---------------------------------------------------------
    // HELP SCREEN CONTROL (placeholder)
    // ---------------------------------------------------------
    // Emits an event to open a help or instructions modal. The actual
    // help system will be implemented later.
    // ---------------------------------------------------------
    function openHelp() {
      emit('open-help')
    }

    // ---------------------------------------------------------
    // MOBILE NAVIGATION MENU
    // ---------------------------------------------------------
    // Controls whether the mobile menu is expanded or collapsed.
    // When the viewport is narrower than 600px, header actions are
    // displayed inside this mobile navigation panel.
    // ---------------------------------------------------------
    const mobileMenu = ref(false)

    // ---------------------------------------------------------
    // Expose state and methods to the template
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
        <div class="logo"></div>
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
            <v-tooltip bottom :text="i18n.dict.changelang">
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
  width: 285px;
  height: 30px;

  background-image: var(--app-logo);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;

  /* Poista tekstityyli */
  font-size: 0;
}

/*
  The center container stretches and keeps the logo perfectly centered.
*/
.center {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
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
