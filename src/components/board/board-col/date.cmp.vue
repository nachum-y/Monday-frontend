<template>
    <div v-if="task" :class="'task-' + task.type">
        <el-date-picker class="col-hover" v-model="taskTime" type="date" format="YYYY/MM/DD" value-format="x" />
    </div>
</template>
<script>
export default {
    name: ['date'],
    props: {
        task: Object
    },
    data() {
        return {
            taskTime: ''

        }
    },
    mounted() {
        this.taskTime = this.task.value
    },
    computed: {
        dateToDisplay() {
            if (!this.task.value) return ''
            return new Date(this.task.value)
        }
    },

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
    /* width: 90%; */
    /* height: 90%; */
    /* margin: auto; */
    /* outline: 1px solid; */
    border: none;
}

.col-hover>* {
    border: none;
    box-shadow: none !important;
    padding: 0;
    border-radius: 0 !important;
}

.el-input__wrapper:hover {
    box-shadow: 0 0 0 1px var(--el-input-hover-border-color) inset !important;

}

.el-input__wrapper {
    flex-grow: 1;
    margin: 1px 1px;
    padding: 1px 10px;

}
</style>