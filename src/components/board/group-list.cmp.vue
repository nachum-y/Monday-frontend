<template>
    <div v-if="board" class="board-content">
        <div v-if="selectedTasks.length > 0">
            <span @click="removeTasks">X</span>
        </div>
        <div class="board-content-group" v-for="group in board.groups" :key="group.id">
            <div class="group-title">
                <span ref="groupTitle" contenteditable="true"
                    @blur="editGroup($event.target.innerText, group.id, 'title')">
                    {{ group.title }}
                </span>
                <span class="btn" @click="removeGroup(group.id)">
                    X
                </span>
                <span class="btn" @click="duplicateGroup(group)">
                    Duplicate group
                </span>
                <label for="color-picker">
                    <input @change="editGroup($event.target.value, group.id, 'color')" type="color" id="color-picker">
                </label>

                <button @click="openActionsModal($event, group)" class="btn">...</button>

                <dotsClickActionsMenu v-click-outside="closeActionsModal" v-if="showGroupAction"
                    :group="showGroupAction.group" :pos="showGroupAction.posModal">
                </dotsClickActionsMenu>

            </div>

            <div class="board-content-group-row-header">
                <div class="header-col fixed">
                    <div class="task-item">
                        <div class="row-menu">
                            <div class="row-menu-icon"></div>
                        </div>
                        <div class="item-select">
                            <div @click="toggleAll(group)"
                                :class="selectedGroups.includes(group.id) ? 'checkbox-selected' : 'checkbox'"></div>
                        </div>
                        <div class="item-title">Items</div>
                    </div>
                </div>
                <div class="header-col" v-for="col in board.colsOrder.slice(1)" :key="col.title">
                    <span>{{ col.title }}</span>
                </div>
            </div>
            <div class="board-content-group-row" v-for="(task, idx) in group.tasks" :key="task.id">
                <div class="col fixed">
                    <div class="task-item">
                        <div class="row-menu">
                            <div class="row-menu-icon"></div>
                        </div>
                        <div class="item-select">
                            <div @click="toggleSelection(task.id)"
                                :class="selectedTasks.includes(task.id) ? 'checkbox-selected' : 'checkbox'"></div>
                        </div>
                        <div class="item-title">{{ task.cols[0].value }}</div>
                        <div class="item-conversation">
                            <div class="conversation-icon"></div>
                            <span class="item-conversation-count">0</span>
                        </div>
                    </div>
                </div>
                <div class="col" v-for="(col, idx) in board.colsOrder.slice(1)" :key="col.type">
                    <component :is="col.type" :task="taskForDisplay(task.cols, col.type)">
                    </component>
                </div>
            </div>


            <div class="board-content-group-row-add-item">
                <div class="add-item-col fixed">
                    <div class="task-item add-item">
                        <div class="item-select header">
                            <div class="checkbox"></div>
                        </div>
                        <div class="add-item-input">
                            <form @submit.prevent="addTask(group.id, $event)">
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
        }
    },
    created() {
        this.board = this.$store.getters.board

    },
    components: {
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
        groupPreview
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
        editGroup(val, groupId, type) {
            this.newData[type] = val
            this.$store.dispatch({ type: 'updateGroup', groupId, data: this.newData })
            console.log(this.newData)
            this.newData = {}
        },
        taskForDisplay(row, type) {
            let col = row.filter((col) => col.type === type)[0]
            return col

        },
        openActions() {
            console.log('actions')

        },
        openActionsModal(el, group) {
            console.log(el)
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
    },
    watch: {

    }
}

</script>
<style>
.btn {
    cursor: pointer;
}
</style>
