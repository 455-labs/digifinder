# FRAMEWORKS

The team performed small experiments with three different frontend frameworks - React, Angular, and Vue. The goal was to understand their workflows, complexity, and suitability for the project. These tests helped the group make an informed decision about which framework would best support the **DigiFinder** application's needs.

## Table of Contents

- [FRAMEWORKS](#frameworks)
  - [Table of Contents](#table-of-contents)
  - [About Angular](#about-angular)
    - [Angular Pros](#angular-pros)
    - [Angular Cons](#angular-cons)
  - [About React](#about-react)
    - [React Pros](#react-pros)
    - [React Cons](#react-cons)
  - [About Vue](#about-vue)
    - [Vue Pros](#vue-pros)
    - [Vue Cons](#vue-cons)

## About Angular

Angular is a **full-featured TypeScript-based framework maintained by Google.**
Unlike Vue or React (which are more flexible libraries), Angular provides a complete, opinionated structure for building large-scale applications with built-in solutions for routing, state management, forms, HTTP, and more.

### Angular Pros

- **Complete framework** – Includes routing, HTTP, forms, dependency injection, and build tools out of the box.
- **Strong TypeScript support** – Angular is built fully on TypeScript, offering excellent type safety and tooling.
- **Opinionated and structured** – Enforces best practices and consistent architecture, great for large teams.
- **Strong enterprise adoption** – Widely used in corporations and long-term products.
- **Powerful CLI** – Automates component generation, testing, building, and scaffolding.
- **Long-term stability** – Backed by Google with regular releases and an LTS schedule.

### Angular Cons

- **Steeper learning curve** – More concepts (modules, components, DI, RxJS, templates, pipes) compared to Vue or React.
- **Verbosity** – Code can feel heavy or boilerplate-heavy especially for small projects.
- **Performance overhead** – Larger bundle sizes compared to Vue or lightweight React setups.
- **Less flexible** – Strong conventions can limit creativity for developers who prefer minimalism.
- **Heavy reliance on RxJS** – Powerful but can overwhelm beginners not familiar with reactive programming.

## About React

React is a **component-based JavaScript library created and maintained by Meta (Facebook)**. Unlike Angular (a full framework) or Vue (a progressive framework), React focuses primarily on the view layer and leaves routing, state management, and tooling to external libraries. Its declarative approach and virtual DOM make it one of the most widely used frontend technologies today.

### React Pros

- **Huge ecosystem** – Largest community, largest library selection, and most job opportunities.
- **Flexible and unopinionated** – Developers can structure projects however they prefer; easy to integrate with other tools.
- **JSX syntax** – Combines JavaScript and markup, enabling very dynamic UI logic.
- **Virtual DOM** – Efficient updates and good performance for large applications.
- **Strong industry adoption** – Widely used by Meta, Netflix, Airbnb, Uber, and countless others.
- **Reusable components** – Encourages modular, maintainable UI development.
- **Rich ecosystem for state management** – Redux, Zustand, Jotai, Recoil, and more.

### React Cons

- **Not a full framework** – Requires many external libraries for routing, forms, and state management → can lead to fragmentation.
- **Steeper learning curve than it appears** – Hooks, state, effects, context, memoization, and rendering behavior can be tricky.
- **JSX may feel unnatural to beginners used to HTML templates.**
- **Boilerplate** - Advanced setups (Redux, routing, SSR) often require additional configuration.
- **Frequent breaking changes in ecosystem** – Best practices evolve fast, making old tutorials outdated.
- **More responsibility on the developer** – Must choose libraries and architecture yourself, which can overwhelm new teams.

## About Vue

Vue is a **progressive JavaScript framework focused on building user interfaces.** It is lightweight, easy to learn, and flexible — combining the best parts of Angular’s structure and React’s reactivity.

### Vue Pros

- **Simplicity** – Easier to learn than React or Angular; great documentation and gentle learning curve.  
- **Reactivity system** – Reactive variables (`ref`, `reactive`) make UI updates fast and predictable.  
- **Template-based syntax** – Uses readable HTML-like templates that are beginner-friendly.  
- **Flexibility** – Works as a small library or a full-scale framework (with routing, state management, etc.).  
- **Lightweight and fast** – Smaller bundle sizes compared to Angular; very quick setup with Vite.  
- **Active community** – While smaller than React’s, the Vue ecosystem is mature and well supported.
- **Independent Framework** - Vue was created by Evan You, a former Google engineer, and is maintained by the open-source community, unlike React (Meta) or Angular (Google), which are controlled by large corporations.

### Vue Cons

- **Smaller ecosystem than React** – Fewer ready-made third-party components and integrations.  
- **Version differences** – Vue 2 vs Vue 3 compatibility can cause confusion for new developers.  
- **Less common in enterprise** – React and Angular dominate corporate use, especially large-scale apps.  
- **Tooling sometimes lags** – Although Vite and Vue CLI are great, ecosystem tools can update slower than React’s.  
- **Less TypeScript-native than Angular** – Vue supports TS, but Angular integrates it more deeply.
  