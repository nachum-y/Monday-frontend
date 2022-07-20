<template>
  <div class="application-layers">
    <appHeader-cmp />
    <div class="first-level">
      <div class="first-level-control"></div>
      <div class="first-level-content-wrapper">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import appHeaderCmp from './components/app-header/app-header.cmp.vue'
export default {
  data() {
    return {

    }
  },
  components: {
    appHeaderCmp
  }
}
</script>
<style>
</style>