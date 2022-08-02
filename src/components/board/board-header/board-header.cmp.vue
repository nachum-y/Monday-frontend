<template>
  <section v-if="board" class="main-header">
    <div class="main-header-nav">
      <div class="board-title-component">
        <div class="header-input-container">
          <el-tooltip content="Click to edit" effect="dark">
            <h1 contenteditable="true" class="board-title-input">
              {{board.title}}
            </h1>
          </el-tooltip>
          <el-tooltip content="Show board description" effect="dark">
            <button class="i-btn header-btn"></button>
          </el-tooltip>
          <el-tooltip content="Add to favorites" placement="bottom" effect="dark">
            <button class="star-btn header-btn"></button>
          </el-tooltip>
        </div>
        <div class="header-btn-container">
          <div class="user-select">
            <button class="last-seen-btn header-btn" @click="toggleMenu">
              <p>Last seen</p>
                <img v-if="activeUser" class="user-avatar" :src="activeUser.imgUrl" alt="user-avatar">

            </button>
            <div v-if="openMenu" class="user-select-menu">
              <div class="user-select-menu-member" v-for="member in board.members" :key="member.id">
                <div class="user-select-menu-member-display">
                  <div class="img-holder">
                    <img :src="member.imgUrl" alt="" srcset="">
                  </div>
                  <div class="member-name">{{ member.name }}</div>
                </div>
                <div class="linkedin-icon"><a :href="getLink(member.id)" target="_blank"></a></div>
              </div>
            </div>
          </div>
          <invite-form class="invite-btn header-btn"></invite-form>
        </div>
      </div>
    </div>
    <section class="sub-header-nav">
      <div class="view-btn-holder">
        <button class="main-tab header-btn" :class="{ 'active-view': activeTab === 'mainTable' }">
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="icon_component icon">
            <path
              d="M9.56992 2.1408C9.82591 1.95307 10.1741 1.95307 10.4301 2.1408L17.7028 7.47413C17.8896 7.61113 18 7.82894 18 8.06061V16.7879C18 17.1895 17.6744 17.5152 17.2727 17.5152H11.9394C11.5377 17.5152 11.2121 17.1895 11.2121 16.7879V13.1515H8.78788V16.7879C8.78788 17.1895 8.46227 17.5152 8.06061 17.5152H2.72727C2.32561 17.5152 2 17.1895 2 16.7879V8.06061C2 7.82894 2.11037 7.61113 2.29719 7.47413L9.56992 2.1408ZM3.45455 8.42914V16.0606H7.33333V12.4242C7.33333 12.0226 7.65894 11.697 8.06061 11.697H11.9394C12.3411 11.697 12.6667 12.0226 12.6667 12.4242V16.0606H16.5455V8.42914L10 3.62914L3.45455 8.42914Z">
            </path>
          </svg>
          <router-link :to="{ name: 'mainTable' }">Main Table</router-link>
          <span class="icon-v2-ellipsis"></span>
        </button>
        <div class="views-seprator"></div>
        <button class="main-tab header-btn kanban-btn" :class="{ 'active-view': activeTab === 'kanban' }">
          <router-link :to="{ name: 'kanban' }">Kanban</router-link>
          <span class="icon-v2-ellipsis"></span>
        </button>
        <div class="views-seprator"></div>
        <button class="main-tab header-btn dashboard-btn" :class="{ 'active-view': activeTab === 'dashboard' }">
          <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
          <span class="icon-v2-ellipsis"></span>
        </button>
        <div class="views-seprator"></div>
        <button class="main-tab header-btn map-btn" :class="{ 'active-view': activeTab === 'map' }">
          <router-link :to="{ name: 'map' }">Map</router-link>
          <span class="icon-v2-ellipsis"></span>
        </button>
        <div class="views-seprator"></div>
        <button class="main-tab header-btn card-btn" :class="{ 'active-view': activeTab === 'card' }">
          <router-link :to="{ name: 'card' }">Cards</router-link>
          <span class="icon-v2-ellipsis"></span>
        </button>
      </div>
    </section>
    <mainFilter @searchInput="searchInput" :board="board" />
  </section>
</template>

<script>
import inviteForm from '../menus/invite-form.cmp.vue'
import mainFilter from './board-header-filter.cmp.vue'
export default {
  name: 'mainHeader',
  data() {
    return {
      board: {
        title: 'New Board',
        board: null,
      },
      openMenu: false,
      activeUser: null,
      activeView: 'mainTable',
      activeTab: ''
    }
  },
  created() {
    this.board = this.$store.getters.board
    this.activeUser = this.$store.getters.getActiveUser
    // this.$watch(, (newVal) => {
    //   console.log(newVal)
    // })
    // this.groupListLabels = this.getTasksByStatus[this.groupId]
    // console.log(this.$router.currentRoute._value.name)

  },
  methods: {
    getLink(personId) {
      let url = '#'
      switch (personId) {
        case 'm101':
          url = 'https://www.linkedin.com/in/shiran-abir/'
          break
        case 'm102':
          url = 'https://www.linkedin.com/in/meital-twito-65575660/'
          break
        default:
          break
      }
      return url
    },
    updateBoardTitle(ev) {
      this.board.title = ev.target.value
      if (!ev.target.value) this.board.title = 'New Board'
    },
    handleInput(e) {
      const el = e.target
      const sel = el.value.length
      this.event = e
      this.$nextTick(() => {
        el.setSelectionRange(sel, sel)
        el.focus()
      })
    },
    resizeInput() {
      this.style.width = 22
    },
    searchInput(inputTxt) {
      
      this.$store.dispatch({ type: 'searchInput', inputTxt })

    },
    toggleMenu() {

      this.openMenu = !this.openMenu
    },
    async changeMember(member) {
      await this.$store.dispatch({ type: 'setActive', member })
      this.activeUser = this.$store.getters.getActiveUser
    },
    isActive() {
      return 'active-view'
    },
    setSelectedTab(tab) {
      this.activeTab = tab
    },

  },
  computed: {


  },
  components: {
    mainFilter,
    inviteForm,
  },
  watch: {
    '$route': {
      handler: function (routerChange) {
        this.activeTab = routerChange.name
      },
      deep: true,
      immediate: true
    }
  }
}
</script>