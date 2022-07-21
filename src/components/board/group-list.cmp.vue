<template>
    <div v-if="board" class="board-content">
        <!-- <priority /> -->
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

            <div class="board-content-group-row-header">
                <div class="header-col fixed">
                    <div class="task-item">
                        <div class="item-select">
                            <div class="checkbox"></div>
                        </div>
                        <div class="item-title">Items</div>

                    </div>
                </div>
                <div class="header-col" v-for="col in board.colsOrder.slice(1)" :key="col.title">
                    <span>{{ col.title }}</span>
                </div>
            </div>
            <div class="board-content-group-row" v-for="task in group.tasks" :key="task.id">
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
                <div class="col" v-for="col in task.cols.slice(1, task.length)" :key="col.type">
                    <text />
                    <component :is="col.type">
                    </component>
                </div>
            </div>
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



    </div>










</template>
<script>
import { boardService } from '../../services/board-service.js'
import date from './board-col/date.cmp.vue'
import creationLog from './board-col/creationLog.cmp.vue'
import label from './board-col/label.cmp.vue'
import lastUpdated from './board-col/last-updated.cmp.vue'
import location from './board-col/location.cmp.vue'
import person from './board-col/person.cmp.vue'
import priority from './board-col/priority.cmp.vue'
import status from './board-col/status.cmp.vue'
import text from './board-col/text.cmp.vue'
import timeline from './board-col/timeline.cmp.vue'

export default {
    name: ['group-list'],
    data() {
        return {
            board: null,
            groupToEdit: boardService.getEmptyGroup(),
            newData: {}
        }
    },
    created() {
        this.board = this.$store.getters.board

    },
    
    components: {
        creationLog,
        date,
        label,
        lastUpdated,
        location,
        person,
        priority,
        status,
        text,
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
            console.log(this.newData)
            this.newData = {}
        },
    },
    components: {
        // draggable,
    },
    computed: {
        draggingInfo() {
            // return this.dragging ? "under drag" : ""
        },
        getHeaderOrder() {
            // console.log('board.colsOrder:', board.colsOrder)
            // const headersList = board.colsOrder.map()
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
