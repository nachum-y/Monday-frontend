<template>
    <div v-if="tasksByStatus">
        <div class="card" v-for="(task, idx) in tasksByStatus.tasks" :key="idx">
            <div class="card-title">{{ task.cols[0].value }}</div>
            <div class="card-data">
                <div v-show="colsToDisplay.includes(col.type)" class="card-data-item" v-for="(col, idx) in task.cols"
                    :key="idx">
                    <div class="card-data-item-col-icon" :class="col.type"> </div>
                    <div class="card-data-item-col-title">
                        {{ col.type }}
                    </div>
                    <div class="card-data-item-col-content">
                        <component :is="col.type" :task="col" :row="task" :labels="labels" :status="status"
                            :priority="priority" :boardMembers="boardMembers">
                        </component>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import taskTitle from '../board-col/task-title.cmp.vue'
import date from './../board-col/date.cmp.vue'
import creationLog from './../board-col/creationLog.cmp.vue'
import labelCmp from './../board-col/label.cmp.vue'
import lastUpdated from './../board-col/last-updated.cmp.vue'
import location from './../board-col/location.cmp.vue'
import person from './../board-col/person.cmp.vue'
import priority from './../board-col/priority.cmp.vue'
import status from './../board-col/status.cmp.vue'
import textCmp from './../board-col/text.cmp.vue'
import timeline from './../board-col/timeline.cmp.vue'
export default {
    props: {
        tasksByStatus: Object

    },
    data() {
        return {
            colsToDisplay: ['person', 'priority', 'labelCmp', 'creationLog', 'date', 'textCmp', 'location', 'status'],
            labels: null,
            status: null,
            priority: null,
            boardMembers: null,
            isShown: '',
            board: null,
            allCols: ['person', 'priority', 'labelCmp', 'creationLog', 'date', 'textCmp', 'location', 'status'],

        }
    },
    created() {
        this.boardMembers = this.$store.getters.getMembers
        this.labels = this.$store.getters.getLabels
        this.status = this.$store.getters.getStatus
        this.priority = this.$store.getters.getPriority
        this.board = this.$store.getters.board
    },
    comments: {
        creationLog,
        date,
        labelCmp,
        lastUpdated,
        location,
        person,
        priority,
        status,
        textCmp,
        timeline,
        taskTitle,
    }

}
</script>
<style>
</style>