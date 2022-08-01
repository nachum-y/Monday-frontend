<template>
    <div class="board-content-group-row-add-item">
        <div class="add-item-col fixed">
            <div class="task-item add-item">
                <div class="border add-item"></div>
                <div class="item-select header">
                    <div class="checkbox"></div>
                </div>
                <div class="add-item-input">
                    <div :style="groupColor" class="border add-item"></div>
                    <form @submit.prevent="addTask(group.id, $event)">
                        <input name="title" placeholder="+ Add Task" />
                    </form>
                </div>

            </div>
        </div>
        <div class="add-item-col" v-for="col in colsOrder.slice(1)" :key="col.type"></div>
    </div>
</template>
<script>
export default {
    name: ['groupAddTask'],
    props: {
        group: Object,
        colsOrder: Array
    },
    data() {
        return {

        }
    },
    methods: {
        addTask(groupId, titleEl) {
            let title = titleEl.target.elements.title.value
            this.$emit('addTask', { groupId, title })
            titleEl.target.elements.title.value = ''
        }
    },
    computed: {
        groupColor(){
            let hex = this.group.color.substring(1).match(/.{1,2}/g) 
            let rgb = [parseInt(hex[0], 16), parseInt(hex[1], 16), parseInt(hex[2], 16)]
            let rgba = `rgba(${rgb[0]},${rgb[1]},${rgb[2]}, 0.3)`
            return  {backgroundColor: rgba}
        }
    }
}
</script>
<style>
</style>