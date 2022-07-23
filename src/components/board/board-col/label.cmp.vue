<template>
    <div v-if="task" class="task-label"  >
        {{ labelToDisplay }}
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
             if (!this.task.value) return ''
             return this.task.value.title.slice( 0 , 1 ).toUpperCase() + this.task.value.title.slice(1)
        },
        setColor(){
             if (!this.task.value) return ''
             return this.task.value.title.slice( 0 , 1 ).toUpperCase() + this.task.value.title.slice(1)
        },
    },
}
</script>
<style>
</style>