<template>
    <div v-if="taskListByLabel">
        <draggable v-model="taskListByLabel" dataIdAttrtag="div" :group="'task-kanban'" :move="checkMove"
            :dragClass="'drag-task-kanban'" :ghostClass="'ghost-kanban-list'" :animation="200" :item-key="key => key"
            @change="change">
            <template #item="{ element }">
                <div class="card">
                    <div class="card-title">{{ element.cols[0].value }}</div>
                    <div class="card-data">
                        <div v-show="colsToDisplay.includes(col.type)" class="card-data-item"
                            v-for="(col, idx) in element.cols" :key="idx">
                            <div class="card-data-item-col-icon" :class="col.type"> </div>
                            <div class="card-data-item-col-title">
                                {{ col.type }}
                            </div>
                            <div class="card-data-item-col-content">
                                <component @updateTask="updateTask" :is="col.type" :task="col" :row="element"
                                    :labels="labels" :status="status" :priority="priority" :boardMembers="boardMembers">
                                </component>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </draggable>
    </div>
</template>
<script>
import draggable from 'vuedraggable'
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
        colsOrder: Array,
        selectedTasks: Array,
        labels: Array,
        status: Array,
        priority: Array,
        boardMembers: Array,
        taskList: Array,
        colsToDisplay: Array

    },
    data() {
        return {

            taskListByLabel: null
        }
    },
    created() {
        this.$watch('taskList', (newVal) => {
            // console.log(this.groupId)
            this.taskListByLabel = newVal
        })
        this.taskListByLabel = this.taskList
    },
    components: {
        draggable,
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

    },
    methods: {
        statusTitle(title) {
            if (!title) return 'Defualt'
            return title
        },
        toggleView(col) {
            if (this.colsToDisplay.includes(col)) {
                const idx = this.colsToDisplay.findIndex(c => c === col)
                this.colsToDisplay.splice(idx, 1)
            } else {
                this.colsToDisplay.push(col)
            }
        },
        async updateTask(data) {
            // this.$emit({ 'updateTask', data })
            this.$emit('updateTask', data)
        
        },
        changeKnabanView(view) {
            console.log(view)
            this.$store.commit({ type: 'setKanbanStatus', view })
            this.tasksByStatus = this.$store.getters.getTasksByStatus
        },
        change(evt) {
            console.log('change')
            console.log(evt)

        },
        checkMove(evt) {
            console.log(evt)

        }

    }

}
</script>
<style>
</style>