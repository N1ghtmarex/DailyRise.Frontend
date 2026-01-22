<template>
  Добро пожаловать, {{ userData }}
</template>

<script>
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
