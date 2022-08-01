<template>
    <div v-if="task" :class="'task-' + task.type">
        <el-date-picker class="col-hover" @change="updateTask" :prefix-icon="progressBarCmp" v-model="taskTime"
            type="date" :format="formatDate" value-format="x" />
    </div>

</template>
<script>
import { h } from 'vue'
import { shallowRef } from 'vue'
import progressBar from '../../progress-bar.cmp.vue'

export default {
    emits: ['updateTask'],
    name: ['date'],
    props: {
        task: Object,
        taskId: String,
        row: Object,
    },
    data() {
        return {
            taskTime: '',
            progressBarCmp: shallowRef(h(progressBar, { date: this.task.value }))

        }
    },
    components: {
        progressBar
    },
    mounted() {
        this.taskTime = this.task.value
    },
    computed: {
        dateToDisplay() {
            if (!this.task.value) return ''
            return new Date(this.task.value)
        },
        formatDate() {
            if (new Date().getFullYear() === new Date(this.task.value).getFullYear()) return 'MMM DD'
            return 'MMM D, YYYY'
        }
    },
    methods: {
        updateTask() {
            let newCol = { type: this.task.type, value: this.taskTime }
            let newData = { newCol, taskId: this.row.id, groupId: this.row.groupId }

            this.$emit('updateTask', newData)
        }
    },
    watch: {
        task: {
            handler: function (val) {
                this.taskTime = val.value
            },
            deep: true,
            immediate: true
        }
    }

}
</script>
<style>
.task-date {
    display: flex;
    justify-content: center;
    align-self: center;
    align-items: center;
    height: 100%;
}


.col-hover {
    border: none;
}

.col-hover>* {
    border: none;
    box-shadow: none !important;
    padding: 0;
    border-radius: 0 !important;
}

.task-date .el-input__inner {
    text-align: center;
}

.clear-icon {
    display: none;
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' version='1.1' width='512' height='512' x='0' y='0' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512' xml:space='preserve' class=''%3E%3Cg%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath d='M257,0C116.39,0,0,114.39,0,255s116.39,257,257,257s255-116.39,255-257S397.61,0,257,0z M383.22,338.79 c11.7,11.7,11.7,30.73,0,42.44c-11.61,11.6-30.64,11.79-42.44,0L257,297.42l-85.79,83.82c-11.7,11.7-30.73,11.7-42.44,0 c-11.7-11.7-11.7-30.73,0-42.44l83.8-83.8l-83.8-83.8c-11.7-11.71-11.7-30.74,0-42.44c11.71-11.7,30.74-11.7,42.44,0L257,212.58 l83.78-83.82c11.68-11.68,30.71-11.72,42.44,0c11.7,11.7,11.7,30.73,0,42.44l-83.8,83.8L383.22,338.79z' fill='%23c4c4c4' data-original='%23000000' class=''/%3E%3C/g%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3Cg xmlns='http://www.w3.org/2000/svg'%3E%3C/g%3E%3C/g%3E%3C/svg%3E%0A");
}
</style>