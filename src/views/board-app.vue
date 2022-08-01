<template >
    <board-header  />
    <!-- <group-list /> -->
    <!-- <kanban-view /> -->
    <router-view></router-view>
</template>
<script>
import groupList from '../components/board/group-list.cmp.vue'
import appHeader from '../components/app-header/app-header.cmp.vue'
import boardHeader from '../components/board/board-header/board-header.cmp.vue'
import kanbanView from './kanban-view.vue'
export default {

    data() {
        return {

        }
    },
    components: {
        groupList,
        appHeader,
        boardHeader,
        kanbanView,
    },
    methods: {
        searchInput(val) {
        }
    },
}
</script>
<style >
</style>

