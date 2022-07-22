<template>
    <div v-if="task" :class="'task-' + task.type">
        {{ labelToDisplay }}
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
    computed:{
        labelToDisplay(){
             if (!this.task.value) return ''
             return this.task.value.title
        }
    },
}
</script>
<style>
</style>