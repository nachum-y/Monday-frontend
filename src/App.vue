<template>
  <div v-if="data && activeUser" class="application-layers">
    <app-header :activeUser="activeUser" :boardMembers="data[0].members"
      :class="{ 'hide': activePage === 'homePage' }" />
    <div class="first-level" :class="{ 'homePage': activePage === 'homePage' }">
      <action-side-nav @sideNavisPinned="isSideNavPinned" :class="{ 'hide': activePage === 'homePage' }" />
      <div class="first-level-content-wrapper"
        :class="[sideNavisPinned ? '-pinned' : '-unpinned', { 'homePage': activePage === 'homePage' }]">
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
      activePage: ''
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
  },
  watch: {
    '$route': {
      handler: function (routerChange) {
        this.activePage = routerChange.name
      },

      deep: true,
      immediate: true
    }
  }
}
</script>
<style>
.hide {
  display: none !important;
  left: 0 !important;
  margin: 0;
}

.first-level-content-wrapper.-unpinned.homePage {
  margin: 0;
}
.first-level.homePage {
    left: 0 !important;

}
</style>