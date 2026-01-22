<template>
  Добро пожаловать, {{ userData }}
</template>

<script>
import axios from 'axios';

//import WebApp from '@twa-dev/sdk'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      userData: null,
    }
  },
  async mounted() {
  }
}
</script>


<style scoped>

</style>
