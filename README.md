# DigiFinder

![Allomon](https://digi-api.com/images/digimon/w/Allomon.png)

DigiFinder is a Vue-based frontend application that allows users to search for Digimon data using the DAPI (Digimon API).

## Table of Contents

- [DigiFinder](#digifinder)
  - [Table of Contents](#table-of-contents)
  - [To Do](#to-do)
  - [Project Structure Overview](#project-structure-overview)
    - [index.html](#indexhtml)
    - [main.js](#mainjs)
    - [App.vue](#appvue)
    - [How These Files Work Together](#how-these-files-work-together)
  - [Commit Message Guidelines](#commit-message-guidelines)
    - [General Principles](#general-principles)
    - [Common Prefixes and Their Usage](#common-prefixes-and-their-usage)

## To Do

- [x] Basic structure
- [x] Search Digimon by name or id
- [x] Get random Digimon
- [ ] Error message when Digimon is not found
- [ ] Fade in/out animations
- [ ] Language selection
- [ ] Dark mode
- [ ] How to use
- [ ] Save and delete favorites
  - [ ] Lazy load favorites list
- [ ] Mobile first

## Project Structure Overview

This project is built using **Vue 3** and **Vite**. Below is an explanation of the most important files and how they relate to each other.

### index.html

**The main entry HTML file of the application.**

- This is the only HTML file the browser loads.
- Contains the root element <div id="app"></div> where the Vue app will be injected.
- Loads the main JavaScript entry:
  `<script type="module" src="/src/main.js"></script>`

With **Vite**, `index.html` is treated as part of the build pipeline and acts as the application’s entry point.

### main.js

**The JavaScript entry point that starts the Vue application.**

This file:

1. Imports Vue
2. Imports the root component (App.vue)
3. Creates the Vue application instance
4. Mounts it into the #app element inside index.html

Example:

```bash
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

In short: `main.js` boots the application and renders `App.vue` into the page.

### App.vue

**The root Vue component of the entire application.**

This is a Single-File Component (SFC), which contains:

- `<template>` – the HTML-like markup
- `<script>` – logic and component behavior
- `<style>` – component-specific styles

Example:

```bash
<template>
  <h1>Hello from App.vue</h1>
</template>

<script>
export default {
  name: 'App'
}
</script>
```

All other components are typically children of `App.vue`.

### How These Files Work Together

Simple flow diagram:

```
index.html
   ↓ loads
src/main.js
   ↓ mounts Vue app
App.vue (root component)
   ↓ includes other components
components/YourComponent.vue
```

**index.html** – the static HTML entry<br>
**main.js** – boots Vue<br>
**App.vue** – the main visible component<br>
**Other components** – build up the rest of the app<br>

## Commit Message Guidelines

To maintain a clear Git history, follow these unified best practices for commit messages.

### General Principles

- Use the imperative mood: e.g., “add feature”, not “added feature”.
- Keep the subject line short (≤50 characters) and no period at the end.
- If you include a body, separate it from the subject with a blank line and wrap the body at ~72 characters.
- Each commit should address a **single purpose**. Avoid combining unrelated changes.

### Common Prefixes and Their Usage

Use a consistent type prefix at the start of your subject:

- **feat:** for a new feature<br>
  _Example:_ `feat: Add search functionality`
- **fix:** for a bug fix<br>
  _Example:_ `fix: Correct login button alignment`
- **refactor:** for code restructuring without behavior change<br>
  _Example:_ `refactor: Simplify API service logic`
- **chore:** for maintenance tasks, updates to config, build scripts etc.<br>
  _Example:_ `chore: Update dependencies to latest versions`
- **docs:** for documentation changes<br>
  _Example:_ `docs: Add commit message guidelines`
- **style:** for changes that don’t affect logic (formatting, whitespace)<br>
  Example:\_ `style: Adjust indentation in components`
- **test:** for adding or updating tests<br>
  _Example:_ `test: Add unit tests for utils functions`
