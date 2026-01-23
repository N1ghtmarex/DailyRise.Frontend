<template>
  <Header @show-loading="showLoading" @show-popup="showPopup"></Header>
  <router-view @show-loading="showLoading" @show-popup="showPopup"></router-view>
  <Navbar @show-loading="showLoading" @show-popup="showPopup"></Navbar>
  
  <LoaderCircle v-if="load"></LoaderCircle>

  <PopupMessage
    :visible="popup.visible"
    :message="popup.message"
    :type="popup.type"
  />
</template>

<script>
import Header from './components/Header.vue';
import LoaderCircle from './components/LoaderCircle.vue';
import Navbar from './components/Navbar.vue';
import PopupMessage from './components/PopupMessage.vue';
  
export default {
  name: 'App',
  components: {
    Header,
    Navbar,
    LoaderCircle,
    PopupMessage,
  },
  data() {
    return{
      load: false,
      popup: {
        visible: false,
        message: '',
        type: 'info'
      },
    }
  },
  methods: {
    showLoading(state) {
      this.load = state;
    },
    showPopup({ message, type = 'info', timeout = 3000 }) {
      this.popup = {
        visible: true,
        message,
        type
      }

      setTimeout(() => {
        this.popup.visible = false
      }, timeout)
    },
  }
}
</script>

<style>
</style>
