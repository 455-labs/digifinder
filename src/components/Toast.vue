<script>
export default {
  props: {
    message: String,
    visible: Boolean
  }
};
</script>

<template>
  <transition name="fade">
    <div v-if="visible" class="toast">
      {{ message }}
    </div>
  </transition>
</template>

<style>
.toast {
  position: fixed;
  top: 20px;          /* place near the top */
  left: 50%;          /* center horizontally */
  transform: translateX(-50%);  /* adjust to true center */
  background: #ff3b3b;
  color: white;
  padding: 12px 18px;
  border-radius: 6px;
  font-weight: bold;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.3);
}


/* Fade-in/out animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
