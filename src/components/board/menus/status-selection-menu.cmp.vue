<template>

    <div class="status-picker-view" v-if="status" :style="postionModal">
        <div class="status-picker-view-title" :style="{ 'background-color': s.color }" v-for="s in status" :key="s.id"
            @click="selectStatus(s.id)">
            <span class="task-label-display">{{ s.title }}</span>
        </div>
    </div>

</template>
<script>
export default {
    emits: ['changeStatus'],
    props: {
        status: Array,
        pos: Object
    },
    data() {
        return {
            cordsX: null,
            cordsY: null,
        }
    },
    methods: {
        escapekeylistener(evt) {
            this.cordsX = evt.pageX
            this.cordsY = evt.pageY
        },
        selectStatus(statusId) {
            this.$emit('changeStatus', statusId)
        },
    },
    computed: {
        postionModal() {
            let elWidth = this.pos.rect.width
            let maxWidth = this.pos.left
            let elRight = this.pos.rect.x
            const top = this.pos.rect.height
            if ((elRight + elWidth) * 2 > maxWidth) {
                return `top:${top}px; left:${(-elWidth / 2)}px;`

            }
            return `top:${top}px; left:${(-elWidth / 4)}px;`
        }
    },
}

</script>
<style>
</style>