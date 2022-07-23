<template>
    <div v-if="task" class="task-status" :class="setBgColor">
        {{ statusToDisplay }}
        <div class="add-status-note"></div>
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
           return this.task.value.slice( 0 , 1 ).toUpperCase() + this.task.value.slice(1)
        },
        setBgColor(){
            if (this.task.value === 'working on it') return 'working-on-it'
            else if (this.task.value === 'done') return 'done'
            else if (this.task.value === 'stuck') return 'stuck'
            else return 'defult'
        }
    },    
} 
</script>
<style>
</style>