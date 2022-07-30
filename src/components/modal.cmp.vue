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
.modalCmp {
    background-color: #fff;
    width: fit-content;
    position: absolute;
    height: fit-content;
    z-index: 9999;
    padding: 1rem;
    transition: all 50ms ease-in;
    transition-property: opacity, width;
    box-shadow: 0 4px 17px 6px rgb(0 0 0 / 10%);
    border-radius: 0.5rem;

}
</style>