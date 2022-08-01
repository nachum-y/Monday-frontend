<template>
    <div v-if="board" class="board-content">
        <div class="board-actions-menu" v-if="selectedTasks.length > 0">

            <div class="board-actions-menu-selected-items">
                <div class="board-actions-menu-selected-items-counter"><span>{{ selectedTasks.length }}</span></div>
                <div class="board-actions-menu-selected-items-title">
                    <div class="selected-items-title">Items Selected</div>
                    <div class="dots">
                        <div v-for="( task, index) in selectedTasks" :key="index" class="dot"></div>
                    </div>

                </div>
            </div>

            <div class="board-actions-menu-btns">
                <div class="remove-tasks" @click="removeTasks">
                    <div class="remove-tasks-icon-holder">
                        <div class="remove-tasks-icon">

                        </div>
                    </div>
                    <div class="remove-tasks-title">Delete</div>
                </div>

                <div class="duplicate-tasks" @click="duplicateTasks">
                    <div class="duplicate-tasks-icon-holder">
                        <div class="duplicate-tasks-icon">

                        </div>
                    </div>
                    <div class="duplicate-tasks-title">Duplicate</div>
                </div>
            </div>

            <div class="board-actions-menu-close">
                <div class="board-actions-menu-close-icon">
                </div>
            </div>


        </div>

        <draggable class="dragArea" v-model="boardOrderList" :handle="'.handle'" tag="div" @start="start"
            :item-key="key => key" v-bind:style="{ 'min-width': groupRowFooterWidth }" :dragClass="'drag-group'"
            :ghostClass="'ghost-group'">

            <template #item="{ element }">
                <div class="board-content-group" :class="collapseGroups.includes(element.id) ? 'collapseGroup' : ''">
                    <groupHeader :group="element" @editGroup="editGroup" @removeGroup="removeGroup"
                        @duplicateGroup="duplicateGroup" @collapseGroup="collapseGroup" />

                    <row-header :group="element" @toggleAll="toggleAll" :selectedGroups="selectedGroups" />

                    <group-row :boardMembers="board.members" :group="element" :priority="board.priority"
                        :status="board.status" :labels="board.labels" :colsOrder="board.colsOrder"
                        :selectedTasks="selectedTasks" @toggleSelection="toggleSelection" @duplicateTask="duplicateTask"
                        @updateTask="updateTask"/>



                    <groupAddTask :group="element" :colsOrder="board.colsOrder" @addTask="addTask" />

                    <groupFooter :groupId="element.id" :getTasksByStatus="getTasksByStatus" :colsOrder="board.colsOrder"
                        @groupRowFooter="groupRowFooter" :gropTaskLength="element.tasks.length" />

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
    <router-view></router-view>
</template>
<script>
let idGlobal = 8

import draggable from 'vuedraggable'
import { socketService, SOCKET_EVENT_BOARD_CHANGE, SOCKET_EMIT_SET_BOARD } from '../../services/socket.service'

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
import groupAddTask from './group/group-add-task.cmp.vue'
import groupFooter from './group/group-footer.cmp.vue'

