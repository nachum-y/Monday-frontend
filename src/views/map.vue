<template>
    <div class="map-content">
        <div v-if="taskLocationLits" class="map-page">
            <div v-for="(task, idx) in taskLocationLits" :key="idx">
                <map-cmp :taskLocation="task" />
            </div>
        </div>

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
        this.taskLocationLits = taskList
    },
    components: {
        mapCmp
    }
}
</script>
<style >
.map-content .map-page {
    gap: 1.6rem;
}
</style>