<template>
    <div v-if="task" class="task-location">
       <div class="input-container">
         <input class="location-input" type="text">
         <div class="icon-v2-line-location"></div>
       </div>
    </div>

</template>
<script>
export default {
    emits:['updateTask'],
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