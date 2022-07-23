<template>
    <div class=" board-content-group-row-footer">
        <div class="footer-col fixed">

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
    methods: {

    },
}
</script>
<style>
</style>