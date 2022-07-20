<template >
   <group-list/>
</template>
<script>
import groupList from '../components/board/group-list.cmp.vue'
import appHeaderCmp from '../components/app-header/app-header.cmp.vue'
export default {

    data() {
        return {

        }
    },
    comments: {
        groupList,
        appHeaderCmp

    }
}
</script>
<style >
</style>