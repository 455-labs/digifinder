# DOCUMENTATION

This document explains the basic architecture, component structure, and overall functionality of the **DigiFinder** frontend application.

## Table of Contents

- [DOCUMENTATION](#documentation)
  - [Table of Contents](#table-of-contents)
  - [App Structure](#app-structure)
  - [Project Folder Structure](#project-folder-structure)
  - [How the Application Starts](#how-the-application-starts)
  - [How Vue Components Work](#how-vue-components-work)
    - [The `<script>` Section](#the-script-section)
    - [The `<template>` Section](#the-template-section)
    - [The `<style>` Section](#the-style-section)
  - [Vue 3 Built-in Functions and Hooks](#vue-3-built-in-functions-and-hooks)
    - [`ref` - Creates a reactive variable](#ref---creates-a-reactive-variable)
    - [`onMounted()` - Vue’s Lifecycle Hook](#onmounted--vues-lifecycle-hook)
    - [`watch()` - Vue’s Reactive Watcher](#watch--vues-reactive-watcher)
    - [`created()` - Options API Lifecycle Hook](#created--options-api-lifecycle-hook)
    - [`beforeUnmount()` - Options API Lifecycle Hook](#beforeunmount--options-api-lifecycle-hook)
    - [`computed()` - A special type of reactive value in Vue](#computed---a-special-type-of-reactive-value-in-vue)
  - [Overview: How the Application Works](#overview-how-the-application-works)
  - [Data Flow](#data-flow)
  - [Summary](#summary)

## App Structure

```html
App.vue ├───Header.vue ├───Main.vue | ├───SearchBar.vue | ├───DisplayDigimon.vue |
└───DigimonData.vue ├───Footer.vue | ├───FavoritesDialog.vue | └───FavoriteCard.vue └───Toast.vue
```

## Project Folder Structure

```html
digifinder ├───.vscode - Contains Visual Studio Code workspace settings for this specific project.
├───node_modules - Contains all external dependencies the project needs to run. ├───public - Static
assets that are copied directly into the final build output. ├───src | ├───api | | └───digimonApi.js
- Provides all API functions for fetching Digimon data and metadata from the DigiAPI. | ├───assets |
| └───styles.css - Contains global styling and CSS variables used throughout the application. |
├───components | | └───DigimonData.vue - Shows structured Digimon details (name, level, attributes,
etc.) using data received from props. | | └───DisplayDigimon.vue - Displays the selected Digimon’s
image and provides navigation and favorite toggling controls. | | └───FavoriteCard.vue - A small
card showing a Digimon’s thumbnail and name, emitting select and remove actions. | |
└───FavoritesDialog.vue - A modal displaying the user's saved favorites with lazy loading, removal
options, and selection events. | | └───Footer.vue - A simple bottom bar displaying footer text and
branding. | | └───Header.vue - The top navigation bar offering help, favorites, theme toggle, and
language menu controls. | | └───Main.vue - The central controller that handles all Digimon fetching
logic, navigation, and data flow between components. | | └───SearchBar.vue - A search interface that
validates user input and emits search, random, and toast events upward. | | └───Toast.vue - A
lightweight component that displays temporary fade-in/out notification messages. | ├───locales -
Contains JSON files representing text resources for different languages the application supports. |
| └───en.json | | └───fi.json | ├───stores | | └───translation.js - Manages the current language and
exposes a reactive dictionary with functions for switching languages. | └───App.vue - The root
component that structures the entire layout and manages dialogs and global notifications. |
└───main.js - Initializes the Vue application by creating the app instance and mounting App.vue into
the #app element in index.html. ├─index.html - The main HTML entry point for the application. Vite
injects the Vue app inside this file at build time. └─ ...
```

## How the Application Starts

1. `index.html` — The Base HTML Shell

   The Vue application begins with index.html, which is the single static HTML file used by Vite during development and also bundled for production.
   - `<div id="app"></div>`

     This empty `<div>` is the mounting point for your Vue application.
     Vue will replace the contents of this element with your App.vue component.

   - `<script type="module" src="/src/main.js"></script>`

     This loads main.js as an ES module.
     main.js is the actual entry point of your application.

2. `main.js` creates and configures the Vue application

   In this step, main.js initializes the Vue application by:
   1. Creating a Vue application instance using createApp(App).
      - This instance represents the entire running Vue app and uses App.vue as its root component.

   2. Installing Vuetify into the application with .use(vuetify).
      - This makes all Vuetify components and directives available throughout the app.

   3. Mounting the application to the HTML element with id="app" using .mount('#app').
      - Vue takes over that element and renders the whole user interface inside it.

3. `App.vue` is rendered as the root component

   Vue replaces the empty `#app` element with `App.vue`, and the entire UI begins to build itself from the root component downward.

## How Vue Components Work

In Vue, every component can contain up to three main sections:

- `<script>` — the logic (data, methods, imports, state)
- `<template>` — the HTML structure that is rendered
- `<style>` — optional CSS for that component

### The `<script>` Section

The `<script>` block is where you:

- import child components
- define data and methods
- create reactive state
- expose logic to the template
- register components

All components used in `template` block must be first imported and registered so they can be used. Components are registered in the `export defaults` section.

`export default`:

- `components: { ... }` - Registering child components

  This tells Vue: “These are the components that can be used inside this component’s `<template>`.” If you don’t register a component here, you cannot use it in the template.

- `data()` - Returns an object containing reactive values handled by Vue.

  Variables defined here become available in the template. When you update them, the UI updates automatically.

  Vue automatically converts values returned from `data()` into reactive properties. Any change to these values triggers a UI update.

- `methods: { ... }` - Functions available to the component

  Methods are normal functions attached to the component and they can be called from the template. They have access to data via `this`.

- `setup()` - Composition API

  In Vue 3’s Composition API, `setup()` is the function where all component logic is defined. It receives two arguments: props and a context object containing emit, slots, and attrs.

  In `Main.vue`, the component does not use props, so the first argument is ignored using `_`, while `{ emit }` is extracted from the second argument using object destructuring.

  Functions defined inside `setup()` have access to reactive variables created with ref, can emit events upward using `emit()`, and can use lifecycle hooks like `onMounted()`. Only the values returned from `setup()` are exposed to the template; everything else remains internal.

  This pattern keeps all functional logic grouped together and fully reactive without relying on `this`, which is the core design of the Composition API.

- `props: { ... }` - Props (short for properties) are inputs passed from a parent component to a child component.

  They allow data to flow downward in the component hierarchy. Think of props like function parameters, but for components.

- `emits: [ ... ]` - Communication between components

  In Vue, child components can communicate with their parent by emitting events. The emits property declares which events this component is allowed to send upward.

### The `<template>` Section

The `<template>` block defines the visual structure of a Vue component. It describes what appears on the screen and how it should react to the component’s data, props, and events.

You can think of the template as:

`HTML that automatically updates whenever the component’s state changes.`

Vue enhances HTML with special features such as directives, event listeners, and component tags.

- Templates Are Reactive

  When data changes in the component (from data(), ref(), props, computed values, etc.) Vue re-renders only the necessary parts of the UI. No manual DOM manipulation is needed.

- Templates Can Contain Components

  Each of these is a child component imported and registered in the `<script>` section.

- Templates Use Directives

  Vue provides directives—HTML attributes starting with v- that add behavior.

- Templates Use Event Listeners

  Use `@` to listen for events emitted by components. Event listeners allow communication from child → parent.

- Templates Use Interpolation

  You can insert dynamic values inside double curly braces: `{{ i18n.dict.title }}`

  Vue updates this text automatically whenever the translation data changes.

- Templates Support Conditionals and Loops

  Templates often include things like:

  ```vue
  <div v-if="visible">...</div>
  <div v-for="item in items">...</div>
  ```

  These dynamically create or remove DOM elements.

- Vuetify Components inside the Template

  Because this project uses Vuetify, many template elements are UI components:

  ```vue
  <v-app></v-app>
  ```

  These are not HTML tags, but Vue components provided by Vuetify.

  They automatically:
  - style themselves
  - apply Material Design rules
  - provide built-in UI behaviors

- The Template Must Have One Root Element

  Vue requires exactly one top-level element.

### The `<style>` Section

The `<style>` block defines the CSS styles that apply to the component’s template. It works almost exactly like normal CSS, with a few Vue-specific features.

If the tag includes `scoped` then the styles apply only to this component, thanks to Vue automatically generating unique attribute selectors. This prevents style collisions between components.

Apart from optional preprocessors, the style block uses standard CSS syntax.

## Vue 3 Built-in Functions and Hooks

### `ref` - Creates a reactive variable

Vue tracks changes automatically. Template updates instantly when the value changes.

The actual value of a ref object is stored in its `.value` property.

[Vue: Template Refs](https://vuejs.org/guide/essentials/template-refs)

### `onMounted()` - Vue’s Lifecycle Hook

`onMounted()` is a built-in Vue 3 lifecycle hook provided by the Composition API. It runs once, right after the component has been fully created and inserted into the DOM.

`onMounted()` executes one time after the component is rendered, and is used for initialization tasks that require the DOM or preloaded data.

[Vue: onMounted()](https://vuejs.org/api/composition-api-lifecycle.html#onmounted)

### `watch()` - Vue’s Reactive Watcher

`watch()` monitors a reactive value (such as a prop, ref, or computed value) and runs code whenever that value changes.

`watch()` tracks reactive values and executes custom logic every time those values change. It allows a component to react dynamically to external state updates.

[Vue: watch()](https://vuejs.org/api/reactivity-core.html#watch)

### `created()` - Options API Lifecycle Hook

`created()` is a Vue lifecycle hook that runs immediately after the component instance is created, but before the DOM is rendered.

It is useful for initializing data, loading values from localStorage, or performing setup tasks that do not require access to the component’s DOM elements.

Example from the project:

- The component loads the user’s saved favorites from localStorage as soon as it is created.

[Vue: created()](https://vuejs.org/api/options-lifecycle.html#created)

### `beforeUnmount()` - Options API Lifecycle Hook

`beforeUnmount()` is executed right before the component is removed from the DOM.

This hook is typically used for cleanup tasks such as removing event listeners, cancelling intervals, or clearing timers, helping prevent memory leaks.

Example from the project:

- The component removes its favorite-updated event listener before it is destroyed.

[Vue: beforeUnmount()](https://vuejs.org/api/options-lifecycle.html#beforeunmount)

### `computed()` - A special type of reactive value in Vue

`computed()` behaves like a function, but Vue caches its result and only recalculates it when the data it depends on changes.

So:

- It looks like a function → isFavorite()
- But you use it like a variable → isFavorite

This makes computed properties perfect for derived data — values that depend on other reactive values.

[Vue: computed()](https://vuejs.org/api/reactivity-core.html#computed)

## Overview: How the Application Works

The app consists of a simple UI:

- `App.vue` = Root of the entire UI
  - Contains the application frame: Header, Main, Footer
  - Handles global dialogs and toast messages

- `Main.vue` = The functional core
  - Handles all communication with the DigiAPI
  - Stores the currently active Digimon
  - Connects SearchBar → DisplayDigimon → DigimonData

- `SearchBar.vue` = Accepts user input

- `DisplayDigimon.vue` = Shows Digimon image + navigation + favorite toggle

- `DigimonData.vue` = Shows Digimon’s text info (ID, level, type, attribute, etc.)

All components communicate upward using events and downward through props.

1. `App.vue` – The Root Layout Component

   `App.vue` is the outermost component and provides the structure for the entire UI.

   It contains:
   - HeaderComponent
   - MainComponent
   - FooterComponent
   - Toast for temporary notifications
   - FavoritesDialog for browsing saved Digimon

   App.vue handles global UI state:
   - Whether a dialog is open (howToDialog, favoritesDialog)
   - Toast visibility
   - Selecting a favorite Digimon

   App passes commands down to Main.vue

   For example:

   ```vue
   loadFavorite(id) { this.$refs.main.onSearch(id) }
   ```

   This allows the Favorites dialog to load a Digimon into the Main area.

2. `Main.vue` – The Application’s Core Logic

   `Main.vue` connects all functional parts together.

   It is responsible for:
   - Fetching data from the DigiAPI

   - `fetchDigimon(name or id)`
   - `fetchDigimonBounds()` → for random + navigation
   - `fetchAllDigimons()` → autocomplete suggestions

   - Storing the currently active Digimon:
     - `const activeDigimon = ref(null)`

   - Handling SearchBar events:
     - `@search="onSearch"` → search by name or ID
     - `@random="fetchRandomDigimon"` → pick random

   - Passing data to child components:
     - To DisplayDigimon:
       - `:img="activeDigimon?.images?.[0]?.href"`
       - `:id="activeDigimon?.id"`

     - To DigimonData:
       - `:name="activeDigimon?.name"`
       - `:index="activeDigimon?.id"`
       - `:level="activeDigimon?.levels?.[0]?.level"`

   - Providing navigation:
     - Next Digimon
     - Previous Digimon
     - Wrap-around behavior

   Main.vue is essentially the controller of the entire application.

3. `SearchBar.vue` – Input Component

   SearchBar does not call the API. Instead, it collects user input and emits events upward.

   It can emit:
   - search → when user searches by name or ID
   - random → load random Digimon
   - toast → show error messages

   `Main.vue` listens to these events and performs the real actions.

   SearchBar is purely an input component, not a logic component.

4. `DisplayDigimon.vue` – Image + Navigation + Favorites

   This component displays:
   - The Digimon image
   - Favorite toggle button
   - Previous / Next arrows

   It receives props from Main.vue:

   ```vue
   props: { img: String, id: Number }
   ```

   It emits events upward: `emits: ['prev', 'next']`

   `Main.vue` uses these to navigate.

   It also manages favorites:
   - Loads favorites from localStorage
   - Toggles favorite status
   - Sends global "favorite-updated" event
   - Updates UI instantly

   DisplayDigimon handles user interaction, not data fetching.

5. `DigimonData.vue`– Information Display

   This component simply displays structured Digimon info:
   - Name
   - ID
   - Level
   - Type
   - Attribute
   - Fields

   It receives everything through props. This component is purely presentational.

## Data Flow

Here is the data flow of a typical search:

1. User types into SearchBar

   SearchBar emits: `this.$emit('search', query)`

2. `Main.vue` receives the search request:

   `<SearchBar @search="onSearch" />`

   `Main.vue` calls DigiAPI:

   ```vue
   const result = await fetchDigimon(query) activeDigimon.value = result
   ```

3. `Main.vue` passes the result to children via props

   `DisplayDigimon.vue` gets:

   ```vue
   img id
   ```

   `DigimonData.vue` gets:

   ```vue
   name index level type attribute fields
   ```

4. `DisplayDigimon.vue` allows navigation or favoriting

   User clicks Next → `emit('next')` → `Main.vue` loads next Digimon

   User clicks Favorite → updates localStorage

5. App.vue Shows Toasts & Dialogs

   `Main.vue` emits toast for errors.
   `App.vue` displays the Toast component.

## Summary

The application is structured around `App.vue`, which provides the global layout and UI controls.

The functional core is `Main.vue`, which handles all DigiAPI communication, search logic, navigation, and the currently active Digimon.

`Main.vue` connects three child components: SearchBar (user input), DisplayDigimon (image + navigation + favorites), and DigimonData (text information).

SearchBar emits search and random events upward, `Main.vue` fetches data, and then passes the results down to DisplayDigimon and DigimonData through props.

`App.vue` manages dialogs, toasts, and favorites browsing, while DisplayDigimon allows the user to mark Digimon as favorite or navigate between entries.
