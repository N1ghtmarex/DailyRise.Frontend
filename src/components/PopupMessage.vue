<template>
  <transition name="fade">
    <div v-if="visible" class="popup" :class="type">
      {{ message }}
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PopupMessage',
  props: {
    visible: Boolean,
    message: String,
    type: {
      type: String,
      default: 'info'
    }
  }
}
</script>

<style scoped>
.popup {
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 240px;
  padding: 14px 18px;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  z-index: 10000;
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.success { background: #42b983; }
.error   { background: #ff4d4f; }
.info    { background: #409eff; }

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
