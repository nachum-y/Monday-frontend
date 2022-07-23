<template>
    <div v-if="board" class="board-content">
        <div v-if="selectedTasks.length > 0">
            <span @click="removeTasks">X</span>
        </div>

        <draggable class="dragArea" v-model="boardOrderList" :handle="'.handle'" tag="div" @start="start"
            :item-key="key => key" :dragClass="'drag-group'" :ghostClass="'ghost-group'">
            <template #item="{ element }">
                <div class="board-content-group">
                    <groupHeader :group="element" @editGroup="editGroup" @removeGroup="removeGroup"
                        @duplicateGroup="duplicateGroup" />

                    <row-header :group="element" @toggleAll="toggleAll" :selectedGroups="selectedGroups" />

                    <group-row :group="element" :colsOrder="board.colsOrder" :selectedTasks="selectedTasks"
                        :board="board" @toggleSelection="toggleSelection" />


                    <div class="board-content-group-row-add-item">
                        <div class="add-item-col fixed">
                            <div class="task-item add-item">
                                <div class="item-select header">
                                    <div class="checkbox"></div>
                                </div>
                                <div class="add-item-input">
                                    <form @submit.prevent="addTask(element.id, $event)">
                                        <input name="title" placeholder="+ Add Task" />
                                    </form>
                                </div>

                            </div>
                        </div>
                        <div class="add-item-col" v-for="col in board.colsOrder.slice(1)" :key="col.type"></div>
                    </div>

                    <div class="board-content-group-row-footer">
                        <div class="footer-col fixed">

                        </div>
                        <div class="footer-col" v-for="col in board.colsOrder.slice(1)" :key="col.type"></div>
                    </div>





                </div>
            </template>
        </draggable>

        <button type="button" @click="addNewGroup" class="btn add-group-btn">

            <div class="add-group-icon-holder">
                <div class="add-group-icon"></div>
            </div>
            <div class="add-group-btn-txt">
                Add new group
            </div>
        </button>
    </div>










</template>
<script>
let idGlobal = 8

import draggable from 'vuedraggable'

import { boardService } from '../../services/board-service.js'
import dotsClickActionsMenu from './dots-click-actions-menu.cmp.vue'
import groupPreview from './group-preview.cmp.vue'
import date from './board-col/date.cmp.vue'
import creationLog from './board-col/creationLog.cmp.vue'
import labelCmp from './board-col/label.cmp.vue'
import lastUpdated from './board-col/last-updated.cmp.vue'
import location from './board-col/location.cmp.vue'
import person from './board-col/person.cmp.vue'
import priority from './board-col/priority.cmp.vue'
import status from './board-col/status.cmp.vue'
import textCmp from './board-col/text.cmp.vue'
import timeline from './board-col/timeline.cmp.vue'
import { findIndex } from 'lodash'
import rowHeader from './group/row-header.cmp.vue'
import groupHeader from './group/group-header.cmp.vue'
import groupRow from './group/group-row.cmp.vue'

