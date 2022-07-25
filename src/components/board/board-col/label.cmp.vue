<template>
    <div ref="labelCmpRef" v-if="labels.length > 0" class="task-label" 
        >
        <div class="task-label-display" :style="setLabelStyle" @click="showLabelsMenu($event, labels)">{{ labelToDisplay }}</div>
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
        row: Object
    },
    data() {
        return {
            isEdited: false,
            showLabelMenuOption: null,
            showLabelMenuOptionLeft: 0
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
            this.showLabelMenuOption.labels = labels
            // console.log(showLabelMenuOptionLeft)
            this.showLabelMenuOption.posModal = { eltop: el.layerY, left: this.showLabelMenuOptionLeft }
        },
        closeActionsModal() {
            this.showLabelMenuOption = null
        },
        changeLabel(labelId){
            let newCol = {type:this.task.type,value:labelId}
            let newData = {newCol,taskId:this.row.id,groupId:this.row.groupId}
           
            this.$emit('updateTask',newData)
        },
    },
    mounted() {
        // this.showLabelMenuOption.width = this.$refs.labelCmpRef.clientWidth
        var rect = this.$refs.labelCmpRef.getBoundingClientRect()
        // console.log(rect.top, rect.right, rect.bottom, rect.left)
        this.showLabelMenuOptionLeft = rect.left
        // console.log(this.showLabelMenuOptionLeft)

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
.task-label {
    position: relative;
}
</style>