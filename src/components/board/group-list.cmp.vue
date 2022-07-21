<template>
    <div v-if="board" class="board-content">
        <div class="board-content-group" v-for="group in board.groups" :key="group.id">
            <div class="group-title">
                <span>
                    {{ group.title }}
                </span>
                <span class="btn" @click="removeGroup(group.id)">
                    X
                </span>
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
                <div class="col" v-for="col in task.cols.slice(1, task.length)">
                    <span>{{ col.type }}</span>
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
                <div class="add-item-col" v-for="col in board.colsOrder.slice(1)"></div>
            </div>
            <div class="board-content-group-row-footer">
                <div class="footer-col fixed">

                </div>
                <div class="footer-col" v-for="col in board.colsOrder.slice(1)"></div>
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








        <!-- <draggable v-model="headers" tag="tr" class="row header" ghost-class="ghost" :item-key="key => key">
            <template #item="{ element: header }">
                <div class="col">
                    {{ header }}
                </div>
            </template>
        </draggable> -->

        <!-- <draggable :list="list" :disabled="!enabled" item-key="name" class="dragTable" ghost-class="ghost"
            :move="checkMove" @start="dragging = true" @end="dragging = false">
            <template #item="{ element }">
                <div class="row" :class="{ 'not-draggable': !enabled }" @drag="test()">
                    <transition-group type="transition" name="fade">
                        <div class="col" v-for="(header, idx) in headers" :key="header" :class="{ 'item': idx === 0 }">
                            {{ element[header] }}&nbsp;
                            <component :is="cmp(header)">
                            </component>
                        </div>
                    </transition-group>
                </div>

            </template>
        </draggable> -->





    </div>










</template>
<script>
// import draggable from 'vuedraggable'
import { boardService } from '../../services/board-service.js'

export default {
    name: ['group-list'],
    data() {
        return {
            board: null,
            groupToEdit: boardService.getEmptyGroup()
        }
    },
    created() {
        this.board = this.$store.getters.board
    },
    methods: {
        addNewGroup() {
            this.$store.dispatch({ type: 'saveGroup', group: this.groupToEdit })
            this.groupToEdit = boardService.getEmptyGroup()
        },
        removeGroup(groupId) {
            this.$store.dispatch({ type: 'removeGroup', groupId })
        },
        duplicateGroup() {

        },
        saveGroup() {

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
    }

}
</script>
<style>
.btn {
    cursor: pointer;
}
</style>
