<template>
  <div class="application-layers">
    <app-header />
    <div class="first-level">
      <action-side-nav @sideExpanded="isSideExpanded" />
      <div class="first-level-content-wrapper">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import appHeader from './components/app-header/app-header.cmp.vue'
import actionSideNav from './components/app-header/action-side-nav.cmp.vue'
export default {
  data() {
    return {

    }
  },
  components: {
    appHeader,
    actionSideNav
  },
  computed: {
    isSideExpanded(v) {
      
      console.log(v)
    }
  }
}
</script>
<style>
</style>