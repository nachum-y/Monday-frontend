<template>
    <div v-if="task" :class="'task-' + task.type">
        <div class="person-bullet">
            <span>
                SA
            </span>
        </div>
        <p>
            {{dateToDisplay}}
        </p>
    </div>
</template>
<script>
export default {
    emits:['updateTask'],
    name: ['creationLog'],
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
            return new Date(this.task.value).toLocaleString("en-US", {month: "short", day:"numeric"})
        }
    },
}
</script>
<style>
</style>