export default {
    name: ['group-list'],
    data() {
        return {
            board: null,
            groupToEdit: boardService.getEmptyGroup(),
            newData: {},
            showGroupAction: false,
            isModalOpen: false,
            // newTask:''
            selectedTasks: [],
            selectedGroups: [],
            controlOnStart: true,
            idx: 0

        }
    },
    created() {
        this.board = this.$store.getters.board

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
        dotsClickActionsMenu,
        groupPreview,
        rowHeader,
        groupHeader,
        groupRow
    },
    methods: {
        addNewGroup() {
            this.$store.dispatch({ type: 'saveGroup', group: this.groupToEdit })
            this.groupToEdit = boardService.getEmptyGroup()
        },
        removeGroup(groupId) {
            this.$store.dispatch({ type: 'removeGroup', groupId })
        },
        duplicateGroup(group) {
            this.groupToEdit = { ...group }
            delete this.groupToEdit.id
            this.$store.dispatch({ type: 'saveGroup', group: this.groupToEdit })
            this.groupToEdit = boardService.getEmptyGroup()
        },
        editGroup(EditVal) {
            console.log(EditVal)
            this.newData[EditVal.type] = EditVal.val
            this.$store.dispatch({ type: 'updateGroup', groupId: EditVal.groupId, data: this.newData })
            this.newData = {}
        },
        taskForDisplay(row, type) {
            let col = row.filter((col) => col.type === type)[0]
            return col

        },
        openActions() {

        },
        openActionsModal(el, group) {
            this.showGroupAction = {}
            this.showGroupAction.group = group
            this.showGroupAction.posModal = { eltop: el.layerY, left: el.layerX }
            return
        },
        closeActionsModal(ev) {
            this.showGroupAction = null
        },
        onToggleModal() {
            this.isModalOpen = !this.isModalOpen
        },
        addTask(groupId, title) {

            // .target.elements.title.value
            this.$store.dispatch({ type: 'addTask', groupId, title: title.target.elements.title.value })
            title.target.elements.title.value = ''
        },
        toggleSelection(taskId) {
            const idx = this.selectedTasks.findIndex(id => id === taskId)
            if (idx === -1) this.selectedTasks.push(taskId)
            else this.selectedTasks.splice(idx, 1)
        },
        toggleAll(group) {
            const idx = this.selectedGroups.findIndex(id => id === group.id)
            if (idx === -1) {
                if (group.tasks.length === 0) return
                this.selectedGroups.push(group.id)
                group.tasks.forEach(task => this.selectedTasks.push(task.id))
            }
            else {
                const idsToRemove = group.tasks.map(task => task.id)
                this.selectedTasks = this.selectedTasks.filter(id => !idsToRemove.includes(id))
                this.selectedGroups.splice(idx, 1)
            }
        },
        removeTasks() {
            const tasksToRemove = this.selectedTasks
            this.$store.dispatch({ type: 'removeTasks', tasksToRemove })
        },
        pullFunction() {
            return this.controlOnStart ? "clone" : true
        },
        clone({ name }) {
            return { name, id: idGlobal++ }
        },
        start({ originalEvent }) {
            this.controlOnStart = originalEvent.ctrlKey
        },
        changeIdx(ev, id) {
            console.log(ev)

            let idx = this.board.groups.findIndex((g) => g.id === ev.id)
            if (idx !== -1) return idx
            // if (this.idx !== newIdx) {
            //     this.idx = newIdx
            //     return
            // }


            // const isLargeNumber = ((ev) => ev.id === this.board.groups.id)
            // console.log(isLargeNumber)
            // console.log(ev)
            // console.log(id)
        }
    },
    computed: {
        draggingInfo() {
            // return this.dragging ? "under drag" : ""
        },
        getHeaderOrder() {
            // console.log('board.colsOrder:', board.colsOrder)
            // const headersList = board.colsOrder.map()
        },
        boardOrderList: {
            get() {
                return this.$store.getters.board.groups
            },
            set(value) {
                this.$store.dispatch('updateBoardOrderList', { value })
            }
        },
        colsOrderList: {
            get() {
                return this.$store.getters.colsOrder
            },
            set(value) {

                this.$store.dispatch('updateColsOrder', { value })
            }
        },
        rowsOrderList: {
            get(ev) {
                return this.$store.getters.rowOrder
                // [this.idx].tasks
            },
            set(value) {
                console.log(value)
                this.$store.dispatch('updateRowsOrder', { value })
            }

        },
    },

}

</script>
 <style>
 .btn {
     cursor: pointer;
 }
 
 .flip-list-move {
     transition: transform 0.5s;
 }
 
 .no-move {
     transition: transform 0s;
 }
 
 .ghost-header-col {
     /* opacity: 0.5; */
     background: #c8ebfb;
     color: transparent !important;
     border: 1px black dashed !important;
     background-color: #c7e6fa !important;
 }
 
 .drag-row {
     background: #eee !important;
     opacity: 1 !important;
     transform: rotate(.9deg) !important;
 }
 
 .ghost-row {
     background: #fff !important;
     border: none !important;
     color: transparent !important;
     outline: 1px rgb(156, 156, 156) dashed !important;
     margin-inline-start: 10px !important;
     z-index: 100 !important;
 }
 
 .ghost-row>* {
     border: none !important;
     display: none;
 }
 
 .list-group {
     min-height: 20px;
 }
 
 .list-group-item {
     cursor: move;
 }
 
 .drag-header-col {
     background-color: #fff;
     opacity: 0.5;
     height: 150px;
 }
 
 .list-group-item i {
     cursor: pointer;
 }
 
 .drag-group {
     background-color: #fff !important;
 }
 
 .drag-group>* {
     display: none;
 }
 
 .ghost-group {
 
     background: #fff !important;
     border: none !important;
     color: transparent !important;
     outline: 1px rgb(156, 156, 156) dashed !important;
     margin-inline-start: 10px !important;
     z-index: 100 !important;
     height: 100px;
 }
 
 .ghost-group>* {
     display: none !important;
 }
 </style>
