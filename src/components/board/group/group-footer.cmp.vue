<template>
    <div ref='groupRowFooter' class=" board-content-group-row-footer">
        <div class="footer-col fixed">
            <div class="task-item">
                <div class="row-menu">

                </div>
            <div class="board-content-group-row-footer-corner"></div>
            </div>
            </div>

        <div class="footer-col" v-for="col in colsOrder.slice(1)" :key="col.type"></div>
    </div>
</template>
<script>
export default {
    props: {
        colsOrder: Array
    },
    data() {
        return {

        }
    },
    mounted() {
        let elWidth = this.$refs.groupRowFooter.clientWidth
        this.$emit('groupRowFooter', elWidth)
    },
    methods: {

    },
    destroyed() {
        let elWidth = this.$refs.groupRowFooter.clientWidth
        this.$emit('groupRowFooter', elWidth)
    },
    watch() {
        // this.$ref.groupRowFooter(val){
        //     console.log(val)

        // }
    }
}
</script>
<style>
    .board-content-group-row-footer-corner{
        width: 8px;
        height: 2.25rem;
        background-color: white;
        position: absolute;
        border-left: 1px solid #d0d4e4;
        border-bottom: 1px solid #d0d4e4;
        box-shadow: -1px 1px 1px rgb(0 0 0 / 10%);
        border-bottom-left-radius: 4px;
        left: 395px;
    }
    .collapseGroup .board-content-group-row-footer-corner{
        display: none;
    }
</style>