<template>
    <div v-if="task" :class="'task-' + task.type">
        {{ task.value }}
    </div>
</template>
<script>
export default {
    name: ['priority'],
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