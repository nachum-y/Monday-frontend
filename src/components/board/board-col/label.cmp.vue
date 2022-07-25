<template>
    <div class="task-label task-lighten" :style="setLabelStyle">
        {{labelToDisplay}}
        <label-selection-menu v-if="showLabelMenu"/>
    </div>
</template>
<script>
import labelSelectionMenu from '../menus/label-selection-menu.cmp.vue'
export default {
    name: ['labelCmp'],
    props: {
        task: Object,
        labels: Array,
    },
    data() {
        return {
            isEdited: false,
            showLabelMenu: false,
        }
    },
    computed:{
        labelToDisplay(){
            let labelId = this.task.value
            let label = this.labels.filter(label=>label.id === labelId)[0]
            return label.title  
        },
        setLabelStyle(){
            let labelId = this.task.value
            let label = this.labels.filter(label=>label.id === labelId)[0]
            return {backgroundColor : label.color}
        }
    },
    components:{
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