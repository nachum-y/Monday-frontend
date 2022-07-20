<template>
<section class="main-header">
  <div class="main-header-nav">
    <div class="board-title-component">
      <el-tooltip content="Click to edit" effect="dark">
        <input :style="{'width': ((board.title.length + 2) * 1) + 'ch'}" onkeypress="this.style.width = ((this.value.length + 2) * 1) + 'ch';" @click="handleInput" @change="updateBoardTitle" type="text" :value="board.title">
      </el-tooltip>
      <el-tooltip content="Show board description" effect="dark">
          <button class="i-btn header-btn"></button>
      </el-tooltip>
      <el-tooltip content="Add to favorites" placement="bottom" effect="dark">
        <button class="star-btn header-btn"></button>
      </el-tooltip>
    </div>
    <div class="board-actions">
      <button class="last-seen-btn header-btn">
        <span>Last seen</span>
        <!-- TODO: chang to :content holds user + last seen -->
        <el-tooltip :style="`font-size:50px;`" content="shirkiabir@gmail.com" effect="dark">
          <img class="user-avatar" src="../../../assets/images/dapulse_default_photo.png" alt="user-avatar">
        </el-tooltip>
      </button>
      <button class="invite-btn header-btn">
        <span class="invite-icon"></span>
        <span class="invite-txt"> &nbsp; &nbsp; Invite / 1</span>
      </button>
    </div>
  </div>
    <section class="sub-header-nav">
      <button class="main-tab header-btn">
        <span class="main-tab-icon"></span>
        <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16" aria-hidden="true" class="icon_component icon">
          <path d="M9.56992 2.1408C9.82591 1.95307 10.1741 1.95307 10.4301 2.1408L17.7028 7.47413C17.8896 7.61113 18 7.82894 18 8.06061V16.7879C18 17.1895 17.6744 17.5152 17.2727 17.5152H11.9394C11.5377 17.5152 11.2121 17.1895 11.2121 16.7879V13.1515H8.78788V16.7879C8.78788 17.1895 8.46227 17.5152 8.06061 17.5152H2.72727C2.32561 17.5152 2 17.1895 2 16.7879V8.06061C2 7.82894 2.11037 7.61113 2.29719 7.47413L9.56992 2.1408ZM3.45455 8.42914V16.0606H7.33333V12.4242C7.33333 12.0226 7.65894 11.697 8.06061 11.697H11.9394C12.3411 11.697 12.6667 12.0226 12.6667 12.4242V16.0606H16.5455V8.42914L10 3.62914L3.45455 8.42914Z" class="add-tab header-btn"></path>
        </svg>
        <div>Main Tab...</div>
        <div class="icon-v2-ellipsis-container">
          <span class="icon-v2-ellipsis"></span>
        </div>
      </button>
      <div class="monday-board-subset-item-v2__active-strip" ></div>
      <el-tooltip content="Add view" effect="dark">
        <button class="add-tab header-btn"></button>
      </el-tooltip>
    </section>
    <!-- <mainFilter/> -->
</section>
</template>

<script>
// import mainFilter from './components/main-filter.cmp.vue'
export default {
  name: 'mainHeader',
  data() {
    return {
      board:{
        title: 'New Board',
      },
      
    }
  },
  methods:{
    updateBoardTitle(ev){
      console.log('update' + this.board.title)
      this.board.title = ev.target.value
      if (!ev.target.value) this.board.title = 'New Board'
    },
    handleInput(e) {
      const el = e.target;
      const sel = el.value.length;
      this.event = e;
      this.$nextTick(() => {
        el.setSelectionRange(sel, sel)
        el.focus()
      })
    },
    resizeInput(){
      this.style.width=22
    }
  },
  computed:{

  },
  components:{
    // mainFilter,
  }
}
</script>