export default {
    name: ['group-list'],
    data() {
        return {
            board: null,
            groupToEdit: boardService.getEmptyGroup(),
            newData: {},
            showGroupAction: false,
            isModalOpen: false,
            selectedTasks: [],
            selectedGroups: [],
            controlOnStart: true,
            idx: 0,
            isCollapse: false,
            collapseGroups: [],
            groupRowFooterWidth: 0,

        }
    },
    created() {
        this.board = this.$store.getters.board
        // socketService.emit(SOCKET_EMIT_SET_BOARD, this.board._id)
        socketService.on(SOCKET_EVENT_BOARD_CHANGE, () => {
            this.loadMsg()
        })
        // socketService.emit(SOCKET_EVENT_BOARD_CHANGE, 'loadBoard')

        // socketService.on(SOCKET_EVENT_BOARD_CHANGE, this.board)
        // SOCKET_EMIT_SET_BOARD

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
        groupRow,
        groupAddTask,
        groupFooter
    },
    methods: {
        loadMsg() {
            this.$store.dispatch({ type: 'loadBoard' })
        },
        addNewGroup() {
            this.$store.dispatch({ type: 'saveGroup', group: this.groupToEdit })
            this.groupToEdit = boardService.getEmptyGroup()
            // socketService.emit(SOCKET_EVENT_BOARD_CHANGE, 'loadBoard')

        },
        removeGroup(groupId) {
            this.$store.dispatch({ type: 'removeGroup', groupId })
            // socketService.emit(SOCKET_EVENT_BOARD_CHANGE, 'loadBoard')
        },
        duplicateGroup(group) {
            this.groupToEdit = { ...group }
            delete this.groupToEdit.id
            this.$store.dispatch({ type: 'saveGroup', group: this.groupToEdit })
            this.groupToEdit = boardService.getEmptyGroup()
            // socketService.emit(SOCKET_EVENT_BOARD_CHANGE, 'loadBoard')
        },
        editGroup(EditVal) {
            this.newData[EditVal.type] = EditVal.val
            this.$store.dispatch({ type: 'updateGroup', groupId: EditVal.groupId, data: this.newData })
            this.newData = {}
            // socketService.emit(SOCKET_EVENT_BOARD_CHANGE, 'loadBoard')
        },
        taskForDisplay(row, type) {
            let col = row.filter((col) => col.type === type)[0]
            return col

        },
        openActionsModal(evt) {
            this.showGroupAction = {}
            this.showGroupAction.group = evt.group
            this.showGroupAction.posModal = { eltop: evt.el.layerY, left: evt.el.layerX }
        },
        closeActionsModal(ev) {
            this.showGroupAction = null
        },
        onToggleModal() {
            this.isModalOpen = !this.isModalOpen
        },
        addTask(titleVal) {
            this.$store.dispatch({ type: 'addTask', groupId: titleVal.groupId, title: titleVal.title })
            // socketService.emit(SOCKET_EVENT_BOARD_CHANGE, 'loadBoard')
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
                this.selectedTasks = [...new Set(this.selectedTasks)]
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
            this.selectedTasks = []
            this.selectedGroups = []
            // socketService.emit(SOCKET_EVENT_BOARD_CHANGE, 'loadBoard')
        },
        duplicateTasks() {
            const tasksToDup = this.selectedTasks
            this.$store.dispatch({ type: 'duplicateTasks', tasksToDup })
            this.selectedTasks = []
            this.selectedGroups = []
            // socketService.emit(SOCKET_EVENT_BOARD_CHANGE, 'loadBoard')
        },

        duplicateTask(task) {
            this.$store.dispatch({ type: 'saveTask', task })
            // socketService.emit(SOCKET_EVENT_BOARD_CHANGE, 'loadBoard')
        },
        updateTask(data) {
            this.$store.dispatch({ type: 'updateTask', data })
            // socketService.emit(SOCKET_EVENT_BOARD_CHANGE, 'loadBoard')
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
            let idx = this.board.groups.findIndex((g) => g.id === ev.id)
            if (idx !== -1) return idx

        },
        collapseGroup(groupId) {
            const idx = this.collapseGroups.findIndex(id => id === groupId)
            if (idx === -1) this.collapseGroups.push(groupId)
            else this.collapseGroups.splice(idx, 1)

        },
        groupRowFooter(elWidth) {
            // this.groupRowFooterWidth = elWidth
            let width = (elWidth + 'px')
            this.groupRowFooterWidth = width

        },
        sortBy(filter, param = null) {
            this.$store.dispatch({ type: 'sortBy', filter, param })
        },

    },
    computed: {
        groupRowFooterWidthCalc() {
            // groupRowFooter
            return 'width"123px'
        },
        getHeaderOrder() {
            // const headersList = board.colsOrder.map()
        },
        boardOrderList: {
            get() {
                return this.$store.getters.board.groups
            },
            set(value) {
                this.$store.dispatch('updateBoardOrderList', { value })
                // socketService.emit(SOCKET_EVENT_BOARD_CHANGE, 'loadBoard')
            }
        },
        colsOrderList: {
            get() {
                return this.$store.getters.colsOrder
            },
            set(value) {

                this.$store.dispatch('updateColsOrder', { value })
                // socketService.emit(SOCKET_EVENT_BOARD_CHANGE, 'loadBoard')
            }
        },
        rowsOrderList: {
            get(ev) {
                return this.$store.getters.rowOrder
                // [this.idx].tasks
            },
            set(value) {
                this.$store.dispatch('updateRowsOrder', { value })
            }

        },
        getLabels() {
            return this.$store.getters.getLabels
        },
        getStatus() {
            return this.$store.getters.getStatus
        },
        getPriority() {
            return this.$store.getters.getPriority
        },
        getMembers() {
            return this.$store.getters.getMembers
        },
        getTasksByStatus() {
            return this.$store.getters.getGroupsByLabels
        }
    },
    destroyed() {
        socketService.off(SOCKET_EVENT_BOARD_CHANGE, this.board)
    },

}

</script>
 <style>
 .filterRow {
     display: flex;
     justify-content: space-evenly;
     flex-direction: column;
 }
 
 
 .btnFilter {
     color: #fff;
     font-weight: 700;
     cursor: pointer;
     margin: 0.5rem;
 }
 
 .btn {
     cursor: pointer;
 }
 
 .dragArea {
     width: calc(100% + 133px);
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
     /* transform: rotate(.9deg) !important; */
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
 
 .handle {
     cursor: move;
     /* fallback if grab cursor is unsupported */
     cursor: grab;
     cursor: -moz-grab;
     cursor: -webkit-grab;
     z-index: 200;
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
     /* background-color: #fff !important; */
 }
 
 .drag-group>*:not(:first-child) {
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
 
 .board-content-group.collapseGroup>*:not(:first-child):not(:last-child) {
     display: none !important;
 }
 
 .board-content-group.collapseGroup {
     margin: 0;
     padding: 0;
     display: grid;
     grid-template-columns: 400px 1fr;
     align-self: flex-start;
     height: 100%;
     width: 100%;
     margin-left: 0;
     border: 1px solid #d0d4e4;
 
 }
 
 .board-content-group.collapseGroup .board-content-group-row-footer {
     display: grid;
     grid-template-columns: 0 repeat(auto-fill, minmax(140px, 160px));
     grid-auto-flow: column;
     grid-auto-columns: minmax(140px, 160px);
     grid-template-rows: auto;
     border-bottom: 0;
 }
 </style>



