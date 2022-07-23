<template>
    <div>
        <draggable v-model="rowsOrderList" tag="div" group="tasks" :dragClass="'drag-row'" :ghostClass="'ghost-row'"
            :animation="200" :item-key="key => key">
            <template #item="{ element }">
                <div class="board-content-group-row">
                    <div class="col" v-for="(col, colsIdx) in colsOrder" :class="colsIdx === 0 ? 'fixed' : ''"
                        :key="col.type">
                        <div v-if="colsIdx === 0" class="task-item">
                            <div class="row-menu">
                                <div class="row-menu-icon"></div>
                            </div>
                            <div :style="groupColor" class="border"></div>
                            <div class="item-select">
                                <div @click="toggleSelection(element.id)"
                                    :class="selectedTasks.includes(element.id) ? 'checkbox-selected' : 'checkbox'">
                                </div>
                            </div>
                            <div class="item-title">{{ element.cols[0].value }}
                            </div>
                            <div class="item-conversation">
                                <div class="conversation-icon"></div>
                                <span class="item-conversation-count">0
                                </span>
                            </div>
                        </div>
                        <component v-else :is="col.type" :task="taskForDisplay(element.cols, col.type)">
                        </component>
                    </div>
                </div>

            </template>
        </draggable>
    </div>
</template>
<script>
import draggable from 'vuedraggable'

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

    },
    computed: {
        rowsOrderList: {
            get() {
                let groups = this.$store.getters.rowOrder
                let idx = groups.findIndex((g) => g.id === this.group.id)

                return this.$store.getters.rowOrder[idx].tasks
            },
            set(value) {
                this.$store.dispatch('updateRowsOrder', { value })
            }

        },
        groupColor(){
            return  {backgroundColor: this.group.color}
        }
    }

}
</script>
<style>
</style>