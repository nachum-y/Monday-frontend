<template>
    <div :class="'task-' + task.type">
        {{personToDisplay}}
    </div>
</template>
<script>
export default {
    name: ['person'],
        props: {
        task: Object
    },
    data() {
        return {
        }
    },
    computed: {
        personToDisplay(){
            let str = ''
            this.task.value.forEach(person=>{
                str += person.fullname
            })
            return str
        }
    },
}
</script>
<style>
</style>