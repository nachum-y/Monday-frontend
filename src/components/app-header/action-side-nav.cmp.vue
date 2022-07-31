<template >
  <div @mouseover="sideNavisExpanded = setSideNavisExpanded(true)" class="first-level-control"
    style="z-index:100: height:100%">
    <div @mouseout="sideNavisExpanded = setSideNavisExpanded(false)" class="first-level-control-component"
      :class="{ 'is-expanded is-pinned': sideNavisExpanded }">
      <div class="collapse-first-level-button-component-wrapper">
        <div disabled="" class="collapse-first-leve-button-component " :class="{ 'is-pinned': sideNavisPinned }"
          @click="isExpanded" aria-hidden="true">
          <span class="collapse-icon fa fa-angle-right"></span>
        </div>
      </div>
      <div class="first-level-control-content">
        <div class="home-control-component">
          <div class="home-workspace-items-component">
            <div class="title-wrapper">
              <div class="home-workspace-items-title-component">

                <div class="home-control-top-header-component home-workspace-items-header">
                  <div class="dropdown-navigation-header">

                    <span class="dropdown-header-name">Workspace</span>
                  </div>
                  <div class="menu-button-container">
                    <div class="workspace-dropdown-button">
                      <div class="work-space-icon-container">
                      <div class="workspace-icon">
                        <span class="letter">M</span>
                        <div class="work-space-icon-holder" ></div>
                      </div>
                      <div class="mini-icon" ></div>
                    </div>
                      <span class="work-space-title">CA SPRINT 4</span>
                    </div>
                  </div>
                </div>

                <!-- <div class="home-workspace-items-content-sub-header-wrapper"> -->
                <!-- <div class="top-new-button-component">
                        <button type="button"
                          class="menu-button--wrapper add_new_board_btn menu-button--wrapper--size-32 menu-button--wrapper--text"
                          aria-haspopup="true" aria-expanded="false" aria-label="false" aria-disabled="false"><svg
                            viewBox="0 0 20 20" fill="currentColor" width="19" height="19" aria-hidden="true"
                            class="icon_component icon_component--no-focus-style">
                            <path
                              d="M10.75 3C10.75 2.58579 10.4142 2.25 10 2.25C9.58579 2.25 9.25 2.58579 9.25 3V9.25H3C2.58579 9.25 2.25 9.58579 2.25 10C2.25 10.4142 2.58579 10.75 3 10.75H9.25V17C9.25 17.4142 9.58579 17.75 10 17.75C10.4142 17.75 10.75 17.4142 10.75 17V10.75H17C17.4142 10.75 17.75 10.4142 17.75 10C17.75 9.58579 17.4142 9.25 17 9.25H10.75V3Z"
                              fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                          </svg><span class="menu-button--wrapper--inner-text">Add</span></button>
                      </div> -->
                <!-- <div class="boards-list-header-component selected leftpane-workspace-header-redesign"> -->
                <!-- <div class="unified-boards-search-input-wrapper empty"><svg viewBox="0 0 20 20"
                            fill="currentColor" width="26" height="26" role="button" tabindex="0" aria-hidden="false"
                            class="icon_component search-icon icon_component--clickable">
                            <path
                              d="M8.65191 2.37299C6.9706 2.37299 5.35814 3.04089 4.16927 4.22976C2.9804 5.41863 2.3125 7.03108 2.3125 8.7124C2.3125 10.3937 2.9804 12.0062 4.16927 13.195C5.35814 14.3839 6.9706 15.0518 8.65191 15.0518C10.0813 15.0518 11.4609 14.5691 12.5728 13.6939L16.4086 17.5303C16.7014 17.8232 17.1763 17.8232 17.4692 17.5303C17.7621 17.2375 17.7622 16.7626 17.4693 16.4697L13.6334 12.6333C14.5086 11.5214 14.9913 10.1418 14.9913 8.7124C14.9913 7.03108 14.3234 5.41863 13.1346 4.22976C11.9457 3.04089 10.3332 2.37299 8.65191 2.37299ZM12.091 12.1172C12.9878 11.2113 13.4913 9.98783 13.4913 8.7124C13.4913 7.42891 12.9815 6.19798 12.0739 5.29042C11.1663 4.38285 9.9354 3.87299 8.65191 3.87299C7.36842 3.87299 6.1375 4.38285 5.22993 5.29042C4.32237 6.19798 3.8125 7.42891 3.8125 8.7124C3.8125 9.99589 4.32237 11.2268 5.22993 12.1344C6.1375 13.0419 7.36842 13.5518 8.65191 13.5518C9.92736 13.5518 11.1509 13.0483 12.0568 12.1514C12.0623 12.1455 12.0679 12.1397 12.0737 12.134C12.0794 12.1283 12.0851 12.1227 12.091 12.1172Z"
                              fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                          </svg><input id="boards-list-search-input" class="unified-boards-search-input"
                            placeholder="Search" autocomplete="off" aria-label="Search in workspace" tabindex="0"
                            value="">

                        </div> -->
                <!-- </div> -->

                <!-- </div> -->

                <div class="spacer"></div>
              </div>
            </div>

            <div class="home-workspace-items-content-wrapper">
              <div class="top-new-button-component">
                <div class="action-btn-side-nav">
                  <font-awesome-icon :icon="faPlus" class="faPlus action-icon" />
                  <span class="action-label"> Add</span>
                </div>
                <div class="action-btn-side-nav">
                  <font-awesome-icon :icon="faMagnifyingGlass" class="faMagnifyingGlass action-icon" />
                  <span class="action-label"> Search</span>
                </div>
              </div>
            </div>
            <div class="spacer"></div>
          </div>
          <div class="boards">
            <div class="selected-board">
              <span class="board-icon"></span>
              <span class="action-label">Departmental projects</span>
            </div>
            <div class="board-select">
              <span class="board-icon"></span>
              <span class="action-label">My projects</span>
            </div>
            <div class="board-select">
              <span class="board-icon"></span>
              <span class="action-label">Management projects</span>
            </div>



          </div>
        </div>

      </div>



    </div>
  </div>
