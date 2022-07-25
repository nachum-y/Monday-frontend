<template>
    <div ref="labelCmpRef" v-if="labels.length > 0" class="task-label">
        <div class="task-label-display" :style="setLabelStyle" @click="showLabelsMenu($event, labels)">{{
                labelToDisplay
        }}</div>
        <label-selection-menu v-click-outside="closeActionsModal" v-if="showLabelMenuOption"
            :labels="showLabelMenuOption.labels" :pos="showLabelMenuOption.posModal"
            @deleteGroup="removeGroup(group.id)" @duplicateGroup="duplicateGroup(group)">
        </label-selection-menu>
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
            showLabelMenuOption: null,
            showLabelMenuOptionLeft: 0,
            hover: false
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
            console.log(label.color)
            return { backgroundColor: label.color }
        },
        // setLabelStyleHover() {

        //     let labelId = this.task.value
        //     let label = this.labels.filter(label => label.id === labelId)[0]
        //     let colorHex = label.color
        //     let opacity = this.hover ? 0.6 : 1
        //     // const convertHexToRGBA = (hexCode, opacity = 1) => 
        //     let hex = colorHex.replace('#', '')
        //     console.log(hex)
        //     if (hex.length === 3) {
        //         hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
        //     }

        //     const r = parseInt(hex.substring(0, 2), 16)
        //     const g = parseInt(hex.substring(2, 4), 16)
        //     const b = parseInt(hex.substring(4, 6), 16)

        //     /* Backward compatibility for whole number based opacity values. */
        //     if (opacity > 1 && opacity <= 100) {
        //         opacity = opacity / 100
        //     }

        //     return `rgba(${r},${g},${b},${opacity})`

        // },
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