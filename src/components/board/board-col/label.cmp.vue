<template>
    <div ref="labelCmpRef">
        <div v-if="labels.length > 0" class="task-label task-lighten" :style="setLabelStyle"
            @click="showLabelsMenu($event, labels)">
            {{ labelToDisplay }}

        </div>
        <label-selection-menu v-click-outside="closeActionsModal" v-if="showLabelMenuOption"
            :labels="showLabelMenuOption.labels" :pos="showLabelMenuOption.posModal"
            @changeLabel="changeLabel">
        </label-selection-menu>
    </div>
</template>
<script>
import labelSelectionMenu from '../menus/label-selection-menu.cmp.vue'
export default {
    emits:['updateTask'],
    name: ['labelCmp'],
    props: {
        task: Object,
        labels: Array,
        taskId: String
    },
    data() {
        return {
            isEdited: false,
            showLabelMenuOption: null
        }
    },
    computed: {
        labelToDisplay() {
            let labelId = this.task.value
            let label = this.labels.filter(label => label.id === labelId)[0]
            return label.title
        },
        setLabelStyle() {
            let labelId = this.task.value
            let label = this.labels.filter(label => label.id === labelId)[0]
            return { backgroundColor: label.color }
        }
    },
    methods: {
        showLabelsMenu(el, labels) {
            this.showLabelMenuOption = {}
            console.log(el)
            this.showLabelMenuOption.labels = labels
            this.showLabelMenuOption.posModal = { eltop: el.layerY, left: el.clientX }
        },
        closeActionsModal() {
            this.showLabelMenuOption = null
        },
        changeLabel(labelId){
            console.log(labelId)
            let newData = {action:'label',labelId,taskId:this.taskId}
            console.log(newData)
            this.$emit('updateTask',newData)
        },
    },
    mounted() {
        // this.showLabelMenuOption.width = this.$refs.labelCmpRef.clientWidth
        console.log(this.$refs.labelCmpRef.clientWidth);
        // let elWidth = this.$refs.groupRowFooter.clientWidth
        // this.$emit('groupRowFooter', elWidth)
    },
    // methodes: {

    //     closeActionsModal() {
    //         this.showLabelMenuOption = null
    //     },
    // },
    components: {
        labelSelectionMenu
    },
    // methodes:{
    //      openActionsModal(el, group) {
    //         this.showGroupAction = {}
    //         this.showGroupAction.group = group
    //         this.showGroupAction.posModal = { eltop: el.layerY, left: el.layerX }

    //     },
    // },
}
</script>
<style>
</style>