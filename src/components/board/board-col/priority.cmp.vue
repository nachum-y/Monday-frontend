<template>
    <div v-if="task" class="task-priority" :class="this.task.value ? this.task.value : 'defult-priority-color' ">
        <div v-if="task.value === 'critical'" class="critical-icon"></div>
        <span>
            {{ priorityToDisplay }}
        </span>
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
            let val = this.task.value.slice( 0 , 1 ).toUpperCase() + this.task.value.slice(1)
            return val
        },
    },
    
}
</script>
<style>
</style>