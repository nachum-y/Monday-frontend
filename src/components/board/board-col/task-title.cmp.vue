<template>
    <div v-if="task" class="item-title">
        <div class="input-holder">
            <form @submit.prevent="updateTask">
            <input v-model="title" class="title-input" type="text" :placeholder="titleToDiaplay">    
            </form>
        </div>
        <div class="open-icon-holder">
            <span>Open</span>
            <div class="open-icon"></div>
        </div>
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
