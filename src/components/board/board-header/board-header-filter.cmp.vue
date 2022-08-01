<template>
  <div class="board-header-view-bar">
    <div class="board-filter new-board-filter monday-v2-header">
      <div class="board-subset-left-side-container"></div>
      <div class="add-board-entity-button-wrapper">
        <div class="add-task-button-component">
          <div>
            <button type="button"
              class="add-with-dropdown monday-style-button monday-style-button--size-small monday-style-button--kind-primary monday-style-button--color-primary has-style-size"
              aria-disabled="false" style="--element-width:76.6094px; --element-height:31.9844px;"> New Item </button>
          </div>
          <div class="ds-menu-button-container">
            <div class="dropdown-button small-button">
              <i class="fa fa-angle-down"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="filter-buttons-wrapper">
        <div class="board-filter-input-container board-filter-input-container--expandable">
          <span class="icon icon-v2-search search-icon"></span>
          <div class="board-filter-input-wrapper_v2">
            <div class="icon-and-input-wrapper">
              <input @input="$emit('searchInput', inputTxt)" v-model="inputTxt" type="text" placeholder="Search">
            </div>
          </div>
        </div>
        <el-tooltip placement="top" content="Filter by person" effect="dark">
          <div class="board-filter-item-component person-filter-component">
            <div class="board-filter-item-content-wrapper">

              <span class="">
                <div
                  class="monday-style-clickable board-filter-item-content person-filter-component show-title-when-closed show-title-when-open monday-style-clickable--disable-text-selection"
                  data-testid="clickable" role="button" tabindex="0" aria-label="Filter by person"
                  aria-haspopup="dialog">
                  <i class="item-icon icon icon-dapulse-person-column person-filter-icon"></i>
                  <span class="item-title"> Person </span>
                </div>
              </span>
            </div>
          </div>
        </el-tooltip>
        <el-tooltip placement="top" content="Filter by anything" effect="dark">
          <div ref="filterMenuBtn" class="board-filter-item-component rule-based-filer-component">
            <div class="board-filter-item-content-wrapper">
              <span>
                <div
                  class="monday-style-clickable board-filter-item-content rule-based-filer-component with-caret show-title-when-closed show-title-when-open monday-style-clickable--disable-text-selection"
                  role="button" @click="showFilterMenuOption">

                  <i class="item-icon icon icon-v2-funnel"></i>
                  <span class="item-title"> Filter </span>
                  <div class="caret-icon-container">
                    <i class="icon caret-icon icon-arrow-down"></i>
                  </div>
                </div>

              </span>
            </div>

            <filter-menu v-click-outside="closeActionsModal" v-if="filterMenuOption"
              :filterMenuOption="filterMenuOption" :pos="filterMenuOptionPos" @closeActionsModal="closeActionsModal"
              @filterBy="filterBy">
            </filter-menu>

          </div>
        </el-tooltip>
        <el-tooltip placement="top" content="Sort by any column" effect="dark">
          <div @click="sortBy('createdAt')" class="board-filter-item-component sort-settings-component">
            <div class="board-filter-item-content-wrapper">
              <span class="">
                <div
                  class="monday-style-clickable board-filter-item-content sort-settings-component show-title-when-closed show-title-when-open monday-style-clickable--disable-text-selection">
                  <i class="item-icon icon icon-v2-sort-up-down-arrows"></i>
                  <span class="item-title"> Sort </span>
                </div>
              </span>
            </div>
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup>
import filterMenu from '../menus/filter-menu.cmp.vue'
import sortMenu from '../menus/sort-menu.cmp.vue'
</script>
<script>
export default {
  props: {
    board: Object,
  },
  data() {
    return {
      inputTxt: '',
      MenuOpen: false,
      filterMenuOption: null,
      filterMenuOptionPos: {}
    }
  },
  mounted() {
    this.filterMenuOptionPos = this.$refs.filterMenuBtn.getBoundingClientRect()
  },
  components: {
    filterMenu
  },
  methods: {

    showFilterMenuOption() {
      this.filterMenuOption = {}
      this.filterMenuOption = this.board
    },
    closeActionsModal() {
      this.filterMenuOption = null
    },
    filterBy(filter, param) {
      this.$store.dispatch({ type: 'filterBy', filter, param })
      this.closeActionsModal()
    },
    sortBy(sortByParam) {
      this.$store.dispatch({ type: 'sortBy', sortByParam })
    }
  },


}
</script>

<style>
.board-filter-item-component.rule-based-filer-component {
  position: relative;
}

.monday-style-clickable {
  position: relative;
}
</style>