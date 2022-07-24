<template>
    <div ref='groupRowFooter' class=" board-content-group-row-footer">
        <div class="footer-col fixed">
            <div class="task-item">
                <div class="row-menu">

                </div>
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
    watch() {
        // this.$ref.groupRowFooter(val){
        //     console.log(val)

        // }
    }
}
</script>
<style>
</style>