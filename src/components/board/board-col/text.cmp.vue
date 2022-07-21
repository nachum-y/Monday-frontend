<template>
    <div v-if="task">
        {{ task.value }}
    </div>
</template>
<script>
export default {
    name: ['textCmp'],
    props: {
        task: Object
    },

    data() {
        return {

        }
    },
    mounted() {
        console.log(this.task)
    },
}
</script>
<style>
</style>