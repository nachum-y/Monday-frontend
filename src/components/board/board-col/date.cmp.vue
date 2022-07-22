<template>
    <div v-if="task" :class="'task-' + task.type">
        {{ dateToDisplay }}
    </div>
</template>
<script>
export default {
    name: ['date'],
        props: {
        task: Object
    },
    data() {
        return {

        }
    },
    computed: {
        dateToDisplay(){
            if (!this.task.value) return ''
            return new Date(this.task.value).toDateString()
        }
    },

}
</script>
<style>
</style>