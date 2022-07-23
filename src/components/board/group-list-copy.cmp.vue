<template>

    <div v-if="board" class="board-content">
        <draggable class="dragArea list-group" v-model="boardOrderList" :clone="clone"
            :group="{ name: 'people', pull: pullFunction }" @start="start" item-key="id">
            <template #item="{ element }">
                <div class="div">
                    <div class="group-title">
                        <span contenteditable="true" @blur="editGroup($event.target.innerText, element.id, 'title')">
                            {{ element.title }}
                        </span>
                        <span class="btn" @click="removeGroup(element.id)">
                            X
                        </span>
                        <span class="btn" @click="duplicateGroup(element)">
                            Duplicate group
                        </span>
                        <label for="color-picker">
                            <input @change="editGroup($event.target.value, element.id, 'color')" type="color"
                                id="color-picker">
                        </label>
                        <button @click="openActionsModal($event, element)" class="btn">...</button>

                        <dotsClickActionsMenu v-click-outside="closeActionsModal" v-if="showGroupAction"
                            :group="showGroupAction.group" :pos="showGroupAction.posModal">
                        </dotsClickActionsMenu>

                    </div>


                    <draggable v-model="colsOrderList" tag="div" ghost-class="ghost-header-col" :animation="200"
                        class="board-content-group-row-header" :item-key="key => key">
                        <template #item="{ element }">
                            <div v-if="element.title === 'Item'" @drag="false" class="header-col fixed">
                                <div class="task-item">
                                    <div class="item-select">
                                        <div class="checkbox"></div>
                                    </div>
                                    <div class="item-title">Items</div>
                                </div>
                            </div>
                            <div v-else class="header-col">
                                <span>{{ element.title }}</span>
                            </div>
                        </template>
                    </draggable>


                    <div class="board-content-group-row" v-for="(task, idx) in element.tasks" :key="task.id">
                        <div class="col" v-for="(col, colRowIdx) in board.colsOrder" :key="col.type"
                            :class="colRowIdx === 0 ? 'fixed' : ''">
                            <div v-if="colRowIdx === 0" class="task-item">
                                <div class="row-menu">
                                    <div class="row-menu-icon"></div>
                                </div>
                                <div class="item-select">
                                    <div class="checkbox"></div>
                                </div>
                                <div class="item-title">{{ task.cols[0].value }}</div>
                                <div class="item-conversation">
                                    <div class="conversation-icon"></div>
                                </div>
                            </div>
                            <component v-else :is="col.type" :task="taskForDisplay(task.cols, col.type)">
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
                                    <input placeholder="+ Add Task" />
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







    </div>



</template>
<script>
let idGlobal = 8

import draggable from 'vuedraggable'
import nestedDraggable from "./infra/nested.vue"
import rawDisplayer from "./infra/raw-displayer.vue"
import dotsClickActionsMenu from './dots-click-actions-menu.cmp.vue'
import { boardService } from '../../services/board-service.js'
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

export default {

    name: ['group-list'],
    data() {
        return {
            board: null,
            groupToEdit: boardService.getEmptyGroup(),
            newData: {},
            startIdx: 1,
            drag: false,
            colsOrder1: [
                { title: "Item", type: "item" },
                { title: "Text", type: "textCmp" },
                { title: "person", type: "person" },
                { title: "priority", type: "priority" },
                { title: "status", type: "status" },
                { title: "date", type: "date" },
                { title: "creation log", type: "creationLog" },
                { title: "location", type: "location" },
                { title: "label", type: "labelCmp" }
            ],

            dragging: false,
            boardDrag: null,
            controlOnStart: true,

            list1: [
                { name: "John", id: 1 },
                { name: "Joao", id: 2 },
                { name: "Jean", id: 3 },
                { name: "Gerard", id: 4 }
            ],
            list2: [
                { name: "Juan", id: 5 },
                { name: "Edgard", id: 6 },
                { name: "Johnson", id: 7 }
            ],
            list3: [
                { name: "Juan", id: 8 },
                { name: "Edgard", id: 9 },
                { name: "Johnson", id: 10 }
            ],
            showGroupAction: false,
            isModalOpen: false
        }

    },
    created() {
        this.board = this.$store.getters.board

    },
    components: {
        draggable,
        rawDisplayer,
        nestedDraggable,
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
        dotsClickActionsMenu
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
            console.log(group)
            this.groupToEdit = { ...group }
            delete this.groupToEdit.id
            this.$store.dispatch({ type: 'saveGroup', group: this.groupToEdit })
            this.groupToEdit = boardService.getEmptyGroup()
        },
        editGroup(val, groupId, type) {
            this.newData[type] = val
            this.$store.dispatch({ type: 'updateGroup', groupId, data: this.newData })
            this.newData = {}
        },
        taskForDisplay(row, type) {
            let col = row.filter((col) => col.type === type)[0]
            return col
        },
        add() {
            // this.list.push({ name: "Juan " + id, id: id++ })
        },
        replace() {
            // this.list = [{ name: "Edgard", id: id++ }]
        },
        endTest() {
            console.log(this.list)
        },
        log(evt) {
            console.log(this.list)
            console.log(evt)
        },
        test(val) {
            console.log(val)
        },
        clone({ name }) {
            return { name, id: idGlobal++ }
        },
        pullFunction() {
            return this.controlOnStart ? "clone" : true
        },
        start({ originalEvent }) {
            this.controlOnStart = originalEvent.ctrlKey
        },
        testlog(val) {
            console.log(val)
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
    },
    computed: {
        draggingInfo() {
            // return this.dragging ? "under drag" : ""
        },
        getHeaderOrder() {
            // console.log('board.colsOrder:', board.colsOrder)
            // const headersList = board.colsOrder.map()
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
            get() {
                console.log(this.$store.getters.rowOrder[0].tasks)
                return this.$store.getters.rowOrder[0].tasks
            },
            set(value) {
                this.$store.dispatch('updateRowsOrder', { value })
            }

        },
        boardOrderList: {
            get() {
                return this.$store.getters.board.groups
            },
            set(value) {
                this.$store.dispatch('updateBoardOrderList', { value })
            }
        }

    },
    watch: {

    }
}

</script>
<style>
.btn {
    cursor: pointer;
}

.ghost-header-col {
    opacity: 0.5;
    background: #F7FAFC;
    border: 1px solid #4299e1;
}
</style>

  <!-- <div class="board-content-group-row-header">
                        <div class="header-col" v-for="(col, idxColHeader) in board.colsOrder" :key="col.title"
                            :class="idxColHeader === 0 ? 'fixed' : ''">
                            <div v-if="idxColHeader === 0" class=" task-item">
                                <div class="item-select">
                                    <div class="checkbox"></div>
                                </div>
                                <div class="item-title">Items</div>
                            </div>
                            <div v-else>
                                <span>{{ col.title }}</span>
                            </div>
                        </div>
                    </div> -->