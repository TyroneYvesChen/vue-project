<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view></router-view>
    <axios-loading></axios-loading>
  </div>
</template>

<script>
  import axiosLoading from './components/common/axiosLoading/axiosLoading.vue'

export default {
  name: 'app',
  components: {axiosLoading}
}
</script>

<style rel="stylesheet/scss" type="text/css">
  @import './assets/styles/_reset.scss';
  @import './assets/styles/index.css';
  @import './assets/styles/animate.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
