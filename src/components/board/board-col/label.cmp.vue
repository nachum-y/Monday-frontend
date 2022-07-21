<template>
    <div v-if="task" :class="'task-' + task.type">
        {{ task.value.title }}
    </div>
</template>
<script>
export default {
    name: ['labelCmp'],
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