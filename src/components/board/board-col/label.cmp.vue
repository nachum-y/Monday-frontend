<template>
    <div v-if="task" class="task-label"  :style="{ 'background-color': task.value.color}">
        {{ labelToDisplay }}
    </div>
</template>
<script>
export default {
    name: ['labelCmp'],
    props: {
        task: Object,
        color: ''
    },
    data() {
        return {
        }
    },
    computed:{
        labelToDisplay(){
             if (!this.task.value) return ''
             return this.task.value.title.slice( 0 , 1 ).toUpperCase() + this.task.value.title.slice(1)
        },
    },
}
</script>
<style>
</style>