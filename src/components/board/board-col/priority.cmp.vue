<template>
    <!-- <div v-if="task" class="task-priority" :class="this.task.value ? this.task.value : 'defult-priority-color' ">
        <div v-if="task.value === 'critical'" class="critical-icon"></div>
        <span>
            {{ priorityToDisplay }}
        </span>
    </div> -->






<div>
        <div v-if="task" class="task-status" :class="this.task.value ? this.task.value : 'defult-priority-color' ">
            <el-select style='border: none' class="priority-label" :placeholder="priorityToDisplay">
                <el-option class="critical" style='border: none' value="Critical"/>
                <el-option class="high" style='border: none' value="High"/>
                <el-option class="medium" style='border: none' value="Medium"/>
                <el-option class="low" style='border: none' value="Low"/>
                <el-option class="defult-priority" style='border: none' value=" "/>
            </el-select>
        </div>
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