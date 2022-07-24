<template>
    <div v-if="task" class="task-label" :class="setColor">
            <el-select style='border: none' :class="setColor" class="priority-label" :placeholder="labelToDisplay">
                <el-option class="label1" style='border: none' value="label1"/>
                <el-option class="label2" style='border: none' value="label2"/>
                <el-option class="label3" style='border: none' value="label3"/>
                <el-option class="defult-label-color" style='border: none' value=""/>
            </el-select>
    </div>
</template>
<script>
export default {
    name: ['labelCmp'],
    props: {
        task: Object,
    },
    data() {
        return {
        }
    },
    computed:{
        labelToDisplay(){
             if (!this.task.value) return ' '
             return this.task.value.title.slice( 0 , 1 ).toUpperCase() + this.task.value.title.slice(1)
        },
        setColor(){
            if (!this.task.value) return 'defult-label-color'
            if (this.task.value.color === 'rgb(154, 173, 189)') return 'label1'
            else if (this.task.value.color === 'rgb(0, 134, 192)') return 'label2'
            else if (this.task.value.color === 'rgb(157, 153, 185)') return 'label3'
        },
    },
}
</script>
<style>
</style>