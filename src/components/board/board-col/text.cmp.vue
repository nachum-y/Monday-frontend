<template>
    <div v-if="task" class="task-text">
        <div class="icon-dapulse-addbtn"></div>
        <div class="input-container">
         <input class="location-input" type="text">    
        </div>
    </div>
</template>
<script>
export default {
    name: ['textCmp'],
    props: {
        task: Object
    },

    data() {
        return {

        }
    },
    computed: {
        textToDiaplay(){
            if (!this.task.value) return ''
            return this.task.value
        }
    },
}
</script>
