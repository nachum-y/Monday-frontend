<template>
  <div v-if="data && activeUser" class="application-layers">
    <app-header :currBoardId="data[0]._id" :activeUser="activeUser" />
    <div class="first-level">

      <action-side-nav @sideExpanded="isSideExpanded" />
      <div class="first-level-content-wrapper" :class="isSideExpandedVal ? '-pinned' : '-unpinned'">
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
      isSideExpandedVal: false,
      data: null,
      activeUser: null,
    }
  },
  components: {
    appHeader,
    actionSideNav,

  },
  methods: {
    isSideExpanded(val) {
      this.isSideExpandedVal = val
    }
  },
  computed: {

  },
  async created() {
    const data = await this.$store.dispatch({ type: 'loadBoard' })
    this.data = data
    const activeUser = await this.$store.dispatch({ type: 'getActive' })
    this.activeUser = activeUser
  },
}
</script>
<style>
</style>