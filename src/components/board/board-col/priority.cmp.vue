<template>
     <div ref="priorityCmpRef" v-if="priority.length > 0" class="task-label">
        <div class="task-label-display" :style="setPriorityStyle" @click="showPriorityMenu($event, priority)">{{ priorityToDisplay }}</div>
        <priority-selection-menu v-click-outside="closeActionsModal" v-if="showPriorityMenuOption"
            :priority="showPriorityMenuOption.priority" :pos="showPriorityMenuOption.posModal"
            @changePriority="changePriority">
        </priority-selection-menu>
    </div>
</template>
<script>
import prioritySelectionMenu from '../menus/priority-selection-menu.cmp.vue'
export default {
    emits:['updateTask'],
    name: ['priority'],
    props: {
        task: Object,
        priority: Array,
        row: Object,
    },
    data() {
        return {
            showPriorityMenuOption: null,
            showPriorityMenuOptionLeft: 0
        }
    },
    computed:{
        priorityToDisplay(){
            let priorityId = this.task.value
            let priority = this.priority.filter(priority => priority.id === priorityId)[0]
            return priority.title
        },
        setBgColor(){
            if (this.task.value === 'working on it') return 'working-on-it'
            else if (this.task.value === 'done') return 'done'
            else if (this.task.value === 'stuck') return 'stuck'
            else return 'defult'
        },
        setPriorityStyle() {
            let priorityId = this.task.value
            let priority = this.priority.filter(priority => priority.id === priorityId)[0]
            return { backgroundColor: priority.color }
        }
    },    
    methods:{
        changePriority(priorityId){
            let newCol = {type:this.task.type,value:priorityId}
            let newData = {newCol,taskId:this.row.id,groupId:this.row.groupId}
           
            this.$emit('updateTask',newData)
        },
        showPriorityMenu(el, priority) {
            this.showPriorityMenuOption = {}
            this.showPriorityMenuOption.priority = priority
            // console.log(showLabelMenuOptionLeft)
            this.showPriorityMenuOption.posModal = { eltop: el.layerY, left: this.showPriorityMenuOptionLeft }
        },
        closeActionsModal() {
            this.showPriorityMenuOption = null
        },
    },
    components:{
        prioritySelectionMenu,
    }
} 
</script>
<style>
</style>