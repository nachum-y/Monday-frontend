<template>
<div id="board-header-view-bar" class="board-header-view-bar">
  <div class="board-filter new-board-filter monday-v2-header">
    <div class="board-subset-left-side-container"></div>
    <div class="add-board-entity-button-wrapper" data-walkthrough-id="add-item-with-dropdown">
      <div class="add-task-button-component">
        <div data-walkthrough-id="add-item-with-dropdown">
          <button type="button" class="add-with-dropdown monday-style-button monday-style-button--size-small monday-style-button--kind-primary monday-style-button--color-primary has-style-size" data-testid="button" aria-disabled="false" style="--element-width:76.6094px; --element-height:31.9844px;"> New Item </button>
        </div>
        <div class="ds-menu-button-container">
          <div class="dropdown-button small-button">
            <i class="fa fa-angle-down"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="filter-buttons-wrapper">
      <div class="board-filter-input-container board-filter-search board-filter-input-container--expandable">
        <span class="icon icon-v2-search"></span>
        <div class="board-filter-input-wrapper_v2">
          <div class="icon-and-input-wrapper">
            <input placeholder="Search" value="">
          </div>
        </div>
      </div>
       <el-tooltip content="Filter by person" effect="dark">
        <div class="board-filter-item-component person-filter-component">
        <div class="board-filter-item-content-wrapper">
          <span class="">
            <div class="monday-style-clickable board-filter-item-content person-filter-component show-title-when-closed show-title-when-open monday-style-clickable--disable-text-selection" data-testid="clickable" role="button" tabindex="0" aria-label="Filter by person" aria-haspopup="dialog">
              <i class="item-icon icon icon-dapulse-person-column person-filter-icon"></i>
              <span class="item-title"> Person </span>
            </div>
          </span>
        </div>
      </div>
      </el-tooltip>
       <el-tooltip content="Filter by anything" effect="dark">
        <div class="board-filter-item-component rule-based-filer-component">
        <div class="board-filter-item-content-wrapper">
          <span class="">
            <div class="monday-style-clickable board-filter-item-content rule-based-filer-component with-caret show-title-when-closed show-title-when-open monday-style-clickable--disable-text-selection" data-testid="clickable" role="button" tabindex="0" aria-label="Filter by anything" aria-haspopup="dialog">
              <i class="item-icon icon icon-v2-funnel"></i>
              <span class="item-title"> Filter </span>
              <div class="caret-icon-container">
                <i class="icon caret-icon icon-arrow-down"></i>
              </div>
            </div>
          </span>
        </div>
      </div>
      </el-tooltip>
       <el-tooltip content="Sort by any column" effect="dark">
        <div class="board-filter-item-component sort-settings-component">
        <div class="board-filter-item-content-wrapper">
          <span class="">
            <div class="monday-style-clickable board-filter-item-content sort-settings-component show-title-when-closed show-title-when-open monday-style-clickable--disable-text-selection" data-testid="clickable" role="button" tabindex="0" aria-label="Sort by any column" aria-haspopup="dialog">
              <i class="item-icon icon icon-v2-sort-up-down-arrows"></i>
              <span class="item-title"> Sort </span>
            </div>
          </span>
        </div>
      </div>
      </el-tooltip>
       <el-tooltip content="Hidden colunms" effect="dark">
        <div class="board-filter-item-component columns-filter-component">
        <div class="board-filter-item-content-wrapper item-state-exit-done">
          <span class="">
            <div class="monday-style-clickable board-filter-item-content columns-filter-component show-title-when-closed show-title-when-open monday-style-clickable--disable-text-selection" data-testid="clickable" role="button" tabindex="0" aria-label="Hidden columns" aria-haspopup="dialog">
              <i class="item-icon icon icon-hidden-eye-outline columns-filter-icon"></i>
              <span class="item-title">Hide</span>
            </div>
          </span>
        </div>
      </div>
      </el-tooltip>
      <div>
        <button type="button" class="menu-button--wrapper board-filters-overflow-menu-item menu-button--wrapper--size-32" aria-haspopup="true" aria-expanded="false" aria-label="Menu" aria-disabled="false">
          <svg viewBox="0 0 20 20" fill="currentColor" width="28" height="28" role="img" aria-hidden="true">
            <path d="M6 10.5C6 11.3284 5.32843 12 4.5 12 3.67157 12 3 11.3284 3 10.5 3 9.67157 3.67157 9 4.5 9 5.32843 9 6 9.67157 6 10.5zM11.8333 10.5C11.8333 11.3284 11.1618 12 10.3333 12 9.50492 12 8.83334 11.3284 8.83334 10.5 8.83334 9.67157 9.50492 9 10.3333 9 11.1618 9 11.8333 9.67157 11.8333 10.5zM17.6667 10.5C17.6667 11.3284 16.9951 12 16.1667 12 15.3383 12 14.6667 11.3284 14.6667 10.5 14.6667 9.67157 15.3383 9 16.1667 9 16.9951 9 17.6667 9.67157 17.6667 10.5z" fill="currentColor"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
}
</script>

<style>
</style>