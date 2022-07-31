<template>
  <div v-if="data && activeUser" class="application-layers">
    <app-header v-if="this.$router.currentRoute._value.fullPath !== '/'" :currBoardId="data[0]._id" :activeUser="activeUser" :boardMembers="data[0].members" />
    <div class="first-level">
      <action-side-nav v-if="this.$router.currentRoute._value.fullPath !== '/'" @sideNavisPinned="isSideNavPinned" />
      <div class="first-level-content-wrapper" :class="sideNavisPinned ? '-pinned' : '-unpinned'">
        <router-view />
      </div>
    </div>
    <modal-cmp />
  </div>
</template>
<script>

import appHeader from './components/app-header/app-header.cmp.vue'
import actionSideNav from './components/app-header/action-side-nav.cmp.vue'
import modalCmp from './components/modal.cmp.vue'


export default {
  data() {
    return {
      sideNavisPinned: false,
      data: null,
      activeUser: null,
    }
  },
  components: {
    appHeader,
    actionSideNav,
    modalCmp,

  },
  methods: {
    isSideNavPinned(val) {
      this.sideNavisPinned = val
    }
  },
  computed: {

  },
  async created() {
    const data = await this.$store.dispatch({ type: 'loadBoard' })
    this.data = data
    const activeUser = await this.$store.dispatch({ type: 'getActive' })
    this.activeUser = activeUser
    console.log(this.$router.currentRoute._value.fullPath);
  },
}
</script>
<style>

</style>