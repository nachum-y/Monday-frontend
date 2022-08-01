<template>
    <div v-if="taskListByLabel">
        <draggable v-model="taskListByLabel" dataIdAttrtag="div" :group="'task-kanban'" :move="updateTaskByLabel"
            :dragClass="'drag-task-kanban'" :class="labelId" :ghostClass="'ghost-kanban-list'" :animation="200"
            :item-key="key => key" @change="change">
            <template #item="{ element }">
                <div :class="labelId" class="card">
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
        colsToDisplay: Array,
        labelId: String,
        typeView: String

    },
    data() {
        return {

            taskListByLabel: null
        }
    },
    created() {
        this.$watch('taskList', (newVal) => {
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
        newData: null

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
            this.$emit('updateTask', data)

        },
        async updateTaskByLabel(data) {
            let newStatus = data.related.className.split(' ')[0]
            let newCol = { type: this.typeView, value: newStatus }
            let newData = { newCol, taskId: data.draggedContext.element.id, groupId: data.draggedContext.element.groupId }
            this.newData = newData


        },
        changeKnabanView(view) {
            this.$store.commit({ type: 'setKanbanStatus', view })
            this.tasksByStatus = this.$store.getters.getTasksByStatus
        },
        async change(evt) {
            if (!this.newData) return
            await this.$emit('updateTask', this.newData)

        },
        checkMove(evt) {

        }

    }

}
</script>
<style>
</style>