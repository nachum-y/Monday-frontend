<template>
    <div ref="statusCmpRef" v-if="status.length > 0" class="task-label">
        <div class="task-label-display task-lighten" :style="setStatusStyle" @click="showStatusMenu($event, status)">{{
                statusToDisplay
        }}</div>
        <status-selection-menu v-click-outside="closeActionsModal" v-if="showStatusMenuOption"
            :status="showStatusMenuOption.status" :pos="showStatusMenuOption.posModal" @changeStatus="changeStatus"
            @closeActionsModal="closeActionsModal">
        </status-selection-menu>
    </div>
</template>
<script>
import statusSelectionMenu from '../menus/status-selection-menu.cmp.vue'
export default {
    emits: ['updateTask'],
    name: ['status'],
    props: {
        task: Object,
        status: Array,
        row: Object,
    },
    data() {
        return {
            showStatusMenuOption: null,
            showStatusMenuOptionLeft: 0
        }
    },
    computed: {
        statusToDisplay() {
            let statusId = this.task.value
            let status = this.status.filter(status => status.id === statusId)[0]
            return status.title
        },
        setBgColor() {
            if (this.task.value === 'working on it') return 'working-on-it'
            else if (this.task.value === 'done') return 'done'
            else if (this.task.value === 'stuck') return 'stuck'
            else return 'defult'
        },
        setStatusStyle() {
            let statusId = this.task.value
            let status = this.status.filter(status => status.id === statusId)[0]
            return { backgroundColor: status.color }
        }
    },
    methods: {
        changeStatus(statusId) {
            let newCol = { type: this.task.type, value: statusId }
            let newData = { newCol, taskId: this.row.id, groupId: this.row.groupId }
            this.closeActionsModal()
            this.$emit('updateTask', newData)
        },
        showStatusMenu(el, status) {
            this.showStatusMenuOption = {}
            this.showStatusMenuOption.status = status
            var rect = this.$refs.statusCmpRef.getBoundingClientRect()
            this.showStatusMenuOption.posModal = { eltop: el.layerY, left: this.showStatusMenuOptionLeft, rect }
        },
        closeActionsModal() {
            this.showStatusMenuOption = null
        },
    },
    components: {
        statusSelectionMenu,
    },
    mounted() {
        var rect = this.$refs.statusCmpRef.getBoundingClientRect()
        this.showStatusMenuOptionLeft = window.outerWidth
    },
} 
</script>
<style>
</style>