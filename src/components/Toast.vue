<script>
// Toast notification component.
// Displays a short message briefly at the top of the screen.
// Uses i18n only if translations are needed for static labels.

import { i18n } from '@/stores/translation'

export default {
  props: {
    // The text content displayed inside the toast.
    message: String,
    // Controls whether the toast is visible.
    visible: Boolean
  },

  setup() {
    // Expose the translation store if needed by the template.
    return { i18n }
  }
}
</script>

<template>
  <!-- Fade transition for smooth appearance and disappearance. -->
  <transition name="fade">
    <!-- Toast element is rendered only when 'visible' is true. -->
    <div v-if="visible" class="toast">
      {{ message }}
    </div>
  </transition>
</template>

<style>
/* Base styling for the toast message box. */
.toast {
  position: fixed;
  top: 20px;                     /* Positioned near the top edge */
  left: 50%;                     /* Center horizontally on screen */
  transform: translateX(-50%);  /* Correct centering transform */
  background: #B30000;           /* Red background color for visibility */
  color: white;                  /* White text for contrast */
  padding: 12px 18px;            /* Spacing inside the toast */
  border-radius: 6px;            /* Slightly rounded corners */
  font-weight: bold;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.3); /* Subtle shadow for depth */
}

/* Fade-in and fade-out animation definition. */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* Adjustments for smaller screens (mobile). */
@media (max-width: 360px) {
  .toast {
    font-size: 0.9rem;
    padding: 8px 12px;
  }
}
</style>
