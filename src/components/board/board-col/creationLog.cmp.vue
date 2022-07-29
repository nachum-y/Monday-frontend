<template>
    <div v-if="task" :class="'task-' + task.type">
        <div class="person-bullet">
            <img :src="row.createdBy.imgUrl">
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
        task: Object,
        row: Object,
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