<template>
    <div v-if="task" :class="'task-' + task.type">
        {{locationToDisplay}}
    </div>
</template>
<script>
export default {
    name: ['location'],
    props:{
        task:Object
    },
    data() {
        return {

        }
    },
        computed: {
        locationToDisplay(){
            return this.task.value
        }
    },
}
</script>
<style>
</style>