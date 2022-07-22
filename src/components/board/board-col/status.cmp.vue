<template>
    <div v-if="task" :class="'task-' + task.type">
        {{ statusToDisplay }}
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
    computed:{
        statusToDisplay(){
           if (!this.task.value) return ''
           return this.task.value
        },
    },    
}
</script>
<style>
</style>