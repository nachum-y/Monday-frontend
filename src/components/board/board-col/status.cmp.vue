<template>
    <div v-if="task" :class="'task-' + task.type">
        {{ task.value }}
    </div>
</template>
<script>
export default {
    name: ['status'],
    props: {
        task: Object
    },
    data() {
        return {

        }
    },

}
</script>
<style>
</style>