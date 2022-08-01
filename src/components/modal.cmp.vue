<template>
    <div v-if="show" class="modalCmp" id="modals" :style="getPostStyle">
        <slot name="setActiveUser">
        </slot>
    </div>
</template>
<script>
export default {
    props: {
        show: Boolean,
        posModal: Object
    },
    computed: {
        getPostStyle() {
            if (!this.posModal) return
            console.log(this.posModal)
            let bottom = this.posModal.bottom
            let left = this.posModal.left
            console.log(bottom)
            return `top:${bottom - 150}px; left:${left+10}px;`
        }

    }
}
</script>
<style>

</style>