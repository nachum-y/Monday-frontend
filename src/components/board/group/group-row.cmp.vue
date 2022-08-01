<template>
    <div>
        <draggable v-model="rowsOrderList" dataIdAttrtag="div" group="tasks" :dragClass="'drag-row'"
            :ghostClass="'ghost-row'" :animation="200" :item-key="key => key" @start="start" @end="end"
            @remove="remove">
            <template #item="{ element }">
                <div class="board-content-group-row" :class="selectedTasks.includes(element.id) ? 'selected-row' : ''">
                    <div class="col" v-for="(col, colsIdx) in colsOrder" :class="colsIdx === 0 ? 'fixed' : ''"
                        :key="col.type">
                        <div v-if="colsIdx === 0" class="task-item">
                            <div class="row-menu">
                                <div class="row-menu-icon" @click="duplicateTask(element)"></div>
                            </div>
                            <div :style="groupColor" class="border"></div>
                            <div class="item-select">
                                <div @click="toggleSelection(element.id)"
                                    :class="selectedTasks.includes(element.id) ? 'checkbox-selected' : 'checkbox'">
                                </div>
                            </div>
                            <task-title @updateTask="this.$emit('updateTask', $event)" :task="element.cols[0]"
                                :row="element" />
                            <div class="item-conversation" :class="isActive(element)">
                                <div class="conversation-icon"></div>
                                <span class="item-conversation-count">{{ getCount(element) }}
                                </span>
                            </div>
                        </div>
                        <component @updateTask="this.$emit('updateTask', $event)" v-else :is="col.type"
                            :task="taskForDisplay(element.cols, col.type)" :row="element" :labels="labels"
                            :status="status" :priority="priority" :boardMembers="boardMembers">
                        </component>
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
        group: Object,
        colsOrder: Array,
        selectedTasks: Array,
        labels: Array,
        status: Array,
        priority: Array,
        boardMembers: Array,

    },
    data() {
        return {

        }
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
        changeIdx() {

        },
        taskForDisplay(row, type) {
            let col = row.filter((col) => col.type === type)[0]
            return col

        },
        toggleSelection(taskId) {
            this.$emit('toggleSelection', taskId)


        },
        duplicateTask(task) {
            this.$emit('duplicateTask', task)
        },
        start(evt) {
            // console.log(evt.from)
            let groupId = this.group.id
            // console.log(groupId)
        },
        end(evt) {
            // console.log(' evt.to:', evt.to)
            let groupId = this.group.id
            // console.log(groupId)
        },
        remove(ev) {
            // console.log(ev)

        },
        getCount(row) {
            if (row.conversion) return row.conversion.length
            return 0
        }, isActive(row) {
            if (!row.conversion || row.conversion.length === 0) return ''
            return 'active'
        }

    },
    computed: {
        rowsOrderList: {
            get() {
                let groups = this.$store.getters.rowOrder
                let idx = groups.findIndex((g) => g.id === this.group.id)
                return this.$store.getters.rowOrder[idx].tasks
            },
            set(value) {
                let groups = this.$store.getters.rowOrder
                let idx = groups.findIndex((g) => g.id === this.group.id)

                this.$store.dispatch('updateRowsOrder', { value, idx })
            }

        },
        groupColor() {
            return { backgroundColor: this.group.color }
        },

    }

}
</script>
<style>
</style>