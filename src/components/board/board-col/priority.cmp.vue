<template>
    <div v-if="task" :class="'task-' + task.type">
        {{ priorityToDisplay }}
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
    computed:{
        priorityToDisplay(){
            if (!this.task.value) return ''
            return this.task.value
        }
    },
    
}
</script>
<style>
</style>