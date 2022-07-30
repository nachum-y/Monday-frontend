<template>
    <div v-if="taskLocationLits" class="map-page">
        <div v-for="(task, idx) in taskLocationLits" :key="idx">

            <map-cmp :taskLocation="task" />
        </div>
    </div>
    <div v-else>
        <span>There are no maps to display at this time</span>
    </div>
</template>
<script>
import mapCmp from '../components/board/map.cmp.vue'
export default {
    data() {
        return {
            taskLocationLits: null
        }
    },
    created() {
        let taskList = this.$store.getters.getAllTasksLocation
        console.log('taskList:',)
        this.taskLocationLits = taskList[0]
    },
    components: {
        mapCmp
    }
}
</script>
<style >
.map-page {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}
</style>