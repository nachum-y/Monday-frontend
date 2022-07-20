<template>
   <div class="surface">
      <nav class="surface-control" aria-label="Views and Tools">
         <div class="surface-control-component" role="menu" aria-label="Main" tabindex="0">
            <div class="surface-control-primary">
               <homepage-action />
               <div class="monday-style-divider surface-divider  monday-style-divider--horizontal"></div>
               <div class="scrollable-navigation-items-area">

                  <div class="top-navigation-items-area">
                     <work-management />

                     <div v-for="(tab, idx) in tabs" :class="tab + 'actionTab'">
                        <action-icon-wrapper :iconName="tab" :isActive=isActive(tab) @click="setSelectedTab(tab)">
                           <template #svgIcon>
                              <use :xlink:href="setSvgLink(tab)"></use>
                           </template>
                        </action-icon-wrapper>

                     </div>
                  </div>

               </div>
               <footer-navigation />
            </div>
         </div>
      </nav>
   </div>
</template>
<script>
import homepageAction from './homepage-action.cmp.vue'
import workManagement from './work-management.cmp.vue'
import actionIconWrapper from './action-icon-wrapper-cmp.vue'
import footerNavigation from './footer-navigation.cmp.vue'
export default {
   data() {
      return {
         activeTab: 'notifications',
         tabs: ['Notifications', 'Inbox', 'MyWeek', 'Favorite', 'Invite', 'Search', 'Help'],
      }

   },
   components: {
      homepageAction,
      workManagement,
      actionIconWrapper,
      footerNavigation

   },
   computed: {
      selectedTab() {
         // console.log(tabs[selected])
         //   return this.selected
      }
   },
   methods: {
      isActive(tab) {
         return tab === this.activeTab
      },
      setSelectedTab(tab) {
         this.activeTab = tab
      },
      setSvgLink(tab) {
         return '../../src/assets/sprite.svg#' + tab
      },
      
   },


}
</script>
<style>
</style>