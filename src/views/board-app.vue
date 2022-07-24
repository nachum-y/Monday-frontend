<template >
    <board-header />
    <group-list />
</template>
<script>
import groupList from '../components/board/group-list.cmp.vue'
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
    }
}
</script>
<style >
</style>