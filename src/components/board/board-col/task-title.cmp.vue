<template>
    <div v-if="task" class="item-title">
        <form @submit.prevent="updateTask">
        <input v-model="title" class="location-input" type="text" :placeholder="titleToDiaplay">    
        </form>
    </div>
</template>
<script>
export default {
    emits:['updateTask'],
    name: ['textCmp'],
    props: {
        task: Object,
        row: Object,
    },

    data() {
        return {
            title: '',
        }
    },
    computed: {
        titleToDiaplay(){
            if (!this.task.value) return ''
            return this.task.value
        }
    },
    methods:{
        updateTask() {
            let newCol = {type:this.task.type,value:this.title}
            let newData = {newCol,taskId:this.row.id,groupId:this.row.groupId}
            this.$emit('updateTask',newData)
            this.title = ''
        }
    }
}
</script>
