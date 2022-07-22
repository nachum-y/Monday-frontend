<template>
    <div v-if="board" class="board-content">
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
            </div>

            <!-- <div class="board-content-group-row-header"> -->
            <!-- <div class="header-col fixed">
                    <div class="task-item">
                        <div class="item-select">
                            <div class="checkbox"></div>
                        </div>
                        <div class="item-title">Items</div>

                    </div>
                </div> -->


            <draggable v-model="colsOrderList" tag="tr" class="board-content-group-row-header header"
                ghost-class="ghost" :item-key="key => key">
                <template #item="{ element }">
                    <div v-if="element.title === 'Item'" class="header-col fixed">
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

            <draggable @change="test(group.id)" v-model="rowOrderList" class="" ghost-class="ghost" :group="group.id"
                :item-key="key => key">
                <template #item="{ element }">
                    <div class="board-content-group-row" @start="test(group.id)">
                        <div class="col" v-for="(col, idx) in element.cols" :key="col.type">
                            <div v-if="idx === 0" class="col fixed">
                                <div class="task-item">
                                    <div class="row-menu">
                                        <div class="row-menu-icon"></div>
                                    </div>
                                    <div class="item-select">
                                        <div class="checkbox"></div>
                                    </div>
                                    <div class="item-title">{{ element.cols[0].value }}</div>
                                    <div class="item-conversation">
                                        <div class="conversation-icon"></div>
                                    </div>
                                </div>
                            </div>

                            <div v-else class="header-col">
                                <component :is="colsOrderList[idx].type"
                                    :task="taskForDisplay(element.cols, colsOrderList[idx].type)">
                                </component>
                            </div>
                        </div>
                    </div>
                </template>
            </draggable>


            <!-- <div class="board-content-group-row" v-for="(task, idx) in group.tasks" :key="task.id">
                <div class="col fixed">
                    <div class="task-item">
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
                </div>
                <div class="col" v-for="(col, idx) in board.colsOrder.slice(1)" :key="col.type">
                    <component :is="col.type" :task="taskForDisplay(task.cols, col.type)">
                    </component>
                </div>
            </div> -->
            <div class="board-content-group-row-add-item">
                <div class="add-item-col fixed">
                    <div class="task-item">
                        <div class="item-select">
                            <div class="checkbox"></div>
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
        <button type="button" @click="addNewGroup"
            class="add-group-separator-button monday-style-button monday-style-button--size-small monday-style-button--kind-secondary monday-style-button--color-primary has-style-size"
            data-testid="button" aria-disabled="false" style="--element-width:135.5px; --element-height:31.9844px;">
            <svg viewBox="0 0 20 20" fill="currentColor" width="24" height="24" aria-hidden="true"
                class="icon_component monday-style-button--left-icon icon_component--no-focus-style">
                <path
                    d="M10.75 3C10.75 2.58579 10.4142 2.25 10 2.25C9.58579 2.25 9.25 2.58579 9.25 3V9.25H3C2.58579 9.25 2.25 9.58579 2.25 10C2.25 10.4142 2.58579 10.75 3 10.75H9.25V17C9.25 17.4142 9.58579 17.75 10 17.75C10.4142 17.75 10.75 17.4142 10.75 17V10.75H17C17.4142 10.75 17.75 10.4142 17.75 10C17.75 9.58579 17.4142 9.25 17 9.25H10.75V3Z"
                    fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
            </svg>Add new group </button>








        <div class="row">
            <div class="col-3">
                <h3>Draggable 1</h3>
                <draggable class="dragArea list-group" :list="list1" :clone="clone"
                    :group="{ name: 'people', pull: pullFunction }" @start="start" item-key="id">
                    <template #item="{ element }">
                        <div class="list-group-item">
                            {{ element.name }}
                        </div>
                    </template>
                </draggable>
            </div>

            <div class="col-3">
                <h3>Draggable 2</h3>
                <draggable class="dragArea list-group" :list="list2" group="people" item-key="id">
                    <template #item="{ element }">
                        <div class="list-group-item">
                            {{ element.name }}
                        </div>
                    </template>
                </draggable>
            </div>
        </div>



    </div>










</template>
<script>
let idGlobal = 8;

import draggable from 'vuedraggable'
import nestedDraggable from "./infra/nested.vue"
import rawDisplayer from "./infra/raw-displayer.vue"

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
            ]
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
        colsOrderList: {
            get() {
                return this.$store.getters.colsOrder
            },
            set(value) {

                this.$store.dispatch('updateColsOrder', { value })
            }
        },
        rowOrderList: {
            get(val) {
                console.log(draggable)
                console.log(val)
                return this.$store.getters.rowOrder
            },
            set(value) {
                this.$store.dispatch('updateRowsOrder', { value })
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
</style>