</template>
<script>
import { faTableColumns, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
export default {
  emits: ['sideExpanded'],
  data() {
    return {
      sideNavisExpanded: false,
      sideNavisPinned: false,
      workSpaceIcon: faTableColumns,
      faMagnifyingGlass,
      faPlus
    }
  },
  methods: {
    isExpanded(val) {
      this.sideNavisPinned = !this.sideNavisPinned
      // return this.sideNavisExpanded === true ? 'is-expanded' : ''
    },
    setSideNavisExpanded(val) {
      if (this.sideNavisPinned) {
        this.sideNavisExpanded = true
        return true
      }
      this.sideNavisExpanded = val
      return val
    }
  },
  components: {
    FontAwesomeIcon
  },
  computed: {
    sideNav() {
      if (this.sideNavisPinned) {
        return true
      }
      this.sideNavisExpanded
    }
  },

  watch: {
    sideNavisPinned(val) {
      // console.log(1)
      this.$emit('sideNavisPinned', val)
    }
  }
}
</script>
<style>

.work-space-title{
      font-weight: 600;
      color: #323338;
      font-family: Roboto, Rubik, Noto Kufi Arabic, Noto Sans JP, sans-serif;
      font-size: 16px;
}

.work-space-icon-container{
  position: relative;
}


.workspace-icon {
  background-color: #f279f2;
  display: flex;
  justify-content: center;
  align-items:flex-start;
  color: #fff;
  border-radius: 0.25rem;
  position: relative;
  margin-inline-end: 0.5rem;
  width: 24px;
  height: 24px;
  box-sizing: border-box;
}

.workspace-icon .letter {
  padding: 0.125rem;
  font-size: 16px;
}

.work-space-icon-holder {
  left: 1rem;
  height: 11.5px;
  width: 11.5px;
  position: absolute;
  top: 0.92rem;
  border-radius: 50%;
  padding: 0.125rem;
  background-color: #f6f7fb;

}

.mini-icon::before{
  content: "\f340";
  font-family: "dapulse";
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  color: #323338;
  font-size: 11px;
  position: absolute;
  left: 17px;
  bottom: -3px;

}

.home-workspace-items-content-wrapper {
  font-size: 14px;
  font-weight: 400;
  color: #676879;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 12px 16px 18px 16px;
}

.action-btn-side-nav {
  padding: 0.5rem 0;
}

.action-btn-side-nav:hover {
  border-radius: 4px;
  background-color: #dcdfec;
}

.action-label {
  margin: 0 0.5rem;
}

.spacer {
  border-bottom: 1px solid;
  border-color: #d0d4e4;
  margin: 0 20px;
}

.boards {
  font-size: 14px;
  font-weight: 400;
  color: #676879;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 12px 16px 18px 16px;
}

.board-select {
  display: flex;
  align-items: center;
  color: #676879;
  padding: 0.5rem 0;
  cursor: pointer;
  height: 32px;
}

.selected-board{
  background-color: #cce5ff;
  display: flex;
  align-items: center;
  color: #676879;
  padding: 0.5rem 0;
  cursor: pointer;
  border-radius: 4px;
  height: 32px;
}

.fa-angle-right:before {
  content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 512'%3E%3C!--! Font Awesome Pro 6.1.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --%3E%3Cpath d='M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z'/%3E%3C/svg%3E");
}

.collapse-first-leve-button-component .collapse-icon {
  width: 100%;
}

.collapse-first-leve-button-component {
  right: -14px;
  width: 26px;
}

.board-select:hover {
  border-radius: 4px;
  background-color: #dcdfec;
}

.board-icon::before {
  content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' width='19' height='19' aria-hidden='true' aria-label='Public board' class='icon_component'%3E%3Cpath d='M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z' fill='currentColor' fill-rule='evenodd' clip-rule='evenodd'%3E%3C/path%3E%3C/svg%3E");
}

.board-icon,
.action-icon {
  margin-inline-start: 0.5rem;
}
</style>