<template>
    <div ref="labelCmpRef" v-if="labels.length > 0" class="task-label task-lighten" :style="setLabelStyle"
        @click="showLabelsMenu($event, labels)">
        {{ labelToDisplay }}
        <label-selection-menu v-click-outside="closeActionsModal" v-if="showLabelMenuOption"
            :labels="showLabelMenuOption.labels" :pos="showLabelMenuOption.posModal"
            @deleteGroup="removeGroup(group.id)" @duplicateGroup="duplicateGroup(group)">
        </label-selection-menu>
    </div>
    <!-- <label-selection-menu v-click-outside="closeActionsModal" v-if="showLabelMenuOption"
            :labels="showLabelMenuOption.labels" :pos="showLabelMenuOption.posModal"
            @deleteGroup="removeGroup(group.id)" @duplicateGroup="duplicateGroup(group)">
        </label-selection-menu> -->
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
            console.log(el)
            this.showLabelMenuOption.labels = labels
            // console.log(showLabelMenuOptionLeft)
            this.showLabelMenuOption.posModal = { eltop: el.layerY, left: this.showLabelMenuOptionLeft }
        },
        closeActionsModal() {
            this.showLabelMenuOption = null
        },
    },
    mounted() {
        // this.showLabelMenuOption.width = this.$refs.labelCmpRef.clientWidth
        var rect = this.$refs.labelCmpRef.getBoundingClientRect()
        console.log(rect.top, rect.right, rect.bottom, rect.left)
        this.showLabelMenuOptionLeft = rect.left
        console.log(this.showLabelMenuOptionLeft)

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