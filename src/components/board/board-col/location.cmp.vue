<template>
    <div v-if="task" class="task-location">
       <input type="text">
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
            if (!this.task.value) return ''
            return this.task.value
        }
    },
}
</script>
<style>

</style>