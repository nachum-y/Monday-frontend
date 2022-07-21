<template >
    <board-header />
    <!-- <group-list /> -->
    <group-list2 />
</template>
<script>
import groupList from '../components/board/group-list.cmp.vue'
import groupList2 from '../components/board/group-list-copy.cmp.vue'
import appHeader from '../components/app-header/app-header.cmp.vue'
import boardHeader from '../components/board/board-header/board-header.cmp.vue'
export default {

    data() {
        return {

        }
    },
    components: {
        groupList,
        appHeader,
        boardHeader,
        groupList2
    }
}
</script>
<style >
</style>