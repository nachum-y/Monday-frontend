<template>
    <div>
        <div v-if="task" class="task-status" :class="setBgColor">
            <el-select style='border: none' class="status-label" :placeholder="statusToDisplay">
                <el-option class="stuck" style='border: none' value="Working on it"/>
                <el-option class="working-on-it" style='border: none' value="Stuck"/>
                <el-option class="done" style='border: none' value="Done"/>
                <el-option class="defult" style='border: none' value=""/>
            </el-select>
        </div>
    </div>
</template>
<script>
export default {
    emits:['updateTask'],
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
           if (!this.task.value) return ' '
           return this.task.value.slice( 0 , 1 ).toUpperCase() + this.task.value.slice(1)
        },
        setBgColor(){
            if (this.task.value === 'working on it') return 'working-on-it'
            else if (this.task.value === 'done') return 'done'
            else if (this.task.value === 'stuck') return 'stuck'
            else return 'defult'
        }
    },    
    methods:{
    },
} 
</script>
<style>
</